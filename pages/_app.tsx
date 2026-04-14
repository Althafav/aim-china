// _app.tsx
import LayoutComponent from "@/components/LayoutComponent";
import Custom500 from "@/components/UI/Custom500";
import PageLoader from "@/components/UI/PageLoader";
import type { AppProps } from "next/app";
import Head from "next/head";
import { useRouter } from "next/router";
import { useEffect } from "react";

export default function App({ Component, pageProps }: AppProps) {
  const router = useRouter();

  useEffect(() => {
    if (typeof window !== "undefined") {
      if (window.location.pathname === "/register") {
        router.replace("/packages?source=website");
      }

      if (window.location.pathname === "/delegate-register") {
        router.replace("/packages?source=website");
      }

      if (window.location.pathname === "/contact-us") {
        router.replace("/register-interest");
      }
    }
  }, []);

  if (pageProps?.error) {
    return (
      <>
        <Head>
          <meta name="viewport" content="width=device-width, initial-scale=1" />
        </Head>

        <LayoutComponent>
          <Custom500 />
        </LayoutComponent>
      </>
    );
  }
  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <PageLoader />
      <LayoutComponent>
        <Component {...pageProps} />
      </LayoutComponent>
    </>
  );
}
