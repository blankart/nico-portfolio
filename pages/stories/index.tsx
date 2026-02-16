import { readdir, readFile } from "fs/promises";
import { InferGetStaticPropsType } from "next";
import { serialize } from "next-mdx-remote/serialize";
import { resolve } from "path";
import dayjs from "dayjs";
import NextLink from "next/link";
import HeadSEO, { TITLE, URL } from "../../components/HeadSEO";

function StoryItem({
  frontmatter,
  slug,
}: {
  frontmatter: Record<string, any>;
  slug: string;
}) {
  const date = dayjs(frontmatter?.date);

  return (
    <div className="py-4">
      <NextLink href={"/stories/" + slug} passHref>
        <a className="text-ink font-medium hover:text-accent transition-colors duration-150 no-underline hover:underline">
          {frontmatter?.title}
        </a>
      </NextLink>
      <p className="text-sm text-ink-secondary mt-1 mb-0 leading-relaxed">
        {frontmatter?.description}
      </p>
      <p className="text-xs text-ink-faint mt-2 mb-0">
        {date.format("MMMM D, YYYY")}
      </p>
    </div>
  );
}

export default function Stories({
  mdx,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  return (
    <>
      <HeadSEO
        title={"Stories - " + TITLE}
        url={URL + "/stories"}
        description={"Discover the latest stories from " + TITLE + "."}
      />

      <div className="not-prose">
        <h1 className="text-3xl font-bold text-ink mb-3 leading-snug">
          Stories
        </h1>
        <p className="text-ink-secondary mb-10">
          Writing about the development journey.
        </p>

        <div className="divide-y divide-rule">
          {mdx.map((m, i) => (
            <StoryItem
              key={i}
              frontmatter={m.mdxSource.frontmatter || {}}
              slug={m.slug}
            />
          ))}
        </div>
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
