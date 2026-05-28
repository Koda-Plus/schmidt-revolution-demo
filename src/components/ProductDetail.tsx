import { useState } from 'react';
import { type Wheel } from '@/data/wheels';
import { eur } from '@/lib/cn';

export default function ProductDetail({ wheel }: { wheel: Wheel }) {
  const [size, setSize] = useState(wheel.sizes[Math.floor(wheel.sizes.length/2)]);
  const [widthV, setWidth] = useState(wheel.widths[Math.floor(wheel.widths.length/2)]);
  const [finish, setFinish] = useState(wheel.finishes[0]);
  const [qty, setQty] = useState(4);

  const price = wheel.priceFrom + wheel.sizes.indexOf(size)*180 + wheel.widths.indexOf(widthV)*90;

  const addToCart = () => {
    const c = Number(localStorage.getItem('schmidt_cart_count') ?? 0) + qty;
    localStorage.setItem('schmidt_cart_count', String(c));
    const cc = document.getElementById('cart-count');
    if (cc) cc.textContent = String(c);
    alert(`${qty}× ${wheel.name} hinzugefügt - vielen Dank!`);
  };

  return (
    <div className="container-x pt-8 pb-32">
      {/* Breadcrumb */}
      <div className="text-xs text-schmidt-silver mb-6 flex items-center gap-2">
        <a href="/" className="hover:text-white">Start</a> /
        <a href="/shop?category=felgen" className="hover:text-white">Felgen</a> /
        <span className="text-white">{wheel.name}</span>
      </div>

      <div className="grid lg:grid-cols-[1.15fr_1fr] gap-10 lg:gap-16 items-start lg:items-center lg:min-h-[calc(100vh-160px)]">
        {/* Image */}
        <div className="studio-plate relative aspect-square lg:max-h-[calc(100vh-160px)] rounded-3xl overflow-hidden border border-white/[0.06]">
          <img
            src={wheel.image}
            alt={wheel.alt}
            className="studio-img absolute inset-0 w-full h-full object-contain p-12"
          />

          {wheel.tag && (
            <div className="absolute top-5 left-5 bg-schmidt-yellow text-schmidt-ink text-[10px] font-medium tracking-wide uppercase px-2.5 py-1 rounded-full">
              {wheel.tag}
            </div>
          )}
          <div className="absolute bottom-5 left-5 right-5 flex items-center justify-between gap-3">
            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] uppercase tracking-widest font-medium bg-schmidt-ink/90 text-schmidt-silver backdrop-blur">
              Premium Detail View
            </span>
            <span className="inline-flex items-center gap-2 px-2.5 py-1 rounded-full text-[10px] font-medium bg-schmidt-ink/90 text-white backdrop-blur">
              <span className="w-3 h-3 rounded-full border border-white/20" style={{ background: finish.swatch }} />
              {finish.name}
            </span>
          </div>
        </div>

        {/* Info */}
        <div>
          <div className="eyebrow mb-3">{wheel.line} · {wheel.construction}</div>
          <h1 className="h-display text-[44px] sm:text-[56px] leading-[0.95] text-white mb-4">{wheel.name}</h1>
          <p className="text-schmidt-silver text-base leading-relaxed mb-8">{wheel.description}</p>

          <div className="grid grid-cols-3 gap-3 mb-8">
            {wheel.highlights.map(h => (
              <div key={h} className="p-3 rounded-xl border border-white/[0.06] bg-schmidt-carbon">
                <div className="w-6 h-6 rounded-full bg-schmidt-yellow/15 grid place-items-center mb-2">
                  <svg width="10" height="10" viewBox="0 0 12 12" fill="none" stroke="#FFD400" strokeWidth="2"><path d="M2 6l3 3 5-7"/></svg>
                </div>
                <div className="text-[11px] text-white leading-snug">{h}</div>
              </div>
            ))}
          </div>

          {/* Selectors */}
          <div className="space-y-6 mb-8">
            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="text-xs text-white">Zoll</label>
                <span className="text-[10px] text-schmidt-silver">{size}</span>
              </div>
              <div className="grid grid-cols-5 gap-1.5">
                {wheel.sizes.map(s => (
                  <button
                    key={s}
                    onClick={() => setSize(s)}
                    className={`py-2.5 rounded-lg border text-xs transition-all ${
                      size === s ? 'bg-schmidt-yellow text-schmidt-ink border-schmidt-yellow' : 'border-white/10 text-white hover:border-white/30'
                    }`}
                  >{s}</button>
                ))}
              </div>
            </div>
            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="text-xs text-white">Breite</label>
                <span className="text-[10px] text-schmidt-silver">{widthV}</span>
              </div>
              <div className="grid grid-cols-5 gap-1.5">
                {wheel.widths.map(w => (
                  <button
                    key={w}
                    onClick={() => setWidth(w)}
                    className={`py-2.5 rounded-lg border text-xs transition-all ${
                      widthV === w ? 'bg-schmidt-yellow text-schmidt-ink border-schmidt-yellow' : 'border-white/10 text-white hover:border-white/30'
                    }`}
                  >{w}</button>
                ))}
              </div>
            </div>
            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="text-xs text-white">Finish</label>
                <span className="text-[10px] text-schmidt-silver">{finish.name}</span>
              </div>
              <div className="grid grid-cols-4 gap-2">
                {wheel.finishes.map(f => (
                  <button
                    key={f.name}
                    onClick={() => setFinish(f)}
                    className={`relative p-1 rounded-lg border transition-all ${
                      finish.name === f.name ? 'border-schmidt-yellow' : 'border-white/10 hover:border-white/30'
                    }`}
                  >
                    <div className="w-full aspect-square rounded-md" style={{ background: f.swatch }} />
                    <div className="text-[9px] text-white mt-1 px-1 truncate">{f.name}</div>
                  </button>
                ))}
              </div>
            </div>
            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="text-xs text-white">Stückzahl</label>
                <span className="text-[10px] text-schmidt-silver">{qty} Räder</span>
              </div>
              <div className="grid grid-cols-3 gap-1.5">
                {[1, 2, 4].map(n => (
                  <button
                    key={n}
                    onClick={() => setQty(n)}
                    className={`py-2.5 rounded-lg border text-xs transition-all ${
                      qty === n ? 'bg-white/10 border-schmidt-yellow text-white' : 'border-white/10 text-schmidt-silver hover:text-white'
                    }`}
                  >{n}×</button>
                ))}
              </div>
            </div>
          </div>

          {/* Price + CTA */}
          <div className="sticky bottom-4 rounded-2xl bg-schmidt-carbon border border-white/[0.08] p-5">
            <div className="flex items-baseline justify-between mb-4">
              <div>
                <div className="text-[10px] uppercase tracking-widest text-schmidt-silver">Gesamtpreis</div>
                <div className="font-display text-3xl text-white">{eur(price*qty)}</div>
                <div className="text-[10px] text-schmidt-silver">{eur(price)} pro Rad · in 21 Tagen geliefert</div>
              </div>
              <div className="hidden sm:flex items-center gap-1 text-xs">
                <span className="text-schmidt-yellow">●</span>
                <span className="text-schmidt-silver">verfügbar</span>
              </div>
            </div>
            <div className="flex gap-2">
              <button onClick={addToCart} className="flex-1 btn-yellow justify-center py-3">In den Warenkorb</button>
              <a href="/konfigurator" className="btn-ghost py-3 px-4 text-xs">Konfigurator</a>
            </div>
          </div>
        </div>
      </div>

      {/* Technical specs */}
      <div className="mt-24">
        <div className="eyebrow mb-6">Technische Daten</div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-3">
          {[
            { l: 'Bauart', v: wheel.construction },
            { l: 'Linie', v: wheel.line },
            { l: 'Sizes', v: wheel.sizes.join(' / ') },
            { l: 'Breiten', v: wheel.widths.join(' / ') },
            { l: 'Last (pro Rad)', v: 'bis 1.200 kg' },
            { l: 'Material', v: 'AlSi7 (T6)' },
            { l: 'Fertigung', v: 'Bad Segeberg, DE' },
            { l: 'Gutachten', v: 'ABE / TÜV' },
          ].map(r => (
            <div key={r.l} className="p-4 rounded-xl border border-white/[0.06] bg-schmidt-carbon">
              <div className="text-[10px] uppercase tracking-widest text-schmidt-silver mb-1">{r.l}</div>
              <div className="text-sm text-white">{r.v}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
