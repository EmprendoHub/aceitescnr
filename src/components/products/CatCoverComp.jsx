"use client";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import coverImage0 from "../../../public/images/trailer2.webp";
import coverDolly from "../../../public/images/trailer4.webp";
import coverContainer from "../../../public/images/shipping_container_trailers.jpg";
import coverPlatform from "../../../public/images/Mechanical-Steering.webp";

const CatCoverComp = ({ searchParams, lang, productDic }) => {
  const keyword = searchParams?.keyword;
  const [coverImage, setCoverImage] = useState(coverImage0);
  const [coverTitle, setCoverTitle] = useState(productDic.title);
  const [coverTitleTwo, setCoverTitleTwo] = useState(productDic.titleTwo);
  const [coverPreTitle, setCoverPreTitle] = useState(productDic.preTitle);
  useEffect(() => {
    if (keyword) {
      if (
        keyword.toLowerCase() === "dolly" ||
        keyword.toLowerCase() === "dolly"
      ) {
        setCoverImage(coverDolly);
        if (lang === "es") {
          setCoverTitle("Dolly");
          setCoverTitleTwo("");
        }
        if (lang === "en") {
          setCoverTitle("Dolly");
          setCoverTitleTwo("");
        }
      } else if (
        keyword.toLowerCase() === "plataforma" ||
        keyword.toLowerCase() === "platform"
      ) {
        setCoverImage(coverPlatform);
        if (lang === "es") {
          setCoverTitle("Plataforma");
          setCoverTitleTwo("");
        }
        if (lang === "en") {
          setCoverTitle("Platform");
          setCoverTitleTwo("");
        }
      } else if (
        keyword.toLowerCase() === "portacontenedor" ||
        keyword.toLowerCase() === "containertrailer"
      ) {
        setCoverImage(coverContainer);
        if (lang === "es") {
          setCoverTitle("Porta Contenedor");
          setCoverTitleTwo("");
        }
        if (lang === "en") {
          setCoverTitle("Container Trailer");
          setCoverTitleTwo("");
        }
      }
    } else {
      setCoverImage(coverImage0);
      setCoverTitle(productDic.title);
      setCoverTitleTwo(productDic.titleTwo);
    }
  }, [keyword]);

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
        <h2
          initial={{ y: 50, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="  font-primary mb-4"
        >
          <span className="text-white">{coverTitle} </span>
          <span className=" text-primary">{coverTitleTwo}</span>
        </h2>
      </div>
    </div>
  );
};

export default CatCoverComp;
