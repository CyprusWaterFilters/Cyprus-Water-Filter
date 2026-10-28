import type { Metadata } from 'next';
import { CertificatesPage } from '@/components/certificates-page';

export const metadata: Metadata = {
  title: 'Certificates | Homewater',
  description: 'Explore Microfilter product certifications, approvals, management-system certificates and patents, with clear context on their scope.',
};

export default function Page() { return <CertificatesPage/>; }
