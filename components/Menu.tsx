import { GiHamburgerMenu } from "react-icons/gi";
import Link from "./Link";
import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/router";
import classNames from "classnames";
const LINKS: { label: string; href: string }[] = [
  { label: "Home", href: "/" },
  { label: "Projects", href: "/projects" },
  { label: "Story", href: "/story" },
];

const Links = () => {
  const router = useRouter();
  return (
    <>
      {LINKS.map(({ label, href }) => (
        <Link
          isActive={router.pathname === href}
          className="text-md md:text-2xl whitespace-nowrap"
          href={href}
          asLink
          key={href}
        >
          {label}
        </Link>
      ))}
    </>
  );
};

const _Menu = () => {
  const [open, setOpen] = useState(false);
  const [onTop, setOnTop] = useState(true);
  const linksRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const listener = (e: any) => {
      if (
        open &&
        e.target !== linksRef.current &&
        e.target.closest("button") !== buttonRef.current
      )
        setOpen(false);
    };

    window.addEventListener("click", listener);

    return () => {
      window.removeEventListener("click", listener);
    };
  }, [open]);

  useEffect(() => {
    const listener = (e: any) => {
      if (e.currentTarget.scrollY === 0) {
        if (!onTop) setOnTop(true);
      } else {
        if (onTop) setOnTop(false);
      }
    };

    window.addEventListener("scroll", listener);

    return () => {
      window.removeEventListener("scroll", listener);
    };
  }, [onTop]);

  return (
    <div className="fixed z-[100] right-5 top-2 prose dark:prose-invert md:hidden">
      <button
        aria-label="Menu"
        ref={buttonRef}
        className={classNames(
          "cursor-pointer hover:opacity-80 bg-gradient-to-r from-secondary to-primary p-2 shadow-lg",
          onTop && "bg-none shadow-none"
        )}
        onClick={() => setOpen(!open)}
      >
        <GiHamburgerMenu className="dark:text-white" />
      </button>
      {open && (
        <div
          ref={linksRef}
          className="flex flex-col min-w-[150px] shadow-lg absolute right-0 bg-white dark:bg-slate-900 my-2 p-4 items-start rounded-md"
        >
          <Links />
        </div>
      )}
    </div>
  );
};

export default function Menu() {
  return (
    <>
      <div className="hidden md:flex sticky top-0 h-screen prose dark:prose-invert p-4 py-10 flex-col gap-y-4 justify-center items-end">
        <Links />
      </div>

      <_Menu />
    </>
  );
}
