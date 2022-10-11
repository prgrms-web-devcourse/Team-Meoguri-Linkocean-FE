declare global {
  namespace NodeJS {
    interface ProcessEnv {
      NEXTAUTH_URL: string;
      GOOGLE_ID: string;
      END_POINT: string;
    }
  }
}

export {};
