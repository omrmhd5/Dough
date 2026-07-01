import { SiteNav } from '@/components/dough/site-nav'
import { ClientsPortfolio } from '@/components/dough/clients-portfolio'
import { SiteFooter } from '@/components/dough/site-footer'

export default function ClientsPage() {
  return (
    <main className="bg-cream min-h-screen pt-20">
      <SiteNav />
      <ClientsPortfolio />
      <SiteFooter />
    </main>
  )
}
