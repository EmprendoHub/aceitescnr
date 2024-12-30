import BlogCoverSection from "@/components/blog/BlogCoverSection";
import FeaturedPosts from "@/components/blog/FeaturedPosts";
import RecentPosts from "@/components/blog/RecentPosts";
import { getAllPost } from "../_actions";
import { getDictionary } from "@/lib/dictionary";

export const metadata = {
  title: "Blog Aceites CNR",
  description: "Expertos en Desarrollo web y marketing integral.",
};

const BlogPage = async ({ searchParams, params }) => {
  const lang = params.lang;
  const { blogDic } = await getDictionary(lang);
  const urlParams = {
    keyword: searchParams.keyword,
    page: searchParams.page,
  };
  const filteredUrlParams = Object.fromEntries(
    Object.entries(urlParams).filter(([key, value]) => value !== undefined)
  );
  const searchQuery = new URLSearchParams(filteredUrlParams).toString();
  const data = await getAllPost(searchQuery);
  const posts = JSON.parse(data.posts);
  return (
    <div className="flex flex-col items-center justify-center mt-5">
      <BlogCoverSection blogs={posts} lang={lang} />
      <FeaturedPosts blogs={posts} lang={lang} blogDic={blogDic} />
      <RecentPosts blogs={posts} lang={lang} blogDic={blogDic} />
    </div>
  );
};

export default BlogPage;
