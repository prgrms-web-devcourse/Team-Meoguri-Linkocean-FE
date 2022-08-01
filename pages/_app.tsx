import "@/styles/reset.css";
import "@/styles/global.css";
import type { AppProps } from "next/app";
import { SessionProvider } from "next-auth/react";

export default function MyApp({ Component, pageProps }: AppProps) {
  return (
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access
    <SessionProvider session={pageProps.session}>
      <Component {...pageProps} />
    </SessionProvider>
  );
}
