import { sortBlogs } from "@/backend/helpers";
import React from "react";
import BlogLayoutThree from "./layout/BlogLayoutThree";

const RecentPosts = ({ blogs, lang, blogDic }) => {
  const sortedBlogs = sortBlogs(blogs);
  return (
    <section className="w-full  mt-16 px-10 maxlg:px-5 flex flex-col items-center justify-center">
      <div className="w-full flex  justify-between">
        <h2 className="w-fit font-primary  inline-block font-bold capitalize text-2xl ">
          {blogDic.home.recentPosts.text}{" "}
          <span className=" text-secondary">
            {blogDic.home.recentPosts.textTwo}
          </span>
        </h2>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 grid-rows-2 gap-16 mt-16">
        {sortedBlogs.slice(4, 10).map((blog, index) => {
          return (
            <article key={index} className="col-span-1 row-span-1 relative">
              <BlogLayoutThree blog={blog} lang={lang} />
            </article>
          );
        })}
      </div>
    </section>
  );
};

export default RecentPosts;
