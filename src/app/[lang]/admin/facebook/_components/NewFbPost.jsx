"use client";
import React, { useState } from "react";

import Image from "next/image";
import { createFBPost } from "@/app/[lang]/_actions";

const NewFbPost = () => {
  //super collectibles fb page id

  const [prompt, setPrompt] = useState("");
  const [mainImage, setMainImage] = useState(
    "/images/product-placeholder-minimalist.jpg"
  );
  const [imageTwo, setImageTwo] = useState(
    "/images/product-placeholder-minimalist.jpg"
  );

  const [postContent, setPostContent] = useState(
    "Lorem ipsum dolor sit amet ipsum dolor sit amet"
  );

  const handleSubmitNewPost = async (e) => {
    e.preventDefault();
    const createPost = await createFBPost(prompt);

    console.log(createPost);
    setMainImage(createPost.url);
    setImageTwo(createPost.modUrl);
    setPostContent(createPost.content);
  };

  return (
    <div>
      <input type="text" onChange={(e) => setPrompt(e.target.value)} />
      <button
        className=" py-5 bg-blue-600 px-5 text-white"
        onClick={handleSubmitNewPost}
      >
        Generate
      </button>
      {/*  Imagen principal */}
      <div className="w-full gap-y-1 flex-col flex px-2 ">
        <div className="relative flex flex-wrap items-center gap-5 justify-between bg-white border-4 border-gray-300 mt-5">
          <Image
            id="blogImage"
            alt="blogBanner"
            src={mainImage}
            width={500}
            height={500}
            className="w-80 h-full object-cover z-20"
          />
          <Image
            id="blogImage"
            alt="blogBanner"
            src={imageTwo}
            width={500}
            height={500}
            className="w-80 h-full object-cover z-20"
          />
        </div>
      </div>
      <p>{postContent}</p>
    </div>
  );
};

export default NewFbPost;
