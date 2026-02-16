import dayjs from "dayjs";

interface StoryProps {
  meta: {
    title: string;
    author: string;
    date: string;
  };
  children: React.ReactNode;
}

export default function Story(props: StoryProps) {
  const date = dayjs(props.meta.date);

  return (
    <>
      <div className="not-prose mb-10">
        <h1 className="text-3xl font-bold text-ink mb-3 leading-snug">
          {props.meta.title}
        </h1>
        <p className="text-sm text-ink-tertiary">
          {props.meta.author} · {date.format("MMMM D, YYYY")}
        </p>
      </div>

      <hr className="border-t border-rule mb-8 not-prose" />

      {props.children}
    </>
  );
}
