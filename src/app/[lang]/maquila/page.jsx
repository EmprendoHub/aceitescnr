import React from "react";
import { getDictionary } from "@/lib/dictionary";
import PrivateLabel from "./_components/PrivateLabel";

const maquilaPage = async ({ params }) => {
  const lang = params.lang;
  const { privateLabelLandingPage } = await getDictionary(lang);
  return (
    <main className="min-h-screen flex flex-col">
      <PrivateLabel content={privateLabelLandingPage.content} lang={lang} />
    </main>
  );
};

export default maquilaPage;
