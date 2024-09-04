import "@/styles/globals.css";
import "@/components/Button/Button.css";
import "@/components/Card/Card.css";
import "@/components/Cart/Cart.css";

import type { AppProps } from "next/app";

export default function App({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />;
}
