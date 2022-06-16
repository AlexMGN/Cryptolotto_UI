import type { NextPage } from "next";
import Head from "next/head";
import { LotteriesView } from "../views";

const Lotteries: NextPage = (props) => {
  return (
    <div>
      <Head>
        <title>Cryptolotto</title>
        <meta
          name="description"
          content="Lotteries"
        />
      </Head>
      <LotteriesView />
    </div>
  );
};

export default Lotteries;
