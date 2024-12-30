import PortfolioComp from "@/components/layout/PortfolioComp";
import { getDictionary } from "@/lib/dictionary";

const PortfolioPage = async ({ params }) => {
  const lang = params.lang;
  const { portfolioDic } = await getDictionary(lang);
  return <PortfolioComp portfolioDic={portfolioDic} />;
};

export default PortfolioPage;
