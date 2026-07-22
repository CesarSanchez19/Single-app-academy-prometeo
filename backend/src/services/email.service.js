import { Resend } from "resend";
import { env } from "../config/env.js";

let resendClient = null;

if (env.resendApiKey) {
  resendClient = new Resend(env.resendApiKey);
  console.log("[Email] Resend client initialized");
} else {
  console.log("[Email] RESEND_API_KEY not configured — email delivery disabled");
}

export const sendResetPasswordEmail = async ({ to, resetLink }) => {
  if (!resendClient) {
    return;
  }

  const { renderResetPasswordEmail } = await import(
    "../emails/ResetPasswordEmail.js"
  );
  const html = await renderResetPasswordEmail({ resetLink });

  const { error } = await resendClient.emails.send({
    from: env.resendFromEmail,
    to,
    subject: "Reset your password — Prometeo",
    html,
  });

  if (error) {
    throw new Error(error.message);
  }
};
