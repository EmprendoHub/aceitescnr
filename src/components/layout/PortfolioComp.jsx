"use client";
import Image from "next/image";
import coverImage from "../../../public/images/portfolio_cover_emprendomex.webp";
import portfolioImage01 from "../../../public/images/portfolio_image_01.webp";
import portfolioImage02 from "../../../public/images/portfolio_image_02.webp";
import portfolioImage03 from "../../../public/images/portfolio_image_03.webp";
import portfolioImage04 from "../../../public/images/portfolio_image_04.webp";
import portfolioImage05 from "../../../public/images/portfolio_image_05.webp";
import portfolioImage06 from "../../../public/images/portfolio_image_06.webp";
import portfolioImage07 from "../../../public/images/portfolio_image_07.webp";
import portfolioImage08 from "../../../public/images/portfolio_image_08.webp";
import portfolioImage09 from "../../../public/images/portfolio_image_09.webp";
import portfolioImage10 from "../../../public/images/portfolio_image_10.webp";
import portfolioImage11 from "../../../public/images/portfolio_image_11.webp";
import { FaEye } from "react-icons/fa6";

const WORKS = [
  {
    image: portfolioImage01,
    preTitle: "SEO/MODAS",
    title: "Brand Book",
    link: "/",
  },
  {
    image: portfolioImage02,
    preTitle: "SEO/MODAS",
    title: "Brand Book",
    link: "/",
  },
  {
    image: portfolioImage03,
    preTitle: "SEO/MODAS",
    title: "Brand Book",
    link: "/",
  },
  {
    image: portfolioImage04,
    preTitle: "SEO/MODAS",
    title: "Brand Book",
    link: "/",
  },
  {
    image: portfolioImage05,
    preTitle: "SEO/MODAS",
    title: "Brand Book",
    link: "/",
  },
  {
    image: portfolioImage06,
    preTitle: "SEO/MODAS",
    title: "Brand Book",
    link: "/",
  },
  {
    image: portfolioImage07,
    preTitle: "SEO/MODAS",
    title: "Brand Book",
    link: "/",
  },
  {
    image: portfolioImage08,
    preTitle: "SEO/MODAS",
    title: "Brand Book",
    link: "/",
  },
  {
    image: portfolioImage09,
    preTitle: "SEO/MODAS",
    title: "Brand Book",
    link: "/",
  },
  {
    image: portfolioImage10,
    preTitle: "SEO/MODAS",
    title: "Brand Book",
    link: "/",
  },
  {
    image: portfolioImage11,
    preTitle: "SEO/MODAS",
    title: "Brand Book",
    link: "/",
  },
];

const PortfolioComp = ({ portfolioDic }) => {
  return (
    <div className="portfolio-body">
      <div className="w-full h-[600px] overflow-hidden top-0 relative flex justify-center items-center flex-col ">
        <div className="absolute bg-dark bg-opacity-40 w-full h-full z-0" />
        <Image
          src={coverImage}
          width={1920}
          height={1080}
          priority
          loading="eager"
          alt="portfolio image"
          className="object-cover h-full w-full"
        />
        <div className="absolute z-10 text-white text-5xl maxsm:text-3xl  font-primary w-[50%] maxsm:w-[80%] text-center">
          <p className="uppercase text-xs tracking-widest font-secondary">
            {portfolioDic.pretitle}
          </p>
          <h3>{portfolioDic.title}</h3>
        </div>
      </div>
      {/* Portfolio Card */}

      <section className="my-20 h-full w-full flex flex-wrap gap-5 items-center justify-center px-20 maxmd:px-5">
        {WORKS.map((work, index) => (
          <div
            key={index}
            className="relative h-[250px] w-[250px] group cursor-pointer rounded-sm"
          >
            <Image
              src={work.image}
              width={800}
              height={800}
              alt="portfolio"
              loading="lazy"
              className="object-cover h-full w-full"
            />

            <div className="h-[0%] opacity-0 group-hover:h-[80%] group-hover:opacity-100 duration-300 flex flex-col justify-center items-start w-full absolute z-10 bottom-0 bg-white dark:bg-dark px-5">
              <FaEye />
              <p className="text-[12px] uppercase text-gray-500 font-secondary">
                {work.preTitle}
              </p>
              <h3 className="text-2xl font-primary hover:text-secondary duration-300 ease-in-out">
                {work.title}
              </h3>
            </div>
          </div>
        ))}
      </section>
    </div>
  );
};

export default PortfolioComp;
