import React from "react";
import { getDictionary } from "@/lib/dictionary";
import AffiTermsComp from "@/components/legal/AffiTermsComp";
const TerminosPage = async ({ params }) => {
  const lang = params.lang;
  const { affiTermsDic } = await getDictionary(lang);
  return <AffiTermsComp affiTermsDic={affiTermsDic} />;
};

export default TerminosPage;
