import NewProductComp from "@/components/products/NewProductComp";

const NewVariationOptimized = ({ currentCookies, params }) => {
  const lang = params.lang;

  return <NewProductComp currentCookies={currentCookies} lang={lang} />;
};

export default NewVariationOptimized;
