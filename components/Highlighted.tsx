import classnames from "classnames";

interface HighlightedProps {
  children: React.ReactNode;
  className?: string;
}

export default function Highlighted(props: HighlightedProps) {
  return (
    <span
      className={classnames(
        "text-transparent bg-clip-text bg-gradient-to-r dark:from-secondary dark:to-primary",
        props.className
      )}
    >
      {props.children}
    </span>
  );
}
