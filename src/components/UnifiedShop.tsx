import { useEffect, useMemo, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { wheels, type Wheel } from '@/data/wheels';
import { shopProducts, type ShopProduct } from '@/data/shop';
import { eur } from '@/lib/cn';

type UnifiedCategory = 'all' | 'felgen' | 'Nabenkappen' | 'Logos' | 'Streetwear' | 'Zubehoer';

const categoryPills: { id: UnifiedCategory; label: string; sub?: string }[] = [
  { id: 'all', label: 'Alles' },
  { id: 'felgen', label: 'Felgen', sub: 'Raeder' },
  { id: 'Nabenkappen', label: 'Nabenkappen', sub: 'Centercaps' },
  { id: 'Logos', label: 'Logos', sub: 'Linsen' },
  { id: 'Streetwear', label: 'Streetwear', sub: 'Apparel' },
  { id: 'Zubehoer', label: 'Zubehoer', sub: 'Pflege' },
];

const wheelConstructions = ['1-teilig', '2-/3-teilig', 'Forged'] as const;
const sizesAvailable = ['15"','16"','17"','18"','19"','20"','21"','22"','23"','24"'];
const lines = ['FS-Line','CC-Line','TH-Line','Modern-Line','Klassik','Forged'];

export default function UnifiedShop() {
  const [category, setCategory] = useState<UnifiedCategory>('all');
  const [construction, setConstruction] = useState<string | null>(null);
  const [size, setSize] = useState<string | null>(null);
  const [line, setLine] = useState<string | null>(null);
  const [sort, setSort] = useState<'new' | 'price-asc' | 'price-desc'>('new');

  // Initial load from URL params
  useEffect(() => {
    const u = new URL(window.location.href);
    const c = u.searchParams.get('category') as UnifiedCategory | null;
    if (c && categoryPills.find(p => p.id === c)) setCategory(c);
  }, []);

  // Sync state -> URL
  useEffect(() => {
    const u = new URL(window.location.href);
    if (category === 'all') u.searchParams.delete('category');
    else u.searchParams.set('category', category);
    window.history.replaceState({}, '', u.toString());
  }, [category]);

  const showWheelFilters = category === 'felgen' || category === 'all';

  const filteredWheels = useMemo(() => {
    if (category !== 'all' && category !== 'felgen') return [];
    let r: Wheel[] = wheels.slice();
    if (construction) r = r.filter(w => w.construction === construction);
    if (size) r = r.filter(w => w.sizes.includes(size));
    if (line) r = r.filter(w => w.line === line);
    if (sort === 'price-asc') r.sort((a,b) => a.priceFrom - b.priceFrom);
    if (sort === 'price-desc') r.sort((a,b) => b.priceFrom - a.priceFrom);
    return r;
  }, [category, construction, size, line, sort]);

  const filteredAccessories = useMemo(() => {
    if (category === 'felgen') return [];
    let r: ShopProduct[] = shopProducts.slice();
    if (category !== 'all') r = r.filter(p => p.category === category);
    if (sort === 'price-asc') r.sort((a,b) => a.price - b.price);
    if (sort === 'price-desc') r.sort((a,b) => b.price - a.price);
    return r;
  }, [category, sort]);

  const totalCount = filteredWheels.length + filteredAccessories.length;
  const reset = () => { setConstruction(null); setSize(null); setLine(null); };
  const activeFilters = [construction, size, line].filter(Boolean).length;

  const addToCart = (slug: string) => {
    const c = Number(localStorage.getItem('schmidt_cart_count') ?? 0) + 1;
    localStorage.setItem('schmidt_cart_count', String(c));
    const el = document.getElementById('cart-count');
    if (el) el.textContent = String(c);
  };

  return (
    <div className="container-x pt-8 pb-32">
      {/* Category Pills */}
      <div className="flex flex-wrap items-center gap-2 mb-8 border-b border-white/[0.06] pb-6">
        {categoryPills.map((p) => {
          const count = p.id === 'all' ? wheels.length + shopProducts.length
            : p.id === 'felgen' ? wheels.length
            : shopProducts.filter(x => x.category === p.id).length;
          const active = category === p.id;
          return (
            <button
              key={p.id}
              onClick={() => setCategory(p.id)}
              className={`group relative inline-flex items-center gap-2 px-4 py-2.5 rounded-full text-sm transition-all ${
                active
                  ? 'bg-schmidt-yellow text-schmidt-ink'
                  : 'border border-white/10 text-white hover:border-white/30'
              }`}
            >
              <span className="font-medium">{p.label}</span>
              <span className={`text-[10px] ${active ? 'text-schmidt-ink/60' : 'text-schmidt-silver'}`}>{count}</span>
            </button>
          );
        })}
      </div>

      <div className="grid lg:grid-cols-[260px_1fr] gap-8 lg:gap-12">
        {/* Sidebar filters - shown only when wheels visible */}
        <aside className={`lg:sticky lg:top-24 self-start space-y-6 ${showWheelFilters ? '' : 'hidden lg:block lg:opacity-40 lg:pointer-events-none'}`}>
          <div className="flex items-center justify-between mb-2">
            <div className="eyebrow">Felgen-Filter</div>
            {activeFilters > 0 && (
              <button onClick={reset} className="text-[11px] text-schmidt-yellow hover:underline">
                Zuruecksetzen ({activeFilters})
              </button>
            )}
          </div>

          <div className="pb-5 border-b border-white/[0.06]">
            <div className="text-[11px] uppercase tracking-[0.18em] text-white mb-3">Bauart</div>
            <div className="flex flex-wrap gap-1.5">
              {wheelConstructions.map(c => (
                <Pill key={c} active={construction === c} onClick={() => setConstruction(construction === c ? null : c)}>{c}</Pill>
              ))}
            </div>
          </div>

          <div className="pb-5 border-b border-white/[0.06]">
            <div className="text-[11px] uppercase tracking-[0.18em] text-white mb-3">Linie</div>
            <div className="flex flex-wrap gap-1.5">
              {lines.map(l => (
                <Pill key={l} active={line === l} onClick={() => setLine(line === l ? null : l)}>{l}</Pill>
              ))}
            </div>
          </div>

          <div className="pb-5 border-b border-white/[0.06]">
            <div className="text-[11px] uppercase tracking-[0.18em] text-white mb-3">Groesse</div>
            <div className="grid grid-cols-3 gap-1.5">
              {sizesAvailable.map(s => (
                <button
                  key={s}
                  onClick={() => setSize(size === s ? null : s)}
                  className={`text-xs py-2 rounded-lg border transition-all ${
                    size === s ? 'bg-schmidt-yellow text-schmidt-ink border-schmidt-yellow' : 'border-white/10 text-schmidt-silver hover:border-white/30 hover:text-white'
                  }`}
                >{s}</button>
              ))}
            </div>
          </div>

          <div className="p-4 rounded-2xl border border-schmidt-yellow/30 bg-schmidt-yellow/[0.05]">
            <div className="eyebrow text-schmidt-yellow mb-2">Nicht das richtige?</div>
            <div className="text-sm text-white mb-3">Konfiguriere dein Wunschrad live im Konfigurator.</div>
            <a href="/konfigurator" className="text-xs text-schmidt-yellow underline">Konfigurator oeffnen →</a>
          </div>
        </aside>

        {/* Results */}
        <div>
          <div className="flex items-center justify-between mb-6">
            <div className="text-sm text-schmidt-silver">
              <span className="text-white font-medium">{totalCount}</span> {totalCount === 1 ? 'Produkt' : 'Produkte'}
              {category !== 'all' && <span className="ml-2 text-schmidt-yellow">/ {categoryPills.find(p => p.id === category)?.label}</span>}
            </div>
            <select
              value={sort}
              onChange={e => setSort(e.target.value as any)}
              className="bg-schmidt-carbon border border-white/10 rounded-full text-xs text-white py-2 px-4 focus:outline-none focus:border-schmidt-yellow"
            >
              <option value="new">Neueste zuerst</option>
              <option value="price-asc">Preis aufsteigend</option>
              <option value="price-desc">Preis absteigend</option>
            </select>
          </div>

          {/* Wheels Section */}
          {filteredWheels.length > 0 && (
            <div className="mb-12">
              {category === 'all' && (
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <div className="eyebrow text-schmidt-yellow mb-1">Raeder</div>
                    <div className="font-display text-2xl text-white">Felgen ({filteredWheels.length})</div>
                  </div>
                  <button onClick={() => setCategory('felgen')} className="text-xs text-schmidt-silver hover:text-white">Nur Felgen →</button>
                </div>
              )}
              <div className="grid sm:grid-cols-2 xl:grid-cols-3 gap-4">
                <AnimatePresence mode="popLayout">
                  {filteredWheels.map((w, i) => (
                    <motion.a
                      key={w.slug}
                      layout
                      href={`/felgen/${w.slug}`}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, scale: 0.95 }}
                      transition={{ duration: 0.4, delay: i * 0.03 }}
                      className="group relative bg-gradient-to-b from-schmidt-ink to-schmidt-carbon rounded-2xl border border-white/[0.06] overflow-hidden hover:border-schmidt-yellow/40 transition-colors"
                    >
                      {w.tag && (
                        <span className="absolute top-3 left-3 z-10 bg-schmidt-yellow text-schmidt-ink text-[10px] font-medium tracking-wide uppercase px-2 py-1 rounded-full">{w.tag}</span>
                      )}
                      <div className="aspect-[4/5] relative overflow-hidden">
                        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,212,0,0.06),transparent_55%)]" />
                        <img
                          src={w.image}
                          alt={w.alt}
                          className="absolute inset-0 w-full h-full object-contain p-6 lg:p-8 transition-transform duration-700 group-hover:scale-105"
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
                            {w.finishes.slice(0,4).map((f) => (
                              <span key={f.name} className="w-4 h-4 rounded-full border border-schmidt-ink" style={{ background: f.swatch }} />
                            ))}
                            {w.finishes.length > 4 && <span className="text-[10px] text-schmidt-silver ml-2 self-center">+{w.finishes.length-4}</span>}
                          </div>
                          <div className="text-sm">
                            <span className="text-schmidt-silver text-[10px] uppercase tracking-widest mr-1">ab</span>
                            <span className="text-white font-medium">{eur(w.priceFrom)}</span>
                          </div>
                        </div>
                      </div>
                    </motion.a>
                  ))}
                </AnimatePresence>
              </div>
            </div>
          )}

          {/* Accessories Section */}
          {filteredAccessories.length > 0 && (
            <div>
              {category === 'all' && (
                <div className="flex items-center justify-between mb-4 mt-12 pt-8 border-t border-white/[0.06]">
                  <div>
                    <div className="eyebrow text-schmidt-yellow mb-1">Zubehoer</div>
                    <div className="font-display text-2xl text-white">Original-Zubehoer ({filteredAccessories.length})</div>
                  </div>
                </div>
              )}
              <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                <AnimatePresence mode="popLayout">
                  {filteredAccessories.map((p, i) => (
                    <motion.div
                      key={p.slug}
                      layout
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, scale: 0.95 }}
                      transition={{ duration: 0.4, delay: i * 0.03 }}
                      className="group relative bg-schmidt-carbon rounded-2xl border border-white/[0.06] overflow-hidden hover:border-schmidt-yellow/40 transition-colors"
                    >
                      {p.tag && (
                        <span className="absolute top-3 left-3 z-10 bg-schmidt-yellow text-schmidt-ink text-[10px] font-medium uppercase tracking-wide px-2 py-1 rounded-full">{p.tag}</span>
                      )}
                      <div className="aspect-square relative overflow-hidden bg-white/[0.03]">
                        <img
                          src={p.image}
                          alt={p.name}
                          className="absolute inset-0 w-full h-full object-contain p-6 transition-transform duration-700 group-hover:scale-105"
                          style={{ mixBlendMode: 'lighten', filter: 'brightness(1.05) contrast(1.05)' }}
                        />
                      </div>
                      <div className="p-4 border-t border-white/[0.06]">
                        <div className="text-[10px] uppercase tracking-widest text-schmidt-silver mb-1.5">{p.category}</div>
                        <div className="text-sm text-white mb-3 line-clamp-2 min-h-[40px]">{p.name}</div>
                        <div className="flex items-center justify-between">
                          <div className="text-sm font-medium text-white">{p.price.toFixed(2).replace('.',',')} €</div>
                          <button
                            onClick={() => addToCart(p.slug)}
                            className="text-[10px] uppercase tracking-widest text-schmidt-yellow hover:underline"
                          >+ Warenkorb</button>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </AnimatePresence>
              </div>
            </div>
          )}

          {totalCount === 0 && (
            <div className="rounded-2xl border border-dashed border-white/10 p-16 text-center">
              <div className="text-white font-display text-2xl mb-2">Keine Treffer</div>
              <div className="text-schmidt-silver text-sm mb-6">Probier andere Filter oder Kategorien.</div>
              <button onClick={() => { setCategory('all'); reset(); }} className="btn-yellow text-sm">Alle Produkte zeigen</button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function Pill({ children, active, onClick }: { children: React.ReactNode; active: boolean; onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      className={`text-xs px-3 py-1.5 rounded-full border transition-all ${
        active ? 'bg-schmidt-yellow text-schmidt-ink border-schmidt-yellow' : 'border-white/10 text-schmidt-silver hover:border-white/30 hover:text-white'
      }`}
    >{children}</button>
  );
}
