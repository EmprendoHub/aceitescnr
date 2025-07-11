import React from "react";
import { useRouter } from "next/navigation";
import { AiOutlineClose } from "react-icons/ai";
import styles from "./boxfilterstyle.module.scss";
import Search from "../layout/Search";

const AllFiltersComponent = ({
  lang,
  allCategories,
  SetIsActive,
  isActive,
}) => {
  const router = useRouter();
  let queryParams;

  function handleCategoryClick(checkbox) {
    if (typeof window !== "undefined") {
      queryParams = new URLSearchParams(window.location.search);
    }
    console.log(checkbox);
    const checkboxes = document.getElementsByName(checkbox.name);

    checkboxes.forEach((item) => {
      if (item !== checkbox) item.checked = false;
    });

    if (checkbox.checked === false) {
      //delete filter
      queryParams.delete(checkbox.name);
      SetIsActive(!isActive);
    } else {
      //set query filter
      if (queryParams.has(checkbox.name)) {
        queryParams.set(checkbox.name, checkbox.value);
        SetIsActive(!isActive);
      } else {
        queryParams.append(checkbox.name, checkbox.value);
        SetIsActive(!isActive);
      }
    }

    const path = window.location.pathname + "?" + queryParams.toString();

    router.push(path);
  }

  function checkHandler(checkBoxType, checkBoxValue) {
    if (typeof window !== "undefined") {
      queryParams = new URLSearchParams(window.location.search);

      const value = queryParams.get(checkBoxType);
      if (checkBoxValue === value) {
        return true;
      }
      return false;
    }
  }

  return (
    <>
      <aside>
        <div
          className={` burger-class flex flex-row text-gray-600 items-center absolute right-1 top-1 cursor-pointer p-4`}
        >
          <div
            onClick={() => {
              SetIsActive(!isActive);
            }}
            className={"button-class"}
          >
            <AiOutlineClose />
          </div>
        </div>
        <div className=" mb-2  w-full text-start px-4 py-2 inline-block text-2xl text-gray-800  shadow-sm border border-gray-200 rounded-md font-primary ">
          {lang === "es" ? " Filtros" : " Filters"}
        </div>
        {/* Search Filter */}

        <Search SetIsActive={SetIsActive} lang={lang} />

        {/* Category Filter */}
        <div className="p-5 pt-4  mb-2 sm:p-1 border border-gray-200 bg-white rounded shadow-sm">
          <h3 className="font-semibold mb-2 text-gray-700">
            {" "}
            {lang === "es" ? " Categoría" : " Category"}
          </h3>
          <ul className="space-y-1">
            {allCategories?.map((category, index) => (
              <li key={index} className="text-xs">
                <div className={`box py-[1px]  ${styles.box}`}>
                  <input
                    name="category"
                    type="checkbox"
                    value={category.id}
                    defaultChecked={checkHandler(
                      "category",
                      `${category.name[`${lang}`]}`
                    )}
                    onClick={(e) => handleCategoryClick(e.target)}
                    className={`checkboxBipolarInput ${styles.checkboxBipolarInput}`}
                    id={category.name[`${lang}`]}
                  />
                  <label
                    htmlFor={category.name[`${lang}`]}
                    className="flex flex-row items-center cursor-pointer"
                  >
                    <span
                      className={`checkboxBipolar ${styles.checkboxBipolar}`}
                    >
                      <span className={`on ${styles.on}`}>I</span>
                      <span className={`off ${styles.off}`}>O</span>
                    </span>
                    <span className="brandName ml-2 text-gray-500 capitalize">
                      {category.name[`${lang}`].substring(0, 35)}
                    </span>
                  </label>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </aside>
    </>
  );
};

export default AllFiltersComponent;
