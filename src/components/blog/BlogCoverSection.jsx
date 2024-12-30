import { sortBlogs } from "@/backend/helpers";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import Tag from "../elements/Tag";

const BlogCoverSection = ({ blogs, lang }) => {
  const sortedBlogs = sortBlogs(blogs);
  const blog = sortedBlogs[0];
  return (
    <div className="w-full flex  px-10 maxlg:px-5 maxmd:px-2 mt-5">
      <div className="w-full h-[60vh] overflow-hidden top-0 relative flex justify-end items-center flex-col">
        <div className="absolute bg-dark bg-opacity-40 w-full h-full z-0" />
        <Image
          src={blog?.mainImage}
          alt={blog?.mainTitle[`${lang}`]}
          width={1920}
          height={1080}
          priority
          loading="eager"
          className="object-cover absolute -z-10 h-full w-full"
        />
        <div className="w-full p-6 mb-5 flex flex-col items-start justify-center z-0 text-light">
          <span className="text-white">
            <Tag
              link={`/${lang}/blog/categorias/${blog?.category[`${lang}`]}`}
              name={blog?.category[`${lang}`]}
            />
          </span>

          <Link
            aria-label="publicacion"
            href={`/${lang}/blog/publicacion/${blog?.slug}`}
            className="mt-6"
          >
            <h2 className="font-semibold text-white capitalize text-lg">
              <span
                className="bg-gradient-to-r from-orange-400 to-orange-600
                bg-[length:0px_2px]
                hover:bg-[length:100%_2px] bg-left-bottom bg-no-repeat transition-[background-size] duration-500 font-secondary"
              >
                {blog?.mainTitle[`${lang}`]}
              </span>
            </h2>
          </Link>
          <p className=" font-secondary text-xs text-white mt-4 ">
            {blog?.sectionTwoParagraphOne[`${lang}`].substring(0, 90)}...
          </p>
        </div>
      </div>
    </div>
  );
};

export default BlogCoverSection;
