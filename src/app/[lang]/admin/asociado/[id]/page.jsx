import { getAllAffiliateOrder } from "@/app/[lang]/_actions";
import AffiliateProfile from "@/components/affiliates/AffiliateProfile";

const AffiliateProfilePage = async ({ searchParams, params }) => {
  const urlParams = {
    keyword: searchParams.keyword,
    page: searchParams.page,
  };
  const filteredUrlParams = Object.fromEntries(
    Object.entries(urlParams).filter(([key, value]) => value !== undefined)
  );
  const searchQuery = new URLSearchParams(filteredUrlParams).toString();
  const data = await getAllAffiliateOrder(searchQuery, params.id);
  const affiliate = JSON.parse(data.affiliate);
  const orders = JSON.parse(data.orders);

  return <AffiliateProfile affiliate={affiliate} order={orders} />;
};

export default AffiliateProfilePage;
