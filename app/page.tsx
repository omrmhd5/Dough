import { SiteNav } from '@/components/dough/site-nav'
import { Hero } from '@/components/dough/hero'
import { WhoWeAre } from '@/components/dough/who-we-are'
import { WhyUs } from '@/components/dough/why-us'
import { WhatWeBake } from '@/components/dough/what-we-bake'
import { HowWeWork } from '@/components/dough/how-we-work'
import { SiteFooter } from '@/components/dough/site-footer'

export default function Page() {
  return (
    <main className="bg-cream">
      <SiteNav />
      <Hero />
      <WhoWeAre />
      <WhatWeBake />
      <HowWeWork />
      <WhyUs />
      <SiteFooter />
    </main>
  )
}
