"use client";
import { motion } from "framer-motion";
import Link from "next/link";
import React from "react";

const SideToSideText = ({ homeDic }) => {
  return (
    <div className="w-full h-full overflow-x-hidden my-10 px-40 maxxlg:px-20 maxlg:px-10 maxmd:px-5 ">
      {/* underhero */}
      <section className="bg-dark dark:bg-primary text-white py-8">
        <div className="container max-w-5xl mx-auto m-8">
          <div className="flex maxmd:flex-wrap items-center justify-center">
            <div className="w-3/5 maxmd:w-full p-6">
              <motion.h2
                initial={{ y: 50, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.7 }}
                className="text-3xl  dark:text-gray-300 font-primary leading-none mb-3"
              >
                <span>{homeDic.sideText.title} </span>
                <span className="text-primary dark:text-dark">
                  {homeDic.sideText.titleTwo}
                </span>
              </motion.h2>
              <motion.div
                initial={{ y: 50, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.8 }}
                className="h-2 bg-primary dark:bg-dark my-2 rounded-full w-[80%]"
              />

              <motion.p
                initial={{ y: 50, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.9 }}
                className="text-gray-300 font-secondary text-sm mb-8  maxmd:text-sm"
              >
                {homeDic.sideText.text}
              </motion.p>
              <Link href={homeDic.sideText.btnUrl} aria-label="Contactar">
                <motion.button
                  initial={{ y: 50, opacity: 0 }}
                  whileInView={{ y: 0, opacity: 1 }}
                  transition={{
                    duration: 1.1,
                  }}
                  aria-label="Contactar"
                  className="bg-primary dark:bg-dark px-10 py-3 text-white flex items-center justify-center uppercase text-xs tracking-widest"
                >
                  {homeDic.sideText.btnText}
                </motion.button>
              </Link>
            </div>
            <div className="relative w-2/5 maxmd:w-full pl-6">
              {/* <!-- not-animated blob --> */}
              <motion.div
                initial={{ opacity: 0, scale: 0 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{
                  duration: 1.5,
                  type: "spring",
                  stiffness: 260,
                  damping: 20,
                }}
                className="circle rounded-full h-20 w-20 bg-primary dark:bg-dark mb-10"
              />
              <div className="relative w-full">
                <div className={`relative `}>
                  <ul className="font-secondary tracking-widest capitalize text-xs  ">
                    {homeDic?.sideText?.bullets?.map((bullet, index) => (
                      <motion.li
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        transition={{
                          duration: (index + 5) * 0.1,
                        }}
                        key={bullet}
                        className=" hover:scale-95 cursor-pointer ease-in-out duration-500 mb-4"
                      >
                        - {bullet}
                      </motion.li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default SideToSideText;
