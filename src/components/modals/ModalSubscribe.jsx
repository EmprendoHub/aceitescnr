'use client';
import React from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import SubscribeComponent from '../user/SubscribeComponent';

const backdropVariants = {
  animate: { opacity: 1, scale: 1 },
  initial: { opacity: 0, scale: 0.5 },
  duration: { duration: 1.5 },
};
const ModalSubscribe = ({ showModal, setShowModal, cookie }) => {
  const handleClickBack = async () => {
    setShowModal(true);
  };

  return (
    <AnimatePresence mode="wait">
      {showModal && (
        <motion.div
          className="backdrop fixed top-0 left-0 w-full h-full bg-black bg-opacity-40 z-[555] cursor-pointer"
          variants={backdropVariants}
          initial="initial"
          animate="animate"
          onClick={handleClickBack}
        >
          <SubscribeComponent cookie={cookie} setShowModal={setShowModal} />
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default ModalSubscribe;
