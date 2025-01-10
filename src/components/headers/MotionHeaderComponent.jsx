"use client";
import React, { useState } from "react";
import { motion, useScroll, useMotionValueEvent } from "framer-motion";
import MobileMenuComponent from "./MobileMenuComponent";
import { useSession } from "next-auth/react";
import Link from "next/link";
import styles from "./_navbar.module.scss";
import WhiteLogoComponent from "../logos/WhiteLogoComponent";
import { useDispatch } from "react-redux";
import { useSearchParams } from "next/navigation";
import TopBar from "./TopBar";
import LocaleToggleFlags from "../layout/LocaleToggleFlags";

const MotionHeaderComponent = ({ localeHeader, lang }) => {
  const [hidden, setHidden] = useState(true);
  const [transparency, setTransparency] = useState(false);
  const { scrollY } = useScroll();
  const { data: session } = useSession();
  const isLoggedIn = Boolean(session?.user);
  const params = useSearchParams();
  const dispatch = useDispatch();
  const referralSuccess = params.get("alink");
  if (referralSuccess) {
    dispatch(addAffiliate(referralSuccess));
  }

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

  useMotionValueEvent(scrollY, "change", (latest) => {
    const previous = scrollY.getPrevious();
    if (latest > previous && latest > 150) {
      setHidden(false);
    } else {
      setHidden(true);
    }
    if (latest < 150) {
      setTransparency(false);
    } else {
      setTransparency(true);
    }
  });

  return (
    <>
      {!isLoggedIn ? (
        <motion.nav
          variants={{ hidden: { y: 0 }, visible: { y: "-110%" } }}
          animate={hidden ? "hidden" : "visible"}
          transition={{ duration: 0.35, ease: "easeInOut" }}
          className={`print:hidden flex flex-row items-center justify-between  header-class text-white  text-xl fixed top-0 z-[9999]  w-full mx-auto py-3 pl-4 h-[80px] ${
            !transparency ? "" : "bg-black bg-opacity-50"
          }`}
        >
          <WhiteLogoComponent lang={lang} />
          <div className="relative flex items-center justify-center ">
            <MobileMenuComponent
              className={"block"}
              lang={lang}
              localeHeader={localeHeader}
            />

            <span className="pr-4 text-sm relative z-10">
              <LocaleToggleFlags />
            </span>
          </div>
        </motion.nav>
      ) : (
        <TopBar session={session} lang={lang} />
      )}
    </>
  );
};

export default MotionHeaderComponent;

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

const MobileNavLink = ({ title, href, lang }) => {
  return (
    <motion.div
      variants={mobileNavLinksVariants}
      className="tracking-widest text-xs uppercase "
    >
      <Link
        href={`/${lang}${href}`}
        className={`relative group flex items-center text-sm font-primary p-3`}
      >
        <span className={`${styles.bouncingBall} hidden group-hover:block`} />
        <span>{title}</span>
      </Link>
    </motion.div>
  );
};
