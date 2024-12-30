"use client";
import {
  motion,
  AnimatePresence,
  useMotionValueEvent,
  useScroll,
} from "framer-motion";
import React, { useEffect, useState } from "react";
import { FaQuestionCircle } from "react-icons/fa";
import Link from "next/link";
import WhiteLogoComponent from "@/components/logos/WhiteLogoComponent";
import { CgClose } from "react-icons/cg";
import { GiHamburgerMenu } from "react-icons/gi";
import { FaCode, FaMessage } from "react-icons/fa6";
import DarkLogoComponent from "@/components/logos/DarkLogoComponent";

function Navbar() {
  const MINI_MENU_DATA = [
    {
      btnLink: "/#contacto",
      icon: (
        <FaMessage className="relative text-inherit hover:scale-110 hover:text-darkteal-700 ease-in-out duration-300 cursor-pointer" />
      ),
    },
    {
      btnLink: "/preguntas",
      icon: (
        <FaQuestionCircle className="relative text-inherit hover:scale-110 hover:text-darkteal-700 ease-in-out duration-300 cursor-pointer" />
      ),
    },
    {
      btnLink: "/servicios",
      icon: (
        <FaCode className="relative text-inherit hover:scale-110 hover:text-darkteal-700  ease-in-out duration-300 cursor-pointer" />
      ),
    },
  ];
  const { scrollY } = useScroll();
  const [miniNavbarVisible, setMiniNavbarVisible] = useState(false);
  const [navbarVisible, setNavbarVisible] = useState(false);
  const [responsiveNavVisible, setResponsiveNavVisible] = useState(false);
  const [isWideScreen, setIsWideScreen] = useState(window.innerWidth > 1020);
  const sectionLinks = [
    { name: "Acerca", link: "/acerca" },
    { name: "Blog", link: "/blog" },
    { name: "Experiencia", link: "/portfolio" },
    { name: "Servicios", link: "/servicios" },
    { name: "Contacto", link: "/#contacto" },
  ];

  useMotionValueEvent(scrollY, "change", (latest) => {
    const previous = scrollY.getPrevious();
    if (latest > previous && latest > 100) {
      setNavbarVisible(true);
    } else {
      setNavbarVisible(false);
    }
  });

  useEffect(() => {
    const links = document.querySelectorAll(".nav-items-list-item-link");
    links.forEach((link) => {
      link.addEventListener("click", () => setResponsiveNavVisible(false));
    });
    const nav = document.querySelector(".nav-items");
    nav?.addEventListener("click", (e) => {
      e.stopPropagation();
    });
    const html = document.querySelector("html");
    html?.addEventListener("click", (e) => {
      setResponsiveNavVisible(false);
    });
  }, []);

  useEffect(() => {
    const main = document.querySelector("main");
    if (responsiveNavVisible) {
      main?.classList.add("blur");
    } else {
      main?.classList.remove("blur");
    }
  }, [responsiveNavVisible]);

  const miniMenuContainerVariants = {
    hidden: { opacity: 0, scale: 0.5 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        when: "beforeChildren",
        staggerChildren: 0.1,
        staggerDirection: -1, // Ensure normal order for appearance
      },
    },
    exit: {
      opacity: 0,
      scale: 0.5,
      transition: {
        when: "afterChildren",
        staggerChildren: 0.1,
        staggerDirection: 1,
      },
    },
  };

  const minMenuitemVariants = {
    hidden: { x: 2, opacity: 0 },
    visible: { y: 0, opacity: 1 },
    exit: { x: -2, opacity: 0 },
  };

  return (
    <nav>
      <div className={`wrapper ${navbarVisible ? "blur-nav" : ""}`}>
        <motion.div
          className="brand"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{
            duration: 0.3,
            ease: "easeInOut",
          }}
        >
          <Link href="/">
            <DarkLogoComponent
              className={` ${!navbarVisible ? "hidden" : ""}`}
            />
            <DarkLogoComponent
              className={` ${navbarVisible ? "hidden" : ""}`}
            />
          </Link>
        </motion.div>

        <AnimatePresence>
          {miniNavbarVisible && (
            <motion.div
              className="flex mini-menu absolute right-2 -top-1  px-16 py-10 "
              variants={miniMenuContainerVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              onHoverEnd={() => setMiniNavbarVisible(false)}
            >
              <div
                className={`flex flex-row gap-8 items-center justify-center ${
                  !navbarVisible ? "text-black" : "text-white"
                } maxsm:hidden`}
              >
                {MINI_MENU_DATA.map((mitem, index) => (
                  <div key={index}>
                    <motion.div key={index} variants={minMenuitemVariants}>
                      <Link href={mitem.btnLink}>{mitem.icon}</Link>
                    </motion.div>
                  </div>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <div
          className="nav-responsive-toggle cursor-pointer "
          onMouseEnter={() => setMiniNavbarVisible(true)}
        >
          {responsiveNavVisible ? (
            <CgClose onClick={() => setResponsiveNavVisible(false)} />
          ) : (
            <motion.div
              whileHover={{ rotate: 180 }}
              transition={{ duration: 0.8, ease: "easeInOut" }}
              onClick={() => setResponsiveNavVisible(true)}
            >
              <GiHamburgerMenu />
            </motion.div>
          )}
        </div>

        <div
          className={`${
            responsiveNavVisible ? "nav-responsive z-[999]" : ""
          } nav-items ${
            responsiveNavVisible &&
            !navbarVisible &&
            isWideScreen &&
            "shadow-black shadow-lg"
          }`}
          style={
            responsiveNavVisible && navbarVisible
              ? { backgroundColor: "#f5f5f5" }
              : !responsiveNavVisible && navbarVisible && isWideScreen
              ? { backgroundColor: "#f5f5f5" }
              : !responsiveNavVisible && navbarVisible && !isWideScreen
              ? { backgroundColor: "#f5f5f5" }
              : { backgroundColor: "#fff" }
          }
        >
          {/* Navigation Items */}
          <ul className="nav-items-list">
            <motion.li
              className="nav-logo"
              initial={{ opacity: 0, y: -25 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <DarkLogoComponent
                className={`${
                  responsiveNavVisible && navbarVisible ? "" : "hidden"
                }`}
              />
              <DarkLogoComponent
                className={`${
                  responsiveNavVisible && !navbarVisible ? "" : "hidden"
                }`}
              />
            </motion.li>
            {sectionLinks.map(({ name, link }, index) => (
              <motion.li
                key={name}
                className="nav-items-list-item"
                initial={{ opacity: 0, y: -25 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 0.3,
                  ease: "easeInOut",
                  delay: 0.3 + index * 0.1,
                }}
              >
                <Link
                  href={link}
                  className={`nav-items-list-item-link text-sm font-primary p-3 ${
                    navbarVisible ? "text-gray-800" : "text-black"
                  }`}
                >
                  {name}
                </Link>
              </motion.li>
            ))}
          </ul>
          {/* <motion.div
            className="nav-items-button"
            initial={{ opacity: 0, y: -25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.3,
              ease: "easeInOut",
              delay: 0.6,
            }}
          >
            <Button text="Servicios" link="/" />
          </motion.div> */}
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
