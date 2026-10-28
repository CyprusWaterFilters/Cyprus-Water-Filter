export const featuredCertificates = [
  {
    code: 'NSF/ANSI 42',
    number: '42',
    title: 'Taste & clarity',
    description: 'A recognised standard for aesthetic effects such as chlorine taste and odour. Exact claims depend on the listed model.',
  },
  {
    code: 'NSF/ANSI 53',
    number: '53',
    title: 'Health effects',
    description: 'A demanding standard for health-related contaminant reduction claims. Exact coverage is specific to each listed system.',
  },
  {
    code: 'NSF/ANSI 401',
    number: '401',
    title: 'Emerging compounds',
    description: 'A standard for selected emerging contaminants, including microplastics claims on listed systems. Coverage varies by model.',
  },
] as const;

export const certificateArchive = [
  { title: 'NSF product certification', category: 'Product performance', image: '/certificates/nsf-recognition.webp', note: 'Portfolio recognition across NSF/ANSI 42, 53, 58 and 401. Confirm the current listing for your chosen model.' },
  { title: 'WRAS approval', category: 'United Kingdom', image: '/certificates/wras.webp', note: 'A historic Water Regulations Advisory Scheme document for named Microfilter products.' },
  { title: 'ISO 9001', category: 'Quality management', image: '/certificates/iso-9001.webp', note: 'A historic certificate for the manufacturer’s quality management system.' },
  { title: 'ISO 14001', category: 'Environmental management', image: '/certificates/iso-14001.webp', note: 'A historic certificate for the manufacturer’s environmental management system.' },
  { title: 'WaterMark', category: 'Australia', image: '/certificates/watermark.webp', note: 'A historic Australian WaterMark licence for the products named in the document.' },
  { title: 'TÜV conformity', category: 'Conformity assessment', image: '/certificates/tuv-conformity.webp', note: 'A historic conformity document for the water-filter equipment named in the certificate.' },
  { title: 'SII certification', category: 'Israel', image: '/certificates/sii.webp', note: 'A historic Standards Institution of Israel document for the products within its stated scope.' },
  { title: 'European patent', category: 'Innovation', image: '/certificates/european-patent.webp', note: 'A European Patent Office certificate from Microfilter’s intellectual-property portfolio.' },
] as const;
