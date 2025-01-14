"use client";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import coverImage0 from "../../../public/images/fabrica3.webp";
import coverAdditives from "../../../public/images/ADDITIVES.webp";
import coverDexron from "../../../public/images/ATF-DEXRON.webp";
import coverMotorcycles from "../../../public/images/MOTORCYCLES.webp";
import coverRacing from "../../../public/images/RACING.webp";
import coverRRCCA from "../../../public/images/RRCCA.webp";
import coverHydraulics from "../../../public/images/HYDRAULICS.webp";

const CatCoverComp = ({ searchParams, lang, productDic }) => {
  const keyword = searchParams?.keyword;
  const category = searchParams?.category;
  const [coverImage, setCoverImage] = useState(coverImage0);
  const [coverTitle, setCoverTitle] = useState(productDic.title);
  const [coverTitleTwo, setCoverTitleTwo] = useState(productDic.titleTwo);
  const [coverPreTitle, setCoverPreTitle] = useState(productDic.preTitle);
  useEffect(() => {
    if (keyword || category) {
      if (
        keyword?.toLowerCase() === "aditivos" ||
        keyword?.toLowerCase() === "additives" ||
        category?.toLowerCase() === "aditivos" ||
        category?.toLowerCase() === "additives"
      ) {
        setCoverImage(coverAdditives);
        if (lang === "es") {
          setCoverTitle("Aditivos");
          setCoverTitleTwo("");
        }
        if (lang === "en") {
          setCoverTitle("Additives");
          setCoverTitleTwo("");
        }
      } else if (
        keyword?.toLowerCase() === "atf-dexron" ||
        keyword?.toLowerCase() === "atf-dexron" ||
        category?.toLowerCase() === "atf-dexron" ||
        category?.toLowerCase() === "atf-dexron"
      ) {
        setCoverImage(coverDexron);
        if (lang === "es") {
          setCoverTitle("ATF-DEXRON");
          setCoverTitleTwo("");
        }
        if (lang === "en") {
          setCoverTitle("ATF-DEXRON");
          setCoverTitleTwo("");
        }
      } else if (
        keyword?.toLowerCase() === "motocicletas" ||
        keyword?.toLowerCase() === "motorcycles" ||
        category?.toLowerCase() === "motocicletas" ||
        category?.toLowerCase() === "motorcycles"
      ) {
        setCoverImage(coverMotorcycles);
        if (lang === "es") {
          setCoverTitle("MOTOCICLETAS");
          setCoverTitleTwo("");
        }
        if (lang === "en") {
          setCoverTitle("MOTORCYCLES");
          setCoverTitleTwo("");
        }
      } else if (
        keyword?.toLowerCase() === "carreras" ||
        keyword?.toLowerCase() === "racing" ||
        category?.toLowerCase() === "carreras" ||
        category?.toLowerCase() === "racing"
      ) {
        setCoverImage(coverRacing);
        if (lang === "es") {
          setCoverTitle("CARRERAS");
          setCoverTitleTwo("");
        }
        if (lang === "en") {
          setCoverTitle("RACING");
          setCoverTitleTwo("");
        }
      } else if (
        keyword?.toLowerCase() === "rrcca" ||
        keyword?.toLowerCase() === "rrcca" ||
        category?.toLowerCase() === "rrcca" ||
        category?.toLowerCase() === "rrcca"
      ) {
        setCoverImage(coverRRCCA);
        if (lang === "es") {
          setCoverTitle("RRCCA");
          setCoverTitleTwo("");
        }
        if (lang === "en") {
          setCoverTitle("RRCCA");
          setCoverTitleTwo("");
        }
      } else if (
        keyword?.toLowerCase() === "hidráulicos" ||
        keyword?.toLowerCase() === "hydraulics" ||
        category?.toLowerCase() === "hidráulicos" ||
        category?.toLowerCase() === "hydraulics"
      ) {
        setCoverImage(coverHydraulics);
        if (lang === "es") {
          setCoverTitle("HIDRÁULICOS");
          setCoverTitleTwo("");
        }
        if (lang === "en") {
          setCoverTitle("HYDRAULICS");
          setCoverTitleTwo("");
        }
      }
    } else {
      setCoverImage(coverImage0);
      setCoverTitle(productDic.title);
      setCoverTitleTwo(productDic.titleTwo);
    }
  }, [keyword, category]);

  return (
    <div className="w-full h-[300px] overflow-hidden top-0 relative flex justify-center items-center flex-col ">
      <div className="absolute bg-black bg-opacity-50 w-full h-full z-0" />
      <Image
        src={coverImage}
        width={1920}
        height={400}
        priority
        loading="eager"
        alt="contact cover image"
        className="object-cover h-full w-full"
      />
      <div className="absolute z-10 text-white text-4xl maxsm:text-3xl  font-primary w-[80%] text-center">
        <p className="uppercase text-xs tracking-widest font-secondary">
          {coverPreTitle}
        </p>
        <h2 className="  font-primary mb-4">
          <span className="text-white">{coverTitle} </span>
          <span className=" text-primary">{coverTitleTwo}</span>
        </h2>
      </div>
    </div>
  );
};

export default CatCoverComp;
