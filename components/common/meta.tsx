import { RobotsType } from "@/types/type";
import Head from "next/head";
import React from "react";

const DEFAULT_OG_ARR = [
  ["type", "website"],
  [
    "image",
    "https://user-images.githubusercontent.com/96400112/184529588-201f35b8-d176-49fe-834e-eee0f1c3ecad.png",
  ],
];
interface MetaProps {
  title: string;
  titleWithoutSuffix?: boolean;
  description?: string;
  needOg?: boolean;
  robots: RobotsType;
}

const Meta = ({
  title,
  titleWithoutSuffix = false,
  description = "",
  needOg = false,
  robots,
}: MetaProps) => {
  const headTitle = title + (titleWithoutSuffix ? "" : " | LinkOcean");
  const ogArr = needOg
    ? [...DEFAULT_OG_ARR, ["title", headTitle], ["description", description]]
    : [];

  return (
    <Head>
      <title>{headTitle}</title>
      {description ? <meta name="description" content={description} /> : null}
      {ogArr.map(([property, content]) =>
        content === "" ? null : (
          <meta property={`og:${property}`} content={content} />
        )
      )}
      <meta name="robots" content={robots} />
    </Head>
  );
};

export default Meta;
