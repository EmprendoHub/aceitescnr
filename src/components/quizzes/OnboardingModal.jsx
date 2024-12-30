"use client";
import React from "react";
import { AnimatePresence, motion } from "framer-motion";
import OnboardingQuiz from "./OnboardingQuiz";

const backdropVariants = {
  animate: { opacity: 1, scale: 1 },
  initial: { opacity: 0, scale: 0.5 },
  duration: { duration: 1.5 },
};
const OnboardingModal = ({ onboardingDic, showModal, setShowModal, lang }) => {
  return (
    <AnimatePresence mode="wait">
      <motion.div
        className="backdrop fixed top-0 left-0 w-full h-full bg-black bg-opacity-40 z-[555]"
        variants={backdropVariants}
        initial="initial"
        animate="animate"
      >
        <OnboardingQuiz
          onboardingDic={onboardingDic}
          setShowModal={setShowModal}
          lang={lang}
        />
      </motion.div>
    </AnimatePresence>
  );
};

export default OnboardingModal;
