"use client";
import { motion } from "framer-motion";

const SectionTitle = ({ title, titleTwo = "", subtitle, className = "" }) => {
  return (
    <div
      className={`section-title-class w-full flex flex-col items-center justify-center  mx-auto ${className} `}
    >
      <motion.h2
        initial={{ y: 50, opacity: 0 }}
        whileInView={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="  font-primary mb-4"
      >
        <span className="text-primary dark:text-white">{title} </span>
        <span className="text-dark dark:text-primary">{titleTwo}</span>
      </motion.h2>

      <motion.div
        initial={{ y: 50, opacity: 0 }}
        whileInView={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6 }}
        className="h-[1px] w-[150px] border-b border-primary mb-4"
      />
      <motion.p
        initial={{ y: 50, opacity: 0 }}
        whileInView={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.7 }}
        className="text-base maxmd:text-sm font-secondary "
      >
        {subtitle}
      </motion.p>
    </div>
  );
};

export default SectionTitle;
