const items = ['Audi', 'BMW', 'Mercedes-AMG', 'Porsche', 'Volkswagen', 'Tesla', 'Volvo', 'Rivian', 'Ford', 'Lamborghini', 'Mini', 'Skoda', 'Cupra'];
export default function Marquee() {
  return (
    <section className="border-y border-white/[0.06] py-8 overflow-hidden bg-schmidt-ink">
      <div className="container-x mb-6 flex items-center justify-between text-[11px] uppercase tracking-[0.22em] text-schmidt-silver">
        <span>Über 10.000 Fahrzeug-Anwendungen</span>
        <span className="hidden md:block">Live aktualisiert · 2026-05-26</span>
      </div>
      <div className="relative">
        <div className="flex gap-12 lg:gap-16 animate-marquee whitespace-nowrap">
          {[...items, ...items].map((b, i) => (
            <div key={i} className="font-display text-3xl lg:text-5xl text-white/30 hover:text-schmidt-yellow transition-colors">
              {b}
            </div>
          ))}
        </div>
        <div className="absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-schmidt-ink to-transparent pointer-events-none" />
        <div className="absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-schmidt-ink to-transparent pointer-events-none" />
      </div>
    </section>
  );
}
