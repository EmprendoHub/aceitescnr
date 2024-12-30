import React from "react";
import MotionHeaderComponent from "./MotionHeaderComponent";
import { getDictionary } from "@/lib/dictionary";

const HeaderComponent = async ({ lang }) => {
  const { header } = await getDictionary(lang);

  return <MotionHeaderComponent localeHeader={header} lang={lang} />;
};

export default HeaderComponent;
