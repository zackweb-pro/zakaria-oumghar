import { Inter } from 'next/font/google';
import { Analytics } from '@vercel/analytics/react';
import { SpeedInsights } from '@vercel/speed-insights/react';
import ClientLayout from './ClientLayout';
import '../index.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'Zakaria Oumghar - Portfolio',
  description: 'Portfolio of Zakaria Oumghar - Software Engineer - Full Stack Developer MERN & SPRING BOOT - Extensions Developer',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/favicon/favicon.ico" />
        
        {/* Critical resource preloads for LCP optimization */}
        <link rel="preload" href="/assets/portfolio-image.jpeg" as="image" fetchPriority="high" />
        
        {/* DNS prefetch for external resources */}
        <link rel="dns-prefetch" href="//images.unsplash.com" />
        <link rel="dns-prefetch" href="//fonts.googleapis.com" />
        <link rel="dns-prefetch" href="//api.fontshare.com" />
        
        {/* Preconnect to critical third-party domains */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link rel="preconnect" href="https://api.fontshare.com" />
        <link rel="preconnect" href="https://images.unsplash.com" />
      </head>
      <body className={inter.className}>
        <ClientLayout>
          {children}
        </ClientLayout>
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
