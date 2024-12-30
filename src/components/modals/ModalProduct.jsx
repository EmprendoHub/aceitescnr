"use client";
import React from "react";
import { AnimatePresence, motion } from "framer-motion";
import ProductDetailsComponent from "../products/ProductDetailsComponent";

const backdropVariants = {
  animate: { opacity: 1, scale: 1 },
  initial: { opacity: 0, scale: 0.5 },
  duration: { duration: 1.5 },
};
const ModalProduct = ({ showModal, setShowModal, data, lang, productDic }) => {
  return (
    <AnimatePresence mode="wait">
      {showModal && (
        <motion.div
          className="backdrop fixed top-0 left-0 w-full h-full bg-black bg-opacity-40 z-[555]"
          variants={backdropVariants}
          initial="initial"
          animate="animate"
        >
          <ProductDetailsComponent
            setShowModal={setShowModal}
            lang={lang}
            productDic={productDic}
            data={data}
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default ModalProduct;
