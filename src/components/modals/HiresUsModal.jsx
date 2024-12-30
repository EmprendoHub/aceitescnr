"use client";
import React from "react";
import { AnimatePresence, motion } from "framer-motion";
import HireUsForm from "./HireUsForm";

const backdropVariants = {
  animate: { opacity: 1, scale: 1 },
  initial: { opacity: 0, scale: 0.5 },
  duration: { duration: 1.5 },
};
const HiresUsModal = ({ showModal, setShowModal, lang }) => {
  return (
    <AnimatePresence mode="wait">
      {showModal && (
        <motion.div
          className="backdrop fixed top-0 left-0 w-full h-full bg-black bg-opacity-40 z-[555]"
          variants={backdropVariants}
          initial="initial"
          animate="animate"
        >
          <HireUsForm setShowModal={setShowModal} lang={lang} />
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default HiresUsModal;
