const size = {
  desktop: "1440px",
  laptop: "1024px",
  tablet: "640px",
  mobile: "320px",
};

export const color = {
  $mainColor: "#3e4ca2",
  $skyBlue: "#88Bedf",
  $aqua: "#94f1ea",
  $hoverMaincolor: "#303B7D",
  $hoverSkyBlue: "#60A8D4",
  $hoverAqua: "#67EBE1",
  $success: "#22c55e",
  $warning: "#ef4444",
  $gray50: "#F5F5F5",
  $gray100: "#E8E8E8",
  $gray200: "#D8D9D9",
  $gray400: "#B0B0B0",
  $gray600: "#808080",
  $gray800: "#505050",
  $gray900: "#333333",
};

export const text = {
  $headline2: `font-family: 'Pretendard'; 
    font-weight: 700; 
    font-size: 60px; 
    line-height: 72px; 
    letter-spacing: -0.005em;`,
  $headline3: `font-family: 'Pretendard';
    font-weight: 700;
    font-size: 48px;
    line-height: 57px;`,
  $headline4: `font-family: 'Pretendard';
    font-weight: 700;
    font-size: 34px;
    line-height: 41px;`,
  $headline5: `font-family: 'Pretendard';
    font-weight: 700;
    font-size: 24px;
    line-height: 29px;`,
  $subtitle1: `font-family: 'Pretendard';
    font-weight: 700;
    font-size: 16px;
    line-height: 19px;`,
  $subtitle2: `font-family: 'Pretendard';
    font-weight: 700;
    font-size: 14px;
    line-height: 17px;`,
  $body1: `font-family: 'Pretendard';
    font-weight: 400;
    font-size: 16px;
    line-height: 150%;`,
  $body2: `font-family: 'Pretendard';
    font-weight: 400;
    font-size: 14px;
    line-height: 150%;`,
  $body1_light: `font-family: 'Pretendard';
    font-weight: 200;
    font-size: 16px;
    line-height: 150%;`,
  $body2_light: `font-family: 'Pretendard';
    font-weight: 200;
    font-size: 14px;
    line-height: 150%;`,
  $caption: `font-family: 'Pretendard';
    font-weight: 400;
    font-size: 12px;
    line-height: 14px;`,
  $overline: `font-family: 'Pretendard';
    font-weight: 400;
    font-size: 10px;
    line-height: 12px;`,
};

export const shortenOneLine = `
  display: inline-block;
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
`;

export const shortenNLine = (n: number) => `
  overflow: hidden;
  white-space: normal;
  display: -webkit-box;
  -webkit-line-clamp: ${n};
  -webkit-box-orient: vertical;
`;

export const media = {
  desktop: `@media (max-width: ${size.desktop})`,
  laptop: `@media (max-width: ${size.laptop})`,
  tablet: `@media (max-width: ${size.tablet})`,
  mobile: `@media (max-width: ${size.mobile})`,
};
