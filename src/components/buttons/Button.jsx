import Link from "next/link";
import React from "react";

function Button({ text, link }) {
  return (
    <Link
      className="btn bg-main-gradient px-6 py-3 rounded-lg text-white"
      href={link}
    >
      {text}
    </Link>
  );
}

export default Button;
