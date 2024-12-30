"use client";
import React from "react";
import Link from "next/link";
import Image from "next/image";
import { FaTrash, FaPencilAlt } from "react-icons/fa";
import Swal from "sweetalert2";
import { formatDate } from "@/backend/helpers";
import { deleteOnePost } from "@/app/[lang]/_actions";

const AdminPosts = ({ posts, lang }) => {
  const deleteHandler = (post_id) => {
    Swal.fire({
      title: "¿Estas seguro(a) que quieres eliminar a esta publicación?",
      text: "¡Esta acción es permanente y no se podrá revertir!",
      icon: "error",
      iconColor: "#fafafa",
      background: "#d33",
      color: "#fafafa",
      focusCancel: true,
      showCancelButton: true,
      confirmButtonColor: "#4E0000",
      cancelButtonColor: "#000",
      confirmButtonText: "¡Sí, Eliminar!",
      cancelButtonText: "No, cancelar!",
    }).then((result) => {
      if (result.isConfirmed) {
        deleteOnePost(post_id);
      }
    });
  };
  return (
    <div className="px-5 maxsm:px-2">
      <div className="flex flex-row maxsm:flex-col justify-between items-center ">
        <table className="w-full text-sm text-left ">
          <thead className="text-ll maxmd:xs text-gray-500 uppercase">
            <tr className="flex items-center justify-between w-full">
              <th scope="col" className="px-6 maxsm:px-0 py-3 maxmd:hidden">
                Id
              </th>
              <th scope="col" className="px-6 maxsm:px-0 py-3 maxsm:py-1">
                Img
              </th>
              <th
                scope="col"
                className="px-6 maxsm:px-0 py-3  maxsm:py-1 maxmd:hidden"
              >
                Catg.
              </th>
              <th scope="col" className="px-6 maxsm:px-0 py-3  maxsm:py-1">
                Titulo
              </th>
              <th scope="col" className="px-6 py-3 maxsm:hidden">
                Fecha
              </th>
              <th scope="col" className="w-10 px-1 py-3 text-center">
                ...
              </th>
            </tr>
          </thead>
          <tbody className="relative w-full">
            {posts?.map((post, index) => (
              <tr
                className={`flex items-center justify-between w-full mb-5 px-6 maxsm:px-2 ${
                  index % 2 === 0 ? "bg-white bg-opacity-30" : ""
                }`}
                key={index}
              >
                <td className="w-full  py-2 maxmd:hidden">
                  <Link key={index} href={`/admin/blog/editar/${post.slug}`}>
                    {post._id}
                  </Link>
                </td>
                <td className="w-full  py-2 relative ">
                  <span className="relative flex items-center justify-center text-black w-12 h-12 maxsm:w-10 maxsm:h-10 shadow mt-2">
                    <Link key={index} href={`/admin/blog/editar/${post.slug}`}>
                      <Image
                        src={post?.mainImage}
                        alt="Title"
                        width={100}
                        height={100}
                        className="w-10 h-auto maxsm:w-10 "
                      />
                    </Link>
                  </span>
                </td>
                <td className="w-full py-2  maxmd:hidden">
                  <b>{post?.category[`${lang}`].substring(0, 7)}...</b>
                </td>
                <td className={`w-full py-2 font-bold `}>
                  {post?.mainTitle[`${lang}`].substring(0, 12)}...
                </td>
                <td className="w-full py-2 maxsm:hidden">
                  {post?.createdAt &&
                    `${formatDate(post?.createdAt.substring(0, 24))} `}
                </td>
                <td className="w-10 px-1 py-2">
                  <div className="flex flex-col gap-1">
                    <Link
                      href={`/admin/blog/editar/${post.slug}`}
                      className="px-2 py-2 inline-block  hover:text-darkblack bg-dark shadow-sm border border-gray-200 rounded-md hover:bg-gray-500 cursor-pointer mr-2"
                    >
                      <FaPencilAlt className="text-[12px]" />
                    </Link>
                    <span>
                      <button
                        onClick={() => deleteHandler(post._id)}
                        className="px-1.5 py-2 inline-block  text-red-500 hover:text-dark bg-dark shadow-sm border border-gray-200 rounded-md hover:bg-gray-500 cursor-pointer mr-2"
                      >
                        <FaTrash className="text-[12px]" />
                      </button>
                    </span>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <hr className="my-4" />
    </div>
  );
};

export default AdminPosts;
