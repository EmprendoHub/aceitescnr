import {
  getOneProduct,
  getOneProductWithTrending,
} from "@/app/[lang]/_actions";
import ProductDetailsComponent from "@/components/products/ProductDetailsComponent";
import { getDictionary } from "@/lib/dictionary";

export async function generateMetadata({ params }, parent) {
  // fetch data
  const lang = params.lang;
  const data = await getOneProduct(params.slug, false);
  const product = JSON.parse(data.product);

  // optionally access and extend (rather than replace) parent metadata
  const previousImages = (await parent).openGraph?.images || [];
  return {
    title: product.title[`${lang}`],
    description: product.description[`${lang}`],
    openGraph: {
      images: [`${product.images[0].url}`, ...previousImages],
    },
  };
}

const ProductDetailsPage = async ({ params }) => {
  const lang = params.lang;
  const { productDic } = await getDictionary(lang);
  const data = await getOneProductWithTrending(params.slug, false);
  return (
    <>
      <ProductDetailsComponent
        lang={lang}
        data={data}
        productDic={productDic}
      />
    </>
  );
};

export default ProductDetailsPage;
