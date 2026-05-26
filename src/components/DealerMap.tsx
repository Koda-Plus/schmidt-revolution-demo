import { useEffect, useRef, useState, useMemo } from 'react';
import maplibregl from 'maplibre-gl';
import 'maplibre-gl/dist/maplibre-gl.css';
import { dealers, serviceLabels } from '@/data/dealers';

type ServiceKey = keyof typeof serviceLabels;

export default function DealerMap({ compact = false }: { compact?: boolean }) {
  const ref = useRef<HTMLDivElement>(null);
  const mapRef = useRef<maplibregl.Map | null>(null);
  const markersRef = useRef<maplibregl.Marker[]>([]);
  const [active, setActive] = useState<ServiceKey[]>(['tuner', 'reifenservice', 'shop', 'premium']);
  const [selected, setSelected] = useState<typeof dealers[number] | null>(dealers[0]);

  const filtered = useMemo(() => dealers.filter(d => d.services.some(s => active.includes(s as ServiceKey))), [active]);

  useEffect(() => {
    if (!ref.current || mapRef.current) return;
    // Force layout before init
    ref.current.style.height = '100%';
    ref.current.style.width = '100%';
    const map = new maplibregl.Map({
      container: ref.current,
      style: {
        version: 8,
        sources: {
          'carto-dark': {
            type: 'raster',
            tiles: [
              'https://a.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}@2x.png',
              'https://b.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}@2x.png',
              'https://c.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}@2x.png',
            ],
            tileSize: 256,
            attribution: '© OpenStreetMap · © CARTO',
          },
        },
        layers: [{ id: 'base', type: 'raster', source: 'carto-dark' }],
      },
      center: [10.45, 51.16],
      zoom: compact ? 4.6 : 5.4,
      attributionControl: { compact: true },
    });
    map.addControl(new maplibregl.NavigationControl({ showCompass: false }), 'top-right');
    mapRef.current = map;
    // Resize after mount
    requestAnimationFrame(() => map.resize());
    setTimeout(() => map.resize(), 300);
    return () => { map.remove(); mapRef.current = null; };
  }, []);

  useEffect(() => {
    const map = mapRef.current;
    if (!map) return;
    markersRef.current.forEach(m => m.remove());
    markersRef.current = [];

    filtered.forEach((d) => {
      const el = document.createElement('div');
      const primary = d.services[0];
      const color = serviceLabels[primary]?.color || '#FFD400';
      el.innerHTML = `
        <div style="position:relative;width:34px;height:34px;display:grid;place-items:center;cursor:pointer">
          <span style="position:absolute;inset:0;border-radius:50%;background:${color};opacity:0.22;animation:pulse 2s ease-out infinite"></span>
          <span style="position:relative;width:14px;height:14px;border-radius:50%;background:${color};box-shadow:0 0 0 3px rgba(0,0,0,0.5),0 0 20px ${color}"></span>
        </div>
      `;
      el.addEventListener('click', () => {
        setSelected(d);
        map.flyTo({ center: [d.lng, d.lat], zoom: 8, duration: 1200 });
      });
      const marker = new maplibregl.Marker({ element: el }).setLngLat([d.lng, d.lat]).addTo(map);
      markersRef.current.push(marker);
    });
  }, [filtered]);

  const toggle = (s: ServiceKey) => {
    setActive(a => a.includes(s) ? a.filter(x => x !== s) : [...a, s]);
  };

  return (
    <div className={`relative ${compact ? 'h-[520px]' : 'h-[720px]'} rounded-2xl overflow-hidden border border-white/[0.06] bg-schmidt-carbon`}>
      <style>{`@keyframes pulse { 0% { transform: scale(0.9); opacity: 0.5 } 70% { transform: scale(1.8); opacity: 0 } 100% { transform: scale(0.9); opacity: 0 } }`}</style>

      <div ref={ref} className="absolute inset-0 w-full h-full" style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0 }} />

      {/* Filter pills */}
      <div className="absolute top-4 left-4 right-16 flex flex-wrap gap-2 z-10">
        {(Object.keys(serviceLabels) as ServiceKey[]).map((k) => (
          <button
            key={k}
            onClick={() => toggle(k)}
            className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs backdrop-blur border transition-all ${
              active.includes(k)
                ? 'bg-schmidt-ink/80 border-schmidt-yellow/40 text-white'
                : 'bg-schmidt-ink/50 border-white/10 text-schmidt-silver hover:text-white'
            }`}
          >
            <span className="w-2 h-2 rounded-full" style={{ background: serviceLabels[k].color }} />
            {serviceLabels[k].label}
          </button>
        ))}
      </div>

      {/* Stat overlay */}
      <div className="absolute bottom-4 left-4 bg-schmidt-ink/85 backdrop-blur-xl border border-white/10 rounded-2xl p-4 z-10 max-w-[280px]">
        <div className="text-[10px] uppercase tracking-[0.22em] text-schmidt-silver mb-2">Live · Händler-Netzwerk</div>
        <div className="font-display text-2xl text-white">{filtered.length} <span className="text-schmidt-silver text-lg">/ {dealers.length}</span></div>
        <div className="text-xs text-schmidt-silver mt-1">aktive Partner in Deutschland</div>
      </div>

      {/* Selected */}
      {selected && (
        <div className="absolute bottom-4 right-4 bg-schmidt-ink/90 backdrop-blur-xl border border-white/10 rounded-2xl p-5 z-10 w-[280px]">
          <div className="text-[10px] uppercase tracking-[0.22em] text-schmidt-yellow mb-1.5">Ausgewählt</div>
          <div className="font-display text-lg text-white">{selected.name}</div>
          <div className="text-xs text-schmidt-silver mb-3">{selected.city}</div>
          <div className="flex flex-wrap gap-1.5 mb-4">
            {selected.services.map((s) => (
              <span key={s} className="text-[10px] px-2 py-0.5 rounded-full border border-white/10 text-schmidt-silver">
                {serviceLabels[s as ServiceKey]?.label}
              </span>
            ))}
          </div>
          {selected.phone && <div className="text-xs text-white/70 mb-3">📞 {selected.phone}</div>}
          <button className="w-full bg-schmidt-yellow text-schmidt-ink rounded-full text-xs py-2 font-medium hover:bg-schmidt-yellowSoft transition-colors">
            Termin anfragen
          </button>
        </div>
      )}
    </div>
  );
}
