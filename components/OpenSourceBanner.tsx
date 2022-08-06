import { useEffect, useState } from "react";
import { AiOutlineCloseCircle } from "react-icons/ai";

export default function OpenSourceBanner() {
  const [show, _setShow] = useState(false);

  useEffect(() => {
    if (localStorage.getItem("openSourceBanner") !== "false") {
      setShow(true);
    }
  }, []);

  const setShow = (newValue: boolean) => {
    localStorage.setItem("openSourceBanner", newValue ? "true" : "false");
    _setShow(newValue);
  };

  if (!show) return null;
  return (
    <section className="hidden md:block prose dark:prose-invert max-w-none p-2 bg-secondary text-center w-full">
      This porfolio is open source. Feel free to check the source code on{" "}
      <a
        href="https://github.com/blankart/nico-portfolio"
        target="_blank"
        rel="noreferrer"
      >
        Github
      </a>{" "}
      🚀.
      <AiOutlineCloseCircle
        onClick={() => setShow(false)}
        aria-label="Close"
        type="button"
        className="text-white inline-block mb-1 ml-5 cursor-pointer"
      />
    </section>
  );
}
