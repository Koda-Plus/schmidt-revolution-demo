import { motion } from 'motion/react';

const steps = [
  { n: '01', t: 'Konfiguration', d: 'Du wählst Fahrzeug, Bauart und Finish. Wir prüfen Lastindex, ET und Bauteilgutachten in Echtzeit.' },
  { n: '02', t: 'Manufaktur', d: 'Felge wird in Bad Segeberg auftragsbezogen gefertigt - Schüsselformung, CNC-Finish, Pulverlackierung.' },
  { n: '03', t: 'Prüfung', d: 'TÜV-Festigkeitsprüfung bei jeder einzelnen Felge. RDKS-tauglich, CARB-zertifiziert.' },
  { n: '04', t: 'Lieferung', d: 'Auslieferung in 21 Tagen - Premium-Verpackung, Montagezubehör inklusive.' },
];

export default function Manufaktur() {
  return (
    <section className="relative py-24 lg:py-36 overflow-hidden">
      <div className="absolute inset-0 grid-bg opacity-30" />
      <div className="absolute right-0 top-1/3 w-[400px] h-[400px] rounded-full bg-schmidt-yellow/5 blur-[120px]" />

      <div className="container-x relative">
        <div className="grid lg:grid-cols-[1.1fr_1fr] gap-16 lg:gap-24 items-center mb-20">
          <div>
            <div className="eyebrow mb-5 flex items-center gap-3">
              <span className="h-px w-8 bg-schmidt-yellow" />
              03 - Manufaktur
            </div>
            <h2 className="h-display text-[44px] sm:text-[64px] lg:text-[80px] leading-[0.92] text-white">
              Gefertigt in <br/>
              <span className="text-schmidt-yellow italic font-light">Bad Segeberg.</span>
            </h2>
            <p className="text-schmidt-silver text-base lg:text-lg leading-relaxed max-w-md mt-8">
              Keine Lagerware, keine Massenfertigung. Jede Schmidt-Felge entsteht
              ausschließlich für ein konkretes Fahrzeug - vermessen, gefertigt,
              geprüft und an deine Tür geliefert.
            </p>
          </div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
            className="relative aspect-square w-full max-w-[560px] mx-auto"
          >
            <div className="absolute inset-[-6%] rounded-full bg-[radial-gradient(circle_at_center,rgba(255,212,0,0.10),transparent_60%)]" />
            <div className="absolute inset-0 rounded-full border border-schmidt-yellow/15" />
            <div className="absolute inset-6 rounded-full border border-white/[0.05]" />
            <img
              src="/scraped/wheel-twentyone.jpg"
              alt="Schmidt Manufaktur - handgefertigte Felge"
              className="absolute inset-0 w-full h-full object-contain p-8 wheel-mask"
            />
            <div className="absolute inset-0 pointer-events-none rounded-full" style={{ boxShadow: 'inset 0 0 100px 30px #0A0A0B' }} />
            <div className="absolute bottom-3 left-1/2 -translate-x-1/2 chip bg-schmidt-ink/85 backdrop-blur">
              <span className="w-1.5 h-1.5 rounded-full bg-schmidt-yellow animate-pulse" /> Live · CNC #4
            </div>
          </motion.div>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-0 border-t border-white/[0.06]">
          {steps.map((s, i) => (
            <motion.div
              key={s.n}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.1 }}
              className="relative py-8 lg:py-10 px-1 lg:pr-8 border-b lg:border-b-0 lg:border-r border-white/[0.06] last:border-r-0"
            >
              <div className="absolute top-8 lg:top-10 left-0 w-8 h-px bg-schmidt-yellow" />
              <div className="font-mono text-xs text-schmidt-yellow ml-12 mb-3">{s.n}</div>
              <div className="font-display text-2xl text-white ml-12 mb-2">{s.t}</div>
              <p className="text-sm text-schmidt-silver leading-relaxed ml-12 pr-2">{s.d}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
