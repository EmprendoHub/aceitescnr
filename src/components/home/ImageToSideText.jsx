import Link from "next/link";
import React from "react";

const ImageToSideText = ({ homeDic }) => {
  return (
    <div className="w-full h-full overflow-x-hidden my-10">
      {/* underhero */}

      <section className=" py-8">
        <div className="container max-w-5xl mx-auto m-8">
          <div className="flex maxmd:flex-wrap items-center justify-center">
            <div className="w-3/5 maxmd:w-full p-6">
              <h2 className="text-3xl text-gray-800 dark:text-gray-300 font-primary leading-none mb-3">
                <span>{homeDic.sideText.title} </span>
                <span className="text-primary">
                  {homeDic.sideText.titleTwo}
                </span>
              </h2>
              <p className="font-secondary italic text-sm font-semibold mb-1">
                {homeDic.sideText.subtitle}
              </p>
              <p className="text-gray-800 dark:text-gray-300 font-secondary text-sm mb-8  maxmd:text-sm">
                {homeDic.sideText.text}
              </p>
              <Link
                href={homeDic.sideText.btnUrl}
                aria-label="Contactar"
                className="bg-dark dark:bg-primary px-4 py-3 text-white flex items-center justify-center uppercase text-xs tracking-widest"
              >
                {homeDic.sideText.btnText}
              </Link>
            </div>
            <div className="relative w-2/5 maxmd:w-full pl-6">
              {/* <!-- not-animated blob --> */}
              <div className="relative w-full">
                <div className={`relative `}>
                  <ul className="font-secondary tracking-widest capitalize text-xs  ">
                    {homeDic?.sideText?.bullets?.map((bullet) => (
                      <li
                        key={bullet}
                        className="hover:text-secondary hover:scale-95 cursor-pointer ease-in-out duration-500 mb-4"
                      >
                        - {bullet}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ImageToSideText;
