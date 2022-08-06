import Head from "next/head";

interface HeadSEOProps {
  title?: string;
  description?: string;
  url?: string;
  imageUrl?: string;
}

export const TITLE = "Nico Mendoza";
export const URL = "https://nico-mendoza.vercel.app";
export const DESCRIPTION =
  "Nico Mendoza is a full-stack web developer and a software engineer.";

export default function HeadSEO({
  title = TITLE,
  description = DESCRIPTION,
  url = URL,
  imageUrl = URL + "/website-image.png",
}: HeadSEOProps) {
  return (
    <Head>
      <title key="title">{title}</title>
      <meta charSet="utf-8" />
      <meta name="robots" content="index, follow" />
      <meta
        name="googlebot"
        content="index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1"
      />
      <meta
        name="bingbot"
        content="index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1"
      />
      <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      <meta
        name="apple-mobile-web-app-title"
        key="apple-mobile-web-app-title"
        content={title}
      />
      <meta name="application-name" key="application-name" content={title} />
      <meta name="og:url" key="og:url" content={url} />
      <meta name="og:locale" content={"en-PH"} />
      <meta name="og:image:width" content={"500"} />
      <meta name="og:image:height" content={"185"} />
      <meta name="og:image:type" content={"image/png"} />
      <meta name="og:site_name" key="og:site_name" content={title} />
      <meta name="og:image" key="og:image" content={imageUrl} />
      <meta name="twitter:image" key="twitter:image" content={imageUrl} />
      <meta name="apple-mobile-web-app-capable" content={"yes"} />
      <meta name="og:title" key="og:title" content={title} />
      <meta name="og:image:alt" key="og:image:alt" content={description} />
      <meta name="twitter:title" key="twitter:title" content={title} />
      <meta name="description" key="description" content={description} />
      <meta name="og:description" key="og:description" content={description} />
      <meta
        name="twitter:description"
        key="twitter:description"
        content={description}
      />
      <link key="canonical" rel="canonical" href={url} />
    </Head>
  );
}
