import { SiteNav } from "@/components/dough/site-nav";
import { Hero } from "@/components/dough/hero";
import { WhoWeAre } from "@/components/dough/who-we-are";
import { WhyDough } from "@/components/dough/why-dough";
import { Industries } from "@/components/dough/industries";
import { WhatWeBake } from "@/components/dough/what-we-bake";
import { HowWeWork } from "@/components/dough/how-we-work";
import { SelectedWork } from "@/components/dough/selected-work";
import { SiteFooter } from "@/components/dough/site-footer";

export default function Page() {
  return (
    <>
      <SiteNav />
      <main>
        <Hero />
        <WhoWeAre />
        <WhyDough />
        <Industries />
        <WhatWeBake />
        <HowWeWork />
        <SelectedWork />
      </main>
      <SiteFooter />
    </>
  );
}
