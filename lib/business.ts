// Replace provisional identity with the owner's confirmed public business details.
export const business = { name: 'Cyprus Water Filters', whatsapp: '+35796911787', serviceArea: '' };
export function enquiryUrl(message: string) {
  const phone = business.whatsapp.replace(/\D/g, '');
  return phone ? `https://wa.me/${phone}?text=${encodeURIComponent(message)}` : '';
}

export const enquiryMessage = "Hello! I'd like to know more about {subject}. Could you help me with pricing and the right filter for my home?";
