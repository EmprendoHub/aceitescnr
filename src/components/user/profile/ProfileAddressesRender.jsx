"use client";
import Link from "next/link";
import { AiTwotoneHome } from "react-icons/ai";
import Swal from "sweetalert2";
import { FaPencilAlt, FaTrash } from "react-icons/fa";

const ProfileAddressesRender = ({ addresses }) => {
  return (
    <div className="px-5">
      <hr className="my-4" />
      {addresses?.length <= 0 && (
        <Link href="/perfil/domicilio/nueva">
          <button className="px-4 py-2 inline-block text-gray-100 bg-fourth hover:bg-gray-400 border border-gray-300 rounded-md duration-300 ease-in-out hover:scale-105 text-sm">
            <i className="mr-1 fa fa-plus"></i> Agregar Domicilio de Entrega
          </button>
        </Link>
      )}

      <hr className="my-4" />
      {addresses?.map((address, index) => (
        <div
          key={index}
          className="flex flex-row justify-between items-center "
        >
          <div>
            <Link href={`/perfil/direccion/${address._id}`}>
              <div className="mb-5 gap-4">
                <figure className="w-full flex align-center bg-gray-100 p-4 rounded-md cursor-pointer">
                  <div className="mr-3">
                    <span className="flex items-center justify-center text-black w-12 h-12 bg-white rounded-full shadow mt-2">
                      <AiTwotoneHome className=" text-black" />
                    </span>
                  </div>
                  <figcaption className="text-gray-600">
                    <p>
                      {address?.street}
                      <br /> {address?.city}, {address?.province},{" "}
                      {address?.zip_code}, {address?.country}
                      <br />
                      Tel: {address?.phone}
                    </p>
                  </figcaption>
                </figure>
              </div>
            </Link>
          </div>
          <div className="flex flex-col justify-between items-center gap-1">
            <span>
              <Link
                key={index}
                href={`/perfil/direccion/${address._id}`}
                className="px-2 py-2 inline-block text-white hover:text-secondary bg-fourth shadow-sm border border-gray-200 rounded-md hover:bg-gray-100 cursor-pointer ease-in-out duration-300 hover:scale-105"
              >
                <FaPencilAlt className="" />
              </Link>
            </span>
            {/* Delete Customer Address */}
            {/* <span>
              <button
                onClick={() => deleteHandler(address._id)}
                className="px-2 py-2 inline-block text-white hover:text-red-600 bg-red-600 shadow-sm border border-gray-200 rounded-md hover:bg-gray-100 cursor-pointer "
              >
                <FaTrash className="" />
              </button>
            </span> */}
          </div>
        </div>
      ))}
    </div>
  );
};

export default ProfileAddressesRender;
