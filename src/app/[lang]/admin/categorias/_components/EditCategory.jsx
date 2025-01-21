"use client";
import React, { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import {
  set_methods,
  set_tests,
  set_typical_values,
} from "@/backend/data/productData";
import Swal from "sweetalert2";
import { addNewCategory, editOneCategory } from "../_actions";

const EditCategory = ({ category, lang, id }) => {
  const cat_tests = category.characteristics.map((item) => item.test);
  const cat_methods = category.characteristics.map((item) => item.method);

  const cat_typicalValues = category.characteristics.map(
    (item) => item.typicalValue
  );

  const router = useRouter();
  const [name, setName] = useState(category.name);
  const [isSending, setIsSending] = useState(false);
  const [summary, setSummary] = useState(category.summary);
  const [industryClients, setIndustryClients] = useState(
    category.industry_clients
  );
  const [benefits, setBenefits] = useState(category.benefits);
  const [precautions, setPrecautions] = useState(category.precautions);
  const [testSelection, setTestSelection] = useState(cat_tests);
  const [typicalValueSelection, setTypicalValueSelection] =
    useState(cat_typicalValues);
  const [validationError, setValidationError] = useState(null);
  const [mainImage, setMainImage] = useState(category.images[0].url);
  const [characteristics, setCharacteristics] = useState(
    category.characteristics
  );

  const addCharacteristic = () => {
    setCharacteristics((prevCharacteristics) => [
      ...prevCharacteristics,
      {
        test: {
          es: "",
          en: "",
        },
        method: {
          es: "",
          en: "",
        },
        typicalValue: {
          es: "",
          en: "",
        },
      },
    ]);
  };

  const removeCharacteristic = (indexToRemove) => {
    setCharacteristics((prevCharacteristics) =>
      prevCharacteristics.filter((_, index) => index !== indexToRemove)
    );
  };
  const isCombinationUnique = (test, method, typicalValue, index) => {
    return !characteristics.some(
      (characteristic, i) =>
        i !== index &&
        characteristic.test.es === test &&
        characteristic.method.es === method &&
        characteristic.typicalValue.es === typicalValue
    );
  };

  const handleTestChange = (index, newTestEs, newTestEn) => {
    const method = characteristics[index].method.es;
    const typicalValue = characteristics[index].typicalValue.es;

    if (
      newTestEs &&
      isCombinationUnique(newTestEs, method, typicalValue, index)
    ) {
      const newCharacteristics = [...characteristics];
      newCharacteristics[index].test[`es`] = newTestEs;
      newCharacteristics[index].test[`en`] = newTestEn;
      setCharacteristics(newCharacteristics);
    } else {
      const newCharacteristics = [...characteristics];
      newCharacteristics[index].test[`es`] = "";
      newCharacteristics[index].test[`en`] = "";
      setCharacteristics(newCharacteristics);
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

  const handleMethodChange = (index, methodEs, methodEn) => {
    const test = characteristics[index].test.es;
    const typicalValue = characteristics[index].typicalValue.es;

    if (isCombinationUnique(test, methodEs, typicalValue, index)) {
      const newCharacteristics = [...characteristics];
      newCharacteristics[index].method.es = methodEs;
      newCharacteristics[index].method.en = methodEn;
      setCharacteristics(newCharacteristics);
    } else {
      // Reset the test if the combination is not unique
      const newCharacteristics = [...characteristics];
      newCharacteristics[index].method.es = ""; // Reset to empty
      newCharacteristics[index].method.en = ""; // Reset to empty
      setCharacteristics(newCharacteristics);
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

  const handleTypicalValueChange = (
    index,
    newTypicalValueEs,
    newTypicalValueEn
  ) => {
    const test = characteristics[index].test.es;
    const method = characteristics[index].method.es;
    if (
      newTypicalValueEs &&
      isCombinationUnique(test, method, newTypicalValueEs, index)
    ) {
      const newCharacteristics = [...characteristics];
      newCharacteristics[index].typicalValue[`es`] = newTypicalValueEs;
      newCharacteristics[index].typicalValue[`en`] = newTypicalValueEn;
      setCharacteristics(newCharacteristics);
    } else {
      const newCharacteristics = [...characteristics];
      newCharacteristics[index].typicalValue[`es`] = "";
      newCharacteristics[index].typicalValue[`en`] = "";
      setCharacteristics(newCharacteristics);
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
  }

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
    if (!name) {
      const noNameError = { name: { _errors: ["Se requiere un titulo "] } };
      setValidationError(noNameError);
      return;
    }
    if (!summary) {
      const noSummaryError = {
        summary: { _errors: ["Se requiere descripción "] },
      };
      setValidationError(noSummaryError);
      return;
    }
    if (!characteristics) {
      const noBrandError = {
        characteristics: { _errors: ["Se requiere un origen "] },
      };
      setValidationError(noBrandError);
      return;
    }
    if (!precautions) {
      const noTagsError = {
        tags: { _errors: ["Se requiere mínimo una etiqueta "] },
      };
      setValidationError(noTagsError);
      return;
    }
    if (!characteristics[0].test) {
      const noSizesError = {
        sizes: { _errors: ["Se requiere una prueba "] },
      };
      setValidationError(noSizesError);
      return;
    }
    if (!characteristics[0].method) {
      const noColorsError = {
        colors: { _errors: ["Se requiere un método "] },
      };
      setValidationError(noColorsError);
      return;
    }

    const formData = new FormData();
    formData.append("name", JSON.stringify(name));
    formData.append("summary", JSON.stringify(summary));
    formData.append("benefits", JSON.stringify(benefits));
    formData.append("precautions", JSON.stringify(precautions));
    formData.append("characteristics", JSON.stringify(characteristics));
    formData.append("mainImage", JSON.stringify(mainImage));
    formData.append("industryClients", JSON.stringify(industryClients));

    setIsSending(true);
    const response = await editOneCategory(formData, id);
    console.log(response, "response after creation");
    if (!response?.success) {
      if (response.error) {
        setValidationError("Este Titulo de producto ya esta en uso");
      }

      setIsSending(false);
    } else if (response?.success) {
      setValidationError(null);

      //await updateRevalidateProduct();

      router.push(`/${lang}/admin/categorias`);
    }
  }
  return (
    <main className="w-full p-4 maxsm:p-2 bg-slate-200 text-black dark:bg-slate-800 text-sm">
      {!isSending ? (
        <form action={hanldeFormSubmit} className="relative w-full h-full">
          <div className="flex items-center justify-between">
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
                Nuevo Category
              </h1>
              <div className="flex flex-row maxmd:flex-col items-start gap-2 justify-between w-full">
                <div className="flex flex-col items-start justify-center w-full">
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
                      placeholder="Nombre de Category"
                      name="mainName[es]"
                      value={name.es}
                      onChange={async (e) => {
                        setName((prev) => ({ ...prev, es: e.target.value }));
                        // handleAutoTranslate(
                        //   e.target.value,
                        //   "en",
                        //   setName,
                        //   "en"
                        // );
                      }}
                    />
                    <input
                      type="text"
                      className="font-bold font-primary text-3xl w-full bg-transparent"
                      placeholder="Category Name"
                      name="mainName[en]"
                      value={name.en}
                      onChange={async (e) => {
                        setName((prev) => ({ ...prev, en: e.target.value }));
                        // handleAutoTranslate(
                        //   e.target.value,
                        //   "es",
                        //   setName,
                        //   "es"
                        // );
                      }}
                    />
                    {validationError?.name && (
                      <p className="text-sm text-red-400">
                        {validationError.name._errors.join(", ")}
                      </p>
                    )}
                  </div>
                  <div className="mb-4">
                    <textarea
                      rows="2"
                      className="font-bold font-secondary text-base w-full bg-transparent"
                      placeholder="Descripción del Category"
                      value={summary.es}
                      onChange={async (e) => {
                        setSummary((prev) => ({
                          ...prev,
                          es: e.target.value,
                        }));
                        // handleAutoTranslate(
                        //   e.target.value,
                        //   "en",
                        //   setSummary,
                        //   "en"
                        // );
                      }}
                      name="summary[es]"
                    ></textarea>
                    <textarea
                      rows="2"
                      className="font-bold font-secondary text-base w-full bg-transparent"
                      placeholder="Category Summary"
                      value={summary.en}
                      onChange={async (e) => {
                        setSummary((prev) => ({
                          ...prev,
                          en: e.target.value,
                        }));
                        // handleAutoTranslate(
                        //   e.target.value,
                        //   "es",
                        //   setSummary,
                        //   "es"
                        // );
                      }}
                      name="summary[en]"
                    ></textarea>

                    {validationError?.summary && (
                      <p className="text-sm text-red-400">
                        {validationError.summary._errors.join(", ")}
                      </p>
                    )}
                  </div>

                  {/* benefits y precautions */}
                  <div className="mb-4">
                    <textarea
                      rows="2"
                      className="font-bold font-secondary text-base w-full bg-transparent"
                      placeholder="Beneficios de la Category"
                      value={benefits.es}
                      onChange={async (e) => {
                        setBenefits((prev) => ({
                          ...prev,
                          es: e.target.value,
                        }));
                        // handleAutoTranslate(
                        //   e.target.value,
                        //   "en",
                        //   setSummary,
                        //   "en"
                        // );
                      }}
                      name="benefits[es]"
                    ></textarea>
                    <textarea
                      rows="2"
                      className="font-bold font-secondary text-base w-full bg-transparent"
                      placeholder="Category benefits"
                      value={benefits.en}
                      onChange={async (e) => {
                        setBenefits((prev) => ({
                          ...prev,
                          en: e.target.value,
                        }));
                        // handleAutoTranslate(
                        //   e.target.value,
                        //   "es",
                        //   setSummary,
                        //   "es"
                        // );
                      }}
                      name="benefits[en]"
                    ></textarea>

                    {validationError?.benefits && (
                      <p className="text-sm text-red-400">
                        {validationError.benefits._errors.join(", ")}
                      </p>
                    )}
                  </div>
                  <div className="mb-4">
                    <textarea
                      rows="2"
                      className="font-bold font-secondary text-base w-full bg-transparent"
                      placeholder="Precauciones de la Category"
                      value={precautions.es}
                      onChange={async (e) => {
                        setPrecautions((prev) => ({
                          ...prev,
                          es: e.target.value,
                        }));
                        // handleAutoTranslate(
                        //   e.target.value,
                        //   "en",
                        //   setSummary,
                        //   "en"
                        // );
                      }}
                      name="precautions[es]"
                    ></textarea>
                    <textarea
                      rows="2"
                      className="font-bold font-secondary text-base w-full bg-transparent"
                      placeholder="Category precautions"
                      value={precautions.en}
                      onChange={async (e) => {
                        setPrecautions((prev) => ({
                          ...prev,
                          en: e.target.value,
                        }));
                        // handleAutoTranslate(
                        //   e.target.value,
                        //   "es",
                        //   setSummary,
                        //   "es"
                        // );
                      }}
                      name="precautions[en]"
                    ></textarea>

                    {validationError?.precautions && (
                      <p className="text-sm text-red-400">
                        {validationError.precautions._errors.join(", ")}
                      </p>
                    )}
                  </div>

                  {/* industry clients */}
                  <div className="mb-4">
                    <textarea
                      rows="2"
                      className="font-bold font-secondary text-base w-full bg-transparent"
                      placeholder="Clientes de Industria de la Category"
                      value={industryClients.es}
                      onChange={async (e) => {
                        setIndustryClients((prev) => ({
                          ...prev,
                          es: e.target.value,
                        }));
                        // handleAutoTranslate(
                        //   e.target.value,
                        //   "en",
                        //   setSummary,
                        //   "en"
                        // );
                      }}
                      name="industryClients[es]"
                    ></textarea>
                    <textarea
                      rows="2"
                      className="font-bold font-secondary text-base w-full bg-transparent"
                      placeholder="Category Industry Clients"
                      value={industryClients.en}
                      onChange={async (e) => {
                        setIndustryClients((prev) => ({
                          ...prev,
                          en: e.target.value,
                        }));
                        // handleAutoTranslate(
                        //   e.target.value,
                        //   "es",
                        //   setSummary,
                        //   "es"
                        // );
                      }}
                      name="industryClients[en]"
                    ></textarea>

                    {validationError?.industryClients && (
                      <p className="text-sm text-red-400">
                        {validationError.industryClients._errors.join(", ")}
                      </p>
                    )}
                  </div>
                </div>
              </div>

              {/* Main Characteristic */}
              <div className="w-full main-characteristic flex maxsm:flex-col items-center">
                <div className="flex flex-row items-center gap-3 w-2/3  maxsm:w-full">
                  <div className="mb-4 w-full">
                    <label className="block mb-1 font-EB_Garamond text-xs">
                      Prueba
                    </label>
                    <div className="relative">
                      <select
                        value={characteristics[0].test[`${lang}`]}
                        name="test"
                        onChange={(e) => {
                          const selectedOption =
                            e.target.options[e.target.selectedIndex];
                          const localeEs =
                            selectedOption.getAttribute("data-es");
                          const localeEn =
                            selectedOption.getAttribute("data-en");
                          handleTestChange(0, localeEs, localeEn);
                        }}
                        htmlFor="test"
                        className="appearance-none border border-gray-300 bg-gray-100 rounded-md pl-2 py-1 cursor-pointer focus:outline-none focus:border-gray-400 w-full"
                      >
                        {testSelection.map((option, index) => (
                          <option
                            key={option[`${lang}`] + index}
                            data-es={option.es}
                            data-en={option.en}
                            value={option[`${lang}`]}
                          >
                            {option[`${lang}`]}
                          </option>
                        ))}
                      </select>
                      {validationError?.test && (
                        <p className="text-sm text-red-400">
                          {validationError.test._errors.join(", ")}
                        </p>
                      )}
                    </div>
                  </div>
                  <div className="mb-4 w-full">
                    <label className="block mb-1 font-EB_Garamond text-xs">
                      {" "}
                      Metodo{" "}
                    </label>
                    <div className="relative">
                      <select
                        value={characteristics[0].method[`${lang}`]}
                        name="method"
                        htmlFor="method"
                        onChange={(e) => {
                          const selectedOption =
                            e.target.options[e.target.selectedIndex];
                          const methodEs =
                            selectedOption.getAttribute("data-es");
                          const methodEn =
                            selectedOption.getAttribute("data-en");
                          handleMethodChange(0, methodEs, methodEn);
                        }}
                        className="appearance-none border border-gray-300 bg-gray-100 rounded-md pl-2 py-1 cursor-pointer focus:outline-none focus:border-gray-400 w-full"
                      >
                        {cat_methods.map((option, index) => (
                          <option
                            data-es={option?.es}
                            data-en={option?.en}
                            key={option?.[`${lang}`] + index}
                            value={option.value}
                          >
                            {option?.[`${lang}`]}
                          </option>
                        ))}
                      </select>
                      {validationError?.methods && (
                        <p className="text-sm text-red-400">
                          {validationError.methods._errors.join(", ")}
                        </p>
                      )}
                    </div>
                  </div>
                  <div className="mb-4 w-full">
                    <label className="block mb-1 font-EB_Garamond text-xs">
                      Valor Típico
                    </label>
                    <div className="relative">
                      <select
                        value={characteristics[0].typicalValue[`${lang}`]}
                        onChange={(e) => {
                          const selectedOption =
                            e.target.options[e.target.selectedIndex];
                          const localeEs =
                            selectedOption.getAttribute("data-es");
                          const localeEn =
                            selectedOption.getAttribute("data-en");
                          handleTypicalValueChange(0, localeEs, localeEn);
                        }}
                        name="typicalValue"
                        htmlFor="typicalValue"
                        className="appearance-none border border-gray-300 bg-gray-100 rounded-md pl-2 py-1 cursor-pointer focus:outline-none focus:border-gray-400 w-full"
                      >
                        {typicalValueSelection.map((option, index) => (
                          <option
                            key={option?.[`${lang}`] + index}
                            data-es={option?.es}
                            data-en={option?.en}
                            value={option?.[`${lang}`]}
                          >
                            {option?.[`${lang}`]}
                          </option>
                        ))}
                      </select>
                      {validationError?.typicalValue && (
                        <p className="text-sm text-red-400">
                          {validationError.typicalValue._errors.join(", ")}
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              </div>
              {/* Render additional characteristics */}
              {characteristics.slice(1).map((characteristic, index) => (
                <div
                  key={index + 1}
                  className={`w-full characteristic-${
                    index + 1
                  } flex maxsm:flex-col items-center`}
                >
                  <div className="relative flex flex-row items-center gap-3 maxsm:gap-1 w-2/3  maxsm:w-full">
                    <div
                      onClick={() => removeCharacteristic(index + 1)}
                      className="absolute top-0 -left-5 px-1 bg-red-500 text-white rounded-full cursor-pointer z-50 text-xs"
                    >
                      X
                    </div>
                    <div className="mb-4 w-full">
                      <label className="block mb-1 font-EB_Garamond text-xs">
                        Prueba
                      </label>
                      <div className="relative">
                        <select
                          value={characteristics[index + 1].test[`${lang}`]}
                          name={`test-${index + 1}`}
                          htmlFor={`test-${index + 1}`}
                          onChange={(e) => {
                            const selectedOption =
                              e.target.options[e.target.selectedIndex];
                            const localeEs =
                              selectedOption.getAttribute("data-es");
                            const localeEn =
                              selectedOption.getAttribute("data-en");
                            handleTestChange(index + 1, localeEs, localeEn);
                          }}
                          className="appearance-none border border-gray-300 bg-gray-100 rounded-md  pl-2 py-1 cursor-pointer focus:outline-none focus:border-gray-400 w-full"
                        >
                          {testSelection.map((option, index) => (
                            <option
                              data-es={option.es}
                              data-en={option.en}
                              key={option[`${lang}`] + index}
                              value={option[`${lang}`]}
                            >
                              {option[`${lang}`]}
                            </option>
                          ))}
                        </select>

                        {validationError?.test && (
                          <p className="text-sm text-red-400">
                            {validationError.test._errors.join(", ")}
                          </p>
                        )}
                      </div>
                    </div>
                    <div className="mb-4 w-full">
                      <label className="block mb-1 font-EB_Garamond text-xs">
                        Metodo
                      </label>
                      <div className="relative">
                        <select
                          value={characteristics[index + 1].method[`${lang}`]}
                          name={`method-${index + 1}`}
                          htmlFor={`method-${index + 1}`}
                          onChange={(e) => {
                            const selectedOption =
                              e.target.options[e.target.selectedIndex];
                            const methodEs =
                              selectedOption.getAttribute("data-es");
                            const methodEn =
                              selectedOption.getAttribute("data-en");
                            handleMethodChange(index + 1, methodEs, methodEn);
                          }}
                          className="appearance-none border border-gray-300 bg-gray-100 rounded-md pl-2 py-1 cursor-pointer focus:outline-none focus:border-gray-400 w-full"
                        >
                          {cat_methods.map((option, index) => (
                            <option
                              data-es={option.es}
                              data-en={option.en}
                              key={option[`${lang}`] + index}
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
                    <div className="mb-4 w-full">
                      <label className="block mb-1 font-EB_Garamond text-xs">
                        Valor Típico
                      </label>
                      <div className="relative">
                        <select
                          value={
                            characteristics[index + 1].typicalValue?.[`${lang}`]
                          }
                          name={`typicalValue-${index + 1}`}
                          htmlFor={`typicalValue-${index + 1}`}
                          onChange={(e) => {
                            const selectedOption =
                              e.target.options[e.target.selectedIndex];
                            const localeEs =
                              selectedOption.getAttribute("data-es");
                            const localeEn =
                              selectedOption.getAttribute("data-en");
                            handleTypicalValueChange(
                              index + 1,
                              localeEs,
                              localeEn
                            );
                          }}
                          className="appearance-none border border-gray-300 bg-gray-100 rounded-md  pl-2 py-1 cursor-pointer focus:outline-none focus:border-gray-400 w-full"
                        >
                          {typicalValueSelection.map((option, index) => (
                            <option
                              data-es={option?.es}
                              data-en={option?.en}
                              key={option?.[`${lang}`] + index}
                              value={option?.[`${lang}`]}
                            >
                              {option?.[`${lang}`]}
                            </option>
                          ))}
                        </select>

                        {validationError?.typicalValue && (
                          <p className="text-sm text-red-400">
                            {validationError.typicalValue._errors.join(", ")}
                          </p>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
              <div className="w-[300px]">
                <div
                  onClick={addCharacteristic}
                  className="my-4 px-8 py-2 text-center inline-block text-white bg-black border border-transparent rounded-md hover:bg-slate-800 w-auto cursor-pointer"
                >
                  Characteristic +
                </div>
              </div>
            </section>
          </div>
        </form>
      ) : (
        <section className="w-full min-h-screen">
          <div className="flex flex-col items-center justify-center min-h-screen w-full">
            <span className="loader"></span>
            <h2 className="text-sm">Creando categoria...</h2>
          </div>
        </section>
      )}
    </main>
  );
};

export default EditCategory;
