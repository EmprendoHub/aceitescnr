import { cx } from "@/backend/helpers";
import Link from "next/link";
import React from "react";

const Tag = ({ link = "#", name, ...props }) => {
  return (
    <Link
      aria-label="tag"
      href={link}
      className={cx(
        "inline-block py-2 px-6 bg-dark text-light rounded-full capitalize font-semibold border-2 border-solid border-light hover:scale-105 transition-all ease duration-200 text-sm ",
        props.className
      )}
    >
      {name}
    </Link>
  );
};

export default Tag;
