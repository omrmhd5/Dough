import type { Metadata } from "next";
import { SiteNav } from "@/components/dough/site-nav";
import { WorkIndex } from "@/components/dough/work-index";
import { ClientWall } from "@/components/dough/industries";
import { Capabilities } from "@/components/dough/capabilities";
import { SiteFooter } from "@/components/dough/site-footer";

export const metadata: Metadata = {
  title: "Work",
  description:
    "Case studies from Dough: Akleh, HNDL, Knorr, Lux, Farooja and Kufta.",
};

export default function WorkPage() {
  return (
    <>
      <SiteNav />
      <main>
        <WorkIndex />
        <ClientWall />
        <Capabilities />
      </main>
      <SiteFooter />
    </>
  );
}
