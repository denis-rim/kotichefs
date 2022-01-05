import nodemailer, { SendMailOptions } from "nodemailer";
import config from "config";
import logger from "./logger";

// Generate data for email
// async function createTestCreds() {
//   const creds = await nodemailer.createTestAccount();
//   console.log({ creds });
// }
//
// createTestCreds();

const smtp = config.get<{
  user: string;
  pass: string;
  host: string;
  port: number;
  secure: boolean;
}>("smtp");

// eslint-disable-next-line @typescript-eslint/no-unsafe-call,@typescript-eslint/no-unsafe-assignment
const transporter = nodemailer.createTransport({
  ...smtp,
  auth: {
    user: smtp.user,
    pass: smtp.pass,
  },
});

async function sendEmail(payload: SendMailOptions) {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-call
  await transporter.sendMail(payload, (err, info) => {
    if (err) {
      logger.error(err, "Error sending email");
      return;
    }
    // eslint-disable-next-line @typescript-eslint/no-unsafe-call
    logger.info(`Preview URL: ${nodemailer.getTestMessageUrl(info)}`);
  });
}

export default sendEmail;
