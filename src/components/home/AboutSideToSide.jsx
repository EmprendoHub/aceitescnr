"use client";
import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";

const AboutSideToSide = ({ homeDic }) => {
  return (
    <div className="w-full min-h-full dark:bg-background pt-20">
      <div className="h-full py-8">
        {/* Top Side */}
        <div className="h-full max-w-5xl mx-auto m-8">
          <div className="flex h-full maxmd:flex-col-reverse items-center justify-center">
            {/* text and image */}
            <div className="w-6/12 maxmd:w-full  h-full">
              <motion.div
                initial={{ x: -100, opacity: 0 }}
                whileInView={{ x: 0, opacity: 1 }}
                transition={{ type: "spring", stiffness: 100, duration: 0.5 }}
                className="relative w-[20rem] h-[20rem] maxsm:w-[15rem] maxsm:h-[15rem] rotate-45 overflow-hidden ml-10"
              >
                {/* Diamond image container */}
                <div className="w-[20rem] h-[20rem] maxsm:w-[15rem] maxsm:h-[15rem] relative rotate-45 overflow-hidden">
                  <div className="absolute -rotate-45 w-[141%] h-[141%] top-[-20.5%] left-[-20.5%]">
                    <Image
                      className="object-cover w-full h-full"
                      src={homeDic.contactBoxes.boxOne.imgUrl}
                      alt="Aceites CNR"
                      width={550}
                      height={550}
                      priority
                    />
                  </div>
                </div>
              </motion.div>
            </div>
            {/* text */}
            <div className="relative maxmd:ml-5 w-6/12 pr-20 maxmd:w-full">
              <motion.h2
                initial={{ x: -100, opacity: 0 }}
                whileInView={{ x: 0, opacity: 1 }}
                transition={{ type: "spring", stiffness: 100, duration: 0.5 }}
                className="text-5xl maxmd:text-3xl  font-primary leading-none mb-3 w-[90%] h-full"
              >
                <span>{homeDic.contactBoxes.boxOne.title} </span>
                <span className="text-primary">
                  {homeDic.contactBoxes.boxOne.titleTwo}
                </span>
              </motion.h2>
              <div className=" font-secondary text-sm mb-8 maxmd:text-sm flex flex-col gap-3 min-h-full">
                <motion.p
                  initial={{ x: -100, opacity: 0 }}
                  whileInView={{ x: 0, opacity: 1 }}
                  transition={{ type: "spring", stiffness: 100, duration: 0.5 }}
                  className="flex items-center gap-2"
                >
                  {homeDic.contactBoxes.boxOne.text}
                </motion.p>
                <motion.p
                  initial={{ x: -100, opacity: 0 }}
                  whileInView={{ x: 0, opacity: 1 }}
                  transition={{ type: "spring", stiffness: 100, duration: 0.5 }}
                  className="flex items-center gap-2"
                >
                  {homeDic.contactBoxes.boxOne.textTwo}
                </motion.p>
              </div>
            </div>
          </div>
        </div>
        {/* Bottom Side */}
        <div className="h-full max-w-5xl mx-auto m-8">
          <div className="flex maxmd:flex-wrap  maxmd:h-full items-center justify-center">
            {/* Text */}
            <div className="w-6/12 maxmd:w-full px-12">
              <motion.h2
                initial={{ y: -100, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                transition={{ type: "spring", stiffness: 100, duration: 0.5 }}
                className="text-5xl maxmd:text-3xl font-primary leading-none mb-3 w-[90%] h-full"
              >
                <span>{homeDic.contactBoxes.boxTwo.title} </span>
                <span className="text-primary">
                  {homeDic.contactBoxes.boxTwo.titleTwo}
                </span>
              </motion.h2>
              <div className="font-secondary text-sm mb-8 maxmd:text-sm flex flex-col gap-3 min-h-full">
                <motion.p
                  initial={{ y: 100, opacity: 0 }}
                  whileInView={{ y: 0, opacity: 1 }}
                  transition={{ type: "spring", stiffness: 100, duration: 0.5 }}
                  className="flex items-center gap-2"
                >
                  {homeDic.contactBoxes.boxTwo.text}
                </motion.p>
                <motion.p
                  initial={{ y: 100, opacity: 0 }}
                  whileInView={{ y: 0, opacity: 1 }}
                  transition={{ type: "spring", stiffness: 100, duration: 0.5 }}
                  className="flex items-center gap-2"
                >
                  {homeDic.contactBoxes.boxTwo.textTwo}
                </motion.p>
              </div>
            </div>
            {/* Image */}
            <div className="relative w-6/12 maxmd:w-[90%]">
              <motion.div
                initial={{ x: -100, opacity: 0 }}
                whileInView={{ x: 0, opacity: 1 }}
                transition={{ type: "spring", stiffness: 100, duration: 0.5 }}
                className="relative w-[20rem] h-[20rem] maxsm:w-[15rem] maxsm:h-[15rem] rotate-45 overflow-hidden ml-10"
              >
                {/* Diamond image container */}
                <div className="w-[20rem] h-[20rem] maxsm:w-[15rem] maxsm:h-[15rem] relative rotate-45 overflow-hidden">
                  <div className="absolute -rotate-45 w-[141%] h-[141%] top-[-20.5%] left-[-20.5%]">
                    <Image
                      className="object-cover w-full h-full"
                      src={homeDic.contactBoxes.boxTwo.imgUrl}
                      alt="Aceites CNR"
                      width={550}
                      height={550}
                      priority
                    />
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </div>
      <div className="h-full py-8">
        {/* Top Side */}
        <div className="h-full max-w-5xl mx-auto m-8">
          <div className="flex h-full maxmd:flex-col-reverse items-center justify-center">
            {/* text and image */}
            <div className="w-6/12 maxmd:w-full  h-full">
              <motion.div
                initial={{ x: -100, opacity: 0 }}
                whileInView={{ x: 0, opacity: 1 }}
                transition={{ type: "spring", stiffness: 100, duration: 0.5 }}
                className="relative w-[20rem] h-[20rem] maxsm:w-[15rem] maxsm:h-[15rem] rotate-45 overflow-hidden ml-10"
              >
                {/* Diamond image container */}
                <div className="w-[20rem] h-[20rem] maxsm:w-[15rem] maxsm:h-[15rem] relative rotate-45 overflow-hidden">
                  <div className="absolute -rotate-45 w-[141%] h-[141%] top-[-20.5%] left-[-20.5%]">
                    <Image
                      className="object-cover w-full h-full"
                      src={homeDic.contactBoxes.boxThree.imgUrl}
                      alt="Aceites CNR"
                      width={550}
                      height={550}
                      priority
                    />
                  </div>
                </div>
              </motion.div>
            </div>
            {/* text */}
            <div className="relative maxmd:ml-5 w-6/12 pr-20 maxmd:w-full">
              <motion.h2
                initial={{ x: -100, opacity: 0 }}
                whileInView={{ x: 0, opacity: 1 }}
                transition={{ type: "spring", stiffness: 100, duration: 0.5 }}
                className="text-5xl maxmd:text-3xl  font-primary leading-none mb-3 w-[90%] h-full"
              >
                <span>{homeDic.contactBoxes.boxThree.title} </span>
                <span className="text-primary">
                  {homeDic.contactBoxes.boxThree.titleTwo}
                </span>
              </motion.h2>
              <div className=" font-secondary text-sm mb-8 maxmd:text-sm flex flex-col gap-3 min-h-full">
                <motion.p
                  initial={{ x: -100, opacity: 0 }}
                  whileInView={{ x: 0, opacity: 1 }}
                  transition={{ type: "spring", stiffness: 100, duration: 0.5 }}
                  className="flex items-center gap-2"
                >
                  {homeDic.contactBoxes.boxThree.text}
                </motion.p>
                <motion.p
                  initial={{ x: -100, opacity: 0 }}
                  whileInView={{ x: 0, opacity: 1 }}
                  transition={{ type: "spring", stiffness: 100, duration: 0.5 }}
                  className="flex items-center gap-2"
                >
                  {homeDic.contactBoxes.boxThree.textTwo}
                </motion.p>
              </div>
            </div>
          </div>
        </div>
        {/* Bottom Side */}
        <div className="h-full max-w-5xl mx-auto m-8">
          <div className="flex maxmd:flex-wrap  maxmd:h-full items-center justify-center">
            {/* Text */}
            <div className="w-6/12 maxmd:w-full px-12">
              <motion.h2
                initial={{ y: -100, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                transition={{ type: "spring", stiffness: 100, duration: 0.5 }}
                className="text-5xl maxmd:text-3xl font-primary leading-none mb-3 w-[90%] h-full"
              >
                <span>{homeDic.contactBoxes.boxFour.title} </span>
                <span className="text-primary">
                  {homeDic.contactBoxes.boxFour.titleTwo}
                </span>
              </motion.h2>
              <div className="font-secondary text-sm mb-8 maxmd:text-sm flex flex-col gap-3 min-h-full">
                <motion.p
                  initial={{ y: 100, opacity: 0 }}
                  whileInView={{ y: 0, opacity: 1 }}
                  transition={{ type: "spring", stiffness: 100, duration: 0.5 }}
                  className="flex items-center gap-2"
                >
                  {homeDic.contactBoxes.boxFour.text}
                </motion.p>
                <motion.p
                  initial={{ y: 100, opacity: 0 }}
                  whileInView={{ y: 0, opacity: 1 }}
                  transition={{ type: "spring", stiffness: 100, duration: 0.5 }}
                  className="flex items-center gap-2"
                >
                  {homeDic.contactBoxes.boxFour.textTwo}
                </motion.p>
              </div>
            </div>
            {/* Image */}
            <div className="relative w-6/12 maxmd:w-[90%]">
              <motion.div
                initial={{ x: -100, opacity: 0 }}
                whileInView={{ x: 0, opacity: 1 }}
                transition={{ type: "spring", stiffness: 100, duration: 0.5 }}
                className="relative w-[20rem] h-[20rem] maxsm:w-[15rem] maxsm:h-[15rem] rotate-45 overflow-hidden ml-10"
              >
                {/* Diamond image container */}
                <div className="w-[20rem] h-[20rem] maxsm:w-[15rem] maxsm:h-[15rem] relative rotate-45 overflow-hidden">
                  <div className="absolute -rotate-45 w-[141%] h-[141%] top-[-20.5%] left-[-20.5%]">
                    <Image
                      className="object-cover w-full h-full"
                      src={homeDic.contactBoxes.boxFour.imgUrl}
                      alt="Aceites CNR"
                      width={550}
                      height={550}
                      priority
                    />
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutSideToSide;
