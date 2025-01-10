"use client";

import SectionTitle from "../titles/SectionTitle";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { motion } from "framer-motion";
import "./categories.css";

const CategoriesComp = ({ categoryDic, lang }) => {
  return (
    <div className="pt-20 pb-40 px-40 maxxlg:px-20 maxlg:px-10 maxmd:px-5 maxmd:pt-10 bg-light">
      <div className="mx-auto">
        <SectionTitle
          className="text-5xl maxmd:text-3xl text-gray-800 dark:text-gray-300 font-primary leading-none mb-3 w-full text-center h-full"
          title={categoryDic.title}
          titleTwo={categoryDic.titleTwo}
          subtitle={categoryDic.text}
        />
      </div>
      <div className="relative flex flex-wrap maxsm:flex-col items-center justify-center gap-5 w-full ">
        {categoryDic.categories.map((category, index) => (
          <Link
            key={category.title}
            href={`${category.catPath}`}
            className="w-auto cursor-pointer hover:scale-[105%] duration-300 ease-in-out"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{
                duration: 1.2,
                delay: index * 0.2, // Sequential delay
                type: "spring",
                stiffness: 260,
                damping: 20,
              }}
              className="octagon-container relative mx-auto items-center justify-center flex text-center h-[350px] w-[350px] maxxlg:h-[350px] maxxlg:w-[350px] maxlg:h-[250px] maxlg:w-[250px] maxmd:h-[250px] maxmd:w-[250px]"
            >
              <div className="octagon relative overflow-hidden w-full h-[500px] maxxlg:h-[350px]">
                <Image
                  src={category.imgPath}
                  width={600}
                  height={600}
                  alt={category.title}
                  className="w-full h-full object-cover"
                />
              </div>
              <span className="absolute z-50 text-white uppercase py-2 px-8 maxmd:text-xl top-[40%] font-primary tracking-wide">
                {category.title}
              </span>
              {/* Octagonal overlay */}
              <div className="octagon-overlay absolute z-[2] top-0 left-0 w-full h-full" />
            </motion.div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default CategoriesComp;
