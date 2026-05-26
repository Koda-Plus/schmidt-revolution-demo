import { motion } from 'motion/react';

export default function CTA() {
  return (
    <section className="relative py-24 lg:py-36 overflow-hidden">
      <div className="container-x">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="relative rounded-3xl bg-schmidt-yellow text-schmidt-ink p-10 md:p-16 lg:p-20 overflow-hidden"
        >
          <div className="absolute -right-20 -top-20 w-[500px] h-[500px] rounded-full border-2 border-schmidt-ink/10" />
          <div className="absolute -right-32 -top-32 w-[600px] h-[600px] rounded-full border border-schmidt-ink/10" />
          <div className="absolute right-12 top-12 w-44 h-44 rounded-full border-2 border-schmidt-ink/15" />

          <div className="relative max-w-2xl">
            <div className="text-[11px] uppercase tracking-[0.22em] text-schmidt-ink/70 mb-6 flex items-center gap-3">
              <span className="h-px w-8 bg-schmidt-ink/50" />
              Bereit für Custom?
            </div>
            <h2 className="font-display text-[44px] sm:text-[64px] lg:text-[80px] leading-[0.92] tracking-tighter2">
              Dein Auto.<br/>
              <span className="italic font-light">Deine</span> Felge.
            </h2>
            <p className="mt-6 text-base lg:text-lg text-schmidt-ink/80 max-w-md leading-relaxed">
              Konfiguriere in drei Klicks: Fahrzeug wählen, Bauart entscheiden,
              Finish anpassen. Wir kümmern uns um Lastindex, ET und Gutachten.
            </p>
            <div className="mt-10 flex flex-wrap items-center gap-3">
              <a href="/konfigurator" className="inline-flex items-center gap-2 bg-schmidt-ink text-white rounded-full px-6 py-3.5 text-sm hover:bg-black transition-colors">
                Konfigurator öffnen
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12h14M13 5l7 7-7 7"/></svg>
              </a>
              <a href="/haendler" className="inline-flex items-center gap-2 border border-schmidt-ink/30 rounded-full px-6 py-3.5 text-sm hover:bg-schmidt-ink/5 transition-colors">
                Händler in deiner Nähe
              </a>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
