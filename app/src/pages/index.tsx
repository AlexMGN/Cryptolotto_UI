import type { NextPage } from "next";
import Head from "next/head";
import { RewardsView } from "../views";

const Rewards: NextPage = (props) => {
  return (
    <div>
      <Head>
        <title>Cryptolotto</title>
        <meta
          name="description"
          content="Cryptolotto"
        />
      </Head>
      <RewardsView />
    </div>
  );
};

export default Rewards;
