import React from "react";
import { render } from "react-email";
import {
  Html,
  Head,
  Font,
  Preview,
  Body,
  Container,
  Section,
  Text,
  Button,
  Hr,
} from "react-email";

const e = React.createElement;

const COLORS = {
  background: "#e9edf2",
  card: "#ffffff",
  textPrimary: "#0e1520",
  textSecondary: "#5a6a7e",
  accent: "#b85c28",
  buttonBg: "#0e1520",
  buttonText: "#f7f8fa",
  border: "rgba(14, 21, 32, 0.08)",
  muted: "#8d9aad",
};

function ResetPasswordEmail({ resetLink }) {
  return e(
    Html,
    { lang: "en", dir: "ltr" },
    e(
      Head,
      null,
      e(Font, {
        fontFamily: "DM Sans",
        fallbackFontFamily: ["Helvetica", "Arial", "sans-serif"],
        webFont: {
          url: "https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700&display=swap",
          format: "woff2",
        },
        fontWeight: 400,
        fontStyle: "normal",
      })
    ),
    e(Preview, null, "Reset your password — Prometeo"),
    e(
      Body,
      {
        style: {
          backgroundColor: COLORS.background,
          fontFamily: "'DM Sans', Helvetica, Arial, sans-serif",
          margin: "0",
          padding: "40px 0",
        },
      },
      e(
        Container,
        {
          style: {
            maxWidth: "420px",
            margin: "0 auto",
            backgroundColor: COLORS.card,
            borderRadius: "16px",
            border: `1px solid ${COLORS.border}`,
            boxShadow:
              "0 0 0 1px rgba(14,21,32,0.03), 0 1px 2px -1px rgba(14,21,32,0.06), 0 8px 24px -4px rgba(14,21,32,0.08)",
            padding: "40px",
          },
        },
        e(
          Section,
          { style: { marginBottom: "32px" } },
          e(
            Text,
            {
              style: {
                fontSize: "11px",
                fontWeight: "600",
                letterSpacing: "0.12em",
                textTransform: "uppercase",
                color: COLORS.accent,
                margin: "0 0 12px 0",
              },
            },
            "Prometeo"
          ),
          e(
            Text,
            {
              style: {
                fontFamily: "'Fraunces', Georgia, serif",
                fontSize: "28px",
                lineHeight: "1.15",
                fontWeight: "600",
                letterSpacing: "-0.02em",
                color: COLORS.textPrimary,
                margin: "0 0 10px 0",
              },
            },
            "Reset your password"
          ),
          e(
            Text,
            {
              style: {
                fontSize: "14px",
                lineHeight: "1.6",
                color: COLORS.textSecondary,
                margin: "0",
              },
            },
            "We received a request to reset the password for your Prometeo account. Click the button below to choose a new password."
          )
        ),
        e(
          Section,
          { style: { textAlign: "center", marginBottom: "32px" } },
          e(
            Button,
            {
              href: resetLink,
              style: {
                display: "inline-block",
                backgroundColor: COLORS.buttonBg,
                color: COLORS.buttonText,
                fontFamily: "'DM Sans', Helvetica, Arial, sans-serif",
                fontSize: "15px",
                fontWeight: "600",
                lineHeight: "1",
                textDecoration: "none",
                textAlign: "center",
                padding: "13px 32px",
                borderRadius: "8px",
                border: "none",
              },
            },
            "Reset password"
          )
        ),
        e(
          Section,
          { style: { marginBottom: "24px" } },
          e(
            Text,
            {
              style: {
                fontSize: "13px",
                lineHeight: "1.5",
                color: COLORS.muted,
                margin: "0 0 8px 0",
              },
            },
            "This link expires in 15 minutes. If you need a new one, you can request it again from the login page."
          ),
          e(
            Text,
            {
              style: {
                fontSize: "13px",
                lineHeight: "1.5",
                color: COLORS.muted,
                margin: "0",
              },
            },
            "If you can't click the button, copy and paste this link into your browser:"
          ),
          e(
            Text,
            {
              style: {
                fontSize: "12px",
                lineHeight: "1.4",
                color: COLORS.accent,
                wordBreak: "break-all",
                margin: "8px 0 0 0",
              },
            },
            resetLink
          )
        ),
        e(Hr, {
          style: {
            borderColor: COLORS.border,
            borderWidth: "1px 0 0 0",
            margin: "0 0 24px 0",
          },
        }),
        e(
          Section,
          null,
          e(
            Text,
            {
              style: {
                fontSize: "12px",
                lineHeight: "1.5",
                color: COLORS.muted,
                textAlign: "center",
                margin: "0",
              },
            },
            "If you didn't request a password reset, you can safely ignore this email. Your password will remain unchanged."
          )
        )
      )
    )
  );
}

export async function renderResetPasswordEmail({ resetLink }) {
  const element = e(ResetPasswordEmail, { resetLink });
  return await render(element);
}
