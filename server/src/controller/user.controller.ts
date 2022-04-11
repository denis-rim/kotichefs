import { Request, Response } from "express";
import { v4 as uuid } from "uuid";
import bcrypt from "bcrypt";
import config from "config";
import logger from "../utils/logger";
import {
  CreateUserInput,
  ForgotPasswordInput,
  ResetPasswordInput,
  VerifyUserInput,
} from "../validation/user.validationSchema";
import sendEmail from "../utils/mailer";
import {
  createUser,
  findUserByEmail,
  findUserById,
  findUserByResetCode,
} from "../service/user.service";
import { MyResponseLocals } from "../middleware/requireUser";

// Register a new user
export async function createUserHandler(
  req: Request<unknown, unknown, CreateUserInput>,
  res: Response
) {
  const body = req.body;
  try {
    // Add more security salt and pepper to the password
    const salt = uuid();
    const pepper = config.get<string>("pepper");
    const verificationString = uuid();

    const passwordHash = await bcrypt.hash(salt + body.password + pepper, 10);

    const user = await createUser({
      username: body.username,
      email: body.email,
      passwordHash,
      salt,
      verificationString,
    });

    // Send email to user with verification email link
    await sendEmail({
      from: "noreply@kotichefs.com",
      to: user.email,
      subject: "Please verify your email",
      html: `
          <p>Thanks for signing up! To verify your email, click the link below:</p>
          <a href="http://localhost:5000/api/user/verify-email/${user._id}/${verificationString}">Verify Email</a>`,
    });

    return res.status(201).send({
      id: user._id,
      fullName: user.fullName,
      photo_url: user.photo_url,
      verified: user.verified,
      role: user.role,
      isAdmin: user.isAdmin,
    });
  } catch (err: unknown) {
    logger.error(err);

    let errorMessage = "Something went wrong.";

    if (err instanceof Error) {
      errorMessage += " Error: " + err.message;
      if (err.message.includes("E11000")) {
        return res
          .status(409)
          .send("Account with this email or username already exists");
      }
    }

    return res.status(500).send(errorMessage);
  }
}

// Verify user email
export async function verifyEmailHandler(
  req: Request<VerifyUserInput>,
  res: Response
) {
  const { id, verificationString } = req.params;

  try {
    // Find user by id
    const user = await findUserById(id);

    if (!user) {
      return res.status(404).send("Could not verify user");
    }

    // Check if user is already verified
    if (user.verified) {
      return res.status(200).send("User is already verified");
    }

    // Check if verification string is correct
    if (user.verificationString !== verificationString) {
      return res.status(400).send("Verification string is incorrect");
    }

    // Verify user
    user.verified = true;
    user.verificationString = "";

    await user.save();

    return res.status(200).send("User successfully verified");
  } catch (err: unknown) {
    logger.error(err);

    let errorMessage = "Something went wrong.";

    if (err instanceof Error) {
      errorMessage += " Error: " + err.message;
    }

    return res.status(500).send(errorMessage);
  }
}

// Reset user password
export async function forgotPasswordHandler(
  req: Request<unknown, unknown, ForgotPasswordInput>,
  res: Response
) {
  const { email } = req.body;

  try {
    // Find user by email
    const user = await findUserByEmail(email);

    if (!user) {
      // Send a 200 status NO MATTER WHAT (unless there's an internal error) - this makes it hard to fish around for emails
      logger.error(`User with email ${email} does not exists`);
      return res.send(
        "If a user with that email is registered you will receive a password reset email"
      );
    }

    // Generate new password reset code
    const passwordResetCode = uuid();

    user.passwordResetCode = passwordResetCode;

    await user.save();

    // Send email with link to reset password
    await sendEmail({
      from: "noreply@kotichefs.com",
      to: user.email,
      subject: "Reset password",
      html: `
          <p>To reset password, click the link below:</p>
<!--           TODO: Change this to a proper link once we have a proper frontend-->
          <a href="http://localhost:5000/api/user/reset-password/${passwordResetCode}">Reset password</a>`,
    });

    // Send a 200 status NO MATTER WHAT (unless there's an internal error) - this makes it hard to fish around for emails
    return res.send(
      "If a user with that email is registered you will receive a password reset email"
    );
  } catch (err: unknown) {
    logger.error(err);

    let errorMessage = "Something went wrong.";

    if (err instanceof Error) {
      errorMessage += " Error: " + err.message;
    }

    return res.status(500).send(errorMessage);
  }
}

export async function resetPasswordHandler(
  req: Request<
    ResetPasswordInput["params"],
    unknown,
    ResetPasswordInput["body"]
  >,
  res: Response
) {
  const { passwordResetCode } = req.params;
  const { password } = req.body;

  try {
    // Find user by password reset code
    const user = await findUserByResetCode(passwordResetCode);

    if (
      !user ||
      user.passwordResetCode === "" ||
      user.passwordResetCode !== passwordResetCode
    ) {
      return res.status(404).send("Could not reset password");
    }

    // Hash new password
    const salt = uuid();
    const pepper = config.get<string>("pepper");

    // Update user
    user.passwordHash = await bcrypt.hash(salt + password + pepper, 10);
    user.salt = salt;
    user.passwordResetCode = "";

    await user.save();

    return res.status(200).send("Password successfully reset");
  } catch (err: unknown) {
    logger.error(err);

    let errorMessage = "Something went wrong.";

    if (err instanceof Error) {
      errorMessage += " Error: " + err.message;
    }

    return res.status(500).send(errorMessage);
  }
}

// Get current user info
export async function getCurrentUserHandler(
  _req: Request,
  res: Response<unknown, MyResponseLocals>
) {
  try {
    const user = await findUserById(res.locals.user.user);

    // TODO: ADD typing to response and sanitize data as here: https://stackoverflow.com/questions/65815269/how-to-use-typescript-types-on-api-response-data
    if (!user) {
      return res.status(401).send("Unauthorized");
    }

    return res.status(200).send({
      id: user._id,
      username: user.username,
      fullName: user.fullName,
      email: user.email,
      city: user.city,
      photo_url: user.photo_url,
      role: user.role,
      orders: user.orders,
      cuisine: user.cuisine,
      promoted: user.promoted,
      about: user.about,
      phone: user.phone,
      rating: user.rating,
      verified: user.verified,
      isAdmin: user.isAdmin,
      address: user.address,
      tags: user.tags,
    });
  } catch (err: unknown) {
    logger.error(err);

    let errorMessage = "Something went wrong.";

    if (err instanceof Error) {
      errorMessage += " Error: " + err.message;
    }

    return res.status(500).send(errorMessage);
  }
}

// Update current user info
// export async function updateCurrentUserHandler(
//   req: Request<unknown, unknown, UpdateCurrentUserInput>,
//   res: Response<unknown, MyResponseLocals>
// ) {
//   try {
//     const user = await findUserById(res.locals.user.user);
//
//     if (!user) {
//       return res.status(401).send("Unauthorized");
//     }
//
//     const {
//       username,
//       fullName,
//       email,
//       city,
//       photo_url,
//       role,
//       orders,
//       cuisine,
//       about,
//       phone,
//       address,
//     } = req.body;
//
//     // Update user
//     user.username = username;
//     user.fullName = fullName;
//     user.email = email;
//     user.city = city;
//     user.photo_url = photo_url;
//     user.role = role;
//     user.orders = orders;
//     user.cuisine = cuisine;
//     user.about = about;
//     user.phone = phone;
//     user.address = address;
//
//     await user.save();
//
//     return res.status(200).send("User successfully updated");
//   } catch (err: unknown) {
//     logger.error(err);
//
//     let errorMessage = "Something went wrong.";
//
//     if (err instanceof Error) {
//       errorMessage += " Error: " + err.message;
//     }
//
//     return res.status(500).send(errorMessage);
//   }
// }
