"use client";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import coverImage0 from "../../../public/images/fabrica3.webp";

const CatCoverComp = ({ searchParams, lang, productDic }) => {
  const keyword = searchParams?.keyword;

  const [coverImage, setCoverImage] = useState(coverImage0);
  const [coverTitle, setCoverTitle] = useState(productDic.title);
  const [coverTitleTwo, setCoverTitleTwo] = useState(productDic.titleTwo);
  const [coverPreTitle, setCoverPreTitle] = useState(productDic.preTitle);
  const [coverParOne, setCoveParOne] = useState("");
  const [coverParTwo, setCoverParTwo] = useState("");

  useEffect(() => {
    if (keyword) {
      const additives = productDic.categories.reduce((acc, item) => {
        if (item.title.includes(keyword)) {
          return item;
        }
        return acc;
      }, {});
      setCoverImage(additives.imgUrl || coverImage0);
      setCoverTitle(additives.title);
      setCoveParOne(additives.parOne);
      setCoverParTwo(additives.parTwo);
      setCoverTitleTwo("");
    } else {
      setCoverImage(coverImage0);
      setCoverTitle(productDic.title);
      setCoverTitleTwo(productDic.titleTwo);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [keyword]);

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
        <p className="text-sm maxsm:text-xs font-mono">
          {coverParOne}
          <br />
          {coverParTwo}
        </p>
      </div>
    </div>
  );
};

export default CatCoverComp;
