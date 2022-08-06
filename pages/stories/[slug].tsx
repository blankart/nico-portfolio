import { serialize } from "next-mdx-remote/serialize";
import { MDXRemote } from "next-mdx-remote";
import { InferGetStaticPropsType } from "next";
import { components } from "../_app";
import { readdir, readFile } from "fs/promises";
import { resolve } from "path";
import Story from "../../components/Story";
import HeadSEO, { TITLE, URL } from "../../components/HeadSEO";

export default function StoryItem({
  source,
  slug,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  return (
    <>
      <HeadSEO
        title={(source.frontmatter?.title || "Untitled") + " - " + TITLE}
        description={source.frontmatter?.description}
        url={URL + "/stories/" + slug}
      />
      <Story meta={source.frontmatter as any}>
        <MDXRemote {...source} components={components as any} />
      </Story>
    </>
  );
}

export async function getStaticPaths() {
  const dir = await readdir(resolve("mdx/stories/"));
  return {
    paths: dir.map((_dir) => ({ params: { slug: _dir.split(".")[0] } })),
    fallback: false,
  };
}

export async function getStaticProps(ctx: any) {
  const res = await readFile(
    resolve("mdx/stories/" + ctx.params.slug + ".mdx")
  );
  const mdxSource = await serialize(res.toString(), {
    parseFrontmatter: true,
  });

  return { props: { source: mdxSource, slug: ctx.params.slug } };
}
