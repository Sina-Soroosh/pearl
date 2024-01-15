import "bootstrap/dist/css/bootstrap.min.css";
import "@/styles/global/custom.css";
import Header from "@/components/modules/Header/Header";
import Head from "next/head";

export default function App({ Component, pageProps }) {
  return (
    <>
      <Head>
        <link
          rel="icon"
          type="image/png"
          href="/images/logo/pearl-favicon-color.png"
        />
      </Head>
      <Header />
      <Component {...pageProps} />
    </>
  );
}
