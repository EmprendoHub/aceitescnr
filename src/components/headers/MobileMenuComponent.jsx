"use client";
import React, { useState } from "react";
import { AiOutlineMenu, AiOutlineClose } from "react-icons/ai";
import { AnimatePresence, motion } from "framer-motion";
import Link from "next/link";
import { BsFacebook, BsInstagram } from "react-icons/bs";
import styles from "./_navbar.module.scss";
import DarkLightLogo from "../logos/DarkLightLogo";
import {
  FaFacebookF,
  FaInstagram,
  FaLinkedin,
  FaWhatsapp,
} from "react-icons/fa6";
import WhiteLogoComponent from "../logos/WhiteLogoComponent";

const MobileMenuComponent = ({ className, lang, localeHeader }) => {
  const [open, setOpen] = useState(false);
  const toggleMobileMenu = () => {
    setOpen((prevOpen) => !prevOpen);
  };
  const menuVariants = {
    initial: {
      scaleY: 0,
    },
    animate: {
      scaleY: 1,
      transition: {
        duration: 0.5,
        ease: [0.12, 1, 0.39, 1],
      },
    },
    exit: {
      scaleY: 0,
      transition: {
        delay: 0.5,
        duration: 0.5,
        ease: [0.22, 1, 0.36, 1],
      },
    },
  };
  const containerVariants = {
    initial: {
      transition: {
        staggerChildren: 0.09,
        staggerDirection: -1,
      },
    },
    open: {
      transition: {
        delayChildren: 0.3,
        staggerChildren: 0.09,
        staggerDirection: 1,
      },
    },
  };

  return (
    <div className={`${className}`}>
      <nav className="flex flex-row items-center justify-center gap-x-2">
        {/*Mobile Navigation*/}
        <div
          onClick={toggleMobileMenu}
          className="relative flex flex-row items-center justify-end gap-x-2  cursor-pointer text-sm"
        >
          <div className="p-2 bg-fourth drop-shadow-md rounded-full ">
            <AiOutlineMenu className="text-xl" />
          </div>
        </div>
      </nav>
      <AnimatePresence>
        {open && (
          <motion.div
            variants={menuVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            className="fixed flex items-center justify-center flex-col left-0 top-0 w-full min-h-screen bg-main-gradient dark:bg-dark px-10 pt-2 z-[50] origin-top"
          >
            <p
              onClick={toggleMobileMenu}
              className="cursor-pointer text-md  absolute right-4 top-4"
            >
              <AiOutlineClose />
            </p>
            <div className="relative flex h-full flex-col mb-5">
              <WhiteLogoComponent className={"mb-5"} lang={lang} />
              <motion.div
                variants={containerVariants}
                initial="initial"
                animate="open"
                exit="initial"
                className="flex flex-col h-[50vh] justify-between font-primary font-light tracking-wider items-center gap-4 maxmd:gap-2"
              >
                {localeHeader?.menu?.map((link, index) => {
                  return (
                    <div key={index} className="overflow-hidden ">
                      <MobileNavLink
                        title={link.title}
                        href={`/${lang}${link.url}`}
                        toggleMobileMenu={toggleMobileMenu}
                      />
                    </div>
                  );
                })}
              </motion.div>
            </div>

            {/* Social media */}
            <div className="w-1/2">
              <div className="relative flex items-center justify-center w-full">
                {/* Facebook */}
                <Link
                  aria-label="Facebook"
                  target="_blank"
                  href={"https://www.facebook.com/cnraceites"}
                  className="relative flex items-center justify-center group"
                >
                  <svg className={`${styles.circle}`}>
                    <g>
                      <ellipse
                        className={`${styles.background}`}
                        ry="20"
                        rx="20"
                        cy="30"
                        cx="30"
                        strokeWidth="2"
                      />
                      <ellipse
                        className={`${styles.foreground}`}
                        ry="20"
                        rx="20"
                        cy="30"
                        cx="30"
                        strokeWidth="2"
                      />
                    </g>
                  </svg>
                  <FaFacebookF className="absolute text-xs group-hover:text-secondary ease-in-out duration-700 z-0" />
                </Link>
                {/* LinkedIn */}
                <Link
                  aria-label="Instagram"
                  target="_blank"
                  href={"https://www.instagram.com/cnraceites/"}
                  className="relative flex items-center justify-center group"
                >
                  <svg className={`${styles.circle}`}>
                    <g>
                      <ellipse
                        className={`${styles.background}`}
                        ry="20"
                        rx="20"
                        cy="30"
                        cx="30"
                        strokeWidth="2"
                      />
                      <ellipse
                        className={`${styles.foreground}`}
                        ry="20"
                        rx="20"
                        cy="30"
                        cx="30"
                        strokeWidth="2"
                      />
                    </g>
                  </svg>
                  <FaInstagram className="absolute text-xs group-hover:text-secondary ease-in-out duration-700 z-0" />
                </Link>
                {/* WhatsApp */}
                <Link
                  aria-label="WhatsApp"
                  target="_blank"
                  href={"https://wa.me/528115914469"}
                  className="relative flex items-center justify-center group"
                >
                  <svg className={`${styles.circle}`}>
                    <g>
                      <ellipse
                        className={`${styles.background}`}
                        ry="20"
                        rx="20"
                        cy="30"
                        cx="30"
                        strokeWidth="2"
                      />
                      <ellipse
                        className={`${styles.foreground}`}
                        ry="20"
                        rx="20"
                        cy="30"
                        cx="30"
                        strokeWidth="2"
                      />
                    </g>
                  </svg>
                  <FaWhatsapp className="absolute text-xs group-hover:text-secondary ease-in-out duration-700 z-0" />
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default MobileMenuComponent;

const mobileNavLinksVariants = {
  initial: {
    y: "30vh",
    transition: {
      duration: 0.5,
      ease: [0.37, 0, 0.63, 1],
    },
  },
  open: {
    y: 0,
    transition: {
      duration: 0.7,
      ease: [0, 0.35, 0.45, 1],
    },
  },
};

const MobileNavLink = ({ title, href, toggleMobileMenu }) => {
  return (
    <motion.div
      variants={mobileNavLinksVariants}
      className="text-xl uppercase "
    >
      <Link
        href={href}
        onClick={toggleMobileMenu}
        className="relative group flex items-center text-lg font-primary p-3 
          "
      >
        <span className={`${styles.bouncingBall}   hidden group-hover:block`} />
        <span>{title}</span>
      </Link>
    </motion.div>
  );
};
