import { useRouter } from "next/router";
import NextLink from "next/link";
import classNames from "classnames";

const NAV = [
  { label: "Home", href: "/" },
  { label: "Projects", href: "/projects" },
  { label: "Stories", href: "/stories" },
];

export default function Menu() {
  const router = useRouter();

  return (
    <header className="max-w-[640px] mx-auto px-5 pt-8 md:pt-12">
      <nav className="flex items-center gap-6">
        {NAV.map(({ label, href }) => {
          const isActive =
            href === "/"
              ? router.pathname === "/"
              : router.pathname.startsWith(href);

          return (
            <NextLink key={href} href={href} passHref>
              <a
                className={classNames(
                  "text-sm no-underline transition-colors duration-150",
                  isActive
                    ? "text-ink"
                    : "text-ink-tertiary hover:text-ink-secondary"
                )}
              >
                {label}
              </a>
            </NextLink>
          );
        })}
      </nav>
    </header>
  );
}
