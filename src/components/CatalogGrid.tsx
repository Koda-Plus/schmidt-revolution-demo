import { useMemo, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { wheels, type Wheel } from '@/data/wheels';
import { eur } from '@/lib/cn';

const constructions = ['1-teilig', '2-/3-teilig', 'Forged'] as const;
const sizesAvailable = ['15"','16"','17"','18"','19"','20"','21"','22"','23"','24"'];
const lines = ['FS-Line','CC-Line','TH-Line','Modern-Line','Klassik','Forged'];

export default function CatalogGrid() {
  const [construction, setConstruction] = useState<string | null>(null);
  const [size, setSize] = useState<string | null>(null);
  const [line, setLine] = useState<string | null>(null);
  const [sort, setSort] = useState<'price-asc' | 'price-desc' | 'new'>('new');

  const filtered = useMemo(() => {
    let r: Wheel[] = wheels.slice();
    if (construction) r = r.filter(w => w.construction === construction);
    if (size) r = r.filter(w => w.sizes.includes(size));
    if (line) r = r.filter(w => w.line === line);
    if (sort === 'price-asc') r.sort((a,b) => a.priceFrom - b.priceFrom);
    if (sort === 'price-desc') r.sort((a,b) => b.priceFrom - a.priceFrom);
    return r;
  }, [construction, size, line, sort]);

  const reset = () => { setConstruction(null); setSize(null); setLine(null); };
  const activeCount = [construction, size, line].filter(Boolean).length;

  return (
    <div className="container-x pt-12 pb-32">
      <div className="grid lg:grid-cols-[280px_1fr] gap-8 lg:gap-12">
        {/* Filters */}
        <aside className="lg:sticky lg:top-24 self-start">
          <div className="flex items-center justify-between mb-6">
            <div className="eyebrow">Filter</div>
            {activeCount > 0 && (
              <button onClick={reset} className="text-[11px] text-schmidt-yellow hover:underline">Zurücksetzen ({activeCount})</button>
            )}
          </div>

          <FilterGroup label="Bauart">
            {constructions.map(c => (
              <FilterPill key={c} active={construction === c} onClick={() => setConstruction(construction === c ? null : c)}>{c}</FilterPill>
            ))}
          </FilterGroup>

          <FilterGroup label="Linie">
            {lines.map(l => (
              <FilterPill key={l} active={line === l} onClick={() => setLine(line === l ? null : l)}>{l}</FilterPill>
            ))}
          </FilterGroup>

          <FilterGroup label="Größe">
            <div className="grid grid-cols-3 gap-1.5 w-full">
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
          </FilterGroup>

          <div className="mt-8 p-4 rounded-2xl border border-schmidt-yellow/30 bg-schmidt-yellow/[0.05]">
            <div className="eyebrow text-schmidt-yellow mb-2">Nicht das richtige?</div>
            <div className="text-sm text-white mb-3">Konfiguriere dein Wunschrad in unserem Konfigurator.</div>
            <a href="/konfigurator" className="text-xs text-schmidt-yellow underline">Konfigurator öffnen →</a>
          </div>
        </aside>

        {/* Results */}
        <div>
          <div className="flex items-center justify-between mb-6">
            <div className="text-sm text-schmidt-silver">
              <span className="text-white font-medium">{filtered.length}</span> {filtered.length === 1 ? 'Modell' : 'Modelle'}
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

          <div className="grid sm:grid-cols-2 xl:grid-cols-3 gap-4">
            <AnimatePresence mode="popLayout">
              {filtered.map((w, i) => (
                <motion.a
                  key={w.slug}
                  layout
                  href={`/felgen/${w.slug}`}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.4, delay: i * 0.04 }}
                  className="group relative bg-schmidt-carbon rounded-2xl border border-white/[0.06] overflow-hidden hover:border-schmidt-yellow/40 transition-colors"
                >
                  {w.tag && (
                    <span className="absolute top-3 left-3 z-10 bg-schmidt-yellow text-schmidt-ink text-[10px] font-medium tracking-wide uppercase px-2 py-1 rounded-full">{w.tag}</span>
                  )}
                  <div className="studio-plate aspect-square relative overflow-hidden">
                    <img src={w.image} alt={w.alt} className="studio-img absolute inset-0 w-full h-full object-contain p-6 transition-transform duration-700 group-hover:scale-105" />
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

          {filtered.length === 0 && (
            <div className="rounded-2xl border border-dashed border-white/10 p-16 text-center">
              <div className="text-white font-display text-2xl mb-2">Keine Treffer</div>
              <div className="text-schmidt-silver text-sm mb-6">Probier andere Filter - oder geh direkt in den Konfigurator.</div>
              <a href="/konfigurator" className="btn-yellow text-sm">Konfigurator öffnen</a>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function FilterGroup({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="mb-6 pb-6 border-b border-white/[0.06]">
      <div className="text-[11px] uppercase tracking-[0.18em] text-white mb-3">{label}</div>
      <div className="flex flex-wrap gap-1.5">{children}</div>
    </div>
  );
}

function FilterPill({ children, active, onClick }: { children: React.ReactNode; active: boolean; onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      className={`text-xs px-3 py-1.5 rounded-full border transition-all ${
        active
          ? 'bg-schmidt-yellow text-schmidt-ink border-schmidt-yellow'
          : 'border-white/10 text-schmidt-silver hover:border-white/30 hover:text-white'
      }`}
    >{children}</button>
  );
}
