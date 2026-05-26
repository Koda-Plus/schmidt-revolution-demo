import { motion } from 'motion/react';

export default function Hero() {
  return (
    <section className="relative h-[calc(100vh-72px)] min-h-[640px] overflow-hidden bg-schmidt-ink">
      {/* Atmospheric backdrop */}
      <div className="absolute inset-0 grid-bg opacity-60" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_rgba(255,212,0,0.08),_transparent_60%)]" />
      <div className="absolute -top-40 -right-40 w-[600px] h-[600px] rounded-full bg-schmidt-yellow/10 blur-[120px]" />
      <div className="absolute -bottom-40 -left-40 w-[500px] h-[500px] rounded-full bg-blue-500/5 blur-[120px]" />

      {/* Top status bar */}
      <motion.div
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.1 }}
        className="absolute top-5 left-0 right-0 z-20"
      >
        <div className="container-x flex items-center justify-between text-[11px] uppercase tracking-[0.22em] text-schmidt-silver">
          <span className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-schmidt-yellow animate-pulse" />
            Manufaktur live · Bad Segeberg 53°56′N
          </span>
          <span className="hidden md:block">Auftragsbezogen · TUEV-Gutachten · 21 Tage Lieferzeit</span>
        </div>
      </motion.div>

      <div className="container-x relative z-10 h-full flex items-center pt-12 pb-10">
        <div className="grid lg:grid-cols-[1.05fr_1fr] gap-8 lg:gap-10 items-center w-full">
          {/* Left - copy */}
          <div className="relative">
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7 }}
              className="eyebrow mb-5 flex items-center gap-3"
            >
              <span className="h-px w-8 bg-schmidt-yellow" />
              Schmidt Revolution · Saison 2026
            </motion.div>

            <h1 className="h-display text-[44px] leading-[0.92] sm:text-[60px] lg:text-[76px] xl:text-[92px] tracking-tighter2">
              <motion.span
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.05 }}
                className="block text-white"
              >Felgen,</motion.span>
              <motion.span
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.18 }}
                className="block"
              >
                die <span className="italic font-light text-schmidt-yellow">jedes</span>
              </motion.span>
              <motion.span
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.3 }}
                className="block text-white"
              >Auto verändern.</motion.span>
            </h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.45 }}
              className="mt-5 text-sm sm:text-base text-schmidt-silver max-w-[480px] leading-relaxed"
            >
              1-teilig. 2- und 3-teilig. Geschmiedet. Über 10.000 Fahrzeug-Anwendungen,
              jede Felge auftragsbezogen in <span className="text-white">Bad Segeberg</span> gefertigt.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.6 }}
              className="mt-7 flex flex-wrap items-center gap-3"
            >
              <a href="/konfigurator" className="btn-yellow text-sm">
                Konfigurator starten
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12h14M13 5l7 7-7 7"/></svg>
              </a>
              <a href="/felgen" className="btn-ghost text-sm">Alle Felgen entdecken</a>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1.2, delay: 0.9 }}
              className="mt-10 flex items-center gap-7 lg:gap-9"
            >
              {[
                { k: '10.000+', v: 'Fahrzeug-Apps' },
                { k: '1.200 kg', v: 'Last pro Rad' },
                { k: '-18%', v: 'Gewicht (Forged)' },
                { k: 'Ø 31', v: 'Jahre Manufaktur' },
              ].map((s) => (
                <div key={s.k}>
                  <div className="font-display text-xl lg:text-2xl text-white">{s.k}</div>
                  <div className="text-[10px] uppercase tracking-widest text-schmidt-silver mt-1">{s.v}</div>
                </div>
              ))}
            </motion.div>
          </div>

          {/* Right - hero wheel (fully visible, no mask) */}
          <div className="relative aspect-square mx-auto w-full max-w-[480px] lg:max-w-[560px]">
            <div className="absolute inset-[-8%] rounded-full bg-[radial-gradient(circle_at_center,rgba(255,212,0,0.14),transparent_60%)]" />

            <motion.img
              initial={{ opacity: 0, scale: 0.92 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1.2, ease: [0.2, 0.7, 0.2, 1] }}
              src="/scraped/wheel-kyan.webp"
              alt="Schmidt KYAN Premium Alufelge"
              className="relative z-10 w-full h-full object-contain drop-shadow-[0_40px_80px_rgba(255,212,0,0.18)] wheel-mask"
            />

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 1.0 }}
              className="absolute top-6 -left-2 sm:left-0 bg-schmidt-carbon/90 backdrop-blur border border-white/10 rounded-2xl px-4 py-3"
            >
              <div className="text-[10px] uppercase tracking-widest text-schmidt-silver">Modell</div>
              <div className="font-display text-white text-base">KYAN</div>
              <div className="text-[11px] text-schmidt-yellow mt-0.5">Modern-Line · 1-teilig</div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 1.15 }}
              className="absolute bottom-10 -right-2 sm:right-0 bg-schmidt-carbon/90 backdrop-blur border border-white/10 rounded-2xl px-4 py-3"
            >
              <div className="text-[10px] uppercase tracking-widest text-schmidt-silver">Finish</div>
              <div className="flex items-center gap-2 mt-1">
                <span className="w-4 h-4 rounded-full" style={{ background: 'linear-gradient(135deg,#34363b,#0e0f12)' }} />
                <span className="text-white text-xs">Hyperblack</span>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 1.3 }}
              className="absolute -bottom-3 left-1/2 -translate-x-1/2 bg-schmidt-yellow text-schmidt-ink rounded-full px-5 py-2 text-xs font-medium tracking-wide shadow-2xl shadow-schmidt-yellow/30 whitespace-nowrap"
            >
              ab € 1.190 · gefertigt in 21 Tagen
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
