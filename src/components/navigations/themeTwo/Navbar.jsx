"use client";
import {
  motion,
  AnimatePresence,
  useMotionValueEvent,
  useScroll,
} from "framer-motion";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { CgClose } from "react-icons/cg";
import { GiHamburgerMenu } from "react-icons/gi";
import DarkLogoComponent from "@/components/logos/DarkLogoComponent";
import styles from "./_navbar.module.scss";

function Navbar() {
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

  return (
    <nav>
      <div
        className={`px-10 maxmd:px-3 ${styles.wrapper} ${
          navbarVisible ? styles.blurNav : ""
        }`}
      >
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
            <DarkLogoComponent />
          </Link>
        </motion.div>

        <div
          className={`${styles.navResponsiveToggle} bg-secondary pl-20 maxmd:pl-10 pb-20 maxmd:pb-10 rounded-bl-full absolute top-0 right-0`}
          onMouseEnter={() => setMiniNavbarVisible(true)}
        >
          {responsiveNavVisible ? (
            <CgClose
              className="text-white mr-3 mt-2 cursor-pointer"
              onClick={() => setResponsiveNavVisible(false)}
            />
          ) : (
            <div onClick={() => setResponsiveNavVisible(true)}>
              <GiHamburgerMenu className="text-white mr-3 mt-2 cursor-pointer" />
            </div>
          )}
        </div>

        <div
          className={`bg-white ${
            responsiveNavVisible ? `${styles.navResponsive} z-[999]` : ""
          } ${styles.navItems} ${
            responsiveNavVisible &&
            !navbarVisible &&
            isWideScreen &&
            "shadow-black shadow-lg"
          }`}
        >
          {/* Navigation Items */}
          <ul
            className={`w-full flex maxmd:flex-col items-center justify-between lowercase`}
          >
            {sectionLinks.map(({ name, link }, index) => (
              <motion.li
                key={name}
                className={` w-full`}
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
                  className={`relative group flex items-center text-sm font-primary p-3 ${
                    navbarVisible ? "text-gray-800" : "text-black"
                  }`}
                >
                  <span
                    className={`${styles.bouncingBall}   hidden group-hover:block`}
                  />
                  <span>{name}</span>
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
