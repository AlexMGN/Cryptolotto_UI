import type { NextPage } from "next";
import { LotteriesView } from "../../views";
import { useRouter } from 'next/router'
import FourOhFour from "../404";

const Slug: NextPage = () => {
  const router = useRouter()
  const { slug } = router.query

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
};

export default Slug;
