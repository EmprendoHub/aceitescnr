import { formatDate } from "@/backend/helpers";
import Image from "next/image";
import Link from "next/link";

const BlogLayoutTwo = ({ blog, lang }) => {
  return (
    <div className="group flex flex-row maxmd:flex-col gap-4 items-center ">
      <Link
        aria-label="publicacion"
        href={`/${lang}/blog/publicacion/${blog?.slug}` || "/"}
        className="w-full  h-full rounded-sm overflow-hidden"
      >
        <Image
          src={blog?.mainImage || "/images/next.svg"}
          placeholder="blur"
          blurDataURL={blog?.mainImage || "/images/next.svg"}
          alt={blog?.mainTitle[`${lang}`] || "img"}
          width={800}
          height={800}
          className="aspect-square w-full h-full object-cover object-center group-hover:scale-105 transition-all ease duration-300"
          sizes="(max-width: 640px) 100vw,(max-width: 1024px) 50vw, 33vw"
        />
      </Link>

      <div className=" w-full">
        <span className="inline-block font-black w-full uppercase text-accent dark:text-accentDark text-xs maxsm:text-sm">
          <Link
            aria-label="category"
            href={`/${lang}/blog/categorias/${blog?.category[`${lang}`]}`}
          >
            {blog?.category[`${lang}`]}
          </Link>
        </span>
        <Link
          aria-label="publicacion"
          href={`/${lang}/blog/publicacion/${blog?.slug}` || "/"}
          className="inline-block my-1"
        >
          <h2 className="font-semibold capitalize text-base maxsm:text-lg">
            <span
              className="bg-gradient-to-r font-primary from-orange-400 to-orange-600 bg-[length:0px_2px]
                group-hover:bg-[length:100%_2px] bg-left-bottom bg-no-repeat transition-[background-size] duration-500 "
            >
              {blog?.mainTitle[`${lang}`]}
            </span>
          </h2>
        </Link>

        <span className="inline-block font-primary w-full capitalize font-semibold  text-xs maxsm:text-base">
          {formatDate(new Date(blog?.createdAt))}
        </span>
      </div>
    </div>
  );
};

export default BlogLayoutTwo;
