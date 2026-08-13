import { NextResponse } from "next/server";
import { getJobInbox } from "@/lib/email/config";
import { sendMail } from "@/lib/email/send";
import {
  buildJobApplicationEmail,
  type JobApplicationPayload,
} from "@/lib/email/templates";

export const runtime = "nodejs";

const MAX_FILE_BYTES = 20 * 1024 * 1024;
const ALLOWED_EXTENSIONS = new Set(["pdf", "doc", "docx"]);

function badRequest(message: string) {
  return NextResponse.json({ error: message }, { status: 400 });
}

function isNonEmptyString(value: FormDataEntryValue | null): value is string {
  return typeof value === "string" && value.trim().length > 0;
}

export async function POST(request: Request) {
  try {
    const formData = await request.formData();

    const fullName = formData.get("fullName");
    const email = formData.get("email");
    const phone = formData.get("phone");
    const cityCountry = formData.get("cityCountry");
    const linkedin = formData.get("linkedin");
    const applyingFor = formData.get("applyingFor");
    const showWork = formData.get("showWork");
    const anythingElse = formData.get("anythingElse");
    const attachment = formData.get("attachment");

    if (!isNonEmptyString(fullName)) {
      return badRequest("Full name is required.");
    }
    if (!isNonEmptyString(email)) {
      return badRequest("Email address is required.");
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
      return badRequest("Invalid email address.");
    }
    if (!isNonEmptyString(phone)) {
      return badRequest("Phone number is required.");
    }
    if (!isNonEmptyString(cityCountry)) {
      return badRequest("City / country is required.");
    }
    if (!isNonEmptyString(applyingFor)) {
      return badRequest("Role is required.");
    }

    const payload: JobApplicationPayload = {
      fullName: fullName.trim(),
      email: email.trim(),
      phone: phone.trim(),
      cityCountry: cityCountry.trim(),
      linkedin: typeof linkedin === "string" ? linkedin.trim() : "",
      applyingFor: applyingFor.trim(),
      showWork: typeof showWork === "string" ? showWork.trim() : "",
      anythingElse: typeof anythingElse === "string" ? anythingElse.trim() : "",
    };

    const inbox = getJobInbox();
    if (!inbox) {
      return NextResponse.json(
        { error: "Contact inbox is not configured on the server." },
        { status: 500 },
      );
    }

    const emailContent = buildJobApplicationEmail(payload);
    const attachments: { filename: string; content: Buffer }[] = [];

    if (attachment instanceof File && attachment.size > 0) {
      const extension = attachment.name.split(".").pop()?.toLowerCase() ?? "";

      if (!ALLOWED_EXTENSIONS.has(extension)) {
        return badRequest("Only PDF, DOC, and DOCX files are accepted.");
      }
      if (attachment.size > MAX_FILE_BYTES) {
        return badRequest("Attachment must be 20 MB or smaller.");
      }

      payload.attachmentName = attachment.name;
      attachments.push({
        filename: attachment.name,
        content: Buffer.from(await attachment.arrayBuffer()),
      });
    }

    const finalEmail = buildJobApplicationEmail(payload);

    await sendMail({
      to: inbox,
      replyTo: finalEmail.replyTo,
      subject: finalEmail.subject,
      html: finalEmail.html,
      text: finalEmail.text,
      attachments,
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("[contact/job]", error);
    return NextResponse.json(
      {
        error:
          error instanceof Error
            ? error.message
            : "Failed to send job application.",
      },
      { status: 500 },
    );
  }
}
