"use client";
import Image from "next/image";
import coverImage0 from "../../../public/images/fabrica1.webp";
import AboutSideToSide from "../home/AboutSideToSide";

const AboutUsTwo = ({ aboutDic, homeDic }) => {
  return (
    <div id="acerca">
      <div className="w-full h-[400px] overflow-hidden top-0 relative flex justify-center items-center flex-col ">
        <div className="absolute bg-black bg-opacity-70 w-full h-full z-0" />
        <Image
          src={coverImage0}
          width={1920}
          height={400}
          priority
          loading="eager"
          alt="about us cover image"
          className="object-cover h-full w-full"
        />
        <div className="absolute z-10 text-white text-5xl maxsm:text-3xl  font-primary w-[50%] maxsm:w-[80%] text-center">
          <p className="uppercase text-xs tracking-widest font-secondary">
            {aboutDic.hero.title}
          </p>
          <h3>{aboutDic.hero.subtitle}</h3>
        </div>
      </div>
      <AboutSideToSide homeDic={homeDic} />
    </div>
  );
};

export default AboutUsTwo;
