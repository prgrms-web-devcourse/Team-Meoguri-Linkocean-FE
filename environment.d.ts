declare global {
  namespace NodeJS {
    interface ProcessEnv {
      NEXTAUTH_URL: string;
      GOOGLE_ID: string;
      GOOGLE_SECRET: string;
      GITHUB_ID: string;
      GITHUB_SECRET: string;
      KAKAO_ID: string;
      KAKAO_SECRET: string;
      END_POINT: string;
    }
  }
}

export {};
