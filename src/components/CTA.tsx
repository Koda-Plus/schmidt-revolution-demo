import { motion } from 'motion/react';

export default function CTA() {
  return (
    <section className="relative py-24 lg:py-32 overflow-hidden">
      <div className="container-x">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="relative rounded-[2rem] bg-schmidt-carbon border border-white/[0.08] overflow-hidden grid lg:grid-cols-[1.2fr_1fr]"
        >
          {/* Left — copy on dark with yellow energy */}
          <div className="relative p-10 md:p-14 lg:p-16 overflow-hidden">
            <div className="absolute inset-0 grid-bg opacity-30" />
            <div className="absolute -left-24 -bottom-24 w-[420px] h-[420px] rounded-full bg-schmidt-yellow/[0.12] blur-[120px]" />
            <div className="relative max-w-xl">
              <div className="eyebrow mb-6 flex items-center gap-3">
                <span className="h-px w-8 bg-schmidt-yellow" />
                Bereit für Custom?
              </div>
              <h2 className="h-display text-[44px] sm:text-[60px] lg:text-[76px] leading-[0.9] text-white">
                Dein Auto.<br />
                <span className="italic font-light text-schmidt-yellow">Deine</span> Felge.
              </h2>
              <p className="mt-6 text-base lg:text-lg text-schmidt-silver max-w-md leading-relaxed">
                Konfiguriere in drei Klicks: Fahrzeug wählen, Bauart entscheiden,
                Finish anpassen. Wir kümmern uns um Lastindex, ET und Gutachten.
              </p>
              <div className="mt-10 flex flex-wrap items-center gap-3">
                <a href="/konfigurator" className="btn-yellow text-sm">
                  Konfigurator öffnen
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12h14M13 5l7 7-7 7"/></svg>
                </a>
                <a href="/haendler" className="btn-ghost text-sm">Händler in deiner Nähe</a>
              </div>
            </div>
          </div>

          {/* Right — studio plate wheel, full-bleed */}
          <div className="studio-plate relative min-h-[280px] lg:min-h-0 overflow-hidden">
            <img
              src="/scraped/wheel-twentyone.jpg"
              alt="Schmidt Revolution TwentyOne"
              className="studio-img absolute inset-0 w-full h-full object-contain p-10 lg:p-14"
            />
            <div className="absolute top-5 right-5 inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] uppercase tracking-widest font-medium bg-schmidt-ink text-white">
              ab € 1.190 · in 21 Tagen
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
