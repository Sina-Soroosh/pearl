import "bootstrap/dist/css/bootstrap.min.css";
import "@/styles/global/custom.css";
import Header from "@/components/modules/Header/Header";
import Head from "next/head";
import Footer from "@/components/modules/Footer/Footer";
import { motion } from "framer-motion";

const variants = {
  hidden: { opacity: 0, x: 0, y: -200 },
  enter: { opacity: 1, x: 0, y: 0 },
};

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
      <motion.div
        variants={variants}
        initial="hidden"
        animate="enter"
        transition={{ type: "linear" }}
      >
        <Header />
      </motion.div>
      <Component {...pageProps} />
      <Footer />
    </>
  );
}
