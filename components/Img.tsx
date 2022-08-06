import Image from "next/image";

export default function Img(props: any) {
  let src = props.src;
  if (!src?.startsWith("http")) {
    src = require("../public/" + props.src)?.default?.src;
  }

  return (
    <Image
      alt={props.alt}
      {...props}
      src={src}
      layout={props.layout ?? "responsive"}
      height={props.height ?? 50}
      width={props.width ?? 100}
    />
  );
}
