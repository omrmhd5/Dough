import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { SiteNav } from "@/components/dough/site-nav";
import { SiteFooter } from "@/components/dough/site-footer";
import { CaseStudy } from "@/components/dough/case-study";
import { CASES, getCase } from "@/components/dough/case-media";

type Params = { slug: string };

export function generateStaticParams(): Params[] {
  return CASES.map(({ client }) => ({ slug: client.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}): Promise<Metadata> {
  const { slug } = await params;
  const entry = getCase(slug);
  if (!entry) return {};
  const { client, media } = entry;
  return {
    title: client.en,
    description: client.subtitle ?? client.overview,
    openGraph: { images: [media.cover.src] },
  };
}

export default async function CaseStudyPage({
  params,
}: {
  params: Promise<Params>;
}) {
  const { slug } = await params;
  const entry = getCase(slug);
  if (!entry) notFound();

  return (
    <>
      <SiteNav />
      <main>
        <CaseStudy entry={entry} />
      </main>
      <SiteFooter />
    </>
  );
}
