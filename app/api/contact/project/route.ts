import { NextResponse } from "next/server";
import { getProjectInbox } from "@/lib/email/config";
import { sendMail } from "@/lib/email/send";
import {
  buildProjectInquiryEmail,
  type ProjectInquiryPayload,
} from "@/lib/email/templates";

export const runtime = "nodejs";

function isNonEmptyString(value: unknown): value is string {
  return typeof value === "string" && value.trim().length > 0;
}

function badRequest(message: string) {
  return NextResponse.json({ error: message }, { status: 400 });
}

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as Partial<ProjectInquiryPayload> & {
      services?: unknown;
    };

    const services = Array.isArray(body.services)
      ? body.services.filter((item): item is string => typeof item === "string")
      : [];

    if (!isNonEmptyString(body.businessName)) {
      return badRequest("Business name is required.");
    }
    if (!isNonEmptyString(body.socialMedia)) {
      return badRequest("Business social media is required.");
    }
    if (!isNonEmptyString(body.name)) {
      return badRequest("Contact name is required.");
    }
    if (!isNonEmptyString(body.mobile)) {
      return badRequest("Mobile number is required.");
    }
    if (!isNonEmptyString(body.position)) {
      return badRequest("Position is required.");
    }
    if (services.length === 0 && !isNonEmptyString(body.otherService)) {
      return badRequest("At least one service is required.");
    }
    if (!isNonEmptyString(body.meetingPreference)) {
      return badRequest("Meeting preference is required.");
    }

    if (
      isNonEmptyString(body.email) &&
      !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(body.email.trim())
    ) {
      return badRequest("Invalid email address.");
    }

    const payload: ProjectInquiryPayload = {
      businessName: body.businessName.trim(),
      socialMedia: body.socialMedia.trim(),
      name: body.name.trim(),
      mobile: body.mobile.trim(),
      email: body.email?.trim() ?? "",
      position: body.position.trim(),
      services,
      otherService: body.otherService?.trim(),
      meetingPreference: body.meetingPreference.trim(),
    };

    const inbox = getProjectInbox();
    if (!inbox) {
      return NextResponse.json(
        { error: "Contact inbox is not configured on the server." },
        { status: 500 },
      );
    }

    const email = buildProjectInquiryEmail(payload);

    await sendMail({
      to: inbox,
      replyTo: email.replyTo,
      subject: email.subject,
      html: email.html,
      text: email.text,
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("[contact/project]", error);
    return NextResponse.json(
      {
        error:
          error instanceof Error
            ? error.message
            : "Failed to send project inquiry.",
      },
      { status: 500 },
    );
  }
}
