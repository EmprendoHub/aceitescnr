import React from "react";
import DynamicShowcase from "./_components/DynamicShowcase";
import { getDictionary } from "@/lib/dictionary";

const maquilaPage = async ({ params }) => {
  const lang = params.lang;
  const { privateLabelLandingPage } = await getDictionary(lang);
  return (
    <main className="min-h-screen flex flex-col">
      <DynamicShowcase content={privateLabelLandingPage.content} />
    </main>
  );
};

export default maquilaPage;
