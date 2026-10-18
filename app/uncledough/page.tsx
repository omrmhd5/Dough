import type { Metadata } from "next";
import { SiteNav } from "@/components/dough/site-nav";
import { UncleDough } from "@/components/dough/uncle-dough";
import { SiteFooter } from "@/components/dough/site-footer";

export const metadata: Metadata = {
  title: "Uncle Dough",
};

export default function UncleDoughPage() {
  return (
    <>
      <SiteNav />
      <main>
        <UncleDough />
      </main>
      <SiteFooter variant="compact" />
    </>
  );
}
