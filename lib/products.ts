export const ranges = [
  { name: 'FX', label: 'Commercial-grade fine filtration, made for home.', description: 'A commercial-grade range adapted for residential use, combining carbon filtration with a fine membrane. We’ll help confirm the right size and connection for your home.', detail: '0.1 μm nominal filtration', purpose: 'Everyday drinking & cooking', tone: 'blue' },
  { name: 'HF2', label: 'Commercial-grade carbon filtration at home.', description: 'Commercial-grade carbon filtration selected for residential use, reducing chlorine taste and odour with sizes to suit different households.', detail: '0.5 μm nominal filtration', purpose: 'Taste & odour reduction', tone: 'mint' },
  { name: 'HF2-S', label: 'Commercial-grade filtration with added scale care.', description: 'A commercial-grade range for residential use that pairs carbon filtration with scale inhibition. Ask us to confirm the right fit for your water and appliances.', detail: 'Filtration with scale inhibition', purpose: 'Water & appliance care', tone: 'lilac' },
];
export const modelName = (range: string, size: number) => range === 'HF2-S' ? `HF2-${size}S` : `${range}-${size}`;
export const productImage = (range: string, size: number) => {
  if (![10, 15, 17].includes(size)) return undefined;
  if (range === 'FX') return `/images/fx-${size}.png`;
  if (range === 'HF2-S') return `/images/hf2-s-${size}.png`;
  return undefined;
};

export const sizes = [10, 15, 17];
export const products = ranges.flatMap(range => sizes.map(size => ({ ...range, size, model: modelName(range.name, size) })));
export type Product = (typeof products)[number];
