"use client";
import React from "react";
import coverImage from "../../../public/images/aceitescnr_hero_image.webp";
import Image from "next/image";
import { GiOilDrum } from "react-icons/gi";
import { BsDropletHalf } from "react-icons/bs";
import { motion } from "framer-motion";
import { ButtonMotion } from "../button/ButtonMotion";
import Link from "next/link";
import { MdOutlinePrecisionManufacturing } from "react-icons/md";

const ImageHero = ({ homeDic, lang }) => {
  return (
    <div className=" relative">
      <div className="w-full h-[800px] overflow-hidden top-0 relative flex justify-center items-center flex-col ">
        {/* overlay */}
        <div className="absolute bg-black bg-opacity-40 w-full h-full z-0" />
        <Image
          src={coverImage}
          width={1920}
          height={1080}
          priority
          loading="eager"
          alt="portfolio image"
          className="object-cover h-full w-full"
        />
        <div className="absolute top-40 left-20 maxlg:left-5 z-10 text-white text-7xl maxlg:text-5xl maxsm:text-4xl font-primary w-[60%] maxsm:w-[80%] ">
          <motion.h2
            initial={{ opacity: 0, scale: 1, y: -10 }}
            whileInView={{ opacity: 1, scale: 1, y: 0 }}
            transition={{
              duration: 0.9,
              type: "tween",
              stiffness: 260,
              damping: 20,
            }}
            className="font-primary leading-none mb-3"
          >
            <span className="text-accent dark:text-white font-black">
              {homeDic.imageHero.title}{" "}
            </span>
            <span className="text-white dark:text-accent font-black">
              {homeDic.imageHero.titleTwo}
            </span>
          </motion.h2>

          <motion.div
            initial={{ opacity: 0, scale: 1, y: 10 }}
            whileInView={{ opacity: 1, scale: 1, y: 0 }}
            transition={{
              duration: 1,
              type: "tween",
              stiffness: 260,
              damping: 20,
            }}
            className="text-gray-300 font-secondary text-sm mb-8  maxmd:text-sm flex flex-col gap-3"
          >
            <p className=" flex items-center gap-2">{homeDic.imageHero.text}</p>
          </motion.div>
          <div className="flex maxsm:flex-col maxsm:items-start items-center justify-start gap-5">
            <Link href={`${homeDic.imageHero.btnPath}`}>
              <ButtonMotion
                aria-label="Contactar"
                textClass={"text-white"}
                textClassTwo={"text-white"}
                className="bg-secondary-gradient dark:bg-dark-gradient px-10 py-3 text-white flex items-center justify-center  text-xs tracking-widest"
              >
                {homeDic.imageHero.btnText}
              </ButtonMotion>
            </Link>
            <Link href={`${homeDic.imageHero.btnPathTwo}`}>
              <ButtonMotion
                aria-label="Contactar"
                textClass={"text-white"}
                textClassTwo={"text-white"}
                className="bg-accent dark:bg-secondary-gradient px-10 py-3 text-white flex items-center justify-center  text-xs tracking-widest"
              >
                {homeDic.imageHero.btnTextTwo}
              </ButtonMotion>
            </Link>
          </div>
        </div>
      </div>
      <div className="absolute -bottom-20 left-1/2 transform -translate-x-1/2 z-20">
        <div className="flex items-center justify-center gap-5 maxsm:gap-1 w-full bg-background  py-4 shadow-sm shadow-slate-400">
          <motion.div
            initial={{ opacity: 0, scale: 0 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{
              duration: 0.7,
              type: "tween",
              stiffness: 260,
              damping: 20,
            }}
            className=" w-52 maxsm:w-28 flex flex-col items-center justify-start px-6 maxsm:px-1 py-4 border-r-2 border-primary"
          >
            <div className=" flex flex-col maxlg:items-center items-center justify-start w-full">
              <GiOilDrum size={50} className="text-primary" />{" "}
              <span className="text-xl maxlg:text-sm text-center font-semibold">
                Explora Productos
              </span>
            </div>
            <span className="text-xs  maxlg:hidden font-semibold text-center">
              Descubre nuestros productos.
            </span>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{
              duration: 0.7,
              type: "tween",
              stiffness: 260,
              damping: 20,
            }}
            className=" w-52  maxsm:w-28 flex flex-col items-center px-6 maxsm:px-1 py-4 border-r-2 border-primary"
          >
            <div className=" flex flex-col maxlg:items-center  items-center justify-start w-full">
              <BsDropletHalf size={50} className="text-primary" />{" "}
              <span className="text-xl  maxlg:text-sm text-center font-semibold">
                {lang === "en"
                  ? "Become a Distributor"
                  : "Conviértete en distribuidora"}
              </span>
            </div>
            <span className="text-xs text-center maxlg:hidden font-semibold">
              Donde comprar AceiteCNR.
            </span>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, scale: 0 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{
              duration: 0.7,
              type: "tween",
              stiffness: 260,
              damping: 20,
            }}
            className=" flex  w-52  maxsm:w-28  flex-col items-center justify-start px-6 maxsm:px-1 py-4 "
          >
            <div className=" flex flex-col maxlg:items-center items-center justify-start w-full">
              <MdOutlinePrecisionManufacturing
                size={50}
                className="text-primary"
              />{" "}
              <span className="text-xl maxlg:text-sm text-center font-semibold">
                {
                  (lang = "en"
                    ? "We manufacture your brand"
                    : "Maquilamos tu marca")
                }
              </span>
            </div>
            <span className="text-xs text-center maxlg:hidden font-semibold">
              {lang === "en"
                ? "Start your own brand of premium oil."
                : "Comienza tu propia marca de aceite premium."}
            </span>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default ImageHero;
