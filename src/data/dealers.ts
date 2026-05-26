export type Dealer = {
  name: string;
  city: string;
  lat: number;
  lng: number;
  services: ('tuner' | 'reifenservice' | 'shop' | 'premium')[];
  phone?: string;
};

export const dealers: Dealer[] = [
  { name: 'Schmidt Flagship', city: 'Bad Segeberg', lat: 53.9333, lng: 10.3, services: ['premium','shop','tuner','reifenservice'], phone: '04551 123-0' },
  { name: 'Reifen Müller', city: 'Hamburg', lat: 53.5511, lng: 9.9937, services: ['shop','reifenservice'] },
  { name: 'AutoStyling Berlin', city: 'Berlin', lat: 52.52, lng: 13.405, services: ['tuner','shop'] },
  { name: 'NordRad', city: 'Kiel', lat: 54.3233, lng: 10.1228, services: ['shop','reifenservice'] },
  { name: 'WheelLab', city: 'Köln', lat: 50.9375, lng: 6.9603, services: ['tuner','premium'] },
  { name: 'Rad & Reifen RheinMain', city: 'Frankfurt', lat: 50.1109, lng: 8.6821, services: ['shop','reifenservice'] },
  { name: 'BavarianWheels', city: 'München', lat: 48.1351, lng: 11.582, services: ['premium','tuner'] },
  { name: 'AlpenRad', city: 'Stuttgart', lat: 48.7758, lng: 9.1829, services: ['tuner','shop','reifenservice'] },
  { name: 'RheinAuto', city: 'Düsseldorf', lat: 51.2277, lng: 6.7735, services: ['shop','premium'] },
  { name: 'Ruhr Tuning', city: 'Dortmund', lat: 51.5136, lng: 7.4653, services: ['tuner'] },
  { name: 'Brandenburg Wheel', city: 'Potsdam', lat: 52.3906, lng: 13.0645, services: ['shop'] },
  { name: 'Saxonia Räder', city: 'Dresden', lat: 51.0504, lng: 13.7373, services: ['shop','reifenservice'] },
  { name: 'Leipziger Reifen', city: 'Leipzig', lat: 51.3397, lng: 12.3731, services: ['shop'] },
  { name: 'Pfalz Tuning', city: 'Mannheim', lat: 49.4875, lng: 8.466, services: ['tuner','shop'] },
  { name: 'BodenseeRad', city: 'Konstanz', lat: 47.6779, lng: 9.1732, services: ['premium','shop'] },
  { name: 'Allgäu Wheels', city: 'Augsburg', lat: 48.3705, lng: 10.8978, services: ['shop','reifenservice'] },
  { name: 'Nordsee Reifen', city: 'Bremen', lat: 53.0793, lng: 8.8017, services: ['shop','reifenservice'] },
  { name: 'Westfalen Tuning', city: 'Münster', lat: 51.9607, lng: 7.6261, services: ['tuner','shop'] },
  { name: 'Frankenrad', city: 'Nürnberg', lat: 49.4521, lng: 11.0767, services: ['shop','reifenservice'] },
  { name: 'Thüringen Reifen', city: 'Erfurt', lat: 50.9787, lng: 11.0328, services: ['shop'] },
  { name: 'Hannover Wheels', city: 'Hannover', lat: 52.3759, lng: 9.732, services: ['tuner','premium','shop'] },
  { name: 'Saarbrücken Reifen', city: 'Saarbrücken', lat: 49.2401, lng: 6.9969, services: ['shop'] },
  { name: 'Tirol-Style', city: 'Freiburg', lat: 47.999, lng: 7.8421, services: ['shop','reifenservice'] },
  { name: 'Rostock Räder', city: 'Rostock', lat: 54.0887, lng: 12.1404, services: ['shop'] },
];

export const serviceLabels: Record<string, { label: string; color: string }> = {
  tuner: { label: 'Tuner-System', color: '#FFD400' },
  reifenservice: { label: 'Reifenservice', color: '#A9ADB4' },
  shop: { label: 'Shop', color: '#7AD0FF' },
  premium: { label: 'Premium Partner', color: '#FF7A2A' },
};
