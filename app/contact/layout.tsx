import type { Metadata } from "next";
import type { ReactNode } from "react";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Start a project with Dough or apply to join the team. Studio in New Cairo, Egypt.",
};

export default function ContactLayout({ children }: { children: ReactNode }) {
  return children;
}
