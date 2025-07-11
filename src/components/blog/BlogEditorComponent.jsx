"use client";
import React, { useEffect, useRef, useState, useCallback } from "react";
import Image from "next/image";
import { cstDateTimeClient } from "@/backend/helpers";
import { addNewPost } from "@/app/[lang]/_actions";
import { useRouter } from "next/navigation";
import MultiselectKeywords from "../forms/MultiselectKeywords";
import LocaleToggle from "../layout/LocaleToggle";

const BlogEditorComponent = ({ lang, translate }) => {
  const router = useRouter();
  const formRef = useRef();
  const keywordSelection = [
    { es: "Mantenimiento Automotriz", en: "Automotive Maintenance" },
    { es: "Investigación y Desarrollo", en: "Research and Development" },
    { es: "Consejos de Expertos", en: "Expert Advice" },
    { es: "Noticias y Actualizaciones", en: "News and Updates" },
    { es: "Distribución y Negocio", en: "Distribution and Business" },
    { es: "Tips y Hacks", en: "Tips and Hacks" },
  ];
  const [category, setCategory] = useState({
    es: "Mantenimiento Automotriz",
    en: "Automotive Maintenance",
  });
  const [keywords, setKeywords] = useState([]);
  const [metaDescription, setMetaDescription] = useState("");
  // Main section
  const [mainTitle, setMainTitle] = useState({ es: "", en: "" });
  const [mainImage, setMainImage] = useState("/images/diseno_web_01.jpg");
  // section 2
  const [sectionTwoTitle, setSectionTwoTitle] = useState({ es: "", en: "" });
  const [sectionTwoParagraphOne, setSectionTwoParagraphOne] = useState({
    es: "",
    en: "",
  });
  const [sectionTwoParagraphTwo, setSectionTwoParagraphTwo] = useState({
    es: "",
    en: "",
  });
  // section 3
  const [sectionThreeTitle, setSectionThreeTitle] = useState({
    es: "",
    en: "",
  });
  const [sectionThreeParagraphOne, setSectionThreeParagraphOne] = useState({
    es: "",
    en: "",
  });
  const [sectionThreeImage, setSectionThreeImage] = useState(
    "/images/diseno_web_01.jpg"
  );
  const [sectionThreeParagraphFooter, setSectionThreeParagraphFooter] =
    useState({ es: "", en: "" });
  // section 4
  const [sectionFourTitle, setSectionFourTitle] = useState({ es: "", en: "" });
  const [sectionFourParagraphOne, setSectionFourParagraphOne] = useState({
    es: "",
    en: "",
  });
  const [sectionFourImage, setSectionFourImage] = useState(
    "/images/diseno_web_01.jpg"
  );
  const [sectionFourParagraphFooter, setSectionFourParagraphFooter] = useState({
    es: "",
    en: "",
  });
  // section 5
  const [sectionFiveTitle, setSectionFiveTitle] = useState({ es: "", en: "" });
  const [sectionFiveImage, setSectionFiveImage] = useState(
    "/images/diseno_web_01.jpg"
  );
  const [sectionFiveParagraphOne, setSectionFiveParagraphOne] = useState({
    es: "",
    en: "",
  });
  const [sectionFiveParagraphTwo, setSectionFiveParagraphTwo] = useState({
    es: "",
    en: "",
  });
  // section 6
  // col 1
  const [sectionSixColOneTitle, setSectionSixColOneTitle] = useState({
    es: "",
    en: "",
  });
  const [sectionSixColOneParagraph, setSectionSixColOneParagraph] = useState({
    es: "",
    en: "",
  });
  const [sectionSixColOneImage, setSectionSixColOneImage] = useState(
    "/images/diseno_web_01.jpg"
  );
  // col 2
  const [sectionSixColTwoTitle, setSectionSixColTwoTitle] = useState({
    es: "",
    en: "",
  });
  const [sectionSixColTwoParagraph, setSectionSixColTwoParagraph] = useState({
    es: "",
    en: "",
  });
  const [sectionSixColTwoImage, setSectionSixColTwoImage] = useState(
    "/images/diseno_web_01.jpg"
  );
  // footer
  const [sectionSixColOneParagraphFooter, setSectionSixColOneParagraphFooter] =
    useState({ es: "", en: "" });
  // section 7
  const [sectionSevenTitle, setSectionSevenTitle] = useState({
    es: "",
    en: "",
  });
  const [sectionSevenImage, setSectionSevenImage] = useState(
    "/images/diseno_web_01.jpg"
  );
  const [sectionSevenParagraph, setSectionSevenParagraph] = useState({
    es: "",
    en: "",
  });

  const [createdAt, setCreatedAt] = useState(
    cstDateTimeClient().toLocaleString()
  );
  const [validationError, setValidationError] = useState(null);

  // function to adjust textarea height
  const adjustTextareaHeight = (e) => {
    e.target.style.height = "auto";
    e.target.style.height = `${e.target.scrollHeight}px`;
  };

  useEffect(() => {
    // Adjust textarea height on component mount
    document.querySelectorAll("textarea").forEach((textarea) => {
      adjustTextareaHeight({ target: textarea });
    });
  }, []);

  // functions for file upload
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
          // Upload the file to the server.
          uploadFile(file, url, section);
        });
      }
    }
  };

  // generate a pre-signed URL for use in uploading that file:
  async function retrieveNewURL(file, cb) {
    const endpoint = `${process.env.NEXT_PUBLIC_NEXTAUTH_URL}/api/minio`;
    fetch(endpoint, {
      method: "PUT",
      headers: {
        Name: file.name,
        Folder: "/posts/",
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

  // to upload this file to S3 at `https://minio.salvawebpro.com:9000` using the URL:
  async function uploadFile(file, url, section) {
    fetch(url, {
      method: "PUT",
      body: file,
    })
      .then(() => {
        const newUrl = url.split("?");
        if (section === "selector") {
          setMainImage(newUrl[0]);
        }
        if (section === "sectionThreeSelector") {
          setSectionThreeImage(newUrl[0]);
        }
        if (section === "sectionFourSelector") {
          setSectionFourImage(newUrl[0]);
        }
        if (section === "sectionFiveSelector") {
          setSectionFiveImage(newUrl[0]);
        }
        if (section === "sectionSixSelectorOne") {
          setSectionSixColOneImage(newUrl[0]);
        }
        if (section === "sectionSixSelectorTwo") {
          setSectionSixColTwoImage(newUrl[0]);
        }
        if (section === "sectionSevenSelector") {
          setSectionSevenImage(newUrl[0]);
        }
      })
      .catch((e) => {
        console.error(e);
      });
  }

  // send form
  async function action() {
    if (mainImage === "/images/diseno_web_01.jpg") {
      const noFileError = {
        mainImage: { _errors: ["Se requiere una imagen Principal"] },
      };
      setValidationError(noFileError);
      return;
    }
    if (!mainTitle.es || !mainTitle.en) {
      const noTitleError = {
        mainTitle: {
          _errors: ["Se requiere un titulo para el Blog en ambos idiomas"],
        },
      };
      setValidationError(noTitleError);
      return;
    }
    if (!category.es) {
      const noCategory = {
        category: {
          _errors: ["Se requiere una categoría en Español"],
        },
      };
      setValidationError(noCategory);
      return;
    }

    const formData = new FormData();
    formData.append("category", JSON.stringify(category));
    formData.append("keywords", JSON.stringify(keywords));
    formData.append("metaDescription", metaDescription);
    formData.append("mainTitle", JSON.stringify(mainTitle));
    formData.append("mainImage", mainImage);
    formData.append("sectionTwoTitle", JSON.stringify(sectionTwoTitle));
    formData.append(
      "sectionTwoParagraphOne",
      JSON.stringify(sectionTwoParagraphOne)
    );
    formData.append(
      "sectionTwoParagraphTwo",
      JSON.stringify(sectionTwoParagraphTwo)
    );
    formData.append("sectionThreeTitle", JSON.stringify(sectionThreeTitle));
    formData.append(
      "sectionThreeParagraphOne",
      JSON.stringify(sectionThreeParagraphOne)
    );
    formData.append("sectionThreeImage", sectionThreeImage);
    formData.append(
      "sectionThreeParagraphFooter",
      JSON.stringify(sectionThreeParagraphFooter)
    );

    formData.append("sectionFourTitle", JSON.stringify(sectionFourTitle));
    formData.append(
      "sectionFourParagraphOne",
      JSON.stringify(sectionFourParagraphOne)
    );
    formData.append("sectionFourImage", sectionFourImage);
    formData.append(
      "sectionFourParagraphFooter",
      JSON.stringify(sectionFourParagraphFooter)
    );

    formData.append("sectionFiveTitle", JSON.stringify(sectionFiveTitle));
    formData.append("sectionFiveImage", sectionFiveImage);
    formData.append(
      "sectionFiveParagraphOne",
      JSON.stringify(sectionFiveParagraphOne)
    );
    formData.append(
      "sectionFiveParagraphTwo",
      JSON.stringify(sectionFiveParagraphTwo)
    );
    formData.append(
      "sectionSixColOneTitle",
      JSON.stringify(sectionSixColOneTitle)
    );
    formData.append(
      "sectionSixColOneParagraph",
      JSON.stringify(sectionSixColOneParagraph)
    );

    formData.append("sectionSixColOneImage", sectionSixColOneImage);
    formData.append(
      "sectionSixColTwoTitle",
      JSON.stringify(sectionSixColTwoTitle)
    );
    formData.append(
      "sectionSixColTwoParagraph",
      JSON.stringify(sectionSixColTwoParagraph)
    );

    formData.append("sectionSixColTwoImage", sectionSixColTwoImage);
    formData.append(
      "sectionSixColOneParagraphFooter",
      JSON.stringify(sectionSixColOneParagraphFooter)
    );

    formData.append("sectionSevenTitle", JSON.stringify(sectionSevenTitle));
    formData.append("sectionSevenImage", sectionSevenImage);
    formData.append(
      "sectionSevenParagraph",
      JSON.stringify(sectionSevenParagraph)
    );
    formData.append("createdAt", createdAt);

    const result = await addNewPost(formData);
    if (result?.error) {
      console.log(result?.error);
      setValidationError(result.error);
    } else {
      setValidationError(null);
      formRef.current.reset();
      router.push("/admin/blog");
    }
  }

  const handleCategoryChange = async (e) => {
    const categoryObject = keywordSelection.find(
      (keyword) => keyword.es === e || keyword.en === e
    );
    if (categoryObject) {
      setCategory({ es: categoryObject.es, en: categoryObject.en });
    }
  };

  const handleAddKeywordField = (newSelectedKeywords) => {
    setKeywords(newSelectedKeywords);
  };

  // Debounce function
  const debounce = (func, delay) => {
    let timer;
    return (...args) => {
      clearTimeout(timer);
      timer = setTimeout(() => func(...args), delay);
    };
  };

  // Auto-translate function using the API route with debounce
  const handleAutoTranslate = useCallback(
    debounce(async (text, targetLang, fieldSetter, fieldName) => {
      try {
        const response = await fetch("/api/translate", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ text, targetLang }),
        });

        if (response.ok) {
          const data = await response.json();
          fieldSetter((prev) => ({ ...prev, [fieldName]: data.translation }));
        } else {
          console.error("Translation API error");
        }
      } catch (error) {
        console.error("Error translating text:", error);
      }
    }, 3000),
    []
  );

  return (
    <div className="class-edit-blog flex h-full flex-col items-center px-10">
      <div>
        <LocaleToggle />
      </div>
      <form action={action} ref={formRef} className="relative w-full h-full">
        <div className="mx-auto w-full flex flex-row items-center justify-between mt-10 mb-5">
          <p className="flex flex-col w-full leading-loose">
            <input
              name="mainTitle[es]"
              value={mainTitle.es}
              onChange={async (e) => {
                setMainTitle((prev) => ({ ...prev, es: e.target.value }));
                handleAutoTranslate(e.target.value, "en", setMainTitle, "en");
              }}
              placeholder="NUEVO BLOG (ES)"
              className="font-bold font-primary text-3xl w-full bg-transparent"
            />
            <input
              name="mainTitle[en]"
              value={mainTitle.en}
              onChange={async (e) => {
                setMainTitle((prev) => ({ ...prev, en: e.target.value }));
                handleAutoTranslate(e.target.value, "es", setMainTitle, "es");
              }}
              placeholder="NEW BLOG (EN)"
              className="font-bold font-primary text-3xl w-full bg-transparent mt-2"
            />
            {validationError?.mainTitle && (
              <p className="text-sm text-red-400">
                {validationError.mainTitle._errors.join(", ")}
              </p>
            )}
            {validationError?.title && (
              <p className="text-base text-red-400">
                {validationError.title._errors.join(", ")}
              </p>
            )}
          </p>
          <div className="flex items-center justify-end gap-4 ml-auto w-full">
            <button
              type="submit"
              className="bg-secondary rounded-full text-white px-6 py-2"
            >
              Publicar
            </button>
          </div>
        </div>
        <div className="flex items-center justify-start gap-3 mb-5">
          <div className="relative w-96">
            {/* Category select */}
            <select
              className={`block appearance-none border dark:bg-dark border-gray-300 cursor-pointer rounded-md py-2 px-3 focus:outline-none focus:border-gray-400 w-full mt-2`}
              name={`category[${lang}]`}
              onChange={(e) => handleCategoryChange(e.target.value)}
            >
              {keywordSelection.map((cat) => (
                <option
                  className="bg-transparent"
                  key={cat[`${lang}`]}
                  value={cat[`${lang}`]}
                >
                  {cat[`${lang}`]}
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
          <div className="relative w-96 h-full">
            <MultiselectKeywords
              handleAddKeywordField={handleAddKeywordField}
            />
            {validationError?.keywords && (
              <p className="text-sm text-red-400">
                {validationError.keywords._errors.join(", ")}
              </p>
            )}
          </div>
        </div>
        <div className="w-full h-full">
          <textarea
            rows={2}
            name="metaDescription"
            value={metaDescription}
            onInput={adjustTextareaHeight}
            onChange={(e) => setMetaDescription(e.target.value)}
            placeholder="Metadata Description Lorem, ipsum dolor sit amet consectetur adipisicing elit. Eveniet atque ad totam ex velit, mollitia delectus expedita nisi magni, aliquam exercitationem assumenda est molestiae numquam?"
            className="font-secondary text-base flex flex-row items-center gap-1 w-full mb-5 appearance-none bg-transparent"
          />
        </div>
        <section>
          <div className="mx-auto w-full">
            {/* Section 1 - Title, Image */}
            <div className="relative aspect-video hover:opacity-80 bg-white border-4 border-gray-300">
              <label htmlFor="selector" className="cursor-pointer">
                <Image
                  id="blogImage"
                  alt="blogBanner"
                  src={mainImage}
                  width={1280}
                  height={1280}
                  className="w-full h-full object-cover z-20"
                />
                <input
                  id="selector"
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
            <div id="textEditor">
              <div className="flex flex-col maxsm:flex-col items-center gap-x-2 mt-5">
                {/* Section 2 - Title, 2 Paragraphs */}
                <div className="my-5 w-full">
                  <div className="mb-4 w-full">
                    <input
                      name="sectionTwoTitle[es]"
                      value={sectionTwoTitle.es}
                      onChange={async (e) => {
                        setSectionTwoTitle((prev) => ({
                          ...prev,
                          es: e.target.value,
                        }));
                        handleAutoTranslate(
                          e.target.value,
                          "en",
                          setSectionTwoTitle,
                          "en"
                        );
                      }}
                      placeholder="Add your Title here (ES)"
                      className="font-medium font-primary text-3xl flex flex-row items-center gap-1 w-full appearance-none bg-transparent"
                    />
                    <input
                      name="sectionTwoTitle[en]"
                      value={sectionTwoTitle.en}
                      onChange={async (e) => {
                        setSectionTwoTitle((prev) => ({
                          ...prev,
                          en: e.target.value,
                        }));
                        handleAutoTranslate(
                          e.target.value,
                          "es",
                          setSectionTwoTitle,
                          "es"
                        );
                      }}
                      placeholder="Add your Title here (EN)"
                      className="font-medium font-primary text-3xl flex flex-row items-center gap-1 w-full appearance-none bg-transparent mt-2"
                    />
                  </div>
                  <textarea
                    rows={4}
                    name="sectionTwoParagraphOne[es]"
                    value={sectionTwoParagraphOne.es}
                    onInput={adjustTextareaHeight}
                    onChange={async (e) => {
                      setSectionTwoParagraphOne((prev) => ({
                        ...prev,
                        es: e.target.value,
                      }));
                      handleAutoTranslate(
                        e.target.value,
                        "en",
                        setSectionTwoParagraphOne,
                        "en"
                      );
                    }}
                    placeholder="Parrafo uno (ES)"
                    className="font-secondary text-base flex flex-row items-center gap-1 w-full mb-5 appearance-none bg-transparent"
                  />
                  <textarea
                    rows={4}
                    name="sectionTwoParagraphOne[en]"
                    value={sectionTwoParagraphOne.en}
                    onInput={adjustTextareaHeight}
                    onChange={async (e) => {
                      setSectionTwoParagraphOne((prev) => ({
                        ...prev,
                        en: e.target.value,
                      }));
                      handleAutoTranslate(
                        e.target.value,
                        "es",
                        setSectionTwoParagraphOne,
                        "es"
                      );
                    }}
                    placeholder="Paragraph One (EN)"
                    className="font-secondary text-base flex flex-row items-center gap-1 w-full mb-5 appearance-none bg-transparent mt-2"
                  />
                  <textarea
                    rows={4}
                    name="sectionTwoParagraphTwo[es]"
                    value={sectionTwoParagraphTwo.es}
                    onInput={adjustTextareaHeight}
                    onChange={async (e) => {
                      setSectionTwoParagraphTwo((prev) => ({
                        ...prev,
                        es: e.target.value,
                      }));
                      handleAutoTranslate(
                        e.target.value,
                        "en",
                        setSectionTwoParagraphTwo,
                        "en"
                      );
                    }}
                    placeholder="Parrafo dos (ES)"
                    className="font-secondary text-base flex flex-row items-center gap-1 w-full appearance-none bg-transparent"
                  />
                  <textarea
                    rows={4}
                    name="sectionTwoParagraphTwo[en]"
                    value={sectionTwoParagraphTwo.en}
                    onInput={adjustTextareaHeight}
                    onChange={async (e) => {
                      setSectionTwoParagraphTwo((prev) => ({
                        ...prev,
                        en: e.target.value,
                      }));
                      handleAutoTranslate(
                        e.target.value,
                        "es",
                        setSectionTwoParagraphTwo,
                        "es"
                      );
                    }}
                    placeholder="Paragraph Two (EN)"
                    className="font-secondary text-base flex flex-row items-center gap-1 w-full appearance-none bg-transparent mt-2"
                  />
                </div>
                {/* Section 3 - Image | Title, Description / 1 Paragraph */}
                <div className="w-full">
                  <div className="my-5 w-full flex flex-row items-center gap-5">
                    <div className="w-full h-80 relative my-2">
                      <label
                        htmlFor="sectionThreeSelector"
                        className="cursor-pointer"
                      >
                        <Image
                          className="rounded-md object-cover"
                          src={sectionThreeImage}
                          fill={true}
                          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                          id="sectionThreeImage"
                          alt="section Two Image"
                        />
                        <input
                          id="sectionThreeSelector"
                          type="file"
                          accept=".png, .jpg, .jpeg, .webp"
                          hidden
                          onChange={upload}
                        />
                      </label>
                    </div>
                    <div className="w-full">
                      <input
                        name="sectionThreeTitle[es]"
                        value={sectionThreeTitle.es}
                        onChange={async (e) => {
                          setSectionThreeTitle((prev) => ({
                            ...prev,
                            es: e.target.value,
                          }));
                          handleAutoTranslate(
                            e.target.value,
                            "en",
                            setSectionThreeTitle,
                            "en"
                          );
                        }}
                        placeholder="Add your Title here (ES)"
                        className="font-medium font-primary text-3xl flex flex-row items-center gap-1 w-full appearance-none bg-transparent mb-2"
                      />
                      <input
                        name="sectionThreeTitle[en]"
                        value={sectionThreeTitle.en}
                        onChange={async (e) => {
                          setSectionThreeTitle((prev) => ({
                            ...prev,
                            en: e.target.value,
                          }));
                          handleAutoTranslate(
                            e.target.value,
                            "es",
                            setSectionThreeTitle,
                            "es"
                          );
                        }}
                        placeholder="Add your Title here (EN)"
                        className="font-medium font-primary text-3xl flex flex-row items-center gap-1 w-full appearance-none bg-transparent mb-2 mt-2"
                      />
                      <textarea
                        rows={8}
                        name="sectionThreeParagraphOne[es]"
                        value={sectionThreeParagraphOne.es}
                        onInput={adjustTextareaHeight}
                        onChange={async (e) => {
                          setSectionThreeParagraphOne((prev) => ({
                            ...prev,
                            es: e.target.value,
                          }));
                          handleAutoTranslate(
                            e.target.value,
                            "en",
                            setSectionThreeParagraphOne,
                            "en"
                          );
                        }}
                        placeholder="Parrafo uno (ES)"
                        className="font-secondary text-base flex flex-row items-center gap-1 w-full appearance-none bg-transparent"
                      />
                      <textarea
                        rows={8}
                        name="sectionThreeParagraphOne[en]"
                        value={sectionThreeParagraphOne.en}
                        onInput={adjustTextareaHeight}
                        onChange={async (e) => {
                          setSectionThreeParagraphOne((prev) => ({
                            ...prev,
                            en: e.target.value,
                          }));
                          handleAutoTranslate(
                            e.target.value,
                            "es",
                            setSectionThreeParagraphOne,
                            "es"
                          );
                        }}
                        placeholder="Paragraph One (EN)"
                        className="font-secondary text-base flex flex-row items-center gap-1 w-full appearance-none bg-transparent mt-2"
                      />
                    </div>
                  </div>
                  <div className="mb-5 w-full">
                    <textarea
                      rows={4}
                      name="sectionThreeParagraphFooter[es]"
                      value={sectionThreeParagraphFooter.es}
                      onInput={adjustTextareaHeight}
                      onChange={async (e) => {
                        setSectionThreeParagraphFooter((prev) => ({
                          ...prev,
                          es: e.target.value,
                        }));
                        handleAutoTranslate(
                          e.target.value,
                          "en",
                          setSectionThreeParagraphFooter,
                          "en"
                        );
                      }}
                      placeholder="Pie de parrafo (ES)"
                      className="font-secondary text-base flex flex-row items-center gap-1 w-full appearance-none bg-transparent"
                    />
                    <textarea
                      rows={4}
                      name="sectionThreeParagraphFooter[en]"
                      value={sectionThreeParagraphFooter.en}
                      onInput={adjustTextareaHeight}
                      onChange={async (e) => {
                        setSectionThreeParagraphFooter((prev) => ({
                          ...prev,
                          en: e.target.value,
                        }));
                        handleAutoTranslate(
                          e.target.value,
                          "es",
                          setSectionThreeParagraphFooter,
                          "es"
                        );
                      }}
                      placeholder="Paragraph Footer (EN)"
                      className="font-secondary text-base flex flex-row items-center gap-1 w-full appearance-none bg-transparent mt-2"
                    />
                  </div>
                </div>
                {/* Section 4 - Title, 3 options, paragraph | Image / 1 Paragraph */}
                <div className="w-full">
                  <div className="w-full flex flex-row items-center gap-5">
                    <div className="w-full">
                      <input
                        name="sectionFourTitle[es]"
                        value={sectionFourTitle.es}
                        onChange={async (e) => {
                          setSectionFourTitle((prev) => ({
                            ...prev,
                            es: e.target.value,
                          }));
                          handleAutoTranslate(
                            e.target.value,
                            "en",
                            setSectionFourTitle,
                            "en"
                          );
                        }}
                        placeholder="Add your Title here (ES)"
                        className="font-medium font-primary text-3xl flex flex-row items-center gap-1 w-full appearance-none bg-transparent mb-2"
                      />
                      <input
                        name="sectionFourTitle[en]"
                        value={sectionFourTitle.en}
                        onChange={async (e) => {
                          setSectionFourTitle((prev) => ({
                            ...prev,
                            en: e.target.value,
                          }));
                          handleAutoTranslate(
                            e.target.value,
                            "es",
                            setSectionFourTitle,
                            "es"
                          );
                        }}
                        placeholder="Add your Title here (EN)"
                        className="font-medium font-primary text-3xl flex flex-row items-center gap-1 w-full appearance-none bg-transparent mb-2 mt-2"
                      />
                      <textarea
                        rows={3}
                        name="sectionFourParagraphOne[es]"
                        value={sectionFourParagraphOne.es}
                        onInput={adjustTextareaHeight}
                        onChange={async (e) => {
                          setSectionFourParagraphOne((prev) => ({
                            ...prev,
                            es: e.target.value,
                          }));
                          handleAutoTranslate(
                            e.target.value,
                            "en",
                            setSectionFourParagraphOne,
                            "en"
                          );
                        }}
                        placeholder="Parrafo uno (ES)"
                        className="font-secondary text-base flex flex-row items-center gap-1 w-full mb-5 appearance-none bg-transparent"
                      />
                      <textarea
                        rows={3}
                        name="sectionFourParagraphOne[en]"
                        value={sectionFourParagraphOne.en}
                        onInput={adjustTextareaHeight}
                        onChange={async (e) => {
                          setSectionFourParagraphOne((prev) => ({
                            ...prev,
                            en: e.target.value,
                          }));
                          handleAutoTranslate(
                            e.target.value,
                            "es",
                            setSectionFourParagraphOne,
                            "es"
                          );
                        }}
                        placeholder="Paragraph One (EN)"
                        className="font-secondary text-base flex flex-row items-center gap-1 w-full mb-5 appearance-none bg-transparent mt-2"
                      />
                    </div>
                    <div className="w-full h-80 relative my-2">
                      <label
                        htmlFor="sectionFourSelector"
                        className="cursor-pointer"
                      >
                        <Image
                          id="sectionFourImage"
                          className="rounded-md object-cover"
                          src={sectionFourImage}
                          fill={true}
                          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                          alt="imagen de producto"
                        />
                        <input
                          id="sectionFourSelector"
                          type="file"
                          accept=".png, .jpg, .jpeg, .webp"
                          hidden
                          onChange={upload}
                        />
                      </label>
                    </div>
                  </div>
                  <div className="mb-5 w-full">
                    <textarea
                      rows={4}
                      name="sectionFourParagraphFooter[es]"
                      value={sectionFourParagraphFooter.es}
                      onInput={adjustTextareaHeight}
                      onChange={async (e) => {
                        setSectionFourParagraphFooter((prev) => ({
                          ...prev,
                          es: e.target.value,
                        }));
                        handleAutoTranslate(
                          e.target.value,
                          "en",
                          setSectionFourParagraphFooter,
                          "en"
                        );
                      }}
                      placeholder="Pie de parrafo (ES)"
                      className="font-secondary text-base flex flex-row items-center gap-1 w-full appearance-none bg-transparent"
                    />
                    <textarea
                      rows={4}
                      name="sectionFourParagraphFooter[en]"
                      value={sectionFourParagraphFooter.en}
                      onInput={adjustTextareaHeight}
                      onChange={async (e) => {
                        setSectionFourParagraphFooter((prev) => ({
                          ...prev,
                          en: e.target.value,
                        }));
                        handleAutoTranslate(
                          e.target.value,
                          "es",
                          setSectionFourParagraphFooter,
                          "es"
                        );
                      }}
                      placeholder="Paragraph Footer (EN)"
                      className="font-secondary text-base flex flex-row items-center gap-1 w-full appearance-none bg-transparent mt-2"
                    />
                  </div>
                </div>
                {/* Section 5 - Title, Image, 2 Paragraph */}
                <div className="w-full">
                  <div className="mb-4 w-full">
                    <input
                      name="sectionFiveTitle[es]"
                      value={sectionFiveTitle.es}
                      onChange={async (e) => {
                        setSectionFiveTitle((prev) => ({
                          ...prev,
                          es: e.target.value,
                        }));
                        handleAutoTranslate(
                          e.target.value,
                          "en",
                          setSectionFiveTitle,
                          "en"
                        );
                      }}
                      placeholder="Add your Title here (ES)"
                      className="font-medium font-primary text-3xl flex flex-row items-center gap-1 w-full appearance-none bg-transparent mb-2"
                    />
                    <input
                      name="sectionFiveTitle[en]"
                      value={sectionFiveTitle.en}
                      onChange={async (e) => {
                        setSectionFiveTitle((prev) => ({
                          ...prev,
                          en: e.target.value,
                        }));
                        handleAutoTranslate(
                          e.target.value,
                          "es",
                          setSectionFiveTitle,
                          "es"
                        );
                      }}
                      placeholder="Add your Title here (EN)"
                      className="font-medium font-primary text-3xl flex flex-row items-center gap-1 w-full appearance-none bg-transparent mb-2 mt-2"
                    />
                    <div className="items-center justify-center">
                      <div className="w-full h-80 relative my-2">
                        <label
                          htmlFor="sectionFiveSelector"
                          className="cursor-pointer"
                        >
                          <Image
                            id="sectionFiveImage"
                            className="rounded-md object-cover"
                            src={sectionFiveImage}
                            fill={true}
                            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                            alt="imagen de blog"
                          />
                          <input
                            id="sectionFiveSelector"
                            type="file"
                            accept=".png, .jpg, .jpeg, .webp"
                            hidden
                            onChange={upload}
                          />
                        </label>
                      </div>
                    </div>
                  </div>
                  <textarea
                    rows={4}
                    name="sectionFiveParagraphOne[es]"
                    value={sectionFiveParagraphOne.es}
                    onInput={adjustTextareaHeight}
                    onChange={async (e) => {
                      setSectionFiveParagraphOne((prev) => ({
                        ...prev,
                        es: e.target.value,
                      }));
                      handleAutoTranslate(
                        e.target.value,
                        "en",
                        setSectionFiveParagraphOne,
                        "en"
                      );
                    }}
                    placeholder="Parrafo uno (ES)"
                    className="font-secondary text-base flex flex-row items-center gap-1 w-full mb-5 appearance-none bg-transparent"
                  />
                  <textarea
                    rows={4}
                    name="sectionFiveParagraphOne[en]"
                    value={sectionFiveParagraphOne.en}
                    onInput={adjustTextareaHeight}
                    onChange={async (e) => {
                      setSectionFiveParagraphOne((prev) => ({
                        ...prev,
                        en: e.target.value,
                      }));
                      handleAutoTranslate(
                        e.target.value,
                        "es",
                        setSectionFiveParagraphOne,
                        "es"
                      );
                    }}
                    placeholder="Paragraph One (EN)"
                    className="font-secondary text-base flex flex-row items-center gap-1 w-full mb-5 appearance-none bg-transparent mt-2"
                  />
                  <textarea
                    rows={4}
                    name="sectionFiveParagraphTwo[es]"
                    value={sectionFiveParagraphTwo.es}
                    onInput={adjustTextareaHeight}
                    onChange={async (e) => {
                      setSectionFiveParagraphTwo((prev) => ({
                        ...prev,
                        es: e.target.value,
                      }));
                      handleAutoTranslate(
                        e.target.value,
                        "en",
                        setSectionFiveParagraphTwo,
                        "en"
                      );
                    }}
                    placeholder="Parrafo dos (ES)"
                    className="font-secondary text-base flex flex-row items-center gap-1 w-full mb-5 appearance-none bg-transparent"
                  />
                  <textarea
                    rows={4}
                    name="sectionFiveParagraphTwo[en]"
                    value={sectionFiveParagraphTwo.en}
                    onInput={adjustTextareaHeight}
                    onChange={async (e) => {
                      setSectionFiveParagraphTwo((prev) => ({
                        ...prev,
                        en: e.target.value,
                      }));
                      handleAutoTranslate(
                        e.target.value,
                        "es",
                        setSectionFiveParagraphTwo,
                        "es"
                      );
                    }}
                    placeholder="Paragraph Two (EN)"
                    className="font-secondary text-base flex flex-row items-center gap-1 w-full mb-5 appearance-none bg-transparent mt-2"
                  />
                </div>
                {/* Section 6 - 3 Columns with title, image, paragraph / 1 Paragraph */}
                <div className="w-full">
                  <div className="w-full flex flex-row maxsm:flex-col items-center gap-7">
                    {/* Col 1 */}
                    <div className="flex flex-col gap-3 items-center justify-center w-full my-2">
                      <input
                        name="sectionSixColOneTitle[es]"
                        value={sectionSixColOneTitle.es}
                        onChange={async (e) => {
                          setSectionSixColOneTitle((prev) => ({
                            ...prev,
                            es: e.target.value,
                          }));
                          handleAutoTranslate(
                            e.target.value,
                            "en",
                            setSectionSixColOneTitle,
                            "en"
                          );
                        }}
                        placeholder="Add your Title here (ES)"
                        className="font-medium font-primary text-xl flex flex-row items-center gap-1 w-full appearance-none bg-transparent mb-2"
                      />
                      <input
                        name="sectionSixColOneTitle[en]"
                        value={sectionSixColOneTitle.en}
                        onChange={async (e) => {
                          setSectionSixColOneTitle((prev) => ({
                            ...prev,
                            en: e.target.value,
                          }));
                          handleAutoTranslate(
                            e.target.value,
                            "es",
                            setSectionSixColOneTitle,
                            "es"
                          );
                        }}
                        placeholder="Add your Title here (EN)"
                        className="font-medium font-primary text-xl flex flex-row items-center gap-1 w-full appearance-none bg-transparent mb-2 mt-2"
                      />
                      <label
                        htmlFor="sectionSixSelectorOne"
                        className="cursor-pointer"
                      >
                        <Image
                          id="sectionSixColOneImage"
                          className="rounded-md object-cover h-40"
                          src={sectionSixColOneImage}
                          width={500}
                          height={500}
                          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                          alt="imagen de producto"
                        />
                        <input
                          id="sectionSixSelectorOne"
                          type="file"
                          accept=".png, .jpg, .jpeg, .webp"
                          hidden
                          onChange={upload}
                        />
                      </label>
                      <textarea
                        rows={5}
                        name="sectionSixColOneParagraph[es]"
                        value={sectionSixColOneParagraph.es}
                        onInput={adjustTextareaHeight}
                        onChange={async (e) => {
                          setSectionSixColOneParagraph((prev) => ({
                            ...prev,
                            es: e.target.value,
                          }));
                          handleAutoTranslate(
                            e.target.value,
                            "en",
                            setSectionSixColOneParagraph,
                            "en"
                          );
                        }}
                        placeholder="Parrafo uno (ES)"
                        className="font-secondary text-base flex flex-row items-center gap-1 w-full mb-5 appearance-none bg-transparent"
                      />
                      <textarea
                        rows={5}
                        name="sectionSixColOneParagraph[en]"
                        value={sectionSixColOneParagraph.en}
                        onInput={adjustTextareaHeight}
                        onChange={async (e) => {
                          setSectionSixColOneParagraph((prev) => ({
                            ...prev,
                            en: e.target.value,
                          }));
                          handleAutoTranslate(
                            e.target.value,
                            "es",
                            setSectionSixColOneParagraph,
                            "es"
                          );
                        }}
                        placeholder="Paragraph One (EN)"
                        className="font-secondary text-base flex flex-row items-center gap-1 w-full mb-5 appearance-none bg-transparent mt-2"
                      />
                    </div>
                    {/* Col 2 */}
                    <div className="flex flex-col gap-3 items-center justify-center w-full my-2">
                      <input
                        name="sectionSixColTwoTitle[es]"
                        value={sectionSixColTwoTitle.es}
                        onChange={async (e) => {
                          setSectionSixColTwoTitle((prev) => ({
                            ...prev,
                            es: e.target.value,
                          }));
                          handleAutoTranslate(
                            e.target.value,
                            "en",
                            setSectionSixColTwoTitle,
                            "en"
                          );
                        }}
                        placeholder="Add your Title here (ES)"
                        className="font-medium font-primary text-xl flex flex-row items-center gap-1 w-full appearance-none bg-transparent mb-2"
                      />
                      <input
                        name="sectionSixColTwoTitle[en]"
                        value={sectionSixColTwoTitle.en}
                        onChange={async (e) => {
                          setSectionSixColTwoTitle((prev) => ({
                            ...prev,
                            en: e.target.value,
                          }));
                          handleAutoTranslate(
                            e.target.value,
                            "es",
                            setSectionSixColTwoTitle,
                            "es"
                          );
                        }}
                        placeholder="Add your Title here (EN)"
                        className="font-medium font-primary text-xl flex flex-row items-center gap-1 w-full appearance-none bg-transparent mb-2 mt-2"
                      />
                      <label
                        htmlFor="sectionSixSelectorTwo"
                        className="cursor-pointer"
                      >
                        <Image
                          id="sectionSixColTwoImage"
                          className="rounded-md object-cover h-40"
                          src={sectionSixColTwoImage}
                          width={500}
                          height={500}
                          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                          alt="imagen de blog"
                        />
                        <input
                          id="sectionSixSelectorTwo"
                          type="file"
                          accept=".png, .jpg, .jpeg, .webp"
                          hidden
                          onChange={upload}
                        />
                      </label>
                      <textarea
                        rows={5}
                        name="sectionSixColTwoParagraph[es]"
                        value={sectionSixColTwoParagraph.es}
                        onInput={adjustTextareaHeight}
                        onChange={async (e) => {
                          setSectionSixColTwoParagraph((prev) => ({
                            ...prev,
                            es: e.target.value,
                          }));
                          handleAutoTranslate(
                            e.target.value,
                            "en",
                            setSectionSixColTwoParagraph,
                            "en"
                          );
                        }}
                        placeholder="Parrafo uno (ES)"
                        className="font-secondary text-base flex flex-row items-center gap-1 w-full mb-5 appearance-none bg-transparent"
                      />
                      <textarea
                        rows={5}
                        name="sectionSixColTwoParagraph[en]"
                        value={sectionSixColTwoParagraph.en}
                        onInput={adjustTextareaHeight}
                        onChange={async (e) => {
                          setSectionSixColTwoParagraph((prev) => ({
                            ...prev,
                            en: e.target.value,
                          }));
                          handleAutoTranslate(
                            e.target.value,
                            "es",
                            setSectionSixColTwoParagraph,
                            "es"
                          );
                        }}
                        placeholder="Paragraph One (EN)"
                        className="font-secondary text-base flex flex-row items-center gap-1 w-full mb-5 appearance-none bg-transparent mt-2"
                      />
                    </div>
                  </div>
                  <div className="mb-5 w-full">
                    <textarea
                      rows={4}
                      name="sectionSixColOneParagraphFooter[es]"
                      value={sectionSixColOneParagraphFooter.es}
                      onInput={adjustTextareaHeight}
                      onChange={async (e) => {
                        setSectionSixColOneParagraphFooter((prev) => ({
                          ...prev,
                          es: e.target.value,
                        }));
                        handleAutoTranslate(
                          e.target.value,
                          "en",
                          setSectionSixColOneParagraphFooter,
                          "en"
                        );
                      }}
                      placeholder="Pie de parrafo (ES)"
                      className="font-secondary text-base flex flex-row items-center gap-1 w-full appearance-none bg-transparent"
                    />
                    <textarea
                      rows={4}
                      name="sectionSixColOneParagraphFooter[en]"
                      value={sectionSixColOneParagraphFooter.en}
                      onInput={adjustTextareaHeight}
                      onChange={async (e) => {
                        setSectionSixColOneParagraphFooter((prev) => ({
                          ...prev,
                          en: e.target.value,
                        }));
                        handleAutoTranslate(
                          e.target.value,
                          "es",
                          setSectionSixColOneParagraphFooter,
                          "es"
                        );
                      }}
                      placeholder="Paragraph Footer (EN)"
                      className="font-secondary text-base flex flex-row items-center gap-1 w-full appearance-none bg-transparent mt-2"
                    />
                  </div>
                </div>
                {/* Section 7 - Overlay image title, 1 Paragraph */}
                <div className="w-full">
                  <div className="w-full h-80 relative my-2">
                    <input
                      name="sectionSevenTitle[es]"
                      value={sectionSevenTitle.es}
                      onChange={async (e) => {
                        setSectionSevenTitle((prev) => ({
                          ...prev,
                          es: e.target.value,
                        }));
                        handleAutoTranslate(
                          e.target.value,
                          "en",
                          setSectionSevenTitle,
                          "en"
                        );
                      }}
                      placeholder="Add your Title here (ES)"
                      className="font-bold font-primary text-6xl flex flex-row items-center gap-1 w-full mb-3 absolute z-20 top-[40%] left-0 text-white text-center bg-transparent"
                    />
                    <input
                      name="sectionSevenTitle[en]"
                      value={sectionSevenTitle.en}
                      onChange={async (e) => {
                        setSectionSevenTitle((prev) => ({
                          ...prev,
                          en: e.target.value,
                        }));
                        handleAutoTranslate(
                          e.target.value,
                          "es",
                          setSectionSevenTitle,
                          "es"
                        );
                      }}
                      placeholder="Add your Title here (EN)"
                      className="font-bold font-primary text-6xl flex flex-row items-center gap-1 w-full mb-3 absolute z-20 top-[50%] left-0 text-white text-center bg-transparent"
                    />
                    <label
                      htmlFor="sectionSevenSelector"
                      className="cursor-pointer"
                    >
                      <Image
                        id="sectionSevenImage"
                        className="rounded-md object-cover"
                        src={sectionSevenImage}
                        fill={true}
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        alt="imagen de producto"
                      />
                      <input
                        id="sectionSevenSelector"
                        type="file"
                        accept=".png, .jpg, .jpeg, .webp"
                        hidden
                        onChange={upload}
                      />
                    </label>
                  </div>
                  <textarea
                    rows={4}
                    name="sectionSevenParagraph[es]"
                    value={sectionSevenParagraph.es}
                    onInput={adjustTextareaHeight}
                    onChange={async (e) => {
                      setSectionSevenParagraph((prev) => ({
                        ...prev,
                        es: e.target.value,
                      }));
                      handleAutoTranslate(
                        e.target.value,
                        "en",
                        setSectionSevenParagraph,
                        "en"
                      );
                    }}
                    placeholder="Parrafo (ES)"
                    className="font-secondary text-base flex flex-row items-center gap-1 w-full mb-5 appearance-none bg-transparent"
                  />
                  <textarea
                    rows={4}
                    name="sectionSevenParagraph[en]"
                    value={sectionSevenParagraph.en}
                    onInput={adjustTextareaHeight}
                    onChange={async (e) => {
                      setSectionSevenParagraph((prev) => ({
                        ...prev,
                        en: e.target.value,
                      }));
                      handleAutoTranslate(
                        e.target.value,
                        "es",
                        setSectionSevenParagraph,
                        "es"
                      );
                    }}
                    placeholder="Paragraph (EN)"
                    className="font-secondary text-base flex flex-row items-center gap-1 w-full mb-5 appearance-none bg-transparent mt-2"
                  />
                </div>
              </div>
            </div>
          </div>
        </section>
      </form>
    </div>
  );
};

export default BlogEditorComponent;
