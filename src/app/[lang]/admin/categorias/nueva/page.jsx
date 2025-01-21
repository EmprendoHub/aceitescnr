import NewCategory from "../_components/NewCategory";

const NewVariationOptimized = ({ currentCookies, params }) => {
  const lang = params.lang;

  return <NewCategory currentCookies={currentCookies} lang={lang} />;
};

export default NewVariationOptimized;
