import { getOnePost } from "@/app/[lang]/_actions";
import ViewPostDetails from "@/components/blog/ViewPostDetails";
import { getDictionary } from "@/lib/dictionary";

// Dynamic metadata function
export async function generateMetadata({ params }) {
  const data = await getOnePost(params.slug, params.lang);
  const post = JSON.parse(data.post);

  return {
    title: post.mainTitle,
    description: post.excerpt || post.metaDescription || post.title,
    openGraph: {
      title: post.mainTitle,
      description: post.excerpt || post.metaDescription || post.title,
      images: [
        {
          url: post.mainImage || "/opengraph-image.jpg",
          width: 1200,
          height: 630,
          alt: post.mainTitle,
        },
      ],
      type: "article",
    },
    twitter: {
      card: "summary_large_image",
      title: post.mainTitle,
      description: post.excerpt || post.metaDescription || post.mainTitle,
      images: [post.mainImage || "/opengraph-image.jpg"],
    },
  };
}

// Page component
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
