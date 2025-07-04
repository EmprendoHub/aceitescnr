"use client";
import styles from "./menufilterstyle.module.scss";
import { motion } from "framer-motion";
import { usePathname } from "next/navigation";
import { filterMenuSlide } from "./anim";
import { useSession } from "next-auth/react";
import AllFiltersComponent from "./AllFiltersComponent";

const FilterMenuComponent = ({
  lang,
  allBrands,
  allCategories,
  SetIsActive,
  isActive,
}) => {
  return (
    <motion.div
      variants={filterMenuSlide}
      initial="initial"
      animate="enter"
      exit="exit"
      className={`${styles.menu} bg-transparent`}
    >
      <div
        className={`${styles.body} max-w-[350px]  overflow-y-auto px-5 py-10`}
      >
        <AllFiltersComponent
          lang={lang}
          allBrands={allBrands}
          allCategories={allCategories}
          SetIsActive={SetIsActive}
          isActive={isActive}
        />
      </div>
    </motion.div>
  );
};

export default FilterMenuComponent;
