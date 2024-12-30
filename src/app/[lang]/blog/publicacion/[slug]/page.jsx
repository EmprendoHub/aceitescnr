import { getOnePost } from "@/app/[lang]/_actions";
import ViewPostDetails from "@/components/blog/ViewPostDetails";
import { getDictionary } from "@/lib/dictionary";

const BlogPostPage = async ({ params }) => {
  const data = await getOnePost(params.slug, params.lang);
  const lang = params.lang;
  const { blogDic } = await getDictionary(lang);
  const post = JSON.parse(data.post);
  const author = JSON.parse(data.author);
  const trendingProducts = JSON.parse(data.trendingProducts);
  return (
    <ViewPostDetails
      post={post}
      trendingProducts={trendingProducts}
      lang={lang}
      blogDic={blogDic}
      author={author}
    />
  );
};

export default BlogPostPage;
