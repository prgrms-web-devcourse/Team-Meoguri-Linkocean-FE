import "@/styles/reset.css";
import "@/styles/global.css";
import type { AppProps } from "next/app";
import ProfileProvider from "@/store/ProfileProvider";

if (process.env.NEXT_PUBLIC_API_MOCKING === "enabled") {
  import("../mocks");
}
export default function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ProfileProvider>
      <Component {...pageProps} />
    </ProfileProvider>
  );
}
