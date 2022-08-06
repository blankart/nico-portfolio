import dynamic from "next/dynamic";
import { Children } from "react";
import LazyLoad from "react-lazyload";

const SyntaxHighlighter = dynamic(
  () => import("react-syntax-highlighter").then((res) => res.Prism as any),
  {
    ssr: false,
    loading: () => (
      <pre className="flex justify-center min-h-[50px] items-center bg-[rgb(40,44,52)]">
        Loading code...
      </pre>
    ),
  }
) as unknown as typeof import("react-syntax-highlighter").Prism;

/* @ts-ignore */
import dark from "react-syntax-highlighter/dist/cjs/styles/prism/one-dark";

export default function Pre({
  children,
  ...rest
}: {
  children?: React.ReactNode;
}) {
  children = (Children.toArray(children)?.[0] as any)?.props?.children;

  return (
    <LazyLoad
      unmountIfInvisible
      height={50}
      once
      placeholder={
        <pre className="flex justify-center min-h-[50px] items-center bg-[rgb(40,44,52)]">
          Loading code...
        </pre>
      }
    >
      <SyntaxHighlighter
        language="typescript"
        style={dark}
        wrapLongLines={true}
      >
        {children as string}
      </SyntaxHighlighter>
    </LazyLoad>
  );
}
