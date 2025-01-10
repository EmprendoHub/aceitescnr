"use client";

import { motion } from "framer-motion";

const backgroundVariant = {
  initial: {
    backgroundColor: "#c53333",
  },
  hover: {
    backgroundColor: "#3349c5",
    transition: {
      delay: 0.1,
      duration: 0.5,
      ease: [0.19, 1, 0.22, 1],
    },
  },
  animate: {
    backgroundColor: "#c53333",
    transition: {
      delay: 0.1,
      duration: 0.5,
      ease: [0.19, 1, 0.22, 1],
    },
  },
};

const firstTextVariant = {
  initial: {
    y: 0,
  },
  hover: {
    y: -20,
    transition: {
      duration: 1.125,
      ease: [0.19, 1, 0.22, 1],
    },
  },
  animate: {
    y: 0,
    transition: {
      duration: 1.125,
      ease: [0.19, 1, 0.22, 1],
    },
  },
};

const secondTextVariant = {
  initial: {
    y: 20,
  },
  hover: {
    y: 0,
    transition: {
      duration: 1.125,
      ease: [0.19, 1, 0.22, 1],
    },
  },
  animate: {
    y: 20,
    transition: {
      duration: 1.125,
      ease: [0.19, 1, 0.22, 1],
    },
  },
};

export const ButtonMotion = ({
  children,
  className,
  textClass,
  textClassTwo,
}) => {
  return (
    <motion.button
      initial="initial"
      whileHover="hover"
      animate="animate"
      variants={backgroundVariant}
      className={className}
    >
      <div className="overflow-hidden relative ">
        <motion.p variants={firstTextVariant} className={`${textClass}`}>
          {children}
        </motion.p>
        <motion.p
          variants={secondTextVariant}
          aria-hidden
          className={`absolute top-0 left-0 ${textClassTwo}`}
        >
          {children}
        </motion.p>
      </div>
    </motion.button>
  );
};
