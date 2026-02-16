import "../styles/globals.css";
import type { AppProps } from "next/app";
import Menu from "../components/Menu";
import { MDXProvider, useMDXComponents } from "@mdx-js/react";
import Img from "../components/Img";
import Pre from "../components/Pre";
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
      <div className="min-h-screen">
        <Menu />
        <main className="max-w-[640px] mx-auto px-5 py-12 md:py-20">
          <div className="prose prose-invert max-w-none prose-a:text-accent prose-a:no-underline hover:prose-a:underline prose-pre:bg-page-hover prose-pre:border-0 prose-hr:border-rule">
            <MDXProvider components={components as any}>
              <Component {...pageProps} />
            </MDXProvider>
          </div>
        </main>
      </div>
    </>
  );
}

export default MyApp;
