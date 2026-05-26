export type WheelFinish = {
  name: string;
  hex: string;
  swatch: string;
};

export type Wheel = {
  slug: string;
  name: string;
  line: 'FS-Line' | 'CC-Line' | 'TH-Line' | 'Modern-Line' | 'Forged' | 'Klassik' | 'Camper';
  construction: '1-teilig' | '2-/3-teilig' | 'Forged';
  sizes: string[];
  widths: string[];
  finishes: WheelFinish[];
  priceFrom: number;
  image: string;
  alt: string;
  tag?: string;
  description: string;
  highlights: string[];
};

export const wheels: Wheel[] = [
  {
    slug: 'twentyone',
    name: 'TwentyOne',
    line: 'FS-Line',
    construction: '2-/3-teilig',
    sizes: ['19"', '20"', '21"'],
    widths: ['8.5J', '9.5J', '10.5J', '11J', '12J'],
    finishes: [
      { name: 'Titan Brushed', hex: '#7A7C80', swatch: 'linear-gradient(135deg,#9a9da3,#5d6066)' },
      { name: 'Gun Metal', hex: '#3a3d42', swatch: 'linear-gradient(135deg,#54585f,#23262b)' },
      { name: 'Hyperblack Polish', hex: '#1a1a1d', swatch: 'linear-gradient(135deg,#34363b,#0e0f12)' },
      { name: 'Pearl White', hex: '#ECEAE3', swatch: 'linear-gradient(135deg,#fafaf6,#cfcec6)' },
    ],
    priceFrom: 2890,
    image: '/scraped/wheel-twentyone.jpg',
    alt: 'TwentyOne 21 Zoll Titan Brushed',
    tag: 'Neu 2026',
    description: 'Dreiteilige Konkav-Felge mit handgefertigtem Tiefbett. Most Concave Profil - kompromisslose Optik für Plattform-Limousinen und Coupés.',
    highlights: ['Handpoliertes Tiefbett', 'Hochfeste Edelstahl-Schrauben', 'Made in Bad Segeberg'],
  },
  {
    slug: 'eckstein-23',
    name: 'Eckstein 23"',
    line: 'CC-Line',
    construction: '2-/3-teilig',
    sizes: ['22"', '23"', '24"'],
    widths: ['10J', '11J', '12J', '13J'],
    finishes: [
      { name: 'Gun Metal Matt', hex: '#3a3d42', swatch: 'linear-gradient(135deg,#54585f,#23262b)' },
      { name: 'Schwarz Hochglanz', hex: '#0E0F12', swatch: 'linear-gradient(135deg,#222226,#000)' },
      { name: 'Bronze Tinted', hex: '#7a5a2c', swatch: 'linear-gradient(135deg,#a07d3f,#5a4220)' },
    ],
    priceFrom: 3490,
    image: '/scraped/wheel-eckstein.jpg',
    alt: 'Eckstein 23" GunMetal Boliden',
    tag: 'Most Load',
    description: 'Die Antwort auf SUVs, Boliden und Exoten. Most Load Profil mit verstärkter Schüssel - geprüft bis 1.200 kg pro Rad.',
    highlights: ['Tragkraft 1.200 kg/Rad', 'TÜV Festigkeitsgutachten', 'Konkav-Geometrie'],
  },
  {
    slug: 'cc-zerolip',
    name: 'CC-ZeroLip',
    line: 'CC-Line',
    construction: '2-/3-teilig',
    sizes: ['19"', '20"'],
    widths: ['8J', '9J', '10J', '11J'],
    finishes: [
      { name: 'Titan / Red Stripe', hex: '#7A7C80', swatch: 'linear-gradient(135deg,#9a9da3,#FF2D2D 70%)' },
      { name: 'Gun Metal', hex: '#3a3d42', swatch: 'linear-gradient(135deg,#54585f,#23262b)' },
      { name: 'Silber Glanz', hex: '#C9C9C8', swatch: 'linear-gradient(135deg,#e9e9e6,#a5a5a3)' },
    ],
    priceFrom: 2490,
    image: '/scraped/wheel-cczero.png',
    alt: 'CC-ZeroLip Titan mit roter Stripe',
    description: 'Ohne Lip. Ohne Kompromiss. Die radikalste Interpretation des klassischen 3-teiligen Designs.',
    highlights: ['Lipless Design', 'Individueller Color Code', 'Customer Spec Bauform'],
  },
  {
    slug: '18hdx',
    name: '18HDX',
    line: 'Modern-Line',
    construction: '1-teilig',
    sizes: ['18"', '19"', '20"'],
    widths: ['8J', '8.5J', '9J', '10J'],
    finishes: [
      { name: 'Mattschwarz', hex: '#161618', swatch: 'linear-gradient(135deg,#2E2E33,#0A0A0B)' },
      { name: 'Silber Lackiert', hex: '#C9C9C8', swatch: 'linear-gradient(135deg,#e9e9e6,#a5a5a3)' },
      { name: 'Gun Metal', hex: '#3a3d42', swatch: 'linear-gradient(135deg,#54585f,#23262b)' },
    ],
    priceFrom: 890,
    image: '/scraped/wheel-18hdx.webp',
    alt: '18HDX Monoblock Felge',
    tag: 'Bestseller',
    description: 'Monoblock-Bestseller mit über 10.000 Fahrzeug-Anwendungen. Modernes Y-Speichen-Design.',
    highlights: ['ABE / Gutachten', 'Bis 1.000 kg Last', 'Für 90% aller Fahrzeuge'],
  },
  {
    slug: 'kyan',
    name: 'KYAN',
    line: 'Modern-Line',
    construction: '1-teilig',
    sizes: ['18"', '19"', '20"', '21"'],
    widths: ['8J', '8.5J', '9J', '9.5J', '10J'],
    finishes: [
      { name: 'Hyperblack', hex: '#1a1a1d', swatch: 'linear-gradient(135deg,#34363b,#0e0f12)' },
      { name: 'Silber Diamantpoliert', hex: '#D7D7D5', swatch: 'linear-gradient(135deg,#f6f6f3,#b1b1ae)' },
      { name: 'Bronze', hex: '#7a5a2c', swatch: 'linear-gradient(135deg,#a07d3f,#5a4220)' },
    ],
    priceFrom: 1190,
    image: '/scraped/wheel-kyan.webp',
    alt: 'KYAN Monoblock Felge',
    tag: 'New Gen',
    description: 'Drehgeschmiedete Y-Speichen, präzise gefräste Konturen - KYAN ist die nächste Generation moderner Räder.',
    highlights: ['Flow Forming', '-18% Gewicht', 'Premium Hyperblack'],
  },
  {
    slug: '17hdf',
    name: '17HDF',
    line: 'Klassik',
    construction: '1-teilig',
    sizes: ['17"', '18"'],
    widths: ['7.5J', '8J', '8.5J'],
    finishes: [
      { name: 'Silber Lackiert', hex: '#C9C9C8', swatch: 'linear-gradient(135deg,#e9e9e6,#a5a5a3)' },
      { name: 'Schwarz Matt', hex: '#161618', swatch: 'linear-gradient(135deg,#2E2E33,#0A0A0B)' },
    ],
    priceFrom: 690,
    image: '/scraped/wheel-17hdf.webp',
    alt: '17HDF Klassik Felge',
    description: 'Klassische Mesh-Optik - kompromisslos eingesetzt auf Youngtimer und Modern Classics.',
    highlights: ['Mesh Heritage Design', 'TÜV-Gutachten', 'Restomod-tauglich'],
  },
  {
    slug: 'touring17',
    name: 'Touring 17',
    line: 'TH-Line',
    construction: '1-teilig',
    sizes: ['15"', '16"', '17"'],
    widths: ['6.5J', '7J', '7.5J', '8J'],
    finishes: [
      { name: 'Silber', hex: '#C9C9C8', swatch: 'linear-gradient(135deg,#e9e9e6,#a5a5a3)' },
      { name: 'Schwarz', hex: '#161618', swatch: 'linear-gradient(135deg,#2E2E33,#0A0A0B)' },
    ],
    priceFrom: 420,
    image: '/scraped/wheel-touring17.webp',
    alt: 'Touring 17 Winterrad',
    description: 'Touring-Klassiker - perfekt als Winterrad oder für sportliche Tagestouren mit Komfort-Ansprüchen.',
    highlights: ['Winterfreigabe', 'Schlanke Speichen', '15 - 17 Zoll'],
  },
  {
    slug: 'fs-line',
    name: 'FS-Line',
    line: 'FS-Line',
    construction: '2-/3-teilig',
    sizes: ['19"', '20"', '21"'],
    widths: ['8.5J', '9J', '9.5J', '10J', '11J', '12J', '13J'],
    finishes: [
      { name: 'Titan Brushed', hex: '#7A7C80', swatch: 'linear-gradient(135deg,#9a9da3,#5d6066)' },
      { name: 'Gun Metal', hex: '#3a3d42', swatch: 'linear-gradient(135deg,#54585f,#23262b)' },
      { name: 'Silber Hochglanz', hex: '#C9C9C8', swatch: 'linear-gradient(135deg,#e9e9e6,#a5a5a3)' },
      { name: 'Schwarz Hochglanz', hex: '#0E0F12', swatch: 'linear-gradient(135deg,#222226,#000)' },
    ],
    priceFrom: 3190,
    image: '/scraped/wheel-fsline.jpg',
    alt: 'FS-Line dreiteilig 19/20 Zoll',
    tag: 'Custom Build',
    description: 'Das Ikonen-Design der Schmidt FS-Linie. 250+ Fahrzeug-Anwendungen mit Bauteilgutachten.',
    highlights: ['Bauteilgutachten', '> 250 Fahrzeug-Apps', 'Customer Spec ET'],
  },
];

export const wheelLines = [
  { id: 'FS-Line', count: 250 },
  { id: 'CC-Line', count: 260 },
  { id: 'TH-Line', count: 270 },
  { id: 'Modern-Line', count: 70 },
];

export const categories = [
  { slug: '1-teilig', label: '1-teilig', desc: 'Monoblock', image: '/scraped/cat-1tlg.jpg' },
  { slug: '2-3-teilig', label: '2-/3-teilig', desc: 'Mehrteilig', image: '/scraped/cat-mehrteilig.jpg' },
  { slug: 'klassik', label: 'Klassik', desc: 'Heritage', image: '/scraped/cat-klassik.jpg' },
  { slug: 'camper-offroad', label: 'Camper & Offroad', desc: 'Für VANs & Transporter', image: '/scraped/cat-camper.jpg' },
  { slug: 'forged', label: 'Forged', desc: 'Geschmiedet', image: '/scraped/cat-forged.jpg' },
];
