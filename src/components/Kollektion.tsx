import { motion } from 'motion/react';
import { wheels } from '@/data/wheels';
import { subBrands } from '@/data/shop';
import { eur } from '@/lib/cn';

const bySlug = (slug: string) => wheels.find((w) => w.slug === slug)!;

const feature = bySlug('twentyone');
const grid = [bySlug('eckstein-23'), bySlug('cc-zerolip'), bySlug('fs-line'), bySlug('17hdf')];

const fadeUp = {
  initial: { opacity: 0, y: 26 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-80px' },
};

export default function Kollektion() {
  return (
    <section className="relative py-24 lg:py-32 bg-schmidt-ink overflow-hidden">
      <div className="absolute inset-0 grid-bg opacity-[0.18]" />
      <div className="absolute -top-32 right-0 w-[520px] h-[520px] rounded-full bg-schmidt-yellow/[0.07] blur-[140px]" />

      <div className="container-x relative">
        {/* Header */}
        <div className="grid lg:grid-cols-[1fr_auto] gap-8 items-end mb-12 lg:mb-16">
          <div>
            <div className="eyebrow mb-5 flex items-center gap-3">
              <span className="h-px w-8 bg-schmidt-yellow" />
              Die Kollektion · Saison 2026
            </div>
            <h2 className="h-display text-[40px] sm:text-[58px] lg:text-[72px] leading-[0.95] text-white max-w-3xl">
              Vier Linien. <span className="italic font-light text-schmidt-yellow">Eine</span> Manufaktur.
            </h2>
            <p className="text-schmidt-silver text-base leading-relaxed max-w-xl mt-5">
              Vom Daily Driver bis zum Rennstrecken-Boliden, vom Klassiker bis zum 525-PS-Defender —
              jede Felge auftragsbezogen in Bad Segeberg gefertigt.
            </p>
          </div>
          <a href="/shop?category=felgen" className="hidden lg:inline-flex btn-ghost text-sm whitespace-nowrap">
            Alle 23 Modelle
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12h14M13 5l7 7-7 7"/></svg>
          </a>
        </div>

        {/* Bento: 1 feature + 4 supporting, asymmetric */}
        <div className="grid grid-cols-1 lg:grid-cols-6 gap-4 lg:gap-5">
          {/* Feature — wide, split plate + info */}
          <motion.a
            {...fadeUp}
            transition={{ duration: 0.6 }}
            href={`/felgen/${feature.slug}`}
            className="group lg:col-span-4 rounded-3xl overflow-hidden border border-white/[0.07] bg-schmidt-carbon hover:border-schmidt-yellow/30 transition-colors grid sm:grid-cols-2"
          >
            <div className="studio-plate relative aspect-square sm:aspect-auto sm:min-h-[420px] overflow-hidden">
              {feature.tag && (
                <span className="absolute top-4 left-4 z-10 bg-schmidt-ink text-white text-[10px] font-medium tracking-wide uppercase px-2.5 py-1 rounded-full">
                  {feature.tag}
                </span>
              )}
              <img
                src={feature.image}
                alt={feature.alt}
                className="studio-img absolute inset-0 w-full h-full object-contain p-10 lg:p-14 transition-transform duration-700 group-hover:scale-[1.04]"
              />
            </div>
            <div className="p-7 lg:p-9 flex flex-col justify-between">
              <div>
                <div className="eyebrow mb-3 text-schmidt-yellow">Highlight der Saison</div>
                <div className="font-display text-3xl lg:text-4xl text-white mb-3">{feature.name}</div>
                <p className="text-sm text-schmidt-silver leading-relaxed mb-6">{feature.description}</p>
                <div className="flex flex-wrap gap-2">
                  {feature.highlights.map((h) => (
                    <span key={h} className="chip border-white/10 text-schmidt-silver">{h}</span>
                  ))}
                </div>
              </div>
              <div className="mt-8 flex items-end justify-between">
                <div>
                  <div className="text-[10px] uppercase tracking-widest text-schmidt-silver">{feature.line} · {feature.construction}</div>
                  <div className="font-display text-2xl text-white mt-1">
                    <span className="text-[11px] uppercase tracking-widest text-schmidt-silver mr-1.5">ab</span>{eur(feature.priceFrom)}
                  </div>
                </div>
                <span className="inline-flex items-center gap-1.5 text-sm text-white group-hover:text-schmidt-yellow transition-colors">
                  Entdecken
                  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12h14M13 5l7 7-7 7"/></svg>
                </span>
              </div>
            </div>
          </motion.a>

          {/* Tall supporting tile — first of grid */}
          <motion.a
            {...fadeUp}
            transition={{ duration: 0.6, delay: 0.08 }}
            href={`/felgen/${grid[0].slug}`}
            className="group lg:col-span-2 rounded-3xl overflow-hidden border border-white/[0.07] bg-schmidt-carbon hover:border-schmidt-yellow/30 transition-colors flex flex-col"
          >
            <div className="studio-plate relative flex-1 min-h-[200px] overflow-hidden">
              {grid[0].tag && (
                <span className="absolute top-4 left-4 z-10 bg-schmidt-ink text-white text-[10px] font-medium tracking-wide uppercase px-2.5 py-1 rounded-full">
                  {grid[0].tag}
                </span>
              )}
              <img
                src={grid[0].image}
                alt={grid[0].alt}
                className="studio-img absolute inset-0 w-full h-full object-contain p-10 transition-transform duration-700 group-hover:scale-[1.04]"
              />
            </div>
            <div className="p-6 border-t border-white/[0.06] flex items-center justify-between">
              <div>
                <div className="font-display text-xl text-white">{grid[0].name}</div>
                <div className="text-xs text-schmidt-silver mt-0.5">{grid[0].line}</div>
              </div>
              <div className="text-sm text-white"><span className="text-[10px] uppercase tracking-widest text-schmidt-silver mr-1">ab</span>{eur(grid[0].priceFrom)}</div>
            </div>
          </motion.a>

          {/* Bottom row — 3 compact tiles */}
          {grid.slice(1).map((w, i) => (
            <motion.a
              key={w.slug}
              {...fadeUp}
              transition={{ duration: 0.6, delay: 0.16 + i * 0.08 }}
              href={`/felgen/${w.slug}`}
              className="group lg:col-span-2 rounded-3xl overflow-hidden border border-white/[0.07] bg-schmidt-carbon hover:border-schmidt-yellow/30 transition-colors"
            >
              <div className="studio-plate relative aspect-[16/10] overflow-hidden">
                {w.tag && (
                  <span className="absolute top-4 left-4 z-10 bg-schmidt-ink text-white text-[10px] font-medium tracking-wide uppercase px-2.5 py-1 rounded-full">
                    {w.tag}
                  </span>
                )}
                <img
                  src={w.image}
                  alt={w.alt}
                  className="studio-img absolute inset-0 w-full h-full object-contain p-8 transition-transform duration-700 group-hover:scale-[1.04]"
                />
              </div>
              <div className="p-6 border-t border-white/[0.06] flex items-center justify-between">
                <div>
                  <div className="font-display text-xl text-white">{w.name}</div>
                  <div className="text-xs text-schmidt-silver mt-0.5">{w.line} · {w.construction}</div>
                </div>
                <div className="text-sm text-white"><span className="text-[10px] uppercase tracking-widest text-schmidt-silver mr-1">ab</span>{eur(w.priceFrom)}</div>
              </div>
            </motion.a>
          ))}
        </div>

        {/* Family lines — compact strip (replaces the haloed SubBrands cards) */}
        <div className="mt-20 lg:mt-24 pt-12 border-t border-white/[0.07]">
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {subBrands.map((b, i) => (
              <motion.a
                key={b.id}
                {...fadeUp}
                transition={{ duration: 0.55, delay: i * 0.07 }}
                href="/shop?category=felgen"
                className="group relative rounded-2xl border border-white/[0.07] bg-schmidt-carbon p-5 hover:border-white/20 transition-colors flex items-center gap-4"
              >
                <div className="studio-plate relative w-20 h-20 shrink-0 rounded-xl overflow-hidden">
                  <img src={b.image} alt={b.name} className="studio-img absolute inset-0 w-full h-full object-contain p-2.5" />
                </div>
                <div className="min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="block w-2.5 h-2.5 rounded-sm" style={{ background: b.accent }} />
                    <span className="font-display text-base text-white truncate">{b.name.replace('Schmidt ', '')}</span>
                  </div>
                  <p className="text-[11px] text-schmidt-silver leading-relaxed line-clamp-2">{b.description}</p>
                </div>
              </motion.a>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
