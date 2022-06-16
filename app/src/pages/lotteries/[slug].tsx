import type { NextPage } from "next";
import Head from "next/head";
import { LotteriesView } from "../../views";
import { useRouter } from 'next/router'
import FourOhFour from "../404";

const Slug: NextPage = (props) => {
  const router = useRouter()
  const { slug } = router.query

  console.log(slug)

  const getPages = () => {
    let component = null;
    switch (slug) {
      case 'low':
        component = <LotteriesView lotterie={slug} />
        break;
      case 'medium':
        component = <LotteriesView lotterie={slug} />
        break;
      case 'degen':
        component = <LotteriesView lotterie={slug} />
        break;
      case 'whale':
        component = <LotteriesView lotterie={slug} />
        break;
      default:
        component = <FourOhFour />;
    }
    return component;
  };

  return getPages();

  /*return (
    <div>
      <Head>
        <title>Cryptolotto</title>
        <meta
          name="description"
          content="Slug"
        />
      </Head>
      <LotteriesView />
    </div>
  );*/
};

export default Slug;
