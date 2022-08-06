import { readdir, readFile } from "fs/promises";
import { InferGetServerSidePropsType } from "next";
import { serialize } from "next-mdx-remote/serialize";
import { resolve } from "path";
import Highlighted from "../components/Highlighted";
import { MDXRemote } from "next-mdx-remote";
import { components } from "./_app";
import Img from "../components/Img";
import classNames from "classnames";
import Link from "../components/Link";
import Head from "next/head";
import HeadSEO, { TITLE, URL } from "../components/HeadSEO";

function CardItem({
  children,
  mdx,
  idx,
}: {
  children: React.ReactNode;
  mdx: InferGetServerSidePropsType<
    typeof getServerSideProps
  >["mdx"] extends Array<infer T>
    ? T
    : never;
  idx: number;
}) {
  return (
    <div
      className={classNames("bg-white w-full px-4 py-6 relative", {
        "dark:bg-gradient-to-r dark:from-primary dark:to-secondary":
          idx % 3 === 0,
        "dark:bg-secondary": idx % 3 === 1,
        "dark:bg-primary": idx % 3 === 2,
      })}
    >
      <div className="flex flex-col items-start gap-3 py-3">
        {!!mdx.mdxSource.frontmatter?.archived && (
          <div
            className="absolute right-1 top-1 p-1 px-4 text-xs rounded-bl-sm overflow-hidden bg-primary"
            title="This project is no longer maintained."
          >
            Archived
          </div>
        )}
        <Link
          href={mdx.mdxSource.frontmatter?.url as string}
          target="_blank"
          className="max-w-fit text-2xl pb-2 !m-0 !p-0"
        >
          {mdx.mdxSource.frontmatter?.name}
        </Link>
        <div className="flex gap-2 flex-wrap">
          {(mdx.mdxSource.frontmatter?.tags as unknown as string[])?.map(
            (tag) => (
              <span
                key={tag}
                className="text-xs text-gray-200 border-gray-200 px-4 py-1 border-[1px] rounded-sm whitespace-nowrap"
              >
                {tag}
              </span>
            )
          )}
        </div>
      </div>

      <p className="text-white">{mdx.mdxSource.frontmatter?.description}</p>

      {mdx.mdxSource.frontmatter?.thumbnail ? (
        <Img src={mdx.mdxSource.frontmatter?.thumbnail} loading="lazy" />
      ) : null}

      <div className="line-clamp-3">{children}</div>

      <div className="flex flex-col md:flex-row items-start md:items-center justify-between">
        <Link href={mdx.mdxSource.frontmatter?.url as string} target="_blank">
          Visit Project
        </Link>

        {!!mdx.mdxSource.frontmatter?.source_code && (
          <Link href={mdx.mdxSource.frontmatter?.source_code} target="_blank">
            View Source Code
          </Link>
        )}
      </div>
    </div>
  );
}

export default function Stories({
  mdx,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  return (
    <>
      <HeadSEO
        title={"Projects - " + TITLE}
        url={URL + "/projects"}
        description={`Some of ${TITLE}'s projects which he have worked on in the past.`}
      />
      <h1 className="md:text-[4rem] leading-1">
        These are some of the <Highlighted>projects</Highlighted> which
        I&apos;ve worked on in the past.
      </h1>

      <hr />

      <h2 className="sticky top-0 z-[11] block bg-dark py-2">
        Personal Projects
      </h2>

      <div className="grid grid-cols-1 gap-4">
        {mdx
          .filter((_mdx) => _mdx.mdxSource.frontmatter?.category === "personal")
          .map((mdx, i) => (
            <CardItem key={i} idx={i} mdx={mdx}>
              <MDXRemote {...mdx.mdxSource} components={components as any} />
            </CardItem>
          ))}
      </div>

      <h2 className="sticky top-0 z-[11] block bg-dark py-2">
        Work-related Projects
      </h2>

      <div className="grid grid-cols-1 gap-4">
        {mdx
          .filter(
            (_mdx) => _mdx.mdxSource.frontmatter?.category === "work-related"
          )
          .map((mdx, i) => (
            <CardItem key={i} idx={i} mdx={mdx}>
              <MDXRemote {...mdx.mdxSource} components={components as any} />
            </CardItem>
          ))}
      </div>
    </>
  );
}

export async function getServerSideProps() {
  const dir = await readdir(resolve("mdx/projects/"));

  const contents = await Promise.all(
    dir.map(async (_dir) => {
      const res = await readFile(resolve("mdx/projects/" + _dir));
      const mdxSource = await serialize(res.toString(), {
        parseFrontmatter: true,
      });

      return { mdxSource, slug: _dir.split(".")[0] };
    })
  );

  return {
    props: {
      mdx: contents,
    },
  };
}
