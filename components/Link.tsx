import classNames from "classnames";
import NextLink from "next/link";

interface LinkProps {
  children: React.ReactNode;
  href: string;
  className?: string;
  target?: string;
  asLink?: boolean;
  isActive?: boolean;
}

export default function Link({
  children,
  href,
  className,
  target,
  asLink,
  isActive,
}: LinkProps) {
  const baseClass = "text-accent hover:text-accent-hover transition-colors duration-150";

  if (isActive) {
    return (
      <span className={classNames("text-ink font-medium", className)}>
        {children}
      </span>
    );
  }

  if (asLink) {
    return (
      <NextLink target={target} href={href} passHref>
        <a className={classNames(baseClass, "no-underline hover:underline", className)}>
          {children}
        </a>
      </NextLink>
    );
  }

  return (
    <a
      className={classNames(baseClass, "no-underline hover:underline", className)}
      href={href}
      target={target}
    >
      {children}
    </a>
  );
}
