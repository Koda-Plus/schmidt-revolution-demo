import { motion } from 'motion/react';
import { subBrands } from '@/data/shop';

export default function SubBrands() {
  return (
    <section className="relative py-24 lg:py-32 border-y border-white/[0.06] bg-schmidt-carbon overflow-hidden">
      <div className="absolute inset-0 grid-bg opacity-30" />
      <div className="container-x relative">
        <div className="grid lg:grid-cols-[1fr_1.6fr] gap-12 lg:gap-20 mb-14 items-end">
          <div>
            <div className="eyebrow mb-5 flex items-center gap-3">
              <span className="h-px w-8 bg-schmidt-yellow" />
              Die Familie
            </div>
            <h2 className="h-display text-[44px] sm:text-[60px] lg:text-[72px] leading-[0.95] text-white">
              Vier Linien. <br/>
              <span className="italic font-light text-schmidt-yellow">Eine</span> Familie.
            </h2>
          </div>
          <p className="text-schmidt-silver text-base leading-relaxed max-w-md">
            Schmidt Revolution baut Felgen fuer jeden Anspruch - vom Daily Driver bis zum Rennstrecken-Boliden, vom Klassiker bis zum 525 PS Defender. Vier Sub-Linien, eine Manufaktur in Bad Segeberg.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {subBrands.map((b, i) => (
            <motion.div
              key={b.id}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ duration: 0.6, delay: i * 0.08 }}
              className="group relative rounded-2xl bg-schmidt-ink border border-white/[0.06] overflow-hidden hover:border-white/20 transition-colors"
            >
              <div className="aspect-square relative overflow-hidden bg-schmidt-ink">
                <div
                  className="absolute inset-0 opacity-30 group-hover:opacity-50 transition-opacity duration-700"
                  style={{ background: `radial-gradient(circle at 50% 60%, ${b.accent}, transparent 65%)` }}
                />
                <img
                  src={b.image}
                  alt={b.name}
                  className="absolute inset-0 w-full h-full object-contain p-8 transition-transform duration-700 group-hover:scale-105"
                  style={{
                    WebkitMaskImage: 'radial-gradient(circle at 50% 50%, black 0%, black 28%, rgba(0,0,0,0.7) 40%, rgba(0,0,0,0.25) 52%, transparent 62%)',
                    maskImage: 'radial-gradient(circle at 50% 50%, black 0%, black 28%, rgba(0,0,0,0.7) 40%, rgba(0,0,0,0.25) 52%, transparent 62%)',
                    filter: 'brightness(1.08) contrast(1.1)',
                  }}
                />
                {/* Triangle brand mark */}
                <div className="absolute top-4 left-4 flex items-center gap-2">
                  <span
                    className="block w-0 h-0"
                    style={{
                      borderLeft: '14px solid transparent',
                      borderBottom: `22px solid ${b.accent}`,
                    }}
                  />
                  <span className="font-display text-[10px] uppercase tracking-[0.18em] text-white">Schmidt</span>
                </div>
              </div>
              <div className="p-5 border-t border-white/[0.06]">
                <div className="font-display text-xl text-white mb-1" style={{ color: b.accent }}>
                  {b.name.replace('Schmidt ', '')}
                </div>
                <p className="text-xs text-schmidt-silver leading-relaxed mb-4 line-clamp-3">{b.description}</p>
                <a href="/shop?category=felgen" className="inline-flex items-center gap-1.5 text-[11px] text-white hover:text-schmidt-yellow transition-colors">
                  Linie entdecken
                  <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12h14M13 5l7 7-7 7"/></svg>
                </a>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
