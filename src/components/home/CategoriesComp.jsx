import SectionTitle from "../titles/SectionTitle";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const CategoriesComp = ({ categoryDic, lang }) => {
  return (
    <div className="pt-5 px-40 maxxlg:px-20 maxlg:px-10 maxmd:px-5 maxmd:pt-1 my-20">
      <div className="mx-auto">
        <SectionTitle
          className="pb-10 text-3xl maxmd:text-3xl text-center"
          title={categoryDic.title}
          titleTwo={categoryDic.titleTwo}
          subtitle={categoryDic.text}
        />
      </div>
      <div className="grid maxsm:grid-cols-2 grid-cols-3 gap-5 w-full">
        {categoryDic.categories.map((category) => (
          <Link
            key={category.title}
            href={`${category.catPath}`}
            className="w-full cursor-pointer hover:scale-[105%] duration-300 ease-in-out "
          >
            <div className="box relative mx-auto items-center justify-center flex text-center">
              <Image
                src={category.imgPath}
                width={600}
                height={600}
                alt={category.title}
                className="w-full h-[500px] maxxlg:h-[350px] object-cover "
              />
              <span className="absolute rounded-full z-50 text-white uppercase py-2 px-8  maxmd:text-xl top-[40%]  font-primary tracking-wide">
                {category.title}
              </span>
              {/* overlay */}
              <div className="min-h-[100%] absolute z-[1] min-w-[100%] top-0 left-0 bg-black bg-opacity-40" />
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default CategoriesComp;
