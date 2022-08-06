import { readdir, readFile } from "fs/promises";
import { InferGetStaticPropsType } from "next";
import { serialize } from "next-mdx-remote/serialize";
import { resolve } from "path";
import Highlighted from "../../components/Highlighted";
import { MDXRemote } from "next-mdx-remote";
import { components } from "../_app";
import Img from "../../components/Img";
import classNames from "classnames";
import Link from "../../components/Link";
import dayjs from "dayjs";

function CardItem({
  children,
  mdx,
  idx,
}: {
  children: React.ReactNode;
  mdx: InferGetStaticPropsType<typeof getStaticProps>["mdx"] extends Array<
    infer T
  >
    ? T
    : never;
  idx: number;
}) {
  return (
    <div
      className={classNames("bg-white w-full px-4 py-6", {
        "dark:bg-gradient-to-r dark:from-primary dark:to-secondary":
          idx % 3 === 0,
        "dark:bg-secondary": idx % 3 === 1,
        "dark:bg-primary": idx % 3 === 2,
      })}
    >
      <Link
        asLink
        href={"/story/" + mdx.slug}
        className="text-2xl pb-2 !m-0 max-w-[max-content]"
      >
        {mdx.mdxSource.frontmatter?.title}
      </Link>

      <p>
        By {mdx.mdxSource.frontmatter?.author} ·{" "}
        {mdx.mdxSource.frontmatter?.date}
      </p>

      {mdx.mdxSource.frontmatter?.thumbnail ? (
        <Img src={mdx.mdxSource.frontmatter?.thumbnail} loading="lazy" />
      ) : null}

      <div className="line-clamp-3">{children}</div>

      <Link className="max-w-[max-content]" asLink href={"/story/" + mdx.slug}>
        Read more
      </Link>
    </div>
  );
}

export default function Blog({
  mdx,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  return (
    <>
      <h1 className="md:text-[4rem] leading-1">
        Discover my latest <Highlighted>stories</Highlighted>.
      </h1>

      <hr />
      <h2>Featured Stories</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {mdx.map((mdx, i) => (
          <CardItem key={i} mdx={mdx} idx={i}>
            <MDXRemote
              {...mdx.mdxSource}
              components={
                {
                  // Hide heading tags from MDX
                  ...components,
                  h2: () => "",
                  h3: () => "",
                  h4: () => "",
                  h5: () => "",
                  h6: () => "",
                } as any
              }
            />
          </CardItem>
        ))}
      </div>
    </>
  );
}

export async function getStaticProps() {
  const dir = await readdir(resolve("mdx/story/"));

  const contents = await Promise.all(
    dir.map(async (_dir) => {
      const res = await readFile(resolve("mdx/story/" + _dir));
      const mdxSource = await serialize(res.toString(), {
        parseFrontmatter: true,
      });

      return { mdxSource, slug: _dir.split(".")[0] };
    })
  );

  return {
    props: {
      mdx: contents.sort((a, b) => {
        const aDate = dayjs(a.mdxSource.frontmatter?.date).toDate();
        const bDate = dayjs(b.mdxSource.frontmatter?.date).toDate();
        return bDate.getTime() - aDate.getTime();
      }),
    },
    revalidate: false,
  };
}