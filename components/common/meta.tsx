import { RobotsType } from "@/types/type";
import Head from "next/head";
import React from "react";

const DEFAULT_OG = {
  type: "website",
  image:
    "https://user-images.githubusercontent.com/96400112/184529588-201f35b8-d176-49fe-834e-eee0f1c3ecad.png",
};
interface MetaProps {
  title: string;
  titleWithoutSuffix?: boolean;
  description?: string;
  og?: { [property: string]: string };
  robots: RobotsType;
}

const Meta = ({
  title,
  titleWithoutSuffix = false,
  description = "",
  og,
  robots,
}: MetaProps) => {
  const headTitle = title + (titleWithoutSuffix ? "" : " | LinkOcean");
  const ogObj = { ...DEFAULT_OG, title: headTitle, description, ...og };

  return (
    <Head>
      <title>{headTitle}</title>
      {description ? <meta name="description" content={description} /> : null}
      {og
        ? Object.entries(ogObj).map(([property, content]) =>
            content === "" ? null : (
              <meta property={`og:${property}`} content={content} />
            )
          )
        : null}
      <meta name="robots" content={robots} />
    </Head>
  );
};

export default Meta;
