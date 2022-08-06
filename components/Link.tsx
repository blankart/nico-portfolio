import classNames from "classnames";
import { FaArrowRight } from "react-icons/fa";
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
  if (isActive) {
    return (
      <span
        className={classNames(
          "inline text-blue-600 dark:text-blue-400 group duration-100 underline font-[500]",
          className
        )}
      >
        {children}
        <FaArrowRight className="opacity-0 translate-y-2 ml-2 inline-block mb-1" />
      </span>
    );
  }

  if (asLink) {
    return (
      <NextLink target={target} href={href} passHref>
        <a
          className={classNames(
            "inline hover:text-blue-600 dark:hover:text-blue-400 group duration-100 no-underline",
            className
          )}
        >
          <span className="underline">{children}</span>
          <FaArrowRight className="opacity-0 translate-y-2 group-hover:opacity-100 duration-100 group-hover:translate-y-0 ml-2 inline-block mb-1" />
        </a>
      </NextLink>
    );
  }
  return (
    <a
      className={classNames(
        "inline hover:text-blue-600 dark:hover:text-blue-400 group duration-100 no-underline",
        className
      )}
      href={href}
      target={target}
    >
      <span className="underline">{children}</span>
      <FaArrowRight className="opacity-0 translate-y-2 group-hover:opacity-100 duration-100 group-hover:translate-y-0 ml-2 inline-block mb-1" />
    </a>
  );
}
