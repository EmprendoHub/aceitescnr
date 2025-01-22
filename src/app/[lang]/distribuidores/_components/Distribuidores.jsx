"use client";

import WhiteLogoComponent from "@/components/logos/WhiteLogoComponent";
import { motion } from "framer-motion";
import { User } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useGoogleReCaptcha } from "react-google-recaptcha-v3";
import Swal from "sweetalert2";
import { isValidPhone } from "@/backend/helpers";
import { addNewDistributor } from "../_actions/_index";
import { ButtonMotion } from "@/components/button/ButtonMotion";

const Distribuidores = ({ content }) => {
  const [showModal, setShowModal] = useState(false);
  const [username, setUsername] = useState("");
  const [phone, setPhone] = useState("");
  const [honeypot, setHoneypot] = useState("");
  const [email, setEmail] = useState("");
  const router = useRouter();
  const { executeRecaptcha } = useGoogleReCaptcha();
  const toggleModal = () => {
    setShowModal((prev) => !prev);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (username === "") {
      setError("Por favor complete el nombre de usuario para registrarse.");
      return;
    }

    if (!isValidPhone(phone)) {
      setError("Utilice un teléfono válido.");
      return;
    }

    if (!executeRecaptcha) {
      console.log("Execute recaptcha not available yet");
      setNotification(
        "Execute recaptcha not available yet likely meaning key not recaptcha key not set"
      );
      return;
    }

    executeRecaptcha("enquiryFormSubmit").then(async (gReCaptchaToken) => {
      try {
        const formData = new FormData();

        formData.append("username", JSON.stringify(username));
        formData.append("phone", JSON.stringify(phone));
        formData.append("honeypot", JSON.stringify(honeypot));
        formData.append("email", JSON.stringify(email));
        formData.append("recaptcha", JSON.stringify(gReCaptchaToken));
        const res = await addNewDistributor(formData);
        if (res.status === 400) {
          Swal.fire({
            icon: "warning",
            iconColor: "#c03939",
            background: "#fff5fb",
            color: "#0D121B",
            toast: true,
            text: `Este teléfono ya esta en uso`,
            showConfirmButton: false,
            timer: 5000,
          });
          setError("Este teléfono ya esta en uso");
        }
        if (res.status === 200) {
          Swal.fire({
            icon: "success",
            iconColor: "#46862d",
            background: "#fff5fb",
            color: "#0D121B",
            toast: true,
            text: `Se registró exitosamente al usuario`,
            showConfirmButton: false,
            timer: 2000,
          });
          router.push("/");
          toggleModal();
          return;
        }
      } catch (error) {
        console.log(error);
      }
    });
  };

  const handlePhoneChange = (e) => {
    const inputPhone = e.target.value.replace(/\D/g, ""); // Remove non-numeric characters
    let formattedPhone = "";

    if (inputPhone.length <= 10) {
      formattedPhone = inputPhone.replace(
        /(\d{3})(\d{0,3})(\d{0,4})/,
        "$1$2$3"
      );
    } else {
      // If the phone number exceeds 10 digits, truncate it
      formattedPhone = inputPhone
        .slice(0, 10)
        .replace(/(\d{3})(\d{0,3})(\d{0,4})/, "$1 $2 $3");
    }

    setPhone(formattedPhone);
  };

  return (
    <div className="bg-background font-poppins">
      {/* Hero Section */}
      <section className="flex maxmd:flex-col gap-7 items-center  maxmd:items-start justify-between p-8 pt-20 bg-main-gradient text-white py-24 px-40 maxxlg:px-20 maxlg:px-5">
        <motion.div
          initial={{ x: -100, opacity: 0 }}
          whileInView={{ x: 0, opacity: 1 }}
          transition={{ type: "spring", stiffness: 100, duration: 0.5 }}
        >
          <h1 className="text-4xl maxsm:text-2xl font-bold">
            {content.hero.title}
          </h1>
          <p className="mt-4 maxsm:text-sm">{content.hero.description}</p>
          <button onClick={toggleModal}>
            <ButtonMotion
              aria-label="Contactar"
              textClass={"text-white"}
              textClassTwo={"text-white"}
              className="bg-accent dark:bg-secondary-gradient px-10 py-3 text-white flex items-center justify-center  text-xs tracking-widest mt-5"
            >
              {content.hero.cta}
            </ButtonMotion>
          </button>
        </motion.div>
        <motion.div
          initial={{ y: -100, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ type: "spring", stiffness: 100, duration: 0.5 }}
        >
          <Image
            src={content.images.mainImage}
            alt="Distributor delivering products"
            className="max-w-xl maxsm:max-w-[95%] rounded-lg shadow-lg"
            width={500}
            height={500}
          />
        </motion.div>
      </section>

      {/* Benefits Section */}
      <section className=" py-12 bg-secondary px-40 maxmd:px-5">
        <h2 className="text-3xl font-semibold text-center mb-6">
          {content.benefits.title}
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {content.benefits.items.map((item, index) => (
            <BenefitItem key={index} icon={item.icon} text={item.text} />
          ))}
        </div>
      </section>

      {/* How It Works Section */}
      <section className="bg-gray-100 py-12 px-5 flex flex-col items-center">
        <h2 className="text-3xl font-semibold text-center mb-6 text-black">
          {content.howItWorks.title}
        </h2>
        <div className="space-y-8">
          {content.howItWorks.steps.map((step, index) => (
            <HowItWorksStep
              key={index}
              title={step.title}
              description={step.description}
              stepIndex={index + 1}
            />
          ))}
        </div>
        <button onClick={toggleModal}>
          <ButtonMotion
            aria-label="Contactar"
            textClass={"text-white"}
            textClassTwo={"text-white"}
            className="bg-accent dark:bg-secondary-gradient px-10 py-3 text-white flex items-center justify-center  text-xs tracking-widest mt-5"
          >
            {content.hero.cta}
          </ButtonMotion>
        </button>
      </section>

      {/* Testimonials Section */}
      <section className="p-8 my-12">
        <h2 className="text-3xl font-semibold text-center mb-6">
          {content.testimonials.title}
        </h2>
        <div className="space-y-6">
          {content.testimonials.items.map((item, index) => (
            <Testimonial
              key={index}
              quote={item.quote}
              author={item.author}
              authorPhoto={content.images.testimonialPhotos[index]}
            />
          ))}
        </div>
      </section>

      {/* Call to Action Section */}
      <section className="py-24 bg-secondary  text-center px-60 maxmd:px-5">
        <motion.div
          initial={{ x: -100, opacity: 0 }}
          whileInView={{ x: 0, opacity: 1 }}
          transition={{ type: "spring", stiffness: 100, duration: 0.5 }}
          className="gap-3 flex flex-col items-center justify-center w-full"
        >
          <Image
            src={content.images.mainImage}
            alt="Distributor delivering products"
            className="max-w-md  maxsm:max-w-[95%] rounded-lg shadow-lg"
            width={500}
            height={500}
          />
          <h2 className="text-3xl font-semibold mb-4">{content.cta.title}</h2>
          <p className="mb-6">{content.cta.description}</p>
          <button onClick={toggleModal}>
            <ButtonMotion
              aria-label="Contactar"
              textClass={"text-white"}
              textClassTwo={"text-white"}
              className="bg-accent dark:bg-secondary-gradient px-10 py-3 text-white flex items-center justify-center  text-xs tracking-widest mt-5"
            >
              {content.hero.cta}
            </ButtonMotion>
          </button>
        </motion.div>
      </section>
      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
            className="bg-main-gradient  text-white rounded-lg shadow-lg w-[90%] max-w-lg p-8"
          >
            <div className="flex w-full items-center justify-center">
              <WhiteLogoComponent />
            </div>
            <h2 className="text-2xl font-bold text-center mb-4">
              {content.modal.title}
            </h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label htmlFor="name" className="block text-sm font-medium">
                  {content.modal.input1.label}
                </label>
                <input
                  type="text"
                  id="name"
                  className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary text-gray-700"
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder={content.modal.input1.placeholder}
                />
              </div>
              <div>
                <label htmlFor="phone" className="block text-sm font-medium">
                  {content.modal.input2.label}
                </label>
                <input
                  type="tel"
                  id="phone"
                  value={phone}
                  className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary text-gray-700"
                  onChange={handlePhoneChange}
                  placeholder={content.modal.input2.placeholder}
                />
                <input
                  hidden
                  id="email"
                  className="text-center py-2"
                  type="text"
                  placeholder="email"
                  onChange={(e) => setEmail(e.target.value)}
                />
                <input
                  hidden
                  className="text-center py-2"
                  type="text"
                  placeholder="Honeypot"
                  onChange={(e) => setHoneypot(e.target.value)}
                />
              </div>

              <div className="flex justify-end">
                <button
                  type="button"
                  onClick={toggleModal}
                  className="px-4 py-2 mr-2 bg-gray-300 r text-black hover:bg-gray-400 transition"
                >
                  {content.modal.buttons.cancel}
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-primary text-white hover:bg-accent transition"
                >
                  {content.modal.buttons.register}
                </button>
              </div>
            </form>
          </motion.div>
        </div>
      )}
    </div>
  );
};

// Component for Benefit Item
const BenefitItem = ({ icon, text }) => (
  <motion.div
    initial={{ x: -100, opacity: 0 }}
    whileInView={{ x: 0, opacity: 1 }}
    transition={{ type: "spring", stiffness: 100, duration: 0.5 }}
    className="flex flex-col items-center text-center"
  >
    <Image
      src={icon}
      alt="Benefit icon"
      className="object-cover object-center w-28 h-28 rounded-full bg-gray-200 mb-4"
      width={350}
      height={350}
    />
    <p className="text-sm">{text}</p>
  </motion.div>
);

// Component for How It Works Step
const HowItWorksStep = ({ title, description, stepIndex }) => (
  <motion.div
    initial={{ x: -100, opacity: 0 }}
    whileInView={{ x: 0, opacity: 1 }}
    transition={{ type: "spring", stiffness: 100, duration: 0.5 }}
    className="flex items-start space-x-4"
  >
    <div className="text-4xl font-bold text-white bg-primary rounded-full px-4 py-2">
      {stepIndex}
    </div>
    <div className="text-black">
      <h3 className="text-2xl font-semibold">{title}</h3>
      <p>{description}</p>
    </div>
  </motion.div>
);

// Component for Testimonial
const Testimonial = ({ quote, author, authorPhoto }) => (
  <motion.div
    initial={{ x: -100, opacity: 0 }}
    whileInView={{ x: 0, opacity: 1 }}
    transition={{ type: "spring", stiffness: 100, duration: 0.5 }}
    className="flex flex-col items-center justify-center space-x-4 text-center"
  >
    <div className="bg-primary opacity-80 rounded-full p-3">
      <User className="text-white" size={40} />
    </div>
    <div className="w-[70%] maxsm:w-[90%] flex flex-col items-center justify-center">
      <p className="italic">
        {"“"}
        {quote}
        {"“"}
      </p>
      <p className="font-semibold">{author}</p>
    </div>
  </motion.div>
);

export default Distribuidores;
