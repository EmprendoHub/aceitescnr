import AboutUsTwo from "@/components/about/AboutUsTwo";
import { getDictionary } from "@/lib/dictionary";
const AboutPage = async ({ params }) => {
  const lang = params.lang;
  const { aboutDic, homeDic } = await getDictionary(lang);
  return (
    <div>
      <AboutUsTwo aboutDic={aboutDic} homeDic={homeDic} />
    </div>
  );
};

export default AboutPage;
