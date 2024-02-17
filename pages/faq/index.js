import Main from "@/components/templates/faq/Main";
import { connectToDB } from "@/config/db";
import faqModel from "@/models/faq";
import Head from "next/head";
import React from "react";

function Faq({ faqs }) {
  return (
    <>
      <Head>
        <title>Pearl - سوالات متداول</title>
      </Head>

      <Main faqs={faqs} />
    </>
  );
}

export async function getStaticProps() {
  await connectToDB();

  const faqs = await faqModel.find();

  return {
    props: {
      faqs: JSON.parse(JSON.stringify(faqs)),
    },
    revalidate: 60 * 60 * 24,
  };
}

export default Faq;
