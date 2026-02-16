import classnames from "classnames";

interface HighlightedProps {
  children: React.ReactNode;
  className?: string;
}

export default function Highlighted(props: HighlightedProps) {
  return (
    <span
      className={classnames("text-ink font-medium", props.className)}
    >
      {props.children}
    </span>
  );
}
