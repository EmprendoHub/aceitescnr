import Link from "next/link";
import React from "react";
import { getLatestPost } from "@/app/[lang]/_actions";

const TopicsFocus = async ({ lang }) => {
  const data = await getLatestPost();
  const recentPost = JSON.parse(data?.recentPost);
  return (
    <div className="flex relative maxmd:flex-col gap-5 items-center justify-center px-10 maxmd:px-5 my-20">
      {recentPost &&
        recentPost.map((post) => (
          <article key={post._id} className="border-l-2 border-secondary">
            <div className="">
              <div className="px-3">
                <div className="">
                  <div className="uppercase text-gray-600 text-[10px] tracking-widest">
                    {post?.category[`${lang}`]}
                  </div>
                </div>
                <div className="qodef-e-text">
                  <h3 itemProp="name" className="text-2xl font-primary">
                    {post?.mainTitle[`${lang}`]?.substring(0, 45)}...
                  </h3>
                  <p className="font-secondary text-sm">
                    {post?.sectionTwoParagraphOne[`${lang}`]?.substring(0, 45)}
                    ...
                  </p>
                </div>
                <div className="e-info">
                  <div className="info-left">
                    <Link href={`/${lang}/blog/publicacion/${post.slug}`}>
                      <span className="uppercase font-bold text-xs tracking-wide">
                        {lang === "es" ? "Descubre mas" : "Discover more"}
                      </span>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </article>
        ))}
    </div>
  );
};

export default TopicsFocus;
