import ListProducts from "@/components/products/ListProducts";
import { getCookiesName, removeUndefinedAndPageKeys } from "@/backend/helpers";
import { cookies } from "next/headers";
import CatCoverComp from "@/components/products/CatCoverComp";
import { getDictionary } from "@/lib/dictionary";
import { getAllCategoryFull } from "../admin/categorias/_actions";

export const metadata = {
  title: "Aceites CNR",
  description:
    "Ven y explora nuestra tienda en linea y descubre modelos exclusivos de marcas de alta gama.",
};

const getAllProducts = async (searchQuery, currentCookies, perPage) => {
  try {
    const URL = `${process.env.NEXTAUTH_URL}/api/products?${searchQuery}`;
    const res = await fetch(URL, {
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
        Cookie: currentCookies,
        perPage: perPage,
      },
    });
    const data = await res.json();
    return data;
  } catch (error) {
    console.log(error);
  }
};

const ProductosPage = async ({ searchParams, params }) => {
  const lang = params.lang;
  const { productDic } = await getDictionary(lang);
  const nextCookies = cookies();
  const cookieName = getCookiesName();
  let nextAuthSessionToken = nextCookies.get(cookieName);
  nextAuthSessionToken = nextAuthSessionToken?.value;
  const currentCookies = `${cookieName}=${nextAuthSessionToken}`;
  const urlParams = {
    keyword: searchParams.keyword,
    page: searchParams.page,
    category: searchParams.category,
    brand: searchParams.brand,
    "rating[gte]": searchParams.rating,
    "price[lte]": searchParams.max,
    "price[gte]": searchParams.min,
  };

  // Filter out undefined values
  const filteredUrlParams = Object.fromEntries(
    Object.entries(urlParams).filter(([key, value]) => value !== undefined)
  );

  const searchQuery = new URLSearchParams(filteredUrlParams).toString();

  const queryUrlParams = removeUndefinedAndPageKeys(urlParams);
  const keywordQuery = new URLSearchParams(queryUrlParams).toString();

  const per_page = 50;
  const data = await getAllProducts(searchQuery, currentCookies, per_page);

  //pagination
  let page = parseInt(searchParams.page, 50);
  page = !page || page < 1 ? 1 : page;
  const perPage = 50;
  const itemCount = data?.productsCount;
  const allCategories = data?.allCategories;
  const allBrands = data?.allBrands;
  const totalPages = Math.ceil(data.filteredProductsCount / perPage);
  const prevPage = page - 1 > 0 ? page - 1 : 1;
  const nextPage = page + 1;
  const isPageOutOfRange = page > totalPages;
  const pageNumbers = [];
  const offsetNumber = 2;

  const products = data?.products?.products;

  const filteredProductsCount = data?.filteredProductsCount;
  const search =
    typeof searchParams.search === "string" ? searchParams.search : undefined;
  for (let i = page - offsetNumber; i <= page + offsetNumber; i++) {
    if (i >= 1 && i <= totalPages) {
      pageNumbers.push(i);
    }
  }

  return (
    <div className="relative h-full  overflow-x-hidden">
      <CatCoverComp
        searchParams={searchParams}
        lang={lang}
        productDic={productDic}
      />

      <div className="w-full h-full p-5 maxsm:p-2 bg-white dark:bg-slate-700 ">
        <div className="py-5 px-10 maxmd:px-5 maxsm:p-2 bg-background bg-opacity-60">
          {/* <MobileFilterComponet
            lang={lang}
            allBrands={allBrands}
            allCategories={allCategories}
            productDic={productDic}
          /> */}
          <ListProducts
            lang={lang}
            products={products}
            productDic={productDic}
            filteredProductsCount={filteredProductsCount}
          />
          {/* <ServerPagination
            lang={lang}
            isPageOutOfRange={isPageOutOfRange}
            page={page}
            pageNumbers={pageNumbers}
            prevPage={prevPage}
            nextPage={nextPage}
            totalPages={totalPages}
            searchParams={keywordQuery}
          /> */}
        </div>
      </div>
    </div>
  );
};

export default ProductosPage;
