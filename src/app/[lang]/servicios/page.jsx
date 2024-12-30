import ServiceComp from "@/components/services/ServiceComp";
import { getDictionary } from "@/lib/dictionary";

const Services = async ({ params }) => {
  const lang = params.lang;
  const { homeDic, servicesDic } = await getDictionary(lang);
  return <ServiceComp homeDic={homeDic} servicesDic={servicesDic} />;
};

export default Services;
