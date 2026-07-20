import { Reveal } from './reveal';
import { Sparkles, Palette, Share2, Box, Zap, Megaphone } from "lucide-react";

const SERVICES = [
  { name: 'Strategy & Branding', icon: Sparkles },
  { name: 'Creative Direction & Production', icon: Palette },
  { name: 'Social & Digital', icon: Share2 },
  { name: 'Packaging & Merch', icon: Box },
  { name: 'Brand Activations', icon: Zap },
  { name: 'UGC Amplification', icon: Megaphone },
];

export function WhatWeBake() {
  return (
    <section id="bake" className="bg-navy py-32 text-cream md:py-48 relative overflow-hidden">
      
      {/* Background Visual Texture */}
      <div className="absolute inset-0 opacity-[0.02] pointer-events-none bg-[radial-gradient(#ffffff_1px,transparent_1px)] [background-size:32px_32px]" />

      <div className="mx-auto max-w-6xl px-6">
        <Reveal duration={800}>
          <h2 className="font-display font-bold text-3xl md:text-[40px] md:leading-[44px] text-cream mb-16">
            What We Bake
          </h2>
        </Reveal>

        <div className="grid gap-6 grid-cols-1 md:grid-cols-3">
          {SERVICES.map((service, i) => {
            const Icon = service.icon;
            // Bento spans logic:
            // i=0: col-span-2, i=1: col-span-1
            // i=2: col-span-1, i=3: col-span-2
            // i=4: col-span-2, i=5: col-span-1
            const spanClass = i === 0 || i === 3 || i === 4 
              ? 'md:col-span-2' 
              : 'md:col-span-1';

            return (
              <Reveal key={service.name} delay={i * 80} duration={600} className={`h-full ${spanClass}`}>
                <div className="group h-full flex flex-col justify-between rounded-2xl border border-white/10 bg-white/[0.02] p-6 md:p-8 min-h-[160px] md:min-h-[200px] shadow-[inset_0_1px_1px_rgba(255,255,255,0.05)] backdrop-blur-md">
                  <div className="flex items-start justify-between">
                    <span className="font-display text-[12px] leading-[14px] font-semibold tracking-widest text-cream/40 uppercase">
                      [{String(i + 1).padStart(2, '0')}]
                    </span>
                    <Icon className="size-5 text-blob" />
                  </div>
                  <h3 className="font-display text-[20px] leading-[24px] md:text-[26px] md:leading-[30px] font-medium text-cream tracking-tight mt-8 text-pretty">
                    {service.name}
                  </h3>
                </div>
              </Reveal>
            )
          })}
        </div>
      </div>
    </section>
  );
}
