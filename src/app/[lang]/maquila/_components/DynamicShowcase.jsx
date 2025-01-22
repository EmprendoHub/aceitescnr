"use client";

import React from "react";
import { motion } from "framer-motion";
import Image from "next/image";

const DynamicShowcase = ({ content }) => {
  return (
    <div className="bg-secondary p-10 pt-20">
      <div className="flex items-center justify-center">
        <motion.div
          className={`flex ${
            1 % 2 === 0 ? "flex-row" : "flex-row-reverse"
          } items-center gap-6`}
          initial={{ opacity: 0, x: 1 % 2 === 0 ? -100 : 100 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7, type: "spring", stiffness: 200 }}
        >
          <div className="w-1/2">
            <Image
              src={content.images.mainImage}
              alt={content.hero.title}
              width={500}
              height={500}
              className="rounded-lg shadow-lg"
            />
          </div>
          <div className="w-1/2 text-left space-y-3">
            <h2 className="text-3xl font-bold text-gray-800 dark:text-gray-200">
              {content.hero.title}
            </h2>
            <p className="text-gray-600 dark:text-gray-400">
              {content.hero.description}
            </p>
            <button className="px-6 py-2 bg-primary text-white rounded-lg hover:scale-105 transition">
              {content.hero.cta}
            </button>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default DynamicShowcase;
