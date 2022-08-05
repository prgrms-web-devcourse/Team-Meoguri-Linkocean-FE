module.exports = {
  env: {
    GOOGLE_ID: process.env.GOOGLE_ID,
    GOOGLE_SECRET: process.env.GOOGLE_SECRET,
    NAVER_ID: process.env.NAVER_ID,
    NAVER_SECRET: process.env.NAVER_SECRET,
    KAKAO_ID: process.env.KAKAO_ID,
    KAKAO_SECRET: process.env.KAKAO_SECRET,
    END_POINT: process.env.END_POINT,
  },
  experimental: {
    images: {
      unoptimized: true,
    },
  },
};
