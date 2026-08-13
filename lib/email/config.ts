export function getSmtpConfig() {
  const host = process.env.SMTP_HOST;
  const port = Number(process.env.SMTP_PORT ?? "587");
  const user = process.env.SMTP_USER;
  const pass = process.env.SMTP_PASS;

  if (!host || !user || !pass) {
    throw new Error(
      "SMTP is not configured. Set SMTP_HOST, SMTP_USER, and SMTP_PASS in .env",
    );
  }

  const secure = process.env.SMTP_SECURE === "true" || String(port) === "465";

  return {
    host,
    port,
    secure,
    auth: { user, pass },
  };
}

export function getMailFrom(): string {
  const user = process.env.SMTP_USER;

  if (!user) {
    throw new Error("SMTP_USER must be set in .env");
  }

  // Sent from your authenticated SMTP account (Gmail ignores custom From addresses).
  return `"Dough Website" <${user}>`;
}

export function getProjectInbox(): string {
  return (
    process.env.CONTACT_PROJECT_TO ??
    process.env.CONTACT_TO ??
    process.env.SMTP_USER ??
    ""
  );
}

export function getJobInbox(): string {
  return (
    process.env.CONTACT_JOB_TO ??
    process.env.CONTACT_TO ??
    process.env.SMTP_USER ??
    ""
  );
}
