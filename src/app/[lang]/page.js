import HeroSlider from "@/components/sliders/HeroSlider";
import { getDictionary } from "@/lib/dictionary";
import ImageHero from "@/components/sliders/ImageHero";
import SingleSideToSide from "@/components/home/SingleSideToSide";
import IconGridComp from "@/components/home/IconGridComp";
import ContactInner from "@/components/contact/ContactInner";
import DoubleSideToSide from "@/components/home/DoubleSideToSide";
import DistributorCTA from "@/components/home/DistributorCTA";
import ImageSlider from "@/components/sliders/ImageSlider";

export default async function Home({ params }) {
  const lang = params.lang;
  const {
    distributorLandingPage,
    homeDic,
    aboutDic,
    servicesDic,
    flipBoxes,
    contactDic,
  } = await getDictionary(lang);
  return (
    <div className=" overflow-x-hidden">
      <ImageSlider homeDic={homeDic} lang={lang} />
      <DoubleSideToSide aboutDic={aboutDic} homeDic={homeDic} />
      <DistributorCTA content={distributorLandingPage.content} lang={lang} />
      <HeroSlider homeDic={homeDic} lang={lang} />
      <SingleSideToSide flipBoxes={flipBoxes} homeDic={homeDic} />
      <IconGridComp servicesDic={servicesDic} />
      <ContactInner homeDic={homeDic} contactDic={contactDic} />
    </div>
  );
}
