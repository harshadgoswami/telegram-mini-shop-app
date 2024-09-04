import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  function gtag() {
    //@ts-ignore
    dataLayer.push(arguments);
  }

  return (
    <Html lang="en">
      <Head>
        <script
          async
          src="https://www.googletagmanager.com/gtag/js?id=G-3MMLLMBW40"
        ></script>
        <script>
          window.dataLayer = window.dataLayer || []; gtag('js', new Date());
          gtag('config', 'G-3MMLLMBW40');
        </script>
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
