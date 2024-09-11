import "@/styles/globals.css";
import "@/components/Button/Button.css";
import "@/components/Card/Card.css";
import "@/components/Cart/Cart.css";
import { useEffect } from "react";
import { useRouter } from "next/router";
import Script from "next/script";

import type { AppProps } from "next/app";

export default function App({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />;
}
