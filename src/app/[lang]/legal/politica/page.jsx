import React from "react";
import { getDictionary } from "@/lib/dictionary";
import PrivacyComp from "@/components/legal/PrivacyComp";
const PoliticaPage = async ({ params }) => {
  const lang = params.lang;
  const { privacyDic } = await getDictionary(lang);
  return <PrivacyComp privacyDic={privacyDic} />;
};

export default PoliticaPage;
