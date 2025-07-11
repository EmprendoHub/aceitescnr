import React from "react";
import Link from "next/link";
import { BsChevronRight } from "react-icons/bs";

const BreadCrumbs = ({ breadCrumbs }) => {
  return (
    <section className="py-5 sm:py-7 bg-blue-100 text-black">
      <div className=" max-w-screen-xl mx-auto px-4">
        <ol className="inline-flex flex-wrap text-gray-600 space-x-1 maxmd:space-x-3 items-center">
          {breadCrumbs?.map((crumb, index) => (
            <li key={index} className="inline-flex items-center">
              <Link
                href={crumb?.url}
                className="text-gray-600 hover:text-darkblue-600"
              >
                {crumb?.name}
              </Link>
              {breadCrumbs?.length - 1 !== index && (
                <BsChevronRight className="ml-3 text-gray-800" />
              )}
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
};

export default BreadCrumbs;
