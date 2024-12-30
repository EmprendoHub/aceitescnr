import EditVariationProduct from "@/components/admin/EditVariationProduct";
import { getOneProduct } from "@/app/[lang]/_actions";
import { getCookiesName } from "@/backend/helpers";
import { cookies } from "next/headers";

const ProductDetailsPage = async ({ params }) => {
  const nextCookies = cookies();
  const cookieName = getCookiesName();
  const nextAuthSessionToken = nextCookies.get(cookieName);
  const currentCookies = `${cookieName}=${nextAuthSessionToken?.value}`;

  const data = await getOneProduct(params.slug, false);
  const lang = params.lang;
  const product = JSON.parse(data.product);

  return (
    <EditVariationProduct
      product={product}
      currentCookies={currentCookies}
      lang={lang}
    />
  );
};

export default ProductDetailsPage;
