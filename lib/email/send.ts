import nodemailer from "nodemailer";
import type Mail from "nodemailer/lib/mailer";
import { getMailFrom, getSmtpConfig } from "./config";

let transporter: nodemailer.Transporter | null = null;

function getTransporter() {
  if (!transporter) {
    transporter = nodemailer.createTransport(getSmtpConfig());
  }
  return transporter;
}

export async function sendMail(options: Mail.Options) {
  const transport = getTransporter();
  return transport.sendMail({
    from: getMailFrom(),
    ...options,
  });
}
