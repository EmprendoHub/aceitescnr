import Image from "next/image";
import Link from "next/link";
import React from "react";

const TalkToTeam = ({ homeDic }) => {
  return (
    <div className="h-[90vh] my-8 ">
      <div className="bg-main-gradient bg-opacity-30 dark:bg-opacity-100 h-[25%] w-full mb-3 flex items-center justify-center px-20 maxmd:px-10 maxsm:px-5">
        <h3 className="text-4xl maxsm:text-2xl font-primary w-full text-white leading-none">
          {homeDic.teamTalk.title}
        </h3>
        <div className="w-full flex justify-end">
          <Link
            href={homeDic.teamTalk.btnUrl}
            aria-label="Contactar"
            className="bg-dark px-4 py-3 text-white flex items-center justify-center uppercase text-xs tracking-widest "
          >
            {homeDic.teamTalk.btnText}
          </Link>
        </div>
      </div>
      <div className="h-[75%] w-full relative">
        <Image
          className="object-cover w-full h-full z-10"
          src={homeDic.teamTalk.img}
          alt="Aplicaciones Web"
          width={1920}
          height={741}
          loading="lazy"
        />
      </div>
    </div>
  );
};

export default TalkToTeam;
