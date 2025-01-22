"use client";

import Image from "next/image";
import React from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { ButtonMotion } from "../button/ButtonMotion";

const DistributorCTA = ({ content, lang }) => {
  return (
    <section className="flex maxmd:flex-col gap-7 items-center  maxmd:items-start justify-between p-8 pt-20 bg-main-gradient text-white py-24 px-40 maxxlg:px-20 maxlg:px-5">
      <motion.div
        initial={{ x: -100, opacity: 0 }}
        whileInView={{ x: 0, opacity: 1 }}
        transition={{ type: "spring", stiffness: 100, duration: 0.5 }}
      >
        <h1 className="text-4xl maxsm:text-2xl font-bold">
          {content.hero.title}
        </h1>
        <p className="mt-4 maxsm:text-sm">{content.hero.description}</p>
        <Link href={`/${lang}/distribuidores`}>
          <ButtonMotion
            aria-label="Contactar"
            textClass={"text-white"}
            textClassTwo={"text-white"}
            className="bg-accent dark:bg-secondary-gradient px-10 py-3 text-white flex items-center justify-center  text-xs tracking-widest mt-5"
          >
            {content.hero.cta}
          </ButtonMotion>
        </Link>
      </motion.div>
      <motion.div
        initial={{ y: -100, opacity: 0 }}
        whileInView={{ y: 0, opacity: 1 }}
        transition={{ type: "spring", stiffness: 100, duration: 0.5 }}
      >
        <Image
          src={content.images.mainImage}
          alt="Distributor delivering products"
          className="max-w-xl maxsm:max-w-[95%] rounded-lg shadow-lg"
          width={500}
          height={500}
        />
      </motion.div>
    </section>
  );
};

export default DistributorCTA;
