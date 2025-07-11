import React from "react";

const BlogCategoriesSlugPage = ({ params }) => {
  const slug = params.slug;
  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <h2 className="text-4xl font-primary">Categoría</h2>
      <p>{slug}</p>
    </div>
  );
};

export default BlogCategoriesSlugPage;
