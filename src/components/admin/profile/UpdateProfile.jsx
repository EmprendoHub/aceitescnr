"use client";
import React, { useCallback, useContext, useEffect, useState } from "react";
import { updateAuthor } from "@/app/[lang]/_actions";
import { cstDateTimeClient } from "@/backend/helpers";
import Image from "next/image";
import { useSession } from "next-auth/react";

const UpdateProfile = ({ author }) => {
  const session = useSession();
  const user = session?.data?.user;
  const [loading, setLoading] = useState(null);

  const [authorImage, setAuthorImage] = useState(
    author?.avatar || "/images/diseno_web_01.jpg"
  );
  const [name, setName] = useState(author?.name || "");
  const [aboutAuthor, setAboutAuthor] = useState(
    author?.aboutAuthor || {
      es: "",
      en: "",
    }
  );
  const [socials, setSocials] = useState(
    author?.socials || {
      instagram: "",
      facebook: "",
      tiktok: "",
      youtube: "",
      linkedin: "",
    }
  );

  const [updatedAt, setUpdatedAt] = useState(cstDateTimeClient());
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

  const submitHandler = async (e) => {
    setLoading(true);
    e.preventDefault();

    if (name === "") {
      setValidationError("Por favor complete el nombre del autor");
      return;
    }

    if (aboutAuthor.es === "" || aboutAuthor.en === "") {
      setValidationError("Por favor complete el acerca del autor ");
      return;
    }

    const formData = new FormData();
    formData.set("name", name);
    formData.set("_id", user?._id);
    formData.set("avatarUrl", authorImage);
    formData.set("aboutAuthor", JSON.stringify(aboutAuthor));
    formData.set("socials", JSON.stringify(socials));
    // formData.set('avatar', avatar);
    formData.set("updatedAt", updatedAt);

    const result = await updateAuthor(formData);
    if (result?.error) {
      setValidationError(result.error);
      setLoading(null);
    } else {
      setValidationError(null);
      setLoading(null);
    }
  };

  // Upload Image functions
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
    const endpoint = `/api/minio`;
    fetch(endpoint, {
      method: "PUT",
      headers: {
        Name: file.name,
        Folder: "avatars/",
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
          setAuthorImage(newUrl[0]);
        }
      })
      .catch((e) => {
        console.error(e);
      });
  }

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
    <>
      <div className="mt-1 mb-20 p-4 md:p-7 mx-auto rounded dark:bg-dark w-full">
        <form onSubmit={submitHandler}>
          <h2 className="mb-5 text-2xl font-semibold font-raleway">
            Actualizar Perfil del Autor
          </h2>

          {/* Sections */}
          <div className="flex flex-col items-center gap-3">
            <div className="flex w-full items-center gap-3">
              {/* Section 1 - Title, Image */}
              <div className="relative aspect-video hover:opacity-80 bg-white border-4 border-gray-300  w-[200px] h-[200px] rounded-full">
                <label htmlFor="selector" className="cursor-pointer">
                  <Image
                    id="authorAvatar"
                    alt="authorAvatar"
                    src={authorImage}
                    width={1280}
                    height={1280}
                    className="w-full h-full object-cover z-20 rounded-full"
                  />
                  <input
                    id="selector"
                    type="file"
                    accept=".png, .jpg, .jpeg, .webp"
                    hidden
                    onChange={upload}
                  />
                  {validationError?.authorImage && (
                    <p className="text-sm text-red-400">
                      {validationError.authorImage._errors.join(", ")}
                    </p>
                  )}
                </label>
              </div>
              {/* Section 2 - Name, 2 About */}
              <div className="my-5 w-full">
                <p className="text-[12px] font-secondary">ESCRITO POR</p>
                <div className="mb-4 w-full">
                  <input
                    name="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Add your name here"
                    className="font-medium font-primary text-xl flex flex-row items-center gap-1 w-full appearance-none bg-transparent"
                  />
                </div>
                <textarea
                  rows={4}
                  name="aboutAuthor[es]"
                  value={aboutAuthor.es}
                  onInput={adjustTextareaHeight}
                  onChange={async (e) => {
                    setAboutAuthor((prev) => ({
                      ...prev,
                      es: e.target.value,
                    }));
                    handleAutoTranslate(
                      e.target.value,
                      "en",
                      setAboutAuthor,
                      "en"
                    );
                  }}
                  placeholder="Acerca del Autor"
                  className="font-secondary text-xs flex flex-row items-center gap-1 w-full mb-5 appearance-none bg-transparent"
                />
                <textarea
                  rows={4}
                  name="aboutAuthor[en]"
                  value={aboutAuthor.en}
                  onInput={adjustTextareaHeight}
                  onChange={async (e) => {
                    setAboutAuthor((prev) => ({
                      ...prev,
                      en: e.target.value,
                    }));
                    handleAutoTranslate(
                      e.target.value,
                      "es",
                      setAboutAuthor,
                      "es"
                    );
                  }}
                  placeholder="About the Author"
                  className="font-secondary text-xs flex flex-row items-center gap-1 w-full mb-5 appearance-none bg-transparent"
                />
              </div>
            </div>
            {/* section 3 social media links */}
            <div className="mb-4 w-full flex items-center gap-2 font-secondary text-xs">
              <input
                name="instagram"
                value={socials?.instagram}
                onChange={async (e) => {
                  setSocials((prev) => ({
                    ...prev,
                    instagram: e.target.value,
                  }));
                }}
                placeholder="Instagram here"
                className="  appearance-none bg-transparent"
              />
              <input
                name="facebook"
                value={socials?.facebook}
                onChange={async (e) => {
                  setSocials((prev) => ({
                    ...prev,
                    facebook: e.target.value,
                  }));
                }}
                placeholder="Add your facebook here"
                className="  appearance-none bg-transparent"
              />
              <input
                name="tiktok"
                value={socials?.tiktok}
                onChange={async (e) => {
                  setSocials((prev) => ({
                    ...prev,
                    tiktok: e.target.value,
                  }));
                }}
                placeholder="Add your tiktok here"
                className="  appearance-none bg-transparent"
              />
              <input
                name="youtube"
                value={socials?.youtube}
                onChange={async (e) => {
                  setSocials((prev) => ({
                    ...prev,
                    youtube: e.target.value,
                  }));
                }}
                placeholder="Add your youtube here"
                className="  appearance-none bg-transparent"
              />
              <input
                name="linkedin"
                value={socials?.linkedin}
                onChange={async (e) => {
                  setSocials((prev) => ({
                    ...prev,
                    linkedin: e.target.value,
                  }));
                }}
                placeholder="Add your linkedin here"
                className="  appearance-none bg-transparent"
              />
            </div>
          </div>
          <button
            type="submit"
            className="my-2 px-4 py-2 text-center w-full inline-block text-white bg-blue-600 border border-transparent rounded-md hover:bg-blue-700"
            disabled={loading ? true : false}
          >
            {loading ? "Actualizando..." : "Actualizar"}
          </button>
        </form>
      </div>
    </>
  );
};

export default UpdateProfile;
