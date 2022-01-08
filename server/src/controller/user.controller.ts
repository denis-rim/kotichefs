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
      ...body,
      passwordHash,
      salt,
      verificationString,
    });

    await sendEmail({
      from: "noreply@kotichefs.com",
      to: user.email,
      subject: "Please verify your email",
      html: `
          <p>Thanks for signing up! To verify your email, click the link below:</p>
          <a href="http://localhost:5000/api/user/verify-email/${user._id}/${verificationString}">Verify Email</a>`,
    });

    return res.status(201).send(user);
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

  // Find user by email
  const user = await findUserByEmail(email);

  if (!user) {
    // Send a 200 status NO MATTER WHAT (unless there's an internal error) - this makes it hard to fish around for emails
    logger.debug(`User with email ${email} does not exists`);
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
  const passwordHash = await bcrypt.hash(salt + password + pepper, 10);

  // Update user
  user.passwordHash = passwordHash;
  user.salt = salt;
  user.passwordResetCode = "";

  await user.save();

  return res.status(200).send("Password successfully reset");
}
