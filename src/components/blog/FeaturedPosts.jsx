import { sortBlogs } from "@/backend/helpers";
import BlogLayoutOne from "./layout/BlogLayoutOne";
import BlogLayoutTwo from "./layout/BlogLayoutTwo";

const FeaturedPosts = ({ blogs, lang, blogDic }) => {
  const sortedBlogs = sortBlogs(blogs);
  return (
    <section className="w-full mt-16 flex flex-col items-center justify-center px-10 maxlg:px-5">
      <h2 className="w-full font-primary inline-block font-bold capitalize text-2xl md:text-4xl ">
        {blogDic.home.featuredPosts.text}{" "}
        <span className="text-secondary">
          {blogDic.home.featuredPosts.textTwo}
        </span>
      </h2>

      <div className="flex flex-row maxmd:flex-col gap-6  mt-10 maxsm:mt-16">
        <article className="w-full relative">
          <BlogLayoutOne blog={sortedBlogs[1]} lang={lang} />
        </article>
        <div className="flex w-full flex-col gap-6 ">
          <article className=" relative">
            <BlogLayoutTwo blog={sortedBlogs[2]} lang={lang} />
          </article>
          <article className="relative">
            <BlogLayoutTwo blog={sortedBlogs[3]} lang={lang} />
          </article>
        </div>
      </div>
    </section>
  );
};

export default FeaturedPosts;
