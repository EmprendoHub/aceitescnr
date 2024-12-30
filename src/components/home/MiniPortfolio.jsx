"use client";
import React from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";

const MiniPortfolio = ({ homeDic }) => {
  return (
    <div className="relative h-full w-full overflow-x-hidden">
      <motion.div
        initial={{ opacity: 0.2 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 1.5 }}
        className="bg-primary w-[450px] h-[450px] maxmd:w-[250px] maxmd:h-[250px]  maxsm:h-[200px] maxsm:w-[200px] absolute right-0"
      />
      <div className={` flex items-center justify-center  gap-x-4`}>
        <div className="relative flex w-[70%] maxlg:w-[90%] flex-col gap-4  ">
          <h2 className="text-6xl font-primary maxlg:text-4xl maxsm:text-xl grid grid-cols-1">
            <motion.span
              initial={{ y: -50, x: -50, opacity: 0 }}
              whileInView={{ y: 0, x: 0, opacity: 1 }}
              transition={{ duration: 0.6 }}
            >
              {homeDic.miniPortfolio.title}
            </motion.span>
            <motion.span
              initial={{ y: 100, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.7 }}
              className="text-secondary"
            >
              {homeDic.miniPortfolio.titleTwo}
            </motion.span>
          </h2>
          <div className="w-full h-full relative">
            {/* images */}
            <motion.div
              initial={{ x: -150, opacity: 0 }}
              whileInView={{ x: 0, opacity: 1 }}
              transition={{ duration: 1 }}
              className="relative  w-full  h-[456px] maxmd:h-[250px] overflow-hidden"
            >
              {/* main image */}
              <Image
                src={homeDic.miniPortfolio.imgOne}
                alt="servicio"
                width={1920}
                height={1080}
                className="rounded-sm shadow-lg object-cover shadow-gray-400"
              />
            </motion.div>
            {/* mini image */}
            <motion.div
              initial={{ y: 150, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              transition={{ duration: 1.2 }}
              className="absolute flex top-5 -right-10 maxlg:-right-5 maxmd:-right-2 "
            >
              <Image
                src={homeDic.miniPortfolio.imgTwo}
                alt="mini servicio"
                width={500}
                height={500}
                className="relative flex w-[150px] h-[220px] maxmd:w-[100px] maxmd:h-[170px] rounded-sm shadow-md shadow-slate-800 z-10"
              />
            </motion.div>
          </div>

          <p className="font-secondary text-base maxmd:text-sm">
            {homeDic.miniPortfolio.text}
          </p>
          <Link
            href={homeDic.miniPortfolio.btnUrl}
            className="flex justify-end"
          >
            <button className="px-6 py-2 tracking-widest text-sm bg-dark dark:bg-secondary font-secondary text-white  m-4 shadow-sm ">
              {homeDic.miniPortfolio.btnText}
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default MiniPortfolio;
