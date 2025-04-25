import NewProductComp from "@/components/admin/NewProductComp";

const NewVariationOptimized = async ({ currentCookies, params }) => {
  const lang = params.lang;

  const data = await getAllCategory(searchQuery);

  return (
    <NewProductComp currentCookies={currentCookies} lang={lang} data={data} />
  );
};

export default NewVariationOptimized;
