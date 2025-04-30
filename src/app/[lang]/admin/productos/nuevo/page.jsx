import NewProductComp from "@/components/admin/NewProductComp";
import { getAllCategoryFull } from "../../categorias/_actions";

const NewVariationOptimized = async ({ currentCookies, params }) => {
  const lang = params.lang;

  const data = await getAllCategoryFull();

  return (
    <NewProductComp currentCookies={currentCookies} lang={lang} data={data} />
  );
};

export default NewVariationOptimized;
