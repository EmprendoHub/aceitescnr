"use client";
import Link from "next/link";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";

const LocaleToggleStyled = ({ className, lang }) => {
  const pathname = usePathname();
  const router = useRouter();
  const [localeLang, setLocaleLang] = useState(true);

  const pathName = usePathname();
  const searchParams = useSearchParams();

  const redirectedPathName = (locale) => {
    if (!pathName) return "/";
    const search = searchParams.toString();
    const segments = pathName.split("/");
    segments[1] = locale;
    const newsegment = segments.join("/");
    let newUrl;
    if (search) {
      newUrl = newsegment + "?" + search;
    } else {
      newUrl = newsegment;
    }
    return newUrl;
  };

  return (
    <Link
      href={localeLang ? redirectedPathName("es") : redirectedPathName("en")}
      className={`relative w-8 h-16 flex flex-col items-center justify-between dark:bg-teal-700 bg-teal-600 cursor-pointer rounded-full p-1 ${className}`}
      onClick={() => setLocaleLang(!localeLang)}
    >
      {"Es"}

      <div
        className="absolute bg-white dark:bg-gray-200 w-6 h-6 rounded-full shadow-md transform transition-transform duration-300"
        style={localeLang ? { top: "4px" } : { bottom: "4px" }}
      ></div>

      {"En"}
    </Link>
  );
};

export default LocaleToggleStyled;
