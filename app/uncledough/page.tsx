import { SiteNav } from "@/components/dough/site-nav";
import { UncleDough } from "@/components/dough/uncle-dough";
import { SiteFooter } from "@/components/dough/site-footer";

export default function UncleDoughPage() {
  return (
    <main className="bg-navy min-h-screen pt-20">
      <SiteNav />
      <UncleDough />
      <SiteFooter hideCareers />
    </main>
  );
}
