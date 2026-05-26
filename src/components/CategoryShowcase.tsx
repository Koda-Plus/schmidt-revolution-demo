import { motion } from 'motion/react';
import { categories } from '@/data/wheels';

export default function CategoryShowcase() {
  return (
    <section className="relative py-24 lg:py-32">
      <div className="container-x">
        <div className="grid lg:grid-cols-[1fr_1.4fr] gap-12 lg:gap-20 mb-16 items-end">
          <div>
            <div className="eyebrow mb-5 flex items-center gap-3">
              <span className="h-px w-8 bg-schmidt-yellow" />
              01 - Kollektion
            </div>
            <h2 className="h-display text-[48px] sm:text-[64px] leading-[0.95] text-white">
              Fünf Bauarten. <br/>
              <span className="text-schmidt-yellow italic font-light">Eine</span> Manufaktur.
            </h2>
          </div>
          <p className="text-schmidt-silver text-base leading-relaxed max-w-md">
            Von monolithischer Eleganz bis zur radikalen 3-teiligen Schüssel - jede
            Schmidt-Felge wird mit dem gleichen Anspruch gefertigt. Auftragsbezogen.
            Auf dein Fahrzeug abgestimmt. In Deutschland.
          </p>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-5 gap-3 lg:gap-4">
          {categories.map((c, i) => (
            <motion.a
              key={c.slug}
              href={`/shop?category=felgen`}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-100px' }}
              transition={{ duration: 0.7, delay: i * 0.08, ease: [0.2,0.7,0.2,1] }}
              className="group relative aspect-[3/4] rounded-2xl overflow-hidden border border-white/[0.06] bg-gradient-to-b from-schmidt-carbon to-schmidt-ink"
            >
              <img
                src={c.image}
                alt={c.label}
                style={{ filter: 'invert(1) hue-rotate(180deg) brightness(0.85) contrast(1.1)', mixBlendMode: 'screen' }}
                className="absolute inset-0 w-full h-full object-contain p-10 lg:p-14 opacity-90 group-hover:opacity-100 group-hover:scale-105 transition-all duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-schmidt-ink via-transparent to-transparent pointer-events-none" />
              <div className="absolute inset-0 p-5 flex flex-col justify-between">
                <div className="flex items-center justify-between text-[10px] uppercase tracking-[0.22em] text-schmidt-silver">
                  <span>0{i+1}</span>
                  <span>{c.desc}</span>
                </div>
                <div>
                  <div className="font-display text-2xl lg:text-3xl text-white mb-2 leading-tight">{c.label}</div>
                  <div className="inline-flex items-center gap-1.5 text-xs text-schmidt-yellow opacity-0 group-hover:opacity-100 -translate-x-1 group-hover:translate-x-0 transition-all duration-500">
                    Entdecken
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12h14M13 5l7 7-7 7"/></svg>
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
