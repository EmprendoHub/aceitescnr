import UpdateProductDetails from "@/components/products/UpdateProductDetails";
import { getOneProduct } from "@/app/[lang]/_actions";

const ProductDetailsPage = async ({ params }) => {
  const data = await getOneProduct(params.slug);
  const product = JSON.parse(data.product);

  return <UpdateProductDetails product={product} />;
};

export default ProductDetailsPage;
