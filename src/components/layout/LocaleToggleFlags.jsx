"use client";

import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";
import { i18n } from "@/i18n.config";
import Image from "next/image";

const searchTranslationMap = {
  additives: { en: "Additives", es: "Aditivos" },
  automotive: { en: "Automotive", es: "Automotriz" },
  motorcycle: { en: "Motorcycles", es: "Motocicletas" },
  heavy: { en: "Heavy Duty", es: "Servicio Pesado" },
  hydraulics: { en: "Hydraulics", es: "Hydraulics" },
  machinery: { en: "Maquinaria", es: "Machinery" },
  food: { en: "Grado Alimenticio", es: "Food Grade" },
  // add more terms as needed
};

export default function LocaleToggleFlags({ className }) {
  const pathName = usePathname();
  const searchParams = useSearchParams();

  const redirectedPathName = (locale) => {
    if (!pathName) return "/";

    const segments = pathName.split("/");
    segments[1] = locale;
    const newSegment = segments.join("/");

    const params = new URLSearchParams(searchParams);
    const rawKeyword = params.get("keyword");

    if (rawKeyword) {
      const decodedKeyword = decodeURIComponent(rawKeyword).toLowerCase();

      // Try to find the translation
      for (const key in searchTranslationMap) {
        const enValue = searchTranslationMap[key].en.toLowerCase();
        const esValue = searchTranslationMap[key].es.toLowerCase();

        if (
          decodedKeyword === enValue.toLowerCase() ||
          decodedKeyword === esValue.toLowerCase()
        ) {
          const translated =
            locale === "es"
              ? searchTranslationMap[key].es
              : searchTranslationMap[key].en;

          params.set("keyword", translated);
          break;
        }
      }
    }

    const search = params.toString();
    return search ? `${newSegment}?${search}` : newSegment;
  };

  return (
    <ul
      className={`${className} mt-1 flex justify-center items-center mb-1 gap-x-3 `}
    >
      {i18n.locales.map((locale) => {
        return (
          <li key={locale}>
            <Link
              href={redirectedPathName(locale)}
              className="hover:text-secondary cursor-pointer duration-200 font-secondary text-sm"
            >
              <div>
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
