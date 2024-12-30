"use client";
import React from "react";
import Image from "next/image";
import AnimationWrapper from "../motions/AnimationWrapper";
import { formatDate } from "@/backend/helpers";
import { TfiTag } from "react-icons/tfi";
import {
  FaFacebookF,
  FaInstagram,
  FaLinkedin,
  FaTiktok,
  FaYoutube,
} from "react-icons/fa6";
import Link from "next/link";
import styles from "./socialMedia.module.scss";

const ViewPostDetails = ({ post, trendingProducts, lang, blogDic, author }) => {
  return (
    <div className="flex flex-row maxmd:flex-col-reverse items-start justify-center w-full gap-x-5 p-5 mt-10">
      <aside className="sticky top-20 z-[50] min-h-full w-[24%] maxsm:w-full flex flex-col items-center justify-center">
        <div className="w-full mx-auto ">
          <p className="w-fit font-primary inline-block font-bold capitalize text-lg">
            {blogDic.single.sideBar.featuredServices.text}{" "}
            <span className=" text-secondary">
              {blogDic.single.sideBar.featuredServices.textTwo}
            </span>
          </p>

          <div className="w-full relative ">
            {/* {trendingProducts?.map((product, index) => (
              <ProductCard key={product._id} item={product} />
            ))} */}
          </div>
        </div>
      </aside>
      <div className="flex flex-col items-center w-full">
        <div className="w-full">
          {/* Blog Header */}
          <span className="mx-auto max-w-[1200px] w-full flex flex-row items-center justify-between mb-10">
            <div className="max-md:hidden line-clamp-1 flex w-full  font-primary leading-loose">
              <div className="font-medium font-primary text-3xl maxsm:text-2xl flex flex-row items-center gap-1 w-full">
                {post?.mainTitle[`${lang}`]}
              </div>
            </div>
          </span>

          <AnimationWrapper>
            <section>
              <div className="mx-auto max-w-[1200px] w-full">
                {/* Section 1 - Title, Image */}
                <div className="relative aspect-video  border-4 border-gray-300 rounded-md">
                  <Image
                    alt="blogBanner"
                    src={post?.mainImage}
                    width={1280}
                    height={1280}
                    className="w-full h-full object-cover z-20 rounded-md"
                  />
                  <div className="flex text-sm maxsm:text-[12px] px-5 py-2 flex-row items-center justify-between">
                    <p>
                      {blogDic.single.publishedOn}{" "}
                      {formatDate(post?.createdAt, lang)}
                    </p>
                    <p>{post?.category[`${lang}`]}</p>
                  </div>
                </div>
                <div className="content">
                  {/* Sections */}
                  <div className="flex flex-col maxsm:flex-col items-center gap-x-2 mt-5 ">
                    {/* Section 2 - Title, 2 Paragraphs */}
                    <div className="my-5 w-full">
                      <div className="mb-4 w-full">
                        <div className="font-medium font-primary text-2xl maxsm:text-xl flex flex-row items-center gap-1 w-full">
                          {post?.sectionTwoTitle[`${lang}`]}
                        </div>
                      </div>

                      <div className=" font-secondary text-sm  maxsm:text-sm flex flex-row items-center gap-1 w-full mb-5">
                        {post?.sectionTwoParagraphOne[`${lang}`]}
                      </div>
                      <div className=" font-secondary text-sm  maxsm:text-sm flex flex-row items-center gap-1 w-full mb-5">
                        {post?.sectionTwoParagraphTwo[`${lang}`]}
                      </div>
                    </div>
                    {/* Section 3 - Image | Title, Description / 1 Paragraph */}
                    {post?.sectionThreeTitle[`${lang}`] && (
                      <div className="w-full">
                        <div className="my-5 w-full flex flex-row maxsm:flex-col items-center gap-5">
                          <div className=" w-full h-80 relative  my-2 ">
                            <Image
                              className="rounded-md object-cover"
                              src={post?.sectionThreeImage}
                              fill={true}
                              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                              alt="section Two Image"
                            />
                          </div>
                          <div className="w-full">
                            <div className="font-medium font-primary text-2xl maxsm:text-xl flex flex-row items-center gap-1 w-full mb-3">
                              {post?.sectionThreeTitle[`${lang}`]}
                            </div>
                            <div className="font-secondary text-sm  maxsm:text-sm flex flex-row items-center gap-1 w-full">
                              {post?.sectionThreeParagraphOne[`${lang}`]}
                            </div>
                          </div>
                        </div>
                        <div className="mb-5 w-full">
                          <div className="font-secondary text-sm  maxsm:text-sm flex flex-row items-center gap-1 w-full mb-5">
                            {post?.sectionThreeParagraphFooter[`${lang}`]}
                          </div>
                        </div>
                      </div>
                    )}

                    {/* Section 4 - Title, 2 options, paragraph | Image / 1 Paragraph */}
                    {post?.sectionFourTitle[`${lang}`] && (
                      <div className="w-full">
                        <div className="w-full flex flex-row maxsm:flex-col items-center gap-5">
                          <div className="w-full">
                            <div className="font-medium font-primary text-2xl maxsm:text-xl flex flex-row items-center gap-1 w-full mb-3">
                              {post?.sectionFourTitle[`${lang}`]}
                            </div>

                            <div className="font-secondary text-sm  maxsm:text-sm flex flex-row items-center gap-1 w-full">
                              {post?.sectionFourParagraphOne[`${lang}`]}
                            </div>
                          </div>
                          <div className=" w-full h-80 relative  my-2 ">
                            <Image
                              className="rounded-md object-cover"
                              src={post?.sectionFourImage}
                              fill={true}
                              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                              alt="imagen de producto"
                            />
                          </div>
                        </div>
                        <div className="mb-5 w-full">
                          <div className="font-secondary text-sm  maxsm:text-sm flex flex-row items-center gap-1 w-full mb-5">
                            {post?.sectionFourParagraphFooter[`${lang}`]}
                          </div>
                        </div>
                      </div>
                    )}
                    {/* Section 5 - Title, Image, 2 Paragraph */}
                    {post?.sectionFiveTitle[`${lang}`] && (
                      <div className="w-full my-10">
                        <div className="mb-4 w-full">
                          <div className="font-medium font-primary text-2xl maxsm:text-xl flex flex-row items-center gap-1 w-full">
                            {post?.sectionFiveTitle[`${lang}`]}
                          </div>
                          <div className="items-center justify-center">
                            <div className=" w-full h-80 relative  my-2 ">
                              <Image
                                className="rounded-md object-cover"
                                src={post?.sectionFiveImage}
                                fill={true}
                                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                                alt="imagen de blog"
                              />
                            </div>
                          </div>
                        </div>

                        <div className="font-secondary text-sm  maxsm:text-sm flex flex-row items-center gap-1 w-full">
                          {post?.sectionFiveParagraphOne[`${lang}`]}
                        </div>
                        <div className="font-secondary text-sm  maxsm:text-sm flex flex-row items-center gap-1 w-full my-5">
                          {post?.sectionFiveParagraphTwo[`${lang}`]}
                        </div>
                      </div>
                    )}
                    {/* Section 6 - 3 Columns with title, image, paragraph / 1 Paragraph  */}
                    {post?.sectionSixColOneTitle[`${lang}`] && (
                      <div className="w-full my-10">
                        <div className="w-full mb-5 flex flex-row maxsm:flex-col items-start gap-7 justify-start">
                          {/* Col 1 */}
                          <div className="flex flex-col gap-3 items-center justify-center w-full my-2 ">
                            <div className="font-medium font-primary text-2xl maxmd:text-lg w-full mb-3 ">
                              {post?.sectionSixColOneTitle[`${lang}`]}
                            </div>

                            <Image
                              className="rounded-md object-cover h-40"
                              src={post?.sectionSixColOneImage}
                              width={500}
                              height={500}
                              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                              alt="imagen de producto"
                            />
                            <div className="font-secondary text-sm  maxsm:text-sm w-full">
                              {post?.sectionSixColOneParagraph[`${lang}`]}
                            </div>
                          </div>
                          {/* Col 2 */}
                          <div className="flex flex-col gap-3 items-center justify-center w-full my-2 ">
                            <div className="font-medium font-primary text-2xl  maxmd:text-lg w-full mb-3 ">
                              {post?.sectionSixColTwoTitle[`${lang}`]}
                            </div>

                            <Image
                              className="rounded-md object-cover h-40"
                              src={post?.sectionSixColTwoImage}
                              width={500}
                              height={500}
                              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                              alt="imagen de blog"
                            />
                            <div className="font-secondary text-sm  maxsm:text-sm w-full">
                              {post?.sectionSixColTwoParagraph[`${lang}`]}
                            </div>
                          </div>
                        </div>
                        <div className="mb-5 w-full">
                          <div className="font-secondary text-sm  maxsm:text-sm flex flex-row items-center gap-1 w-full mb-5">
                            {post?.sectionSixColOneParagraphFooter[`${lang}`]}
                          </div>
                        </div>
                      </div>
                    )}
                    {/* Section 7 - Overlay image title, 1 Paragraph */}
                    {post?.sectionSevenTitle[`${lang}`] && (
                      <div className="w-full">
                        <div className=" w-full h-80 relative flex items-center justify-center my-5 ">
                          <div className="font-medium font-primary text-6xl  gap-1 w-full mb-3  z-20 top-[40%] left-1/3 text-white text-center bg-transparent">
                            {post?.sectionSevenTitle[`${lang}`]}
                          </div>

                          <Image
                            className="rounded-md object-cover"
                            src={post?.sectionSevenImage}
                            fill={true}
                            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                            alt="imagen de producto"
                          />
                          {/* overlay */}
                          <div className="min-h-[100%] absolute z-[1] min-w-[100%] top-0 left-0 bg-black bg-opacity-30" />
                        </div>
                        <div className="font-medium font-primary text-xl maxsm:text-base flex flex-row items-center gap-1 w-full mb-5">
                          {post?.sectionSevenParagraph[`${lang}`]}
                        </div>
                      </div>
                    )}
                  </div>
                  {/* Post Footer */}
                  <div className="w-full flex justify-between items-center">
                    <div className="flex items-center gap-x-2">
                      <TfiTag />
                      {post?.keywords.map((keyword) => (
                        <span className="text-xs font-secondary" key={keyword}>
                          {keyword}{" "}
                        </span>
                      ))}
                    </div>
                    <div></div>
                  </div>
                  {/* Author Profile */}

                  <div className="w-full flex justify-center items-center my-5 gap-x-5">
                    <div className=" w-[200px] h-[200px] ">
                      <Image
                        className="rounded-full"
                        src={author.avatar}
                        width={200}
                        height={200}
                        alt="imagen de autor"
                      />
                    </div>
                    <div className="flex w-2/3 flex-col items-start gap-x-2">
                      <p className="text-[12px] font-secondary uppercase text-gray-600">
                        {blogDic.single.writtenBy}
                      </p>
                      <h2 className="font-primary text-2xl mb-3">
                        {author.name}
                      </h2>
                      <p className="font-secondary text-[13px]">
                        {author.aboutAuthor[`${lang}`]}
                      </p>
                      {/* Social media */}
                      <div className="relative flex  items-start justify-start mt-2">
                        {/* Instagram */}
                        <Link
                          aria-label="Instagram"
                          href={author.socials.instagram || "/"}
                          className="relative flex items-center justify-center group"
                        >
                          <svg className={`${styles.circle}`}>
                            <g>
                              <ellipse
                                className={`${styles.background}`}
                                ry="20"
                                rx="20"
                                cy="30"
                                cx="30"
                                strokeWidth="2"
                              />
                              <ellipse
                                className={`${styles.foreground}`}
                                ry="20"
                                rx="20"
                                cy="30"
                                cx="30"
                                strokeWidth="2"
                              />
                            </g>
                          </svg>
                          <FaInstagram className="absolute text-xs group-hover:text-secondary ease-in-out duration-700 z-0" />
                        </Link>
                        {/* Facebook */}
                        <Link
                          aria-label="Facebook"
                          href={author.socials.facebook || "/"}
                          className="relative flex items-center justify-center group"
                        >
                          <svg className={`${styles.circle}`}>
                            <g>
                              <ellipse
                                className={`${styles.background}`}
                                ry="20"
                                rx="20"
                                cy="30"
                                cx="30"
                                strokeWidth="2"
                              />
                              <ellipse
                                className={`${styles.foreground}`}
                                ry="20"
                                rx="20"
                                cy="30"
                                cx="30"
                                strokeWidth="2"
                              />
                            </g>
                          </svg>
                          <FaFacebookF className="absolute text-xs group-hover:text-secondary ease-in-out duration-700 z-0" />
                        </Link>
                        {/* YouTube */}
                        <Link
                          aria-label="YouTube"
                          href={author.socials.youtube || "/"}
                          className="relative flex items-center justify-center group"
                        >
                          <svg className={`${styles.circle}`}>
                            <g>
                              <ellipse
                                className={`${styles.background}`}
                                ry="20"
                                rx="20"
                                cy="30"
                                cx="30"
                                strokeWidth="2"
                              />
                              <ellipse
                                className={`${styles.foreground}`}
                                ry="20"
                                rx="20"
                                cy="30"
                                cx="30"
                                strokeWidth="2"
                              />
                            </g>
                          </svg>
                          <FaYoutube className="absolute text-xs group-hover:text-secondary ease-in-out duration-700 z-0" />
                        </Link>
                        {/* TikTok */}
                        <Link
                          aria-label="TikTok"
                          href={author.socials.tiktok || "/"}
                          className="relative flex items-center justify-center group"
                        >
                          <svg className={`${styles.circle}`}>
                            <g>
                              <ellipse
                                className={`${styles.background}`}
                                ry="20"
                                rx="20"
                                cy="30"
                                cx="30"
                                strokeWidth="2"
                              />
                              <ellipse
                                className={`${styles.foreground}`}
                                ry="20"
                                rx="20"
                                cy="30"
                                cx="30"
                                strokeWidth="2"
                              />
                            </g>
                          </svg>
                          <FaTiktok className="absolute text-xs group-hover:text-secondary ease-in-out duration-700 z-0" />
                        </Link>
                        {/* LinkedIn */}
                        <Link
                          aria-label="Linkedin"
                          href={author.socials.linkedin || "/"}
                          className="relative flex items-center justify-center group"
                        >
                          <svg className={`${styles.circle}`}>
                            <g>
                              <ellipse
                                className={`${styles.background}`}
                                ry="20"
                                rx="20"
                                cy="30"
                                cx="30"
                                strokeWidth="2"
                              />
                              <ellipse
                                className={`${styles.foreground}`}
                                ry="20"
                                rx="20"
                                cy="30"
                                cx="30"
                                strokeWidth="2"
                              />
                            </g>
                          </svg>
                          <FaLinkedin className="absolute text-xs group-hover:text-secondary ease-in-out duration-700 z-0" />
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </section>
          </AnimationWrapper>
        </div>
      </div>
    </div>
  );
};

export default ViewPostDetails;
