import EditVariationProduct from "@/components/admin/EditVariationProduct";
import { getOneProduct } from "@/app/[lang]/_actions";
import { getAllCategoryFull } from "../../../categorias/_actions";

const ProductDetailsPage = async ({ params }) => {
  const catData = await getAllCategoryFull();
  const data = await getOneProduct(params.slug, false);
  const lang = params.lang;
  const product = JSON.parse(data.product);
  const categories = JSON.parse(catData.categories);

  return (
    <EditVariationProduct
      product={product}
      categories={categories}
      lang={lang}
    />
  );
};

export default ProductDetailsPage;
