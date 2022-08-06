import dynamic from "next/dynamic";
import { Children } from "react";
const SyntaxHighlighter = dynamic(
  () => import("react-syntax-highlighter").then((res) => res.Prism as any),
  {
    ssr: false,
    loading: () => (
      <pre className="flex justify-center min-h-[50px] items-center">
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
    <SyntaxHighlighter language="typescript" style={dark} wrapLongLines={true}>
      {children as string}
    </SyntaxHighlighter>
  );
}
