"use client";

import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";
import { i18n } from "@/i18n.config";
import Image from "next/image";

export default function LocaleToggle({ className }) {
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
    <ul className={`${className} mt-1 flex justify-start gap-x-3 `}>
      {i18n.locales.map((locale) => {
        return (
          <li key={locale}>
            <Link
              href={redirectedPathName(locale)}
              className="hover:text-secondary cursor-pointer duration-200 font-secondary text-sm"
            >
              <div>
                {locale}
                <span>
                  <Image
                    alt="flag"
                    width={20}
                    height={20}
                    src={
                      locale === "es"
                        ? "/icons/flag-mexico.svg"
                        : "/icons/flag-us.svg"
                    }
                  />
                </span>
              </div>
            </Link>
          </li>
        );
      })}
    </ul>
  );
}
