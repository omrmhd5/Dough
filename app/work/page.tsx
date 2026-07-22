import { SiteNav } from "@/components/dough/site-nav";
import { ClientsPortfolio } from "@/components/dough/clients-portfolio";
import { SiteFooter } from "@/components/dough/site-footer";

export default function WorkPage() {
  return (
    <main className="bg-navy min-h-screen pt-20 text-cream relative overflow-x-hidden">
      <SiteNav />

      <div className="absolute top-[10%] right-[-10%] w-[40vw] h-[40vw] rounded-full bg-blob/5 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[20%] left-[-10%] w-[40vw] h-[40vw] rounded-full bg-water/5 blur-[120px] pointer-events-none" />

      <ClientsPortfolio />
      <SiteFooter />
    </main>
  );
}
