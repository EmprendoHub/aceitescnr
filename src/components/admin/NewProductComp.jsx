"use client";
import React, { useState } from "react";
import Image from "next/image";
import { cstDateTimeClient } from "@/backend/helpers";
import { addNewProduct, imageToText } from "@/app/[lang]/_actions";
import { useRouter } from "next/navigation";
import {
  productos_presentations,
  productos_packing,
  blog_categories,
  set_months,
  set_countries,
} from "@/backend/data/productData";
import MultiselectTagComponent from "@/components/forms/MultiselectTagComponent";
import ToggleSwitch from "@/components/forms/ToggleSwitch";
import Swal from "sweetalert2";
import LocaleToggle from "@/components/layout/LocaleToggle";
import MultiselectPresentationComponent from "../forms/MultiselectPresentationComponent";

const NewProductComp = ({ lang, data }) => {
  const categoriesParsed = JSON.parse(data.categories);
  const router = useRouter();
  const [categoryId, setCategoryId] = useState("");
  const [category, setCategory] = useState({
    name: { es: "", en: "" },
    _id: "",
  });
  const [title, setTitle] = useState({ es: "", en: "" });
  const [isSending, setIsSending] = useState(false);
  const [onlineAvailability, setOnlineAvailability] = useState(true);
  const [description, setDescription] = useState({ es: "", en: "" });
  const [tags, setTags] = useState([]);
  const [presentations, setPresentations] = useState([]);
  const [featured, setFeatured] = useState(false);
  const [createdAt, setCreatedAt] = useState(
    cstDateTimeClient().toLocaleString()
  );
  const [imageText, setImageText] = useState("");
  const [price, setPrice] = useState(0);
  const [cost, setCost] = useState(0);
  const [stock, setStock] = useState(1);
  const [weight, setWeight] = useState({ es: 1, en: 1 });
  const [salePriceEndDate, setSalePriceEndDate] = useState("");
  const [countrySelection, setCountrySelection] = useState(set_countries);
  const [tagSelection, setTagSelection] = useState(blog_categories);
  const [presentationSelection, setPresentationSelection] = useState(
    productos_presentations
  );
  const [packingSelection, setPackingSelection] = useState(productos_packing);

  const [validationError, setValidationError] = useState(null);
  const keywordSelection = [
    { es: "Mantenimiento Automotriz", en: "Automotive Maintenance" },
    { es: "Investigación y Desarrollo", en: "Research and Development" },
    { es: "Consejos de Expertos", en: "Expert Advice" },
    { es: "Noticias y Actualizaciones", en: "News and Updates" },
    { es: "Distribución y Negocio", en: "Distribution and Business" },
    { es: "Tips y Hacks", en: "Tips and Hacks" },
  ];

  const [packing, setPacking] = useState({
    es: "",
    en: "",
  });
  const [packingTwo, setPackingTwo] = useState({ es: "", en: "" });
  const [mainImage, setMainImage] = useState(
    "/images/product-placeholder-minimalist.jpg"
  );
  const [origins, setOrigins] = useState([
    {
      country: {
        es: "",
        en: "",
      },
      month: {
        label: {
          es: "",
          en: "",
        },
        value: 0,
      },
    },
  ]);

  const addOrigin = () => {
    setOrigins((prevOrigins) => [
      ...prevOrigins,
      {
        country: {
          es: "",
          en: "",
        },
        month: {
          label: {
            es: "",
            en: "",
          },
          value: 0,
        },
      },
    ]);
  };

  const removeOrigin = (indexToRemove) => {
    setOrigins((prevOrigins) =>
      prevOrigins.filter((_, index) => index !== indexToRemove)
    );
  };
  const isCombinationUnique = (country, monthValue, index) => {
    return !origins.some(
      (origin, i) =>
        i !== index &&
        origin.country.es === country &&
        origin.month.value === monthValue
    );
  };
  const handleCountryChange = (index, newCountryEs, newCountryEn) => {
    const month = origins[index].month.value;
    if (newCountryEs && isCombinationUnique(newCountryEs, month, index)) {
      const newOrigins = [...origins];
      newOrigins[index].country[`es`] = newCountryEs;
      newOrigins[index].country[`en`] = newCountryEn;
      setOrigins(newOrigins);
    } else {
      const newOrigins = [...origins];
      newOrigins[index].country[`es`] = "";
      newOrigins[index].country[`en`] = "";
      setOrigins(newOrigins);
      Swal.fire({
        icon: "warning",
        iconColor: "#0D121B",
        background: "#fff5fb",
        color: "#0D121B",
        toast: true,
        text: `Esta combinación de origen y mes ya existe. Por favor, elija otro origen o mes.`,
        showConfirmButton: false,
        timer: 2000,
      });
    }
  };

  const handleMonthChange = (index, monthValue, monthEs, monthEn) => {
    const country = origins[index].country.es;
    if (monthValue && isCombinationUnique(country, monthValue, index)) {
      const newOrigins = [...origins];
      newOrigins[index].month.value = monthValue;
      newOrigins[index].month.label.es = monthEs;
      newOrigins[index].month.label.en = monthEn;
      setOrigins(newOrigins);
    } else {
      // Reset the country if the combination is not unique
      const newOrigins = [...origins];
      newOrigins[index].month.value = 0; // Reset to empty
      newOrigins[index].month.es = ""; // Reset to empty
      newOrigins[index].month.en = ""; // Reset to empty
      setOrigins(newOrigins);
      Swal.fire({
        icon: "warning",
        iconColor: "#0D121B",
        background: "#fff5fb",
        color: "#0D121B",
        toast: true,
        text: `Esta combinación de origen y mes ya existe. Por favor, elija otro origen o mes.`,
        showConfirmButton: false,
        timer: 2000,
      });
    }
  };

  const handlePriceChange = (newPrice) => {
    setPrice(newPrice);
  };

  const handleCostChange = (newCost) => {
    setCost(newCost);
  };

  const handleStockChange = (newStock) => {
    setStock(newStock);
  };

  const handleCategoryChange = async (categoryEs, categoryEn) => {
    setCategory({ es: categoryEs, en: categoryEn });
  };

  const handlePackingChange = async (packingEs, packingEn) => {
    setPacking({ es: packingEs, en: packingEn });
  };
  const handleAddKeywordField = (newSelectedKeywords) => {
    setKeywords(newSelectedKeywords);
  };

  // generate a pre-signed URL for use in uploading that file:
  async function retrieveNewURL(file, cb) {
    const endpoint = `/api/minio/`;
    fetch(endpoint, {
      method: "PUT",
      headers: {
        "Access-Control-Allow-Origin": "*",
        Name: file.name,
        Folder: "products/",
      },
    })
      .then((response) => {
        response.text().then((url) => {
          cb(file, url);
        });
      })
      .catch((e) => {
        console.error(e);
      });
  }

  // *******main images**********  //
  const upload = async (e) => {
    // Get selected files from the input element.
    let files = e?.target.files;
    let section = e?.target.id;
    if (files) {
      for (var i = 0; i < files?.length; i++) {
        var file = files[i];
        // Retrieve a URL from our server.
        retrieveNewURL(file, (file, url) => {
          const parsed = JSON.parse(url);
          url = parsed.url;
          // Compress and optimize the image before upload
          compressAndOptimizeMainImage(file, url, section);
        });
      }
    }
  };

  async function compressAndOptimizeMainImage(file, url, section) {
    // Create an HTML Image element
    const img = document.createElement("img");

    // Load the file into the Image element
    img.src = URL.createObjectURL(file);

    // Wait for the image to load
    img.onload = async () => {
      // Create a canvas element
      const canvas = document.createElement("canvas");
      const ctx = canvas.getContext("2d");

      // Set the canvas dimensions to the image dimensions
      canvas.width = img.width;
      canvas.height = img.height;

      // Draw the image onto the canvas
      ctx.drawImage(img, 0, 0);

      // Compress and set quality (adjust quality value as needed)
      const quality = 0.8; // Adjust quality value as needed
      const compressedImageData = canvas.toDataURL("image/webp", quality);

      // Convert base64 data URL to Blob
      const blobData = await fetch(compressedImageData).then((res) =>
        res.blob()
      );

      // Upload the compressed image
      uploadFile(blobData, url, section);
    };
  }

  // to upload this file to S3 at `https://minio.salvawebpro.com:9000` using the URL:
  async function uploadFile(blobData, url, section) {
    const newUrl = url.split("?");
    const imageUrl = newUrl[0];
    await fetch(url, {
      method: "PUT",
      body: blobData,
    })
      .then(() => {
        // If multiple files are uploaded, append upload status on the next line.
        // document.querySelector(
        //   '#status'
        // ).innerHTML += `<br>Uploaded ${file.name}.`;

        setMainImage(imageUrl);
      })
      .catch((e) => {
        console.error(e);
      });

    // hit open ai api

    // Call the new API route to generate SEO content
    const seoResponse = await imageToText(imageUrl);

    if (seoResponse.status !== 200) {
      //setIsProcessing(false);

      console.log("Failed to generate SEO content");
    }

    if (seoResponse.status === 200) {
      const data = JSON.parse(seoResponse.data);

      setDescription(data.description);
      setCategoryId(data.categoryId);
      setTitle(data.title);
      //setPackingSelection(...packingSelection, data.packing);
      setPacking(data.packing);
      //setCategories(...categories, data.category);
      setCategory(data.category);
    }
  }

  const handleAddTagField = (options) => {
    setTags((prevTags) => {
      let updatedTags = [...prevTags];

      options.forEach((option) => {
        const tagExists = updatedTags.some((tag) => tag.value === option.value);
        if (tagExists) {
          updatedTags = updatedTags.filter((tag) => tag.value !== option.value);
        } else {
          updatedTags.push({
            value: option.value,
            label: option.label,
          });
        }
      });

      return updatedTags;
    });
  };

  const handleAddPresentationField = (options) => {
    setPresentations((prevPresentations) => {
      let updatedPresentations = [...prevPresentations];

      options.forEach((option) => {
        const presentationExists = updatedPresentations.some(
          (presentation) => presentation.value === option.value
        );
        if (presentationExists) {
          updatedPresentations = updatedPresentations.filter(
            (presentation) => presentation.value !== option.value
          );
        } else {
          updatedPresentations.push({
            value: option.value,
            label: option.label,
          });
        }
      });

      return updatedPresentations;
    });
  };

  // Debounce function
  const debounce = (func, delay) => {
    let timer;
    return (...args) => {
      clearTimeout(timer);
      timer = setTimeout(() => func(...args), delay);
    };
  };

  const handleWeightConversion = async (option, language) => {
    try {
      if (language === "en") {
        // lbs to kg
        const newQuarts = Math.ceil(option * 0.00105669);

        setWeight((prev) => ({
          ...prev,
          en: newQuarts,
        }));
      }
      if (language === "es") {
        // lbs to kg
        const newMls = Math.ceil(option / 0.00105669);
        setWeight((prev) => ({
          ...prev,
          es: newMls,
        }));
      }
    } catch (error) {
      console.error("Error converting text:", error);
    }
  };

  const handlePackingTwoChange = async (packingEs, packingEn) => {
    setPackingTwo({ es: packingEs, en: packingEn });
  };

  async function hanldeFormSubmit() {
    if (
      !mainImage ||
      mainImage === "/images/product-placeholder-minimalist.jpg"
    ) {
      const noMainImageError = {
        mainImage: { _errors: ["Se requiere una imagen "] },
      };
      setValidationError(noMainImageError);
      return;
    }
    if (!title) {
      const noTitleError = { title: { _errors: ["Se requiere un titulo "] } };
      setValidationError(noTitleError);
      return;
    }
    if (!description) {
      const noDescriptionError = {
        description: { _errors: ["Se requiere descripción "] },
      };
      setValidationError(noDescriptionError);
      return;
    }
    if (!origins) {
      const noBrandError = {
        origins: { _errors: ["Se requiere un origen "] },
      };
      setValidationError(noBrandError);
      return;
    }
    if (!tags) {
      const noTagsError = {
        tags: { _errors: ["Se requiere mínimo una etiqueta "] },
      };
      setValidationError(noTagsError);
      return;
    }
    if (!presentations) {
      const noPresentationsError = {
        tags: { _errors: ["Se requiere mínimo una presentación "] },
      };
      setValidationError(noPresentationsError);
      return;
    }
    if (!origins[0].country) {
      const noSizesError = {
        sizes: { _errors: ["Se requiere un pais "] },
      };
      setValidationError(noSizesError);
      return;
    }
    if (!origins[0].month) {
      const noColorsError = {
        colors: { _errors: ["Se requiere un mes "] },
      };
      setValidationError(noColorsError);
      return;
    }

    const formData = new FormData();

    formData.append("categoryId", JSON.stringify(categoryId));
    formData.append("title", JSON.stringify(title));
    formData.append("packing", JSON.stringify(packing));
    formData.append("packingTwo", JSON.stringify(packingTwo));
    formData.append("description", JSON.stringify(description));
    formData.append("category", JSON.stringify(category));
    formData.append("weight", JSON.stringify(weight));
    formData.append("featured", featured);
    formData.append("cost", cost);
    formData.append("price", price);
    formData.append("stock", stock);
    formData.append("onlineAvailability", onlineAvailability);
    formData.append("mainImage", JSON.stringify(mainImage));
    formData.append("origins", JSON.stringify(origins));
    formData.append("tags", JSON.stringify(tags));
    formData.append("presentations", JSON.stringify(presentations));
    formData.append("salePriceEndDate", salePriceEndDate);
    formData.append("createdAt", createdAt);

    setIsSending(true);
    const response = await addNewProduct(formData);
    if (!response?.success) {
      if (response.error) {
        setValidationError("Este Titulo de producto ya esta en uso");
      }

      setIsSending(false);
    } else if (response?.success) {
      setValidationError(null);

      //await updateRevalidateProduct();

      router.push(`/${lang}/admin/productos`);
    }
  }
  return (
    <main className="w-full p-4 maxsm:p-2 bg-slate-200 text-black dark:bg-slate-800 text-sm">
      {!isSending ? (
        <form action={hanldeFormSubmit} className="relative w-full h-full">
          <div className="flex items-center justify-between">
            <LocaleToggle />
            <button
              type="submit"
              className="bg-secondary rounded-full text-white px-6 py-2"
            >
              Publicar
            </button>
          </div>

          <div className="flex flex-col items-start gap-5 justify-start w-full">
            <section className={`w-full ${!isSending ? "" : "grayscale"}`}>
              <h1 className="w-full text-xl font-semibold text-black mb-8 font-EB_Garamond">
                Nuevo Producto
              </h1>
              <div className="flex  flex-row maxmd:flex-col items-start gap-2 justify-between w-full">
                <div className="flex flex-col items-start justify-center w-full">
                  <div className="flex flex-row maxmd:flex-col items-center justify-between w-full">
                    {/* Availability */}
                    <div className="mb-4 w-full flex flex-row gap-4 items-center pl-3 uppercase">
                      <ToggleSwitch
                        label="Destacado"
                        enabled={featured}
                        setEnabled={setFeatured}
                      />
                      <ToggleSwitch
                        label="WWW"
                        enabled={onlineAvailability}
                        setEnabled={setOnlineAvailability}
                      />
                    </div>
                  </div>
                  {/*  Imagen principal */}
                  <div className="w-full gap-y-1 flex-col flex px-2 ">
                    <div className="relative aspect-video hover:opacity-80 bg-white border-4 border-gray-300">
                      <label htmlFor="selectorMain" className="cursor-pointer">
                        <Image
                          id="blogImage"
                          alt="blogBanner"
                          src={mainImage}
                          width={1280}
                          height={1280}
                          className="w-full h-full object-cover z-20"
                        />
                        <input
                          id="selectorMain"
                          type="file"
                          accept=".png, .jpg, .jpeg, .webp"
                          hidden
                          onChange={upload}
                        />

                        {validationError?.mainImage && (
                          <p className="text-sm text-red-400">
                            {validationError.mainImage._errors.join(", ")}
                          </p>
                        )}
                      </label>
                    </div>
                  </div>
                </div>

                <div className="w-full flex-col flex justify-start px-2 gap-y-2">
                  <div className="mb-1">
                    <p className="text-red-700"> {validationError}</p>
                    <input
                      type="text"
                      className="font-bold font-primary text-3xl w-full bg-transparent"
                      placeholder="Nombre de Producto"
                      name="mainTitle[es]"
                      value={title.es}
                      onChange={async (e) => {
                        setTitle((prev) => ({ ...prev, es: e.target.value }));
                        // handleAutoTranslate(
                        //   e.target.value,
                        //   "en",
                        //   setTitle,
                        //   "en"
                        // );
                      }}
                    />
                    <input
                      type="text"
                      className="font-bold font-primary text-3xl w-full bg-transparent"
                      placeholder="Product Name"
                      name="mainTitle[en]"
                      value={title.en}
                      onChange={async (e) => {
                        setTitle((prev) => ({ ...prev, en: e.target.value }));
                        // handleAutoTranslate(
                        //   e.target.value,
                        //   "es",
                        //   setTitle,
                        //   "es"
                        // );
                      }}
                    />
                    {validationError?.title && (
                      <p className="text-sm text-red-400">
                        {validationError.title._errors.join(", ")}
                      </p>
                    )}
                  </div>
                  <div className="mb-4">
                    <textarea
                      rows="2"
                      className="font-bold font-secondary text-base w-full bg-transparent"
                      placeholder="Descripción del Producto"
                      value={description.es}
                      onChange={async (e) => {
                        setDescription((prev) => ({
                          ...prev,
                          es: e.target.value,
                        }));
                        // handleAutoTranslate(
                        //   e.target.value,
                        //   "en",
                        //   setDescription,
                        //   "en"
                        // );
                      }}
                      name="description[es]"
                    ></textarea>
                    <textarea
                      rows="2"
                      className="font-bold font-secondary text-base w-full bg-transparent"
                      placeholder="Product Description"
                      value={description.en}
                      onChange={async (e) => {
                        setDescription((prev) => ({
                          ...prev,
                          en: e.target.value,
                        }));
                        // handleAutoTranslate(
                        //   e.target.value,
                        //   "es",
                        //   setDescription,
                        //   "es"
                        // );
                      }}
                      name="description[en]"
                    ></textarea>

                    {validationError?.description && (
                      <p className="text-sm text-red-400">
                        {validationError.description._errors.join(", ")}
                      </p>
                    )}
                  </div>
                  {/* Presentaciones y Packing */}
                  <div className=" flex flex-row gap-1 items-center">
                    <div className="mb-1 w-full">
                      <label className="block mb-1 font-EB_Garamond  text-xs">
                        Presentaciones
                      </label>
                      <div className="relative dark:bg-white">
                        <MultiselectPresentationComponent
                          lang={lang}
                          options={presentationSelection}
                          handleAddPresentationField={
                            handleAddPresentationField
                          }
                        />
                        {validationError?.presentations && (
                          <p className="text-sm text-red-400">
                            {validationError.presentations._errors.join(", ")}
                          </p>
                        )}
                      </div>
                    </div>
                    <div className="mb-4 w-full">
                      <label className="block mb-1 font-EB_Garamond text-xs">
                        Packing
                      </label>
                      <div className="relative">
                        <select
                          onChange={(e) => {
                            const selectedOption =
                              e.target.options[e.target.selectedIndex];
                            const packingEs =
                              selectedOption.getAttribute("data-es");
                            const packingEn =
                              selectedOption.getAttribute("data-en");
                            handlePackingChange(packingEs, packingEn);
                          }}
                          name="packing"
                          htmlFor="packing"
                          className="block appearance-none border dark:bg-dark border-gray-300 cursor-pointer rounded-md py-2 px-3 focus:outline-none focus:border-gray-400 w-full mt-2"
                        >
                          {packingSelection?.map((option) => (
                            <option
                              data-es={option.es}
                              data-en={option.en}
                              key={option[`${lang}`]}
                              value={option[`${lang}`]}
                            >
                              {option[`${lang}`]}
                            </option>
                          ))}
                        </select>
                        {validationError?.packing && (
                          <p className="text-sm text-red-400">
                            {validationError.packing._errors.join(", ")}
                          </p>
                        )}
                        <i className="absolute z-0 inset-y-0 right-0 p-2 text-gray-400">
                          <svg
                            width="22"
                            height="22"
                            className="fill-current"
                            viewBox="0 0 20 20"
                          >
                            <path d="M7 10l5 5 5-5H7z"></path>
                          </svg>
                        </i>
                      </div>
                    </div>
                    <div className="mb-4 w-full">
                      <label className="block mb-1 font-EB_Garamond text-xs">
                        Packing#2
                      </label>
                      <div className="relative">
                        <select
                          value={packingTwo[`${lang}`]}
                          onChange={(e) => {
                            const selectedOption =
                              e.target.options[e.target.selectedIndex];
                            const packingEs =
                              selectedOption.getAttribute("data-es");
                            const packingEn =
                              selectedOption.getAttribute("data-en");
                            handlePackingTwoChange(packingEs, packingEn);
                          }}
                          name="packingTwo"
                          htmlFor="packingTwo"
                          className="block appearance-none border dark:bg-dark border-gray-300 cursor-pointer rounded-md py-2 px-3 focus:outline-none focus:border-gray-400 w-full mt-2"
                        >
                          {packingSelection.map((option) => (
                            <option
                              data-es={option.es}
                              data-en={option.en}
                              key={option[`${lang}`]}
                              value={option[`${lang}`]}
                            >
                              {option[`${lang}`]}
                            </option>
                          ))}
                        </select>
                        {validationError?.packingTwo && (
                          <p className="text-sm text-red-400">
                            {validationError.packingTwo._errors.join(", ")}
                          </p>
                        )}
                        <i className="absolute z-0 inset-y-0 right-0 p-2 text-gray-400">
                          <svg
                            width="22"
                            height="22"
                            className="fill-current"
                            viewBox="0 0 20 20"
                          >
                            <path d="M7 10l5 5 5-5H7z"></path>
                          </svg>
                        </i>
                      </div>
                    </div>
                  </div>
                  {/* Etiquetas y Categoria */}
                  <div className=" flex flex-row gap-1 items-center">
                    <div className="mb-1 w-full">
                      <label className="block mb-1 font-EB_Garamond  text-xs">
                        Etiquetas
                      </label>
                      <div className="relative dark:bg-white">
                        <MultiselectTagComponent
                          options={tagSelection}
                          handleAddTagField={handleAddTagField}
                        />
                        {validationError?.tags && (
                          <p className="text-sm text-red-400">
                            {validationError.tags._errors.join(", ")}
                          </p>
                        )}
                      </div>
                    </div>
                    <div className="mb-1 w-full">
                      <label className="block mb-1 font-EB_Garamond  text-xs">
                        {" "}
                        Categoría{" "}
                      </label>
                      <div className="relative ">
                        {/* Category select */}
                        <select
                          value={category._id} // Use _id for value comparison
                          className={`block appearance-none border  border-gray-300 cursor-pointer text-black rounded-md py-2 px-3 focus:outline-none focus:border-gray-400 w-full mt-2`}
                          onChange={(e) => {
                            const selectedOption =
                              e.target.options[e.target.selectedIndex];
                            const categoryEs =
                              selectedOption.getAttribute("data-es");
                            const categoryEn =
                              selectedOption.getAttribute("data-en");
                            const categoryId = selectedOption.value; // Get the _id from option value
                            handleCategoryChange(
                              categoryEs,
                              categoryEn,
                              categoryId
                            );
                          }}
                        >
                          {categoriesParsed.map((cat) => (
                            <option
                              data-es={cat.name.es}
                              data-en={cat.name.en}
                              value={cat._id} // Use _id as the option value
                              className="bg-input"
                              key={cat._id}
                              selected={cat._id === category._id} // Set selected based on _id match
                            >
                              {cat.name[`${lang}`]}
                            </option>
                          ))}
                        </select>
                        {validationError?.category && (
                          <p className="text-sm text-red-400">
                            {validationError.category._errors.join(", ")}
                          </p>
                        )}
                        <i className="absolute inset-y-0 right-0 p-2 text-gray-400">
                          <svg
                            width="22"
                            height="22"
                            className="fill-current"
                            viewBox="0 0 20 20"
                          >
                            <path d="M7 10l5 5 5-5H7z"></path>
                          </svg>
                        </i>
                      </div>
                    </div>
                  </div>
                  <div className="flex flex-row items-center gap-3 w-full">
                    <div className="mb-4 w-full">
                      <label className="block mb-1  font-EB_Garamond text-xs">
                        Precio
                      </label>
                      <div className="relative">
                        <div className="col-span-2">
                          <input
                            type="number"
                            className="appearance-none border border-gray-300 bg-gray-100 rounded-md pl-2 py-1 remove-arrow focus:outline-none focus:border-gray-400 w-full"
                            placeholder="0.00"
                            min="0"
                            value={price}
                            onChange={(e) => handlePriceChange(e.target.value)}
                            name="price"
                            htmlFor="price"
                          />
                          {validationError?.price && (
                            <p className="text-sm text-red-400">
                              {validationError.price._errors.join(", ")}
                            </p>
                          )}
                        </div>
                      </div>
                    </div>
                    <div className="mb-4 w-full">
                      <label className="block mb-1 font-EB_Garamond text-xs">
                        {" "}
                        Costo{" "}
                      </label>
                      <div className="relative">
                        <div className="col-span-2">
                          <input
                            type="number"
                            className="appearance-none border border-gray-300 bg-gray-100 rounded-md pl-2 py-1 remove-arrow focus:outline-none focus:border-gray-400 w-full"
                            placeholder="0.00"
                            min="0"
                            value={cost}
                            onChange={(e) => handleCostChange(e.target.value)}
                            name="cost"
                            htmlFor="cost"
                          />
                          {validationError?.cost && (
                            <p className="text-sm text-red-400">
                              {validationError.cost._errors.join(", ")}
                            </p>
                          )}
                        </div>
                      </div>
                    </div>
                    <div className="mb-4 w-full">
                      <label className="block mb-1 font-EB_Garamond text-xs">
                        Existencias
                      </label>
                      <div className="relative">
                        <div className="col-span-2">
                          <input
                            type="number"
                            className="appearance-none border border-gray-300 bg-gray-100 rounded-md pl-2 py-1 remove-arrow focus:outline-none focus:border-gray-400 w-full"
                            placeholder="1"
                            min="1"
                            value={stock}
                            onChange={(e) => handleStockChange(e.target.value)}
                            name="stock"
                            htmlFor="stock"
                          />
                          {validationError?.stock && (
                            <p className="text-sm text-red-400">
                              {validationError.stock._errors.join(", ")}
                            </p>
                          )}
                        </div>
                      </div>
                    </div>
                    <div className="mb-4 w-full">
                      <div className="relative">
                        <div className="col-span-2">
                          <label className="block mb-1 font-EB_Garamond text-xs">
                            ml
                          </label>
                          <input
                            name="weight[es]"
                            type="number"
                            className="font-medium font-primary text-xl flex flex-row items-center gap-1 w-full appearance-none bg-transparent mb-2 mt-2"
                            min={"1"}
                            value={weight.es}
                            onChange={async (e) => {
                              setWeight((prev) => ({
                                ...prev,
                                es: e.target.value,
                              }));
                              handleWeightConversion(e.target.value, "en");
                            }}
                          />
                          <label className="block mb-1 font-EB_Garamond text-xs">
                            ml
                          </label>
                          <input
                            name="weight[en]"
                            type="number"
                            min={"1"}
                            value={weight.en}
                            onChange={async (e) => {
                              setWeight((prev) => ({
                                ...prev,
                                en: e.target.value,
                              }));
                              handleWeightConversion(e.target.value, "es");
                            }}
                            className="font-medium font-primary text-xl flex flex-row items-center gap-1 w-full appearance-none bg-transparent mb-2 mt-2"
                          />
                          {validationError?.weight && (
                            <p className="text-sm text-red-400">
                              {validationError.weight._errors.join(", ")}
                            </p>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Main Origin */}
              <div className="w-full main-origin flex maxsm:flex-col items-center">
                <div className="flex flex-row items-center gap-3 w-2/3  maxsm:w-full">
                  <div className="mb-4 w-full">
                    <label className="block mb-1 font-EB_Garamond text-xs">
                      Origen
                    </label>
                    <div className="relative">
                      <select
                        onChange={(e) => {
                          const selectedOption =
                            e.target.options[e.target.selectedIndex];
                          const localeEs =
                            selectedOption.getAttribute("data-es");
                          const localeEn =
                            selectedOption.getAttribute("data-en");
                          handleCountryChange(0, localeEs, localeEn);
                        }}
                        name="country"
                        htmlFor="country"
                        className="appearance-none border border-gray-300 bg-gray-100 rounded-md pl-2 py-1 cursor-pointer focus:outline-none focus:border-gray-400 w-full"
                      >
                        {countrySelection.map((option) => (
                          <option
                            key={option[`${lang}`]}
                            data-es={option.es}
                            data-en={option.en}
                            value={option[`${lang}`]}
                          >
                            {option[`${lang}`]}
                          </option>
                        ))}
                      </select>
                      {validationError?.country && (
                        <p className="text-sm text-red-400">
                          {validationError.country._errors.join(", ")}
                        </p>
                      )}
                    </div>
                  </div>
                  <div className="mb-4 w-full">
                    <label className="block mb-1 font-EB_Garamond text-xs">
                      {" "}
                      Mes Disponible{" "}
                    </label>
                    <div className="relative">
                      <select
                        value={origins[0].month[`${lang}`]}
                        name="month"
                        htmlFor="month"
                        onChange={(e) => {
                          const selectedOption =
                            e.target.options[e.target.selectedIndex];
                          const monthEs =
                            selectedOption.getAttribute("data-es");
                          const monthEn =
                            selectedOption.getAttribute("data-en");
                          handleMonthChange(
                            0,
                            e.target.value,
                            monthEs,
                            monthEn
                          );
                        }}
                        className="appearance-none border border-gray-300 bg-gray-100 rounded-md pl-2 py-1 cursor-pointer focus:outline-none focus:border-gray-400 w-full"
                      >
                        {set_months.map((option) => (
                          <option
                            data-es={option.es}
                            data-en={option.en}
                            key={option[`${lang}`]}
                            value={option.value}
                          >
                            {option[`${lang}`]}
                          </option>
                        ))}
                      </select>
                      {validationError?.months && (
                        <p className="text-sm text-red-400">
                          {validationError.months._errors.join(", ")}
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              </div>
              {/* Render additional origins */}
              {origins.slice(1).map((origin, index) => (
                <div
                  key={index + 1}
                  className={`w-full origin-${
                    index + 1
                  } flex maxsm:flex-col items-center`}
                >
                  <div className="relative flex flex-row items-center gap-3 maxsm:gap-1 w-2/3  maxsm:w-full">
                    <div
                      onClick={() => removeOrigin(index + 1)}
                      className="absolute top-0 -left-5 px-1 bg-red-500 text-white rounded-full cursor-pointer z-50 text-xs"
                    >
                      X
                    </div>
                    <div className="mb-4 w-full">
                      <label className="block mb-1 font-EB_Garamond text-xs">
                        Origen
                      </label>
                      <div className="relative">
                        <select
                          value={origins[index + 1].country[`${lang}`]}
                          name={`country-${index + 1}`}
                          htmlFor={`country-${index + 1}`}
                          onChange={(e) => {
                            const selectedOption =
                              e.target.options[e.target.selectedIndex];
                            const localeEs =
                              selectedOption.getAttribute("data-es");
                            const localeEn =
                              selectedOption.getAttribute("data-en");
                            handleCountryChange(index + 1, localeEs, localeEn);
                          }}
                          className="appearance-none border border-gray-300 bg-gray-100 rounded-md  pl-2 py-1 cursor-pointer focus:outline-none focus:border-gray-400 w-full"
                        >
                          {countrySelection.map((option) => (
                            <option
                              data-es={option.es}
                              data-en={option.en}
                              key={option[`${lang}`]}
                              value={option[`${lang}`]}
                            >
                              {option[`${lang}`]}
                            </option>
                          ))}
                        </select>

                        {validationError?.country && (
                          <p className="text-sm text-red-400">
                            {validationError.country._errors.join(", ")}
                          </p>
                        )}
                      </div>
                    </div>
                    <div className="mb-4 w-full">
                      <label className="block mb-1 font-EB_Garamond text-xs">
                        Mes Disponible
                      </label>
                      <div className="relative">
                        <select
                          name={`month-${index + 1}`}
                          htmlFor={`month-${index + 1}`}
                          onChange={(e) => {
                            const selectedOption =
                              e.target.options[e.target.selectedIndex];
                            const monthEs =
                              selectedOption.getAttribute("data-es");
                            const monthEn =
                              selectedOption.getAttribute("data-en");
                            handleMonthChange(
                              index + 1,
                              e.target.value,
                              monthEs,
                              monthEn
                            );
                          }}
                          className="appearance-none border border-gray-300 bg-gray-100 rounded-md pl-2 py-1 cursor-pointer focus:outline-none focus:border-gray-400 w-full"
                        >
                          {set_months.map((option) => (
                            <option
                              data-es={option.es}
                              data-en={option.en}
                              key={option[`${lang}`]}
                              value={option.value}
                            >
                              {option[`${lang}`]}
                            </option>
                          ))}
                        </select>
                        {validationError?.colors && (
                          <p className="text-sm text-red-400">
                            {validationError.colors._errors.join(", ")}
                          </p>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
              <div className="w-[300px]">
                <div
                  onClick={addOrigin}
                  className="my-4 px-8 py-2 text-center inline-block text-white bg-black border border-transparent rounded-md hover:bg-slate-800 w-auto cursor-pointer"
                >
                  Origen +
                </div>
              </div>
            </section>
          </div>
        </form>
      ) : (
        <section className="w-full min-h-screen">
          <div className="flex flex-col items-center justify-center min-h-screen w-full">
            <span className="loader"></span>
            <h2 className="text-sm">Creando producto...</h2>
          </div>
        </section>
      )}
    </main>
  );
};

export default NewProductComp;
