"use client";
import Link from "next/link";
import Image from "next/image";
import { FaPencilAlt, FaExclamationCircle } from "react-icons/fa";
import Swal from "sweetalert2";
import SearchCategories from "./search";
import { TbWorldWww } from "react-icons/tb";
import { changeCategoryAvailability, deleteOneCategory } from "../_actions";

const AdminCategories = ({
  categories,
  filteredCategoriesCount,
  search,
  lang,
}) => {
  const deleteHandler = (cat_id) => {
    Swal.fire({
      title: "¿Estas seguro(a) que quieres eliminar a esta categoría?",
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
        Swal.fire({
          title: "Eliminado!",
          text: "Tu categoría ha sido Eliminado.",
          icon: "success",
        });
        deleteOneCategory(cat_id);
      }
    });
  };

  const deactivateOnlineHandler = (cat_id, active) => {
    const location = "Online";
    let title;
    let text;
    let confirmBtn;
    let successTitle;
    let successText;
    let icon;
    let confirmBtnColor;
    if (active === true) {
      icon = "warning";
      title = "Estas seguro(a)?";
      text =
        "¡Estas a punto de desactivar a esta Categoría y todos sus productos en el Sitio Web y quedara sin acceso!";
      confirmBtn = "¡Sí, desactivar categoría!";
      confirmBtnColor = "#CE7E00";
      successTitle = "Desactivar!";
      successText = "La categoría ha sido desactivado.";
    } else {
      icon = "success";
      title = "Estas seguro(a)?";
      text = "¡Estas a punto de Activar a esta categoría en el Sitio Web!";
      confirmBtn = "¡Sí, Activar categoría!";
      confirmBtnColor = "#228B22";
      successTitle = "Reactivado!";
      successText = "La categoría ha sido Activado.";
    }
    Swal.fire({
      title: title,
      text: text,
      icon: icon,
      showCancelButton: true,
      confirmButtonColor: confirmBtnColor,
      cancelButtonColor: "#000",
      confirmButtonText: confirmBtn,
      cancelButtonText: "No, cancelar!",
    }).then((result) => {
      if (result.isConfirmed) {
        changeCategoryAvailability(cat_id, location);
      }
    });
  };

  return (
    <>
      <hr className="my-4 maxsm:my-1" />
      <div className="relative min-h-full shadow-md sm:rounded-lg">
        <div className=" flex flex-row  maxsm:items-start items-center justify-between">
          <h1 className="text-3xl maxsm:text-base mb-2 maxsm:mb-1 ml-4 maxsm:ml-0 font-bold font-primary w-1/2">
            {`${filteredCategoriesCount} Categorías `}
          </h1>
          <SearchCategories search={search} />
        </div>
        <table className="w-full text-sm  text-left h-full">
          <thead className="text-l text-gray-700 uppercase">
            <tr className="flex flex-row items-center">
              <th
                scope="col"
                className="w-full px-6 maxsm:px-0 py-3 maxsm:hidden"
              >
                Nombre
              </th>
              <th
                scope="col"
                className="w-full px-6 maxsm:px-0 py-3 maxsm:hidden"
              >
                Resumen
              </th>
              <th scope="col" className="w-full px-6 maxsm:px-0 py-3 ">
                Img
              </th>

              <th scope="col" className="w-full px-6 maxsm:px-0 py-3 ">
                beneficios
              </th>

              <th scope="col" className="w-full px-1 py-3 text-center">
                ...
              </th>
            </tr>
          </thead>
          <tbody>
            {categories?.map((cat, index) => (
              <tr
                className={`flex flex-row items-center ${
                  cat?.active === true
                    ? "bg-slate-100"
                    : "bg-slate-200 text-slate-400"
                }`}
                key={cat?._id}
              >
                <td
                  className={`w-full px-6 maxsm:px-0 py-0 font-bold maxsm:hidden`}
                >
                  {cat?.name[`${lang}`].substring(0, 50)}
                </td>
                <td
                  className={`w-full px-6 maxsm:px-0 py-0 font-bold maxsm:hidden`}
                >
                  {cat?.summary[`${lang}`].substring(0, 50)}
                </td>
                <td className="w-full px-6 maxsm:px-0 py-0 relative ">
                  <span className="relative flex items-center justify-center text-black w-20 h-20 maxsm:w-8 maxsm:h-8 shadow mt-2">
                    {/* <Link
                      href={`/${lang}/admin/categorias/ver/${cat?._id}`}
                    > */}
                    <Image
                      src={
                        cat?.images[0]?.url ||
                        "/images/product-placeholder-minimalist.jpg"
                      }
                      alt="Imagen"
                      width={200}
                      height={200}
                      className="w-20 object-cover h-20 maxsm:w-20 rounded-md"
                    />
                    {/* </Link> */}
                  </span>
                </td>

                <td className="w-full px-1 py-0 ">
                  {cat?.benefits[`${lang}`].substring(0, 50)}
                </td>
                <td className="w-full px-1 py-0 flex flex-row items-center gap-x-1">
                  <Link
                    href={`/${lang}/admin/categorias/ver/${cat?._id}`}
                    className="p-2 inline-block text-white hover:text-darkblack bg-black shadow-sm border border-gray-200 rounded-md hover:bg-gray-100 cursor-pointer "
                  >
                    <FaPencilAlt className="maxsm:text-[10px]" />
                  </Link>

                  <button
                    onClick={() =>
                      deactivateOnlineHandler(cat?._id, cat?.published)
                    }
                    className="p-2 inline-block text-white hover:text-darkblack bg-slate-300 shadow-sm border border-gray-200 rounded-md hover:bg-gray-100 cursor-pointer "
                  >
                    <TbWorldWww
                      className={` ${
                        cat?.published === true
                          ? "text-green-800 maxsm:text-[10px]"
                          : "text-slate-400 maxsm:text-[10px]"
                      }`}
                    />
                  </button>
                  <button
                    onClick={() => deleteHandler(cat?._id)}
                    className="p-2 inline-block text-white hover:text-darkblack bg-slate-300 shadow-sm border border-gray-200 rounded-md hover:bg-gray-100 cursor-pointer "
                  >
                    <FaExclamationCircle
                      className={`text-red-800 maxsm:text-[10px]`}
                    />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <hr className="my-4" />
    </>
  );
};

export default AdminCategories;
