import React from "react";
import { getDictionary } from "@/lib/dictionary";
import TermsComp from "@/components/legal/TermsComp";
const TerminosPage = async ({ params }) => {
  const lang = params.lang;
  const { termsDic } = await getDictionary(lang);
  return <TermsComp termsDic={termsDic} />;
};

export default TerminosPage;
