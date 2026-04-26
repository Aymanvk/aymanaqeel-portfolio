import type { Metadata } from 'next';
import { Space_Grotesk, Inter, Space_Mono, Cormorant_Garamond } from 'next/font/google';
import './globals.css';
import { Suspense } from 'react';
import Navbar from '@/components/ui/Navbar';
import CursorGlow from '@/components/ui/CursorGlow';
import LenisProvider from '@/components/ui/LenisProvider';
import AOSInit from '@/components/ui/AOSInit';
import ComingSoon from '@/components/ui/ComingSoon';
import ComingSoonFallback from '@/components/ui/ComingSoonFallback';

const spaceGrotesk = Space_Grotesk({ subsets: ['latin'], variable: '--font-display' });
const inter = Inter({ subsets: ['latin'], variable: '--font-body' });
const spaceMono = Space_Mono({ weight: ["400", "700"], subsets: ['latin'], variable: '--font-mono' });
const cormorant = Cormorant_Garamond({ weight: ["300", "400", "500", "600"], subsets: ['latin'], style: ['normal', 'italic'], variable: '--font-serif' });

export const metadata: Metadata = {
  title: 'Ayman Aqeel — Full-Stack Developer',
  description: 'Software is going nowhere, ever.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const isComingSoon = process.env.NEXT_PUBLIC_COMING_SOON === 'true';

  return (
    <html lang="en" className={`${spaceGrotesk.variable} ${inter.variable} ${spaceMono.variable} ${cormorant.variable}`}>
      <body className="antialiased">
        {isComingSoon && (
          <Suspense fallback={<ComingSoonFallback />}>
            <ComingSoon />
          </Suspense>
        )}
        <LenisProvider>
          <AOSInit />
          <CursorGlow />
          <Navbar />
          {children}
        </LenisProvider>
      </body>
    </html>
  );
}
