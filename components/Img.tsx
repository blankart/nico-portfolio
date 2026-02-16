export default function Img(props: any) {
  let src = props.src;
  if (src && !src.startsWith("http")) {
    src = "/" + src;
  }

  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={src}
      alt={props.alt || ""}
      loading="lazy"
      className="w-full h-auto rounded"
    />
  );
}
