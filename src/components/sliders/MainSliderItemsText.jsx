import React from "react";
import { FaArrowRightLong } from "react-icons/fa6";
import { motion } from "framer-motion";
import Link from "next/link";
import { ButtonMotion } from "../button/ButtonMotion";

const MainSliderItemsText = ({ item, index, lang }) => {
  return (
    <motion.div
      className={`slide ${index === 0 ? "active fromLeft" : "fromRight"}`}
      style={{
        display: "flex",
        alignItems: "center",
        height: "100%",
      }}
    >
      <div className="text-column">
        <div className="font-primary text-7xl  maxmd:text-5xl flex flex-wrap items-center gap-x-3 ">
          <motion.h1 className="text-primary dark:text-white text-wrap">
            {item.title}
          </motion.h1>
          <motion.h1 className="text-white dark:text-primary">
            {item.titleTwo}
          </motion.h1>
        </div>

        <motion.p className="text-xs font-secondary mt-2 text-white text-wrap">
          {item.text}
        </motion.p>

        <Link href={`/${lang}/productos`}>
          <ButtonMotion
            aria-label="Contactar"
            textClass={"text-white"}
            textClassTwo={"text-white"}
            className="bg-accent dark:bg-secondary-gradient px-10 py-3 text-white flex items-center justify-center  text-xs tracking-widest mt-5"
          >
            {item.btnText}
          </ButtonMotion>
        </Link>
      </div>
    </motion.div>
  );
};

export default MainSliderItemsText;
