"use client";
import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";

const DoubleSideToSide = ({ homeDic }) => {
  return (
    <div className="w-full min-h-full my-10 bg-white dark:bg-primary">
      <div className="h-full py-8">
        {/* Top Side */}
        <div className="h-full max-w-5xl mx-auto m-8">
          <div className="flex h-full maxmd:flex-col-reverse items-center justify-center">
            {/* text and image */}
            <div className="w-6/12 maxmd:w-full p-6 h-full">
              <div className="text-gray-800  dark:text-gray-300 font-secondary text-sm mb-8 maxmd:text-sm flex flex-col gap-3">
                <motion.p
                  initial={{ y: 50, opacity: 0 }}
                  whileInView={{ y: 0, opacity: 1 }}
                  transition={{ duration: 0.7 }}
                  className="flex items-center gap-2"
                >
                  {homeDic.doublesides.boxTwo.text}
                </motion.p>
              </div>

              <motion.div
                initial={{ x: -100, opacity: 0 }}
                whileInView={{ x: 0, opacity: 1 }}
                transition={{
                  duration: 0.8,
                }}
                className="relative mt-20 ml-5"
              >
                {/* Diamond image container */}
                <div className="w-[20rem] h-[20rem] maxsm:w-[15rem] maxsm:h-[15rem] relative rotate-45 overflow-hidden">
                  <div className="absolute -rotate-45 w-[141%] h-[141%] top-[-20.5%] left-[-20.5%]">
                    <Image
                      className="object-cover w-full h-full"
                      src="/images/Madelto_cat_06.jpg"
                      alt="Aceites CNR"
                      width={550}
                      height={550}
                      priority
                    />
                  </div>
                </div>
              </motion.div>
            </div>
            {/* Diamonds */}
            <div className="relative maxmd:ml-5 w-5/12 maxmd:w-full">
              <div className="relative flex flex-col w-full rotate-45">
                <motion.div
                  initial={{ opacity: 0, scale: 0 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{
                    duration: 0.9,
                    type: "spring",
                    stiffness: 260,
                    damping: 20,
                  }}
                  className="h-40 w-40 bg-dark "
                />
                <motion.div
                  initial={{ opacity: 0, scale: 0 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{
                    duration: 1.2,
                    type: "spring",
                    stiffness: 260,
                    damping: 20,
                  }}
                  className="my-20 maxmd:my-10 h-14 w-14 dark:border-dark border-primary self-center border-[10px] rotate-45"
                />
              </div>
              <motion.h2
                initial={{ y: 100, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                transition={{
                  duration: 0.8,
                }}
                className="text-5xl maxmd:text-3xl text-gray-800 dark:text-gray-300 font-primary leading-none mb-3 w-[90%] h-full"
              >
                <span>{homeDic.doublesides.boxTwo.title} </span>
                <span className="text-dark">
                  {homeDic.doublesides.boxTwo.titleTwo}
                </span>
              </motion.h2>
            </div>
          </div>
        </div>
        {/* Bottom Side */}
        <div className="h-full max-w-5xl mx-auto m-8">
          <div className="flex maxmd:flex-wrap h-[700px] maxmd:h-full items-center justify-center">
            {/* Text */}
            <div className="w-5/12 maxmd:w-full p-6">
              <div className="rotate-45">
                <motion.div
                  initial={{ opacity: 0, scale: 0 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{
                    duration: 1.2,
                    type: "spring",
                    stiffness: 260,
                    damping: 20,
                  }}
                  className="mb-20 h-20 w-20 bg-dark"
                />
              </div>
              <motion.h2
                initial={{ y: 50, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.5 }}
                className="text-3xl font-primary leading-none mb-3"
              >
                <span>{homeDic.doublesides.boxOne.title} </span>
                <span className="text-dark">
                  {homeDic.doublesides.boxOne.titleTwo}
                </span>
              </motion.h2>
              <div className="text-gray-800 dark:text-gray-300 font-secondary text-sm mb-8 maxmd:text-sm flex flex-col gap-3 min-h-full">
                <motion.p
                  initial={{ y: 50, opacity: 0 }}
                  whileInView={{ y: 0, opacity: 1 }}
                  transition={{ duration: 0.7 }}
                  className="flex items-center gap-2"
                >
                  {homeDic.doublesides.boxOne.text}
                </motion.p>
              </div>
            </div>
            {/* Image */}
            <div className="relative w-6/12 maxmd:w-[90%]">
              <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{
                  duration: 1.1,
                }}
                className="relative w-[20rem] h-[20rem] maxsm:w-[15rem] maxsm:h-[15rem] rotate-45 overflow-hidden ml-10"
              >
                <div className="absolute -rotate-45 w-[141%] h-[141%] top-[-20.5%] left-[-20.5%]">
                  <Image
                    className="object-cover w-full h-full"
                    src="/images/Madelto_cat_05.jpg"
                    alt="Diseño Gráfico Profesional"
                    width={850}
                    height={850}
                  />
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DoubleSideToSide;
