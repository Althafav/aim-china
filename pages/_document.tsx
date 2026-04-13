// _document.tsx
import HeaderComponent from "@/components/HeaderComponent";
import ScriptsComponents from "@/components/ScriptsComponents";
import Globals from "@/modules/Globals";
import { Html, Head, Main, NextScript } from "next/document";
import Script from "next/script";

export default function Document() {
  return (
    <Html lang="en" translate="no">
      <Head>
        <link rel="icon" href="/favicon.ico" />
        {/* Google Tag Manager */}
        <Script
          strategy="afterInteractive"
          src="https://www.googletagmanager.com/gtag/js?id=AW-11116942866"
        ></Script>
        <Script
          id="gtag-init"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
      window.dataLayer = window.dataLayer || [];
      function gtag(){dataLayer.push(arguments);}
      gtag('js', new Date());
      gtag('config', 'AW-11116942866', {
        page_path: window.location.pathname + window.location.search
      });
    `,
          }}
        />

        {/* End Google Tag Manager */}
        <HeaderComponent />
        {/* ✅ Meta Pixel Code */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              !function(f,b,e,v,n,t,s)
              {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
              n.callMethod.apply(n,arguments):n.queue.push(arguments)};
              if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
              n.queue=[];t=b.createElement(e);t.async=!0;
              t.src=v;s=b.getElementsByTagName(e)[0];
              s.parentNode.insertBefore(t,s)}(window,document,'script',
              'https://connect.facebook.net/en_US/fbevents.js');
              fbq('init', '627534096054807');
              fbq('track', 'PageView');
            `,
          }}
        />

        {/* ✅ NoScript Version (for users with JS disabled) */}
        <noscript>
          <img
            height="1"
            width="1"
            style={{ display: "none" }}
            src="https://www.facebook.com/tr?id=627534096054807&ev=PageView&noscript=1"
          />
        </noscript>
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.1/css/all.min.css"
        />
      </Head>
      <body>
        {/* Google Tag Manager (noscript fallback) */}
        <noscript>
          <iframe
            src="https://www.googletagmanager.com/ns.html?id=AW-11116942866"
            height="0"
            width="0"
            style={{ display: "none", visibility: "hidden" }}
          />
        </noscript>
        {/* End Google Tag Manager */}
        <Main />
        <NextScript />
        <Script
          src={`/assets/js/bootstrap.bundle.min.js`}
          strategy="lazyOnload"
        />
      </body>
    </Html>
  );
}
