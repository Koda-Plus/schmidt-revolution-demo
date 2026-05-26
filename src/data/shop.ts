export type ShopCategory = 'Nabenkappen' | 'Logos' | 'Streetwear' | 'Zubehoer';

export type ShopProduct = {
  slug: string;
  name: string;
  category: ShopCategory;
  price: number;
  image: string;
  tag?: string;
};

export const shopProducts: ShopProduct[] = [
  // Nabenkappen
  { slug: 'nabendeckel-sc5', name: 'Nabendeckel SC5 Silber', category: 'Nabenkappen', price: 15.00, image: '/scraped/shop/nabendeckel-sc5.jpg', tag: '4er Set' },
  { slug: 'nabendeckel-sc2', name: 'Nabendeckel SC2 Chrom', category: 'Nabenkappen', price: 15.00, image: '/scraped/shop/nabendeckel-sc2.jpg' },
  { slug: 'stormer-deckel', name: 'Stormer 5-Finger Deckel', category: 'Nabenkappen', price: 36.95, image: '/scraped/shop/stormer-deckel.jpg', tag: 'TIPP' },
  { slug: 'zayn-black', name: 'ZAYN 5-Finger SatinBlack', category: 'Nabenkappen', price: 39.95, image: '/scraped/shop/zayn-black.jpg' },

  // Logos
  { slug: 'linse-chrom', name: 'Schmidt Revolution Linse 60mm Chrom', category: 'Logos', price: 10.00, image: '/scraped/shop/linse-chrom.jpg' },
  { slug: 'linse-schwarz', name: 'Schmidt Revolution Linse 60mm Schwarz', category: 'Logos', price: 10.00, image: '/scraped/shop/linse-schwarz.jpg' },
  { slug: 'linse-3d', name: 'Schmidt Revolution 3D Linse 60mm', category: 'Logos', price: 10.00, image: '/scraped/shop/linse-3d.jpg', tag: 'Neu' },

  // Streetwear
  { slug: 'tshirt-revolution', name: 'T-Shirt Schmidt Revolution', category: 'Streetwear', price: 25.00, image: '/scraped/shop/tshirt-revolution.jpg' },
  { slug: 'tshirt-classics', name: 'T-Shirt Schmidt Classics', category: 'Streetwear', price: 25.00, image: '/scraped/shop/tshirt-classics.jpg' },
  { slug: 'tshirt-performance', name: 'T-Shirt Schmidt Performance', category: 'Streetwear', price: 25.00, image: '/scraped/shop/tshirt-performance.jpg' },
  { slug: 'hoodie-performance', name: 'Hoodie Schmidt Performance', category: 'Streetwear', price: 49.00, image: '/scraped/shop/hoodie-performance.jpg', tag: 'Bestseller' },

  // Zubehoer
  { slug: 'zayn-bronze', name: 'ZAYN 5-Finger Bronze', category: 'Zubehoer', price: 39.95, image: '/scraped/shop/zayn-bronze.jpg' },
];

export const shopCategories: { id: ShopCategory; label: string; description: string }[] = [
  { id: 'Nabenkappen', label: 'Nabenkappen', description: 'Felgendeckel und Centercaps' },
  { id: 'Logos', label: 'Logos & Linsen', description: 'Schmidt Markenlogos' },
  { id: 'Streetwear', label: 'Streetwear', description: 'T-Shirts, Hoodies, Caps' },
  { id: 'Zubehoer', label: 'Zubehoer & Pflege', description: 'Pflegeprodukte & Tools' },
];

export const subBrands = [
  {
    id: 'revolution',
    name: 'Schmidt Revolution',
    accent: '#FFD400',
    description: 'Das Original. Mehrteilige Schuesseln, FS-Line, CC-Line - die Ikone unter den Premium-Felgen seit 1995.',
    image: '/scraped/wheel-twentyone.jpg',
  },
  {
    id: 'performance',
    name: 'Schmidt Performance',
    accent: '#FF2A2A',
    description: 'Geschmiedet, gewichtsoptimiert, rennstrecken-tauglich. Forged Wheels fuer maximale Leistung.',
    image: '/scraped/wheel-fsline.jpg',
  },
  {
    id: 'classics',
    name: 'Schmidt Classics',
    accent: '#FFD400',
    description: 'Heritage-Designs aus dem Schmidt Archiv. TH-Line, Touring17, Mesh-Optik fuer Youngtimer und Modern Classics.',
    image: '/scraped/wheel-17hdf.webp',
  },
  {
    id: 'rugged',
    name: 'Schmidt Rugged',
    accent: '#7A8B5C',
    description: 'Offroad. Camper. Transporter. Verstaerkte Konstruktion fuer VANs, SUVs und Allrad-Anwendungen.',
    image: '/scraped/wheel-18hdx.webp',
  },
];
