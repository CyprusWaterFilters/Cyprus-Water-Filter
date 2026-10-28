// Replace provisional identity with the owner's confirmed public business details.
export const business = { name: 'Cyprus Water Filters', whatsapp: '', serviceArea: '' };
export function enquiryUrl(message: string) {
  const phone = business.whatsapp.replace(/\D/g, '');
  return phone ? `https://wa.me/${phone}?text=${encodeURIComponent(message)}` : '';
}
