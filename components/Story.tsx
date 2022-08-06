import Link from "next/link";

interface StoryProps {
  meta: {
    title: string;
    author: string;
    date: string;
  };
  children: React.ReactNode;
}

export default function Story(props: StoryProps) {
  return (
    <>
      <h1 className="text-2xl md:text-[4rem] leading-1 md:leading-tight mb-0 mt-10">
        {props.meta.title}
      </h1>

      <p>
        By {props.meta.author} · {props.meta.date}
      </p>

      <nav className="flex" aria-label="Breadcrumb">
        <ol className="inline-flex items-center text-sm space-x-1 md:space-x-3 list-none p-0 !m-0">
          <li className="inline-flex items-center">
            <Link href="/" passHref>
              <a className="inline-flex items-center text-sm font-medium text-gray-700 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white">
                <svg
                  className="w-4 h-4 mr-2"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z"></path>
                </svg>
                Home
              </a>
            </Link>
          </li>
          <li>
            <div className="inline whitespace-nowrap">
              <svg
                className="w-6 h-6 text-gray-400 inline-block align-middle"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                  clipRule="evenodd"
                ></path>
              </svg>
              <Link href="/story" passHref>
                <a className="ml-1 text-sm font-medium inline-block align-middle text-gray-700 hover:text-gray-900 md:ml-2 dark:text-gray-400 dark:hover:text-white">
                  Story
                </a>
              </Link>
            </div>
          </li>
          <li aria-current="page">
            <div className="inline whitespace-nowrap">
              <svg
                className="w-6 h-6 text-gray-400 inline-block align-middle"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                  clipRule="evenodd"
                ></path>
              </svg>
              <span className="ml-1 text-sm font-medium text-gray-500 md:ml-2 dark:text-gray-400 inline-block align-middle whitespace-normal break-all max-w-[180px] md:max-w-none">
                {props.meta.title}
              </span>
            </div>
          </li>
        </ol>
      </nav>

      <hr />

      {props.children}
    </>
  );
}
