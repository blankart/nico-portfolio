import {
  FaInstagram,
  FaFacebookMessenger,
  FaLinkedin,
  FaTwitter,
  FaGoogle,
  FaGithub,
} from "react-icons/fa";

export default function SocialButtons() {
  return (
    <div className="flex gap-2 md:gap-4 text-lg md:text-3xl items-center">
      <a href="https://github.com/blankart" target="_blank" rel="noreferrer">
        <FaGithub
          className="hover:opacity-90 duration-100 cursor-pointer"
          aria-label="Github"
        />
      </a>

      <a
        href="https://www.instagram.com/masterocinn/"
        target="_blank"
        rel="noreferrer"
      >
        <FaInstagram
          className="hover:opacity-90 duration-100 cursor-pointer"
          aria-label="Instagram"
        />
      </a>

      <a href="https://m.me/de.ebblankart" target="_blank" rel="noreferrer">
        <FaFacebookMessenger
          className="hover:opacity-90 duration-100 cursor-pointer"
          aria-label="Facebook Messenger"
        />
      </a>

      <a
        href="https://www.linkedin.com/in/nico-mendoza-82631914b/"
        target="_blank"
        rel="noreferrer"
      >
        <FaLinkedin
          className="hover:opacity-90 duration-100 cursor-pointer"
          aria-label="LinkedIn"
        />
      </a>

      <a href="https://twitter.com/masterocin" target="_blank" rel="noreferrer">
        <FaTwitter
          className="hover:opacity-90 duration-100 cursor-pointer"
          aria-label="Twitter"
        />
      </a>

      <a href="mailto:blankartwp@gmail.com">
        <FaGoogle
          className="hover:opacity-90 duration-100 cursor-pointer"
          aria-label="Email"
        />
      </a>

      <a
        className="flex items-start"
        href="https://cryptojobslist.com/talent/profile/full-stack-developer-carmona-philippines-c05rssq1l1"
        target="_blank"
        rel="noreferrer"
      >
        <img
          src="https://cryptojobslist.com/images/logo-circle-white.svg"
          className="hover:opacity-90 duration-100 cursor-pointer inline-block w-[18px] h-[18px] md:w-[30px] md:h-[30px] m-0"
          aria-label="Crypto Jobs List"
        />
      </a>
    </div>
  );
}
