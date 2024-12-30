import React from "react";
import { FaArrowRightLong } from "react-icons/fa6";
import { motion } from "framer-motion";
import Link from "next/link";

const MainSliderItemsText = ({ item, index }) => {
  return (
    <div className="relative w-full h-full pr-10 maxmd:pr-0 overflow-x-hidden">
      {/* Text Column */}
      <div className="w-full h-full relative grid grid-cols-1 items-start ">
        <h2 className="font-primary text-7xl maxxlg:text-5xl maxmd:text-4xl flex flex-wrap items-center gap-x-3">
          <motion.span
            initial={{ y: -50, x: -50, opacity: 0 }}
            whileInView={{ y: 0, x: 0, opacity: 1 }}
            transition={{ duration: 0.7 }}
            className="text-primary dark:text-white text-wrap"
          >
            {item.title}
          </motion.span>
          <motion.span
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.7 }}
            className="text-white dark:text-primary"
          >
            {item.titleTwo}
          </motion.span>
        </h2>
        <motion.p
          initial={{ x: -50, opacity: 0 }}
          whileInView={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.8 }}
          className="text-sm font-secondary mt-2 text-white text-wrap"
        >
          {item.text}
        </motion.p>
        <Link href={item.btnPath} className="w-60 mb-20">
          <motion.button
            initial={{ x: -50, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.8 }}
            className="text-sm font-secondary my-4 gap-x-2 flex items-center text-white text-wrap"
          >
            {item.btnText} <FaArrowRightLong />
          </motion.button>
        </Link>
      </div>
    </div>
  );
};

export default MainSliderItemsText;
