export type VehicleBrand = {
  id: string;
  name: string;
  models: string[];
};

export const vehicleBrands: VehicleBrand[] = [
  { id: 'audi', name: 'Audi', models: ['A3 8Y', 'A4 B9', 'A5 F5', 'A6 C8', 'A7 4K', 'RS3 8Y', 'RS6 C8', 'Q5 FY', 'Q7 4M', 'Q8 4M', 'e-tron GT'] },
  { id: 'bmw', name: 'BMW', models: ['1er F40', '2er G42', '3er G20', '4er G22', '5er G60', '7er G70', 'M2 G87', 'M3 G80', 'M4 G82', 'X3 G45', 'X5 G05', 'X7 G07'] },
  { id: 'mercedes', name: 'Mercedes-Benz', models: ['A-Klasse W177', 'C-Klasse W206', 'E-Klasse W214', 'S-Klasse W223', 'AMG GT', 'GLC X254', 'G-Klasse W464', 'EQS V297'] },
  { id: 'porsche', name: 'Porsche', models: ['911 992', 'Taycan', 'Macan 95B', 'Cayenne 9YA', 'Panamera 971'] },
  { id: 'vw', name: 'Volkswagen', models: ['Golf 8 R', 'Passat B9', 'Tiguan III', 'Touareg CR', 'ID.7', 'Arteon 3H', 'Multivan T7', 'T6.1 / T7 California'] },
  { id: 'tesla', name: 'Tesla', models: ['Model 3 Highland', 'Model Y', 'Model S Plaid', 'Model X', 'Cybertruck'] },
  { id: 'rivian', name: 'Rivian', models: ['R1T', 'R1S'] },
  { id: 'ford', name: 'Ford', models: ['Mustang Mach-E', 'Mustang GT S650', 'F-150 Lightning', 'Bronco 2.0'] },
  { id: 'volvo', name: 'Volvo', models: ['EX90', 'XC60 II', 'XC90 II'] },
  { id: 'lambo', name: 'Lamborghini', models: ['Urus SE', 'Revuelto', 'Huracán'] },
];

export type ConfigStep = 'vehicle' | 'category' | 'wheel' | 'size' | 'finish' | 'summary';
