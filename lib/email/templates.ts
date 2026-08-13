import { escapeHtml } from "./escape";

const NAVY = "#122940";
const CREAM = "#FFFCF7";
const BLOB = "#C4D9EB";
const WATER = "#457D9E";

type EmailField = {
  label: string;
  value: string;
  href?: string;
};

function renderFields(fields: EmailField[]): string {
  return fields
    .filter((field) => field.value.trim())
    .map(
      (field) => `
        <tr>
          <td style="padding:14px 0;border-bottom:1px solid rgba(18,41,64,0.08);vertical-align:top;width:38%;">
            <span style="font-family:Arial,Helvetica,sans-serif;font-size:11px;font-weight:700;letter-spacing:0.08em;text-transform:uppercase;color:${WATER};">
              ${escapeHtml(field.label)}
            </span>
          </td>
          <td style="padding:14px 0 14px 16px;border-bottom:1px solid rgba(18,41,64,0.08);vertical-align:top;">
            ${
              field.href
                ? `<a href="${escapeHtml(field.href)}" style="font-family:Arial,Helvetica,sans-serif;font-size:15px;line-height:1.5;color:${NAVY};text-decoration:none;font-weight:600;">${escapeHtml(field.value)}</a>`
                : `<span style="font-family:Arial,Helvetica,sans-serif;font-size:15px;line-height:1.5;color:${NAVY};white-space:pre-wrap;">${escapeHtml(field.value)}</span>`
            }
          </td>
        </tr>`,
    )
    .join("");
}

function renderEmailLayout(options: {
  eyebrow: string;
  title: string;
  intro: string;
  fields: EmailField[];
  footerNote?: string;
}): string {
  const submittedAt = new Date().toLocaleString("en-GB", {
    dateStyle: "full",
    timeStyle: "short",
    timeZone: "Africa/Cairo",
  });

  return `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>${escapeHtml(options.title)}</title>
  </head>
  <body style="margin:0;padding:0;background-color:#eef3f7;">
    <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="background-color:#eef3f7;padding:32px 16px;">
      <tr>
        <td align="center">
          <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="max-width:620px;background:${CREAM};border-radius:24px;overflow:hidden;border:1px solid rgba(18,41,64,0.08);">
            <tr>
              <td style="background:${NAVY};padding:28px 32px;">
                <div style="font-family:Arial,Helvetica,sans-serif;font-size:11px;font-weight:700;letter-spacing:0.12em;text-transform:uppercase;color:${BLOB};margin-bottom:10px;">
                  ${escapeHtml(options.eyebrow)}
                </div>
                <div style="font-family:Arial,Helvetica,sans-serif;font-size:28px;line-height:1.15;font-weight:800;color:${CREAM};">
                  ${escapeHtml(options.title)}
                </div>
              </td>
            </tr>
            <tr>
              <td style="padding:28px 32px 8px;">
                <p style="margin:0 0 24px;font-family:Arial,Helvetica,sans-serif;font-size:15px;line-height:1.6;color:rgba(18,41,64,0.78);">
                  ${escapeHtml(options.intro)}
                </p>
                <table role="presentation" width="100%" cellspacing="0" cellpadding="0">
                  ${renderFields(options.fields)}
                </table>
              </td>
            </tr>
            <tr>
              <td style="padding:8px 32px 28px;">
                ${
                  options.footerNote
                    ? `<p style="margin:0 0 16px;font-family:Arial,Helvetica,sans-serif;font-size:14px;line-height:1.6;color:rgba(18,41,64,0.72);white-space:pre-wrap;">${escapeHtml(options.footerNote)}</p>`
                    : ""
                }
                <div style="padding-top:18px;border-top:1px solid rgba(18,41,64,0.08);font-family:Arial,Helvetica,sans-serif;font-size:11px;line-height:1.5;color:rgba(18,41,64,0.45);">
                  Received via dough.eg · ${escapeHtml(submittedAt)}
                </div>
              </td>
            </tr>
          </table>
        </td>
      </tr>
    </table>
  </body>
</html>`;
}

export type ProjectInquiryPayload = {
  businessName: string;
  socialMedia: string;
  name: string;
  mobile: string;
  email: string;
  position: string;
  services: string[];
  otherService?: string;
  meetingPreference: string;
};

export type JobApplicationPayload = {
  fullName: string;
  email: string;
  phone: string;
  cityCountry: string;
  linkedin: string;
  applyingFor: string;
  showWork: string;
  anythingElse: string;
  attachmentName?: string;
};

export function buildProjectInquiryEmail(payload: ProjectInquiryPayload) {
  const servicesList = [
    ...payload.services,
    ...(payload.otherService?.trim() ? [`Other: ${payload.otherService}`] : []),
  ].join("\n");

  const html = renderEmailLayout({
    eyebrow: "New project inquiry",
    title: payload.businessName,
    intro:
      "A new project inquiry just came through the Dough website. All details are below — reply directly to the contact person to continue the conversation.",
    fields: [
      { label: "Business name", value: payload.businessName },
      {
        label: "Social media",
        value: payload.socialMedia,
        href: payload.socialMedia.startsWith("http")
          ? payload.socialMedia
          : undefined,
      },
      { label: "Contact name", value: payload.name },
      {
        label: "Mobile",
        value: payload.mobile,
        href: `tel:${payload.mobile.replace(/\s/g, "")}`,
      },
      {
        label: "Email",
        value: payload.email || "Not provided",
        href: payload.email ? `mailto:${payload.email}` : undefined,
      },
      { label: "Position", value: payload.position },
      { label: "Services requested", value: servicesList },
      { label: "Meeting preference", value: payload.meetingPreference },
    ],
  });

  const text = [
    "New Dough Project Inquiry",
    "",
    `Business: ${payload.businessName}`,
    `Social Media: ${payload.socialMedia}`,
    `Contact: ${payload.name}`,
    `Mobile: ${payload.mobile}`,
    `Email: ${payload.email || "Not provided"}`,
    `Position: ${payload.position}`,
    `Services:\n${servicesList}`,
    `Meeting Preference: ${payload.meetingPreference}`,
  ].join("\n");

  return {
    subject: `[Dough Inquiry] ${payload.businessName} — ${payload.name}`,
    html,
    text,
    replyTo: payload.email || undefined,
  };
}

export function buildJobApplicationEmail(payload: JobApplicationPayload) {
  const html = renderEmailLayout({
    eyebrow: "New job application",
    title: payload.fullName,
    intro:
      "Someone applied to join the Dough team through the website. Review their details below and check the attachment if they uploaded a portfolio or CV.",
    fields: [
      { label: "Full name", value: payload.fullName },
      {
        label: "Email",
        value: payload.email,
        href: `mailto:${payload.email}`,
      },
      {
        label: "Phone",
        value: payload.phone,
        href: `tel:${payload.phone.replace(/\s/g, "")}`,
      },
      { label: "City / country", value: payload.cityCountry },
      {
        label: "LinkedIn / portfolio",
        value: payload.linkedin || "Not provided",
        href: payload.linkedin.startsWith("http")
          ? payload.linkedin
          : undefined,
      },
      { label: "Applying for", value: payload.applyingFor },
    ],
    footerNote: [
      payload.showWork.trim() ? `Show us your work:\n${payload.showWork}` : "",
      payload.anythingElse.trim()
        ? `Anything else:\n${payload.anythingElse}`
        : "",
      payload.attachmentName
        ? `Attachment: ${payload.attachmentName}`
        : "Attachment: None",
    ]
      .filter(Boolean)
      .join("\n\n"),
  });

  const text = [
    "New Dough Job Application",
    "",
    `Name: ${payload.fullName}`,
    `Email: ${payload.email}`,
    `Phone: ${payload.phone}`,
    `City / Country: ${payload.cityCountry}`,
    `LinkedIn / Portfolio: ${payload.linkedin || "Not provided"}`,
    `Applying For: ${payload.applyingFor}`,
    "",
    payload.showWork.trim() ? `Show us your work:\n${payload.showWork}` : "",
    payload.anythingElse.trim()
      ? `Anything else:\n${payload.anythingElse}`
      : "",
    payload.attachmentName
      ? `Attachment: ${payload.attachmentName}`
      : "Attachment: None",
  ]
    .filter(Boolean)
    .join("\n");

  return {
    subject: `[Dough Careers] ${payload.fullName} — ${payload.applyingFor}`,
    html,
    text,
    replyTo: payload.email,
  };
}
