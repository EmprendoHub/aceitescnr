"use client";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import coverImage0 from "../../../public/images/fabrica3.webp";
import coverAdditives from "../../../public/images/ADDITIVES.webp";
import coverDexron from "../../../public/images/ATF-DEXRON.webp";
import coverMotorcycles from "../../../public/images/MOTORCYCLES.webp";
import FoodGrade from "../../../public/covers/cover_slide_03.webp";
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
        keyword?.includes("Aditivos") ||
        keyword?.includes("Additives") ||
        category?.includes("Aditivos") ||
        category?.includes("Additives")
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
        keyword?.includes("Automotive") ||
        keyword?.includes("Automotriz") ||
        category?.includes("Automotriz") ||
        category?.includes("Automotive")
      ) {
        setCoverImage(coverDexron);
        if (lang === "es") {
          setCoverTitle("Automotriz");
          setCoverTitleTwo("");
        }
        if (lang === "en") {
          setCoverTitle("Automotive");
          setCoverTitleTwo("");
        }
      } else if (
        keyword?.includes("Motocicletas") ||
        keyword?.includes("Motorcycles") ||
        category?.includes("Motocicletas") ||
        category?.includes("Motorcycles")
      ) {
        setCoverImage(coverMotorcycles);
        if (lang === "es") {
          setCoverTitle("Motocicletas");
          setCoverTitleTwo("");
        }
        if (lang === "en") {
          setCoverTitle("Motorcycles");
          setCoverTitleTwo("");
        }
      } else if (
        keyword?.includes("Servicio+Pesado") ||
        keyword?.includes("Heavy+Duty") ||
        category?.includes("Servicio+Pesado") ||
        category?.includes("Heavy+Duty")
      ) {
        setCoverImage(coverRRCCA);
        if (lang === "es") {
          setCoverTitle("Servicio Pesado");
          setCoverTitleTwo("");
        }
        if (lang === "en") {
          setCoverTitle("Heavy Duty");
          setCoverTitleTwo("");
        }
      } else if (
        keyword?.includes("Hidráulicos") ||
        keyword?.includes("Hydraulics") ||
        category?.includes("Hidráulicos") ||
        category?.includes("Hydraulics")
      ) {
        setCoverImage(coverHydraulics);
        if (lang === "es") {
          setCoverTitle("Hidráulicos");
          setCoverTitleTwo("");
        }
        if (lang === "en") {
          setCoverTitle("Hydraulics");
          setCoverTitleTwo("");
        }
      } else if (
        keyword?.includes("Maquinaria") ||
        keyword?.includes("Machinery") ||
        category?.includes("Maquinaria") ||
        category?.includes("Machinery")
      ) {
        setCoverImage(coverDexron);
        if (lang === "es") {
          setCoverTitle("Maquinaria");
          setCoverTitleTwo("");
        }
        if (lang === "en") {
          setCoverTitle("Machinery");
          setCoverTitleTwo("");
        }
      }
    } else if (
      keyword?.includes("Industrial") ||
      keyword?.includes("Industrial") ||
      category?.includes("Industrial") ||
      category?.includes("Industrial")
    ) {
      setCoverImage(coverDexron);
      if (lang === "es") {
        setCoverTitle("Industrial");
        setCoverTitleTwo("");
      }
      if (lang === "en") {
        setCoverTitle("Industrial");
        setCoverTitleTwo("");
      }
    } else if (
      keyword?.includes("Grado+Alimenticio") ||
      keyword?.includes("Food+Grade") ||
      category?.includes("Grado+Alimenticio") ||
      category?.includes("Food+Grade")
    ) {
      setCoverImage(FoodGrade);
      if (lang === "es") {
        setCoverTitle("Grado Alimenticio");
        setCoverTitleTwo("");
      }
      if (lang === "en") {
        setCoverTitle("Food Grade");
        setCoverTitleTwo("");
      }
    } else {
      setCoverImage(coverImage0);
      setCoverTitle(productDic.title);
      setCoverTitleTwo(productDic.titleTwo);
    }
  }, [keyword, category]);

  return (
    <div className="w-full h-[300px] overflow-hidden top-0 relative flex justify-center items-center flex-col ">
      <div className="absolute bg-black bg-opacity-50 w-full h-full z-0 " />
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
