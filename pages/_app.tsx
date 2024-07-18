// pages/_app.tsx
import "../styles/globals.css";
import type { AppProps } from "next/app";

import { Poppins } from "@next/font/google";

const poppins = Poppins({
  weight: ["300", "400", "700", "800"],
  subsets: ["latin"],
});

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <main className={`${poppins.className} bg-black min-h-screen text-white flex items-center justify-center w-full py-10`}>
      <Component {...pageProps} />
    </main>
  );
}

export default MyApp;
