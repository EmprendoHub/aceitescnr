import { getOnePost } from "@/app/[lang]/_actions";
import BlogPublishedComponent from "@/components/blog/BlogPublishedComponent";

const PostDetailsPage = async ({ params }) => {
  const data = await getOnePost(params.slug);
  const lang = params.lang;
  const post = JSON.parse(data.post);
  return <BlogPublishedComponent post={post} lang={lang} />;
};

export default PostDetailsPage;
