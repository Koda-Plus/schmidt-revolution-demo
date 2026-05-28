import { useState, useMemo, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { vehicleBrands } from '@/data/vehicles';
import { wheels } from '@/data/wheels';
import { eur } from '@/lib/cn';

type Step = 0 | 1 | 2 | 3 | 4 | 5;

const steps = [
  { id: 0, label: 'Auto', hint: 'Marke und Modell' },
  { id: 1, label: 'Bauart', hint: 'Konstruktion' },
  { id: 2, label: 'Felge', hint: 'Modell waehlen' },
  { id: 3, label: 'Groesse', hint: 'Zoll & Breite' },
  { id: 4, label: 'Finish', hint: 'Farbe & Veredelung' },
  { id: 5, label: 'Check', hint: 'Bestaetigen' },
];

const concaves = [-3, -1, 1, 3, 5, 7];
const colorOptions = ['#0E0F12', '#3a3d42', '#7A7C80', '#C9C9C8', '#FFD400', '#7a5a2c', '#FF2D2D', '#22D3A6'];

export default function Configurator() {
  const [step, setStep] = useState<Step>(0);
  const [brand, setBrand] = useState<string | null>(null);
  const [model, setModel] = useState<string | null>(null);
  const [construction, setConstruction] = useState<string | null>(null);
  const [wheel, setWheel] = useState<string | null>(null);
  const [size, setSize] = useState<string | null>(null);
  const [width, setWidth] = useState<string | null>(null);
  const [finish, setFinish] = useState<string | null>(null);
  const [accent, setAccent] = useState<string>('#FFD400');

  const selectedWheel = useMemo(() => wheels.find(w => w.slug === wheel) ?? null, [wheel]);
  const availableWheels = useMemo(() => construction ? wheels.filter(w => w.construction === construction) : wheels, [construction]);

  // Auto-pick first variants when wheel changes
  useEffect(() => {
    if (selectedWheel) {
      if (!selectedWheel.sizes.includes(size ?? '')) setSize(selectedWheel.sizes[selectedWheel.sizes.length-1]);
      if (!selectedWheel.widths.includes(width ?? '')) setWidth(selectedWheel.widths[Math.floor(selectedWheel.widths.length/2)]);
      if (!selectedWheel.finishes.find(f => f.name === finish)) setFinish(selectedWheel.finishes[0].name);
    }
  }, [wheel]);

  // Compute total price
  const total = useMemo(() => {
    if (!selectedWheel) return 0;
    const sizeIdx = selectedWheel.sizes.indexOf(size ?? selectedWheel.sizes[0]);
    const widthIdx = selectedWheel.widths.indexOf(width ?? selectedWheel.widths[0]);
    return selectedWheel.priceFrom + sizeIdx * 180 + widthIdx * 90;
  }, [selectedWheel, size, width]);

  const canNext = (() => {
    if (step === 0) return !!(brand && model);
    if (step === 1) return !!construction;
    if (step === 2) return !!wheel;
    if (step === 3) return !!(size && width);
    if (step === 4) return !!finish;
    return true;
  })();

  const next = () => setStep((s) => Math.min(5, (s + 1)) as Step);
  const back = () => setStep((s) => Math.max(0, (s - 1)) as Step);

  const selectedFinish = selectedWheel?.finishes.find(f => f.name === finish);

  const progress = ((step + 1) / steps.length) * 100;

  return (
    <div className="grid lg:grid-cols-[1fr_500px] lg:h-[calc(100vh-72px)]">
      {/* LEFT - Preview Canvas */}
      <div className="relative bg-schmidt-ink overflow-hidden flex items-center justify-center order-2 lg:order-1 min-h-[60vh] lg:min-h-0">
        <div className="absolute inset-0 grid-bg opacity-30" />
        <div
          className="absolute inset-0"
          style={{ background: `radial-gradient(circle at 50% 50%, ${accent}22, transparent 60%)` }}
        />

        {/* Status overlay */}
        <div className="absolute top-6 left-6 right-6 flex items-start justify-between z-20">
          <div className="space-y-1.5">
            <div className="text-[10px] uppercase tracking-[0.22em] text-schmidt-yellow flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-schmidt-yellow animate-pulse" />
              Live Konfiguration
            </div>
            <div className="font-display text-2xl text-white">
              {brand && model ? <>{vehicleBrands.find(b=>b.id===brand)?.name} <span className="text-schmidt-silver text-base">/ {model}</span></> : 'Dein Fahrzeug'}
            </div>
            <div className="text-xs text-schmidt-silver">
              {[construction, selectedWheel?.name, size, width, finish].filter(Boolean).join(' · ') || 'Wähle ein Setup'}
            </div>
          </div>
          <div className="text-right">
            <div className="text-[10px] uppercase tracking-[0.22em] text-schmidt-silver mb-1">Preis (4 Räder)</div>
            <div className="font-display text-3xl text-white">{total > 0 ? eur(total * 4) : '-'}</div>
            <div className="text-[10px] text-schmidt-silver mt-1">{total > 0 ? `${eur(total)} pro Rad` : 'Konfiguration unvollständig'}</div>
          </div>
        </div>

        {/* Wheel preview */}
        <div className="relative w-[min(70vw,520px)] aspect-square">
          {/* Ground shadow */}
          <div className="absolute bottom-[-6%] left-1/2 -translate-x-1/2 w-[80%] h-12 rounded-[50%]" style={{ background: 'radial-gradient(ellipse at center, rgba(0,0,0,0.7), transparent 70%)' }} />

          {/* Wheel */}
          <AnimatePresence mode="wait">
            {selectedWheel ? (
              <motion.div
                key={selectedWheel.slug + (finish ?? '')}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.6 }}
                className="absolute inset-0"
              >
                <div
                  className="studio-plate absolute inset-0 rounded-full overflow-hidden border border-white/10"
                  style={{ boxShadow: `0 0 90px -30px ${accent}` }}
                >
                  <img
                    src={selectedWheel.image}
                    alt={selectedWheel.alt}
                    className="studio-img absolute inset-0 w-full h-full object-contain p-6"
                  />
                </div>
                {/* Accent ring */}
                <div
                  className="absolute inset-0 rounded-full pointer-events-none"
                  style={{ boxShadow: `inset 0 0 0 1px ${accent}55` }}
                />
              </motion.div>
            ) : (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="absolute inset-0 grid place-items-center"
              >
                <div className="w-[60%] h-[60%] rounded-full border-2 border-dashed border-white/15 grid place-items-center text-schmidt-silver text-sm">
                  Wähle eine Felge
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Spec chips around wheel */}
          {selectedWheel && (
            <>
              <div className="absolute top-4 -left-2 sm:left-4 bg-schmidt-carbon/90 backdrop-blur border border-white/10 rounded-xl px-3 py-2">
                <div className="text-[9px] uppercase tracking-widest text-schmidt-silver">Bauart</div>
                <div className="text-xs text-white">{selectedWheel.construction}</div>
              </div>
              {size && (
                <div className="absolute top-4 -right-2 sm:right-4 bg-schmidt-carbon/90 backdrop-blur border border-white/10 rounded-xl px-3 py-2">
                  <div className="text-[9px] uppercase tracking-widest text-schmidt-silver">Größe</div>
                  <div className="text-xs text-white">{size} · {width}</div>
                </div>
              )}
              {selectedFinish && (
                <div className="absolute bottom-8 left-1/2 -translate-x-1/2 bg-schmidt-carbon/90 backdrop-blur border border-white/10 rounded-xl px-3 py-2 flex items-center gap-2">
                  <span className="w-4 h-4 rounded-full" style={{ background: selectedFinish.swatch }} />
                  <span className="text-xs text-white">{selectedFinish.name}</span>
                </div>
              )}
            </>
          )}
        </div>

        {/* Bottom action row */}
        <div className="absolute bottom-6 left-6 right-6 flex items-center justify-between text-[11px] text-schmidt-silver z-20">
          <div className="flex items-center gap-4">
            <span>Schritt {step+1} / {steps.length}</span>
            <span className="hidden sm:inline">- {steps[step].label}</span>
          </div>
          <div className="hidden sm:flex items-center gap-2">
            <span>Live Preview</span>
            <span className="w-1.5 h-1.5 rounded-full bg-schmidt-yellow animate-pulse" />
          </div>
        </div>
      </div>

      {/* RIGHT - Step panel */}
      <div className="relative bg-schmidt-carbon border-l border-white/[0.06] order-1 lg:order-2 flex flex-col lg:h-[calc(100vh-72px)] overflow-hidden">
        {/* Progress */}
        <div className="relative h-1 bg-white/[0.06]">
          <motion.div
            className="absolute left-0 top-0 bottom-0 bg-schmidt-yellow"
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.5, ease: [0.2,0.7,0.2,1] }}
          />
        </div>

        {/* Step tabs */}
        <div className="flex border-b border-white/[0.06]">
          {steps.map((s) => (
            <button
              key={s.id}
              onClick={() => setStep(s.id as Step)}
              className={`flex-1 px-2 py-3 text-[10px] uppercase tracking-[0.16em] transition-colors ${
                s.id === step ? 'text-schmidt-yellow' : s.id < step ? 'text-white/80' : 'text-schmidt-silver hover:text-white'
              }`}
            >
              <div className="flex items-center justify-center gap-1.5">
                <span className={`w-4 h-4 rounded-full grid place-items-center text-[8px] ${s.id < step ? 'bg-schmidt-yellow text-schmidt-ink' : s.id === step ? 'border border-schmidt-yellow text-schmidt-yellow' : 'border border-white/20'}`}>
                  {s.id < step ? '✓' : s.id + 1}
                </span>
                <span className="hidden md:inline">{s.label}</span>
              </div>
            </button>
          ))}
        </div>

        {/* Step content */}
        <div className="flex-1 overflow-y-auto p-6 lg:p-8">
          <AnimatePresence mode="wait">
            <motion.div
              key={step}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.35 }}
            >
              <div className="eyebrow mb-2 text-schmidt-yellow">Schritt {step+1}</div>
              <h2 className="font-display text-3xl text-white mb-1">{steps[step].label}</h2>
              <p className="text-sm text-schmidt-silver mb-8">{steps[step].hint}</p>

              {step === 0 && (
                <div className="space-y-6">
                  <div>
                    <label className="text-xs text-white mb-3 block">Marke waehlen</label>
                    <div className="grid grid-cols-3 gap-2">
                      {vehicleBrands.map(b => (
                        <button
                          key={b.id}
                          onClick={() => { setBrand(b.id); setModel(null); }}
                          className={`text-center text-xs py-3 px-2 rounded-xl border transition-all ${
                            brand === b.id ? 'bg-schmidt-yellow text-schmidt-ink border-schmidt-yellow' : 'border-white/10 text-white hover:border-white/30'
                          }`}
                        >{b.name}</button>
                      ))}
                    </div>
                  </div>
                  {brand && (
                    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
                      <label className="text-xs text-white mb-3 block">Modell waehlen</label>
                      <div className="grid grid-cols-2 gap-2">
                        {vehicleBrands.find(b => b.id === brand)?.models.map(m => (
                          <button
                            key={m}
                            onClick={() => setModel(m)}
                            className={`text-center text-xs py-3 px-2 rounded-lg border transition-all ${
                              model === m ? 'bg-white/10 border-schmidt-yellow text-white' : 'border-white/10 text-schmidt-silver hover:text-white'
                            }`}
                          >{m}</button>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </div>
              )}

              {step === 1 && (
                <div className="space-y-3">
                  {(['1-teilig', '2-/3-teilig', 'Forged'] as const).map((c) => (
                    <button
                      key={c}
                      onClick={() => setConstruction(c)}
                      className={`w-full text-left p-5 rounded-2xl border transition-all ${
                        construction === c ? 'border-schmidt-yellow bg-schmidt-yellow/5' : 'border-white/10 hover:border-white/30'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <div>
                          <div className="font-display text-xl text-white">{c}</div>
                          <div className="text-xs text-schmidt-silver mt-1">
                            {c === '1-teilig' && 'Monoblock · ab € 690'}
                            {c === '2-/3-teilig' && 'Modular · ab € 2.490'}
                            {c === 'Forged' && 'Geschmiedet · ab € 3.490'}
                          </div>
                        </div>
                        <span className={`w-5 h-5 rounded-full border-2 transition-colors ${
                          construction === c ? 'bg-schmidt-yellow border-schmidt-yellow' : 'border-white/20'
                        }`} />
                      </div>
                    </button>
                  ))}
                </div>
              )}

              {step === 2 && (
                <div className="grid grid-cols-2 gap-3">
                  {availableWheels.map(w => (
                    <button
                      key={w.slug}
                      onClick={() => setWheel(w.slug)}
                      className={`relative p-3 rounded-xl border transition-all text-left ${
                        wheel === w.slug ? 'border-schmidt-yellow bg-schmidt-yellow/[0.04]' : 'border-white/10 hover:border-white/30'
                      }`}
                    >
                      <div className="studio-plate aspect-square mb-3 rounded-lg overflow-hidden relative">
                        <img
                          src={w.image}
                          alt={w.alt}
                          className="studio-img absolute inset-0 w-full h-full object-contain p-3"
                        />
                      </div>
                      <div className="text-sm text-white">{w.name}</div>
                      <div className="text-[10px] text-schmidt-silver">{w.line}</div>
                      <div className="text-[10px] text-schmidt-yellow mt-1">ab {eur(w.priceFrom)}</div>
                    </button>
                  ))}
                </div>
              )}

              {step === 3 && selectedWheel && (
                <div className="space-y-6">
                  <div>
                    <label className="text-xs text-white mb-2 block">Zoll</label>
                    <div className="grid grid-cols-4 gap-2">
                      {selectedWheel.sizes.map(s => (
                        <button
                          key={s}
                          onClick={() => setSize(s)}
                          className={`py-3 rounded-xl border text-sm transition-all ${
                            size === s ? 'bg-schmidt-yellow text-schmidt-ink border-schmidt-yellow' : 'border-white/10 text-white hover:border-white/30'
                          }`}
                        >{s}</button>
                      ))}
                    </div>
                  </div>
                  <div>
                    <label className="text-xs text-white mb-2 block">Breite</label>
                    <div className="grid grid-cols-4 gap-2">
                      {selectedWheel.widths.map(w => (
                        <button
                          key={w}
                          onClick={() => setWidth(w)}
                          className={`py-3 rounded-xl border text-sm transition-all ${
                            width === w ? 'bg-schmidt-yellow text-schmidt-ink border-schmidt-yellow' : 'border-white/10 text-white hover:border-white/30'
                          }`}
                        >{w}</button>
                      ))}
                    </div>
                  </div>
                  <div className="rounded-2xl border border-white/10 p-4 bg-schmidt-ink/40">
                    <div className="text-[10px] uppercase tracking-widest text-schmidt-silver mb-2">Automatische Prüfung</div>
                    <div className="space-y-2 text-xs">
                      <Check label="Lastindex passend für Fahrzeug" />
                      <Check label="ET-Bereich freigegeben" />
                      <Check label="TPMS / RDKS kompatibel" />
                      <Check label="ABE / Festigkeitsgutachten verfügbar" />
                    </div>
                  </div>
                </div>
              )}

              {step === 4 && selectedWheel && (
                <div className="space-y-6">
                  <div>
                    <label className="text-xs text-white mb-2 block">Standard Finish</label>
                    <div className="grid grid-cols-2 gap-2">
                      {selectedWheel.finishes.map(f => (
                        <button
                          key={f.name}
                          onClick={() => setFinish(f.name)}
                          className={`p-3 rounded-xl border text-left transition-all ${
                            finish === f.name ? 'border-schmidt-yellow' : 'border-white/10 hover:border-white/30'
                          }`}
                        >
                          <div className="w-full aspect-[3/2] rounded-md mb-2" style={{ background: f.swatch }} />
                          <div className="text-xs text-white">{f.name}</div>
                        </button>
                      ))}
                    </div>
                  </div>
                  <div>
                    <label className="text-xs text-white mb-2 block">Akzentfarbe (Stripe / Bolts)</label>
                    <div className="flex flex-wrap gap-2">
                      {colorOptions.map(c => (
                        <button
                          key={c}
                          onClick={() => setAccent(c)}
                          className={`w-9 h-9 rounded-full border-2 transition-transform ${
                            accent === c ? 'border-white scale-110' : 'border-white/20'
                          }`}
                          style={{ background: c }}
                        />
                      ))}
                    </div>
                  </div>
                  <div className="rounded-2xl border border-white/10 p-4">
                    <div className="text-[10px] uppercase tracking-widest text-schmidt-silver mb-2">Custom Anfragen</div>
                    <div className="text-xs text-white">Für individuelle Lackierungen +€ 320 pro Rad. Lieferzeit verlängert sich um 14 Tage.</div>
                  </div>
                </div>
              )}

              {step === 5 && (
                <div className="space-y-4">
                  <div className="rounded-2xl bg-schmidt-ink/60 border border-white/10 p-5 space-y-3">
                    <Row label="Fahrzeug" value={brand && model ? `${vehicleBrands.find(b=>b.id===brand)?.name} ${model}` : '-'} />
                    <Row label="Bauart" value={construction ?? '-'} />
                    <Row label="Felge" value={selectedWheel?.name ?? '-'} />
                    <Row label="Größe" value={size && width ? `${size} × ${width}` : '-'} />
                    <Row label="Finish" value={finish ?? '-'} />
                    <Row label="Akzent" value={<span className="inline-flex items-center gap-2"><span className="w-3 h-3 rounded-full" style={{background:accent}}/><span className="text-white">{accent}</span></span>} />
                  </div>
                  <div className="rounded-2xl bg-schmidt-yellow/10 border border-schmidt-yellow/40 p-5">
                    <div className="text-[10px] uppercase tracking-widest text-schmidt-yellow mb-2">Gesamtpreis</div>
                    <div className="flex items-baseline justify-between">
                      <div className="font-display text-4xl text-white">{eur(total*4)}</div>
                      <div className="text-xs text-schmidt-silver">4 Räder · inkl. Gutachten</div>
                    </div>
                    <div className="text-xs text-schmidt-silver mt-2">{eur(total)} pro Rad · Lieferung in 21 Tagen</div>
                  </div>
                  <button
                    onClick={() => {
                      const c = Number(localStorage.getItem('schmidt_cart_count') ?? 0) + 1;
                      localStorage.setItem('schmidt_cart_count', String(c));
                      alert('Konfiguration in den Warenkorb gelegt - vielen Dank!');
                    }}
                    className="w-full btn-yellow justify-center py-4"
                    disabled={!selectedWheel}
                  >
                    In den Warenkorb · {eur(total*4)}
                  </button>
                  <button className="w-full btn-ghost justify-center py-4 text-sm">
                    Als PDF speichern
                  </button>
                </div>
              )}
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Footer nav */}
        <div className="flex items-center justify-between p-5 border-t border-white/[0.06] bg-schmidt-ink/40">
          <button
            onClick={back}
            disabled={step === 0}
            className="btn-ghost text-xs disabled:opacity-30 disabled:cursor-not-allowed py-2.5"
          >
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M19 12H5M11 19l-7-7 7-7"/></svg>
            Zurück
          </button>
          {step < 5 ? (
            <button
              onClick={next}
              disabled={!canNext}
              className="btn-yellow text-xs disabled:opacity-30 disabled:cursor-not-allowed py-2.5"
            >
              Weiter
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12h14M13 5l7 7-7 7"/></svg>
            </button>
          ) : (
            <div className="text-[10px] uppercase tracking-widest text-schmidt-yellow">Fertig konfiguriert</div>
          )}
        </div>
      </div>
    </div>
  );
}

function Row({ label, value }: { label: string; value: React.ReactNode }) {
  return (
    <div className="flex items-center justify-between text-sm">
      <div className="text-schmidt-silver text-xs">{label}</div>
      <div className="text-white font-medium">{value}</div>
    </div>
  );
}

function Check({ label }: { label: string }) {
  return (
    <div className="flex items-center gap-2 text-schmidt-silver">
      <span className="w-4 h-4 rounded-full bg-schmidt-yellow/20 grid place-items-center">
        <svg width="8" height="8" viewBox="0 0 12 12" fill="none" stroke="#FFD400" strokeWidth="2"><path d="M2 6l3 3 5-7"/></svg>
      </span>
      {label}
    </div>
  );
}
