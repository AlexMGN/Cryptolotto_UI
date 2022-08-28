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
        component = <LotteriesView slug={slug} />
        break;
      /* UNCOMMENT */
      /*case 'medium':
        component = <LotteriesView slug={slug} />
        break;*/
      case 'degen':
        component = <LotteriesView slug={slug} />
        break;
      /* UNCOMMENT */
      /*case 'whale':
        component = <LotteriesView slug={slug} />
        break;*/
      default:
        component = <FourOhFour />;
    }
    return component;
  };

  return getPages();
};

export default Slug;
