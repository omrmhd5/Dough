import { SiteNav } from '@/components/dough/site-nav'
import { Contact } from '@/components/dough/contact'
import { SiteFooter } from '@/components/dough/site-footer'

export default function ContactPage() {
  return (
    <main className="bg-cream min-h-screen pt-20">
      <SiteNav />
      <Contact />
      <SiteFooter hideCareers />
    </main>
  )
}
