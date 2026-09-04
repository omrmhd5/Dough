import { NextResponse } from "next/server";
import { getMessage, getRequestLocale } from "@/lib/i18n/api";
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

function badRequest(locale: ReturnType<typeof getRequestLocale>, key: string) {
  return NextResponse.json(
    { error: getMessage(locale, key) },
    { status: 400 },
  );
}

export async function POST(request: Request) {
  const locale = getRequestLocale(request);

  try {
    const body = (await request.json()) as Partial<ProjectInquiryPayload> & {
      services?: unknown;
    };

    const services = Array.isArray(body.services)
      ? body.services.filter((item): item is string => typeof item === "string")
      : [];

    if (!isNonEmptyString(body.businessName)) {
      return badRequest(locale, "api.errors.businessNameRequired");
    }
    if (!isNonEmptyString(body.socialMedia)) {
      return badRequest(locale, "api.errors.socialMediaRequired");
    }
    if (!isNonEmptyString(body.name)) {
      return badRequest(locale, "api.errors.contactNameRequired");
    }
    if (!isNonEmptyString(body.mobile)) {
      return badRequest(locale, "api.errors.mobileRequired");
    }
    if (!isNonEmptyString(body.position)) {
      return badRequest(locale, "api.errors.positionRequired");
    }
    if (services.length === 0 && !isNonEmptyString(body.otherService)) {
      return badRequest(locale, "api.errors.servicesRequired");
    }
    if (!isNonEmptyString(body.meetingPreference)) {
      return badRequest(locale, "api.errors.meetingPreferenceRequired");
    }

    if (
      isNonEmptyString(body.email) &&
      !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(body.email.trim())
    ) {
      return badRequest(locale, "api.errors.invalidEmail");
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
        { error: getMessage(locale, "api.errors.inboxNotConfigured") },
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
            : getMessage(locale, "api.errors.projectSendFailed"),
      },
      { status: 500 },
    );
  }
}
