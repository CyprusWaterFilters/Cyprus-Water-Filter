import type { Metadata } from 'next';
import { Geist, Geist_Mono, Noto_Sans } from 'next/font/google';
import { LanguageProvider } from '@/components/language-provider';
import './globals.css';
import './responsive.css';
import './hero-refresh.css';
import './support-sections.css';
import './navigation.css';
import './languages.css';
import './entrances.css';
import './catalogue.css';
import './desktop-navigation.css';
import './footer.css';
import './certificates.css';
import './brand.css';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin', 'cyrillic'],
});

const greekSans = Noto_Sans({ variable: '--font-greek-sans', subsets: ['greek', 'latin'], display: 'swap' });

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'Homewater | Commercial-grade water filtration for your home',
  description: 'Explore commercial-grade FX, HF2 and HF2-S water filtration systems selected and fitted for residential use.',
  robots: { index: false, follow: false },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${greekSans.variable} antialiased`}
      >
        <LanguageProvider>{children}</LanguageProvider>
      </body>
    </html>
  );
}
