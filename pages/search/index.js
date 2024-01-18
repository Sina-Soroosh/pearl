import Main from "@/components/templates/Search/Main";
import Head from "next/head";
import { useRouter } from "next/router";
import React from "react";

function Search() {
  const router = useRouter();

  return (
    <>
      <Head>
        <title>Pearl - {`نیجه جستوجو "${router.query.q}"`}</title>
      </Head>

      <Main />
    </>
  );
}

export default Search;
