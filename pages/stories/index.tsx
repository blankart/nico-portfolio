import { readdir, readFile } from "fs/promises";
import { InferGetStaticPropsType } from "next";
import { serialize } from "next-mdx-remote/serialize";
import { resolve } from "path";
import Highlighted from "../../components/Highlighted";
import Img from "../../components/Img";
import classNames from "classnames";
import Link from "../../components/Link";
import dayjs from "dayjs";
import HeadSEO, { TITLE } from "../../components/HeadSEO";
import { URL } from "../../components/HeadSEO";

function CardItem({
  mdx,
  idx,
}: {
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
      {mdx.mdxSource.frontmatter?.thumbnail ? (
        <Img
          src={mdx.mdxSource.frontmatter?.thumbnail}
          loading="lazy"
          width={100}
          height={55}
          layout="responsive"
        />
      ) : null}

      <div className="mt-4" />

      <Link
        asLink
        href={"/stories/" + mdx.slug}
        className="text-2xl max-w-[max-content]"
      >
        {mdx.mdxSource.frontmatter?.title}
      </Link>

      <p>
        By {mdx.mdxSource.frontmatter?.author} ·{" "}
        {mdx.mdxSource.frontmatter?.date}
      </p>

      <div className="line-clamp-3 max-h-[7rem]">
        {mdx.mdxSource.frontmatter?.description}
      </div>

      <Link
        className="max-w-[max-content]"
        asLink
        href={"/stories/" + mdx.slug}
      >
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
      <HeadSEO
        title={"Stories - " + TITLE}
        url={URL + "/stories"}
        description={"Discover the latest stories from " + TITLE + "."}
      />
      <h1 className="md:text-[4rem] leading-1">
        I love sharing my <Highlighted>development journey</Highlighted>.{" "}
        Discover my latest <Highlighted>stories</Highlighted>.
      </h1>

      <hr />
      <h2>Featured Stories</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {mdx.map((mdx, i) => (
          <CardItem key={i} mdx={mdx} idx={i} />
        ))}
      </div>
    </>
  );
}

export async function getStaticProps() {
  const dir = await readdir(resolve("mdx/stories/"));

  const contents = await Promise.all(
    dir.map(async (_dir) => {
      const res = await readFile(resolve("mdx/stories/" + _dir));
      const content = res.toString();
      const mdxSource = await serialize(content, {
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
