import { Html, Head, Main, NextScript } from 'next/document'

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        {/* Preload critical resources */}
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
        
        {/* Critical CSS inlining hint */}
        <style>{`
          /* Critical CSS for LCP optimization */
          .hero-container { contain: layout style paint; }
          .profile-image { contain: layout; }
          img[priority] { content-visibility: auto; }
        `}</style>
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}
