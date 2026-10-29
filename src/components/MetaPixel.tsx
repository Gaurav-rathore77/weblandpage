'use client';

import Script from 'next/script';
import { siteConfig } from '@/config/site';

export function MetaPixel() {
  if (!siteConfig.metaPixelId) {
    return null;
  }

  return (
    <>
      <Script
        id="meta-pixel"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            !function(f,b,e,v,n,t,s)
            {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
            n.callMethod.apply(n,arguments):n.queue.push(arguments)};
            if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
            n.queue=[];t=b.createElement(e);t.async=!0;
            t.src=v;s=b.getElementsByTagName(e)[0];
            s.parentNode.insertBefore(t,s)}(window, document,'script',
            'https://connect.facebook.net/en_US/fbevents.js');
            fbq('init', '${siteConfig.metaPixelId}');
            fbq('track', 'PageView');
          `,
        }}
      />
      <noscript>
        <img
          height="1"
          width="1"
          style={{ display: 'none' }}
          src={`https://www.facebook.com/tr?id=${siteConfig.metaPixelId}&ev=PageView&noscript=1`}
          alt=""
        />
      </noscript>
    </>
  );
}

declare global {
  interface Window {
    fbq?: (action: string, event?: string, params?: Record<string, unknown>) => void;
  }
}

export function trackLead() {
  if (typeof window !== 'undefined' && window.fbq && siteConfig.metaPixelId) {
    window.fbq('track', 'Lead');
  }
}

export function trackWhatsAppClick() {
  if (typeof window !== 'undefined' && window.fbq && siteConfig.metaPixelId) {
    window.fbq('trackCustom', 'WhatsAppClick');
  }
}

export function trackFormStart() {
  if (typeof window !== 'undefined' && window.fbq && siteConfig.metaPixelId) {
    window.fbq('trackCustom', 'FormStart');
  }
}
