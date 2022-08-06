import "../styles/globals.css";
import type { AppProps } from "next/app";
import Menu from "../components/Menu";
import { MDXProvider, useMDXComponents } from "@mdx-js/react";
import Img from "../components/Img";
import Pre from "../components/Pre";
import OpenSourceBanner from "../components/OpenSourceBanner";
import Head from "next/head";
import HeadSEO from "../components/HeadSEO";

export const components: Parameters<typeof useMDXComponents>[0] = {
  pre: Pre,
  img: Img,
  Image: Img,
};

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <HeadSEO />
      <OpenSourceBanner />
      <main className="scroll-smooth min-h-screen flex justify-center p-4 md:p-10 py-10 relative">
        <Menu />

        <div className="prose dark:prose-invert w-[min(900px,100vw)] max-w-none">
          <MDXProvider components={components as any}>
            <Component {...pageProps} />
          </MDXProvider>
        </div>
      </main>
    </>
  );
}

export default MyApp;
