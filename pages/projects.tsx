import { readdir, readFile } from "fs/promises";
import { InferGetStaticPropsType } from "next";
import { serialize } from "next-mdx-remote/serialize";
import { resolve } from "path";
import HeadSEO, { TITLE, URL } from "../components/HeadSEO";

function ProjectItem({
  frontmatter,
}: {
  frontmatter: Record<string, any>;
}) {
  const tags = (frontmatter?.tags as string[]) || [];

  return (
    <div className="py-4">
      <div className="flex items-start justify-between gap-4">
        <div>
          <a
            href={frontmatter?.url}
            target="_blank"
            rel="noreferrer"
            className="text-ink font-medium hover:text-accent transition-colors duration-150 no-underline hover:underline"
          >
            {frontmatter?.name}
          </a>
          {frontmatter?.archived && (
            <span className="text-xs text-ink-faint ml-2">archived</span>
          )}
        </div>
        {frontmatter?.source_code && (
          <a
            href={frontmatter.source_code}
            target="_blank"
            rel="noreferrer"
            className="text-xs text-ink-tertiary hover:text-ink-secondary transition-colors no-underline hover:underline shrink-0"
          >
            source
          </a>
        )}
      </div>
      <p className="text-sm text-ink-secondary mt-1 mb-0 leading-relaxed">
        {frontmatter?.description}
      </p>
      {tags.length > 0 && (
        <p className="text-xs text-ink-faint mt-2 mb-0">
          {tags.join(" · ")}
        </p>
      )}
    </div>
  );
}

export default function Projects({
  mdx,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  const personal = mdx.filter(
    (m) => m.mdxSource.frontmatter?.category === "personal"
  );
  const work = mdx.filter(
    (m) => m.mdxSource.frontmatter?.category === "work-related"
  );

  return (
    <>
      <HeadSEO
        title={"Projects - " + TITLE}
        url={URL + "/projects"}
        description={`Some of ${TITLE}'s projects which he have worked on in the past.`}
      />

      <div className="not-prose">
        <h1 className="text-3xl font-bold text-ink mb-3 leading-snug">
          Projects
        </h1>
        <p className="text-ink-secondary mb-10">
          Things I&apos;ve built — personal and professional.
        </p>

        {/* Personal */}
        <h2 className="text-sm font-medium text-ink-secondary mb-0">
          Personal
        </h2>
        <div className="divide-y divide-rule">
          {personal.map((m, i) => (
            <ProjectItem key={i} frontmatter={m.mdxSource.frontmatter || {}} />
          ))}
        </div>

        <hr className="border-t border-rule my-10" />

        {/* Work */}
        <h2 className="text-sm font-medium text-ink-secondary mb-0">
          Work
        </h2>
        <div className="divide-y divide-rule">
          {work.map((m, i) => (
            <ProjectItem key={i} frontmatter={m.mdxSource.frontmatter || {}} />
          ))}
        </div>
      </div>
    </>
  );
}

export async function getStaticProps() {
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
    revalidate: false,
  };
}
