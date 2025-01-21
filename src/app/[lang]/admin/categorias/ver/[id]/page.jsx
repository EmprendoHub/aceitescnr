import EditCategory from "../../_components/EditCategory";
import { getOneCategory } from "../../_actions";

const ProductDetailsPage = async ({ params }) => {
  const lang = await params.lang;
  const id = await params.id;
  const data = await getOneCategory(id);
  const category = JSON.parse(data.category);

  return <EditCategory category={category} lang={lang} id={id} />;
};

export default ProductDetailsPage;
