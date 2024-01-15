import "bootstrap/dist/css/bootstrap.min.css";
import "@/styles/global/custom.css";
import Header from "@/components/modules/Header/Header";

export default function App({ Component, pageProps }) {
  return (
    <>
      <Header />
      <Component {...pageProps} />
    </>
  );
}
