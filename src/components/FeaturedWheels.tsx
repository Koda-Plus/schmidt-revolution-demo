import { motion } from 'motion/react';
import { wheels } from '@/data/wheels';
import { eur } from '@/lib/cn';

export default function FeaturedWheels() {
  const items = wheels.slice(0, 4);
  return (
    <section className="relative py-24 lg:py-32 bg-schmidt-carbon">
      <div className="container-x">
        <div className="flex items-end justify-between mb-12 lg:mb-16 gap-8">
          <div>
            <div className="eyebrow mb-5 flex items-center gap-3">
              <span className="h-px w-8 bg-schmidt-yellow" />
              02 - Saison 2026
            </div>
            <h2 className="h-display text-[40px] sm:text-[56px] leading-[0.95] text-white">
              Die <span className="italic font-light text-schmidt-yellow">aktuellen</span> Highlights.
            </h2>
          </div>
          <a href="/felgen" className="hidden md:inline-flex btn-ghost text-sm">
            Alle 23 Modelle ansehen
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12h14M13 5l7 7-7 7"/></svg>
          </a>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {items.map((w, i) => (
            <motion.a
              href={`/felgen/${w.slug}`}
              key={w.slug}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ duration: 0.6, delay: i * 0.08 }}
              className="group relative bg-gradient-to-b from-schmidt-ink to-schmidt-carbon rounded-2xl border border-white/[0.06] overflow-hidden hover:border-schmidt-yellow/40 transition-colors"
            >
              {w.tag && (
                <span className="absolute top-3 left-3 z-10 bg-schmidt-yellow text-schmidt-ink text-[10px] font-medium tracking-wide uppercase px-2 py-1 rounded-full">
                  {w.tag}
                </span>
              )}
              <div className="aspect-[4/5] relative overflow-hidden bg-schmidt-carbon">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,212,0,0.08),transparent_50%)]" />
                <img
                  src={w.image}
                  alt={w.alt}
                  className="absolute inset-0 w-full h-full object-contain p-4 lg:p-6 transition-transform duration-700 group-hover:scale-105"
                  style={{
                    WebkitMaskImage: 'radial-gradient(circle at 50% 50%, black 0%, black 28%, rgba(0,0,0,0.7) 40%, rgba(0,0,0,0.25) 52%, transparent 62%)',
                    maskImage: 'radial-gradient(circle at 50% 50%, black 0%, black 28%, rgba(0,0,0,0.7) 40%, rgba(0,0,0,0.25) 52%, transparent 62%)',
                    filter: 'brightness(1.08) contrast(1.1)',
                  }}
                />
              </div>
              <div className="p-5 border-t border-white/[0.06]">
                <div className="flex items-center justify-between mb-1">
                  <div className="font-display text-lg text-white">{w.name}</div>
                  <div className="text-[10px] uppercase tracking-widest text-schmidt-silver">{w.construction}</div>
                </div>
                <div className="text-xs text-schmidt-silver">{w.line} · {w.sizes.join(' / ')}</div>
                <div className="mt-4 flex items-center justify-between">
                  <div className="flex -space-x-1">
                    {w.finishes.slice(0,3).map((f) => (
                      <span key={f.name} className="w-4 h-4 rounded-full border border-schmidt-ink" style={{ background: f.swatch }} />
                    ))}
                  </div>
                  <div className="text-sm">
                    <span className="text-schmidt-silver text-[10px] uppercase tracking-widest mr-1">ab</span>
                    <span className="text-white font-medium">{eur(w.priceFrom)}</span>
                  </div>
                </div>
              </div>
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  );
}
