import "@/styles/globals.css";
import "@/components/Button/Button.css";
import "@/components/Card/Card.css";
import "@/components/Cart/Cart.css";
import { useEffect } from "react";
import { useRouter } from "next/router";
import Script from "next/script";

import type { AppProps } from "next/app";

export default function App({ Component, pageProps }: AppProps) {
  const GA_MEASUREMENT_ID = "G-3MMLLMBW40";
  const router = useRouter();

  useEffect(() => {
    const handleRouteChange = (url: string) => {
      //@ts-ignore
      window.gtag("config", GA_MEASUREMENT_ID, {
        page_path: url,
      });
    };
    router.events.on("routeChangeComplete", handleRouteChange);
    return () => {
      router.events.off("routeChangeComplete", handleRouteChange);
    };
  }, [router.events]);

  return;
  <>
    <Script
      strategy="afterInteractive"
      src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`}
    />
    <Script
      id="google-analytics"
      strategy="afterInteractive"
      dangerouslySetInnerHTML={{
        __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${GA_MEASUREMENT_ID}', {
              page_path: window.location.pathname,
            });
          `,
      }}
    />
    <Component {...pageProps} />
  </>;
}
