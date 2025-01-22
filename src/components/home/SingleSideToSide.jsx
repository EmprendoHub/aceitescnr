"use client";
import { motion } from "framer-motion";
import React from "react";
import Image from "next/image";
import { GiCheckMark } from "react-icons/gi";
import FlipBoxesComp from "./FlipBoxesComp";
import Link from "next/link";
import { ButtonMotion } from "../button/ButtonMotion";

const SingleSideToSide = ({ homeDic, flipBoxes }) => {
  return (
    <div className="w-full pt-10 maxmd:pt-0 bg-background dark:bg-primary px-32 maxxlg:px-10 maxlg:px-5 maxmd:px-3 ">
      {/* underhero */}

      <section className=" py-8">
        <div className=" mx-auto m-8">
          <div className="flex maxmd:flex-wrap items-center justify-center">
            {/* Text */}
            <div className="w-1/3 maxmd:w-full p-6 maxmd:px-0">
              <motion.h2
                initial={{ y: 50, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.7 }}
                className="text-3xl font-primary leading-none mb-3"
              >
                <span className=" ">{homeDic.singlesides.boxOne.title} </span>
                <span className="text-primary ">
                  {homeDic.singlesides.boxOne.titleTwo}
                </span>
              </motion.h2>
              <div className="font-secondary text-sm mb-3  maxmd:text-sm flex flex-col gap-3">
                <motion.p
                  initial={{ y: 50, opacity: 0 }}
                  whileInView={{ y: 0, opacity: 1 }}
                  transition={{ duration: 0.9 }}
                  className="  flex items-center gap-2"
                >
                  {homeDic.singlesides.boxOne.text}
                </motion.p>
              </div>

              <Link href={homeDic.sideText.btnUrl} aria-label="Contactar">
                <motion.div
                  initial={{ y: 50, opacity: 0 }}
                  whileInView={{ y: 0, opacity: 1 }}
                  transition={{
                    duration: 1.0,
                  }}
                >
                  <ButtonMotion
                    href={homeDic.imageHero.btnUrlTwo}
                    aria-label="Contactar"
                    textClass={"text-white"}
                    textClassTwo={"text-white"}
                    className="bg-accent dark:bg-secondary-gradient px-10 py-3 text-white flex items-center justify-center  text-xs tracking-widest"
                  >
                    {homeDic.singlesides.boxOne.btnText}
                  </ButtonMotion>
                </motion.div>
              </Link>
            </div>
            {/* Image */}
            <div className="relative w-2/3 maxmd:w-full">
              <FlipBoxesComp flipBoxes={flipBoxes} />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default SingleSideToSide;
