import BlogEditorComponent from "@/components/blog/BlogEditorComponent";

const BlogEditorPage = ({ params }) => {
  const lang = params.lang;
  return <BlogEditorComponent lang={lang} />;
};

export default BlogEditorPage;
