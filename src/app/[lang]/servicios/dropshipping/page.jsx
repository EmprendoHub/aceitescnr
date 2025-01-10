import DropShippingComp from "@/components/dropshipping/DropShippingComp";
import React from "react";
import { getDictionary } from "@/lib/dictionary";

export const metadata = {
  manifest: "/manifest.json",
  metadataBase: new URL("https://www.aceitescnr.com"),
  title: "Aceites CNR | Rendimiento y Protección para Tu Motor",
  description:
    "Descubre los aceites de motor de alta calidad de Aceites CNR. Diseñados para brindar protección, rendimiento y eficiencia a tu vehículo en cada kilómetro recorrido.",
  openGraph: {
    title: "Aceites CNR | Rendimiento y Protección para Tu Motor",
    description:
      "En Aceites CNR, fabricamos aceites de motor que garantizan un alto rendimiento y protección en cualquier condición. Perfectos para autos, camiones y maquinaria pesada.",
    image: "/images/opengraph-oil.png",
  },
  twitter: {
    card: "summary_large_image",
    site: "@aceitescnr",
    title: "Aceites CNR | Rendimiento y Protección para Tu Motor",
    description:
      "Protege tu motor con aceites diseñados para ofrecer durabilidad y eficiencia. Aceites CNR, la elección confiable para tus necesidades automotrices.",
    image: "/images/twitter-oil.png",
  },
};

const sassPage = async ({ params }) => {
  const lang = params.lang;
  const { dropshippingDic } = await getDictionary(lang);
  return <DropShippingComp lang={lang} dropshippingDic={dropshippingDic} />;
};

export default sassPage;
