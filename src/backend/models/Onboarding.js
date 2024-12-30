import mongoose from "mongoose";

const OnboardingSchema = new mongoose.Schema(
  {
    step1: {
      question: {
        en: {
          type: String,
          default: "What's the primary goal for your website?",
        },
        es: {
          type: String,
          default: "¿Cuál es el objetivo principal de su sitio web?",
        },
      },
      answer: {
        en: {
          type: String,
        },
        es: {
          type: String,
        },
      },
    },
    step2: {
      question: {
        en: {
          type: String,
          default: "Who is your target audience?",
        },
        es: {
          type: String,
          default: "¿Quién es su público objetivo?",
        },
      },
      answer: {
        en: {
          type: String,
        },
        es: {
          type: String,
        },
      },
    },
    step3: {
      question: {
        en: {
          type: String,
          default:
            "Do you have an existing website? If yes, what do you love and hate about it?",
        },
        es: {
          type: String,
          default:
            "¿Tiene un sitio web existente? En caso afirmativo, ¿qué es lo que amas y lo que odias de ello?",
        },
      },
      answer: {
        en: {
          type: String,
        },
        es: {
          type: String,
        },
      },
    },
    step4: {
      question: {
        en: {
          type: String,
          default: "How do you prefer your website's look and feel to be?",
        },
        es: {
          type: String,
          default: "¿Cómo prefiere que sea la apariencia de su sitio web?",
        },
      },
      answer: {
        en: {
          type: String,
        },
        es: {
          type: String,
        },
      },
    },
    step5: {
      question: {
        en: {
          type: String,
          default:
            "Which of the following features do you see as a must-have for your website?",
        },
        es: {
          type: String,
          default:
            "¿Cuál de las siguientes características considera imprescindible para su sitio web?",
        },
      },
      answer: {
        en: {
          type: String,
        },
        es: {
          type: String,
        },
      },
    },
    step6: {
      question: {
        en: {
          type: String,
          default: "What's your anticipated timeline for this project?",
        },
        es: {
          type: String,
          default: "¿Cuál es su cronograma previsto para este proyecto?",
        },
      },
      answer: {
        en: {
          type: String,
        },
        es: {
          type: String,
        },
      },
    },
    step7: {
      question: {
        en: {
          type: String,
          default: "What is your estimated budget for the website development?",
        },
        es: {
          type: String,
          default:
            "¿Cuál es su presupuesto estimado para el desarrollo del sitio web?",
        },
      },
      answer: {
        en: {
          type: String,
        },
        es: {
          type: String,
        },
      },
    },
    step8: {
      question: {
        en: {
          type: String,
          default: "Who will manage the website after it is launched?",
        },
        es: {
          type: String,
          default: "¿Quién gestionará el sitio web una vez lanzado?",
        },
      },
      answer: {
        en: {
          type: String,
        },
        es: {
          type: String,
        },
      },
    },
    step9: {
      question: {
        en: {
          type: String,
          default: "How do you prefer to communicate and receive updates?",
        },
        es: {
          type: String,
          default: "¿Cómo prefieres comunicarte y recibir actualizaciones?",
        },
      },
      answer: {
        en: {
          type: String,
        },
        es: {
          type: String,
        },
      },
    },
    step10: {
      question: {
        en: {
          type: String,
          default: "What is your company's mission statement?",
        },
        es: {
          type: String,
          default: "¿Cuál es la misión de tu empresa?",
        },
      },
      answer: {
        en: {
          type: String,
        },
        es: {
          type: String,
        },
      },
    },
    step11: {
      question: {
        en: {
          type: String,
          default: "What is your company's vision statement?",
        },
        es: {
          type: String,
          default: "¿Cuál es la visión de tu empresa a futuro?",
        },
      },
      answer: {
        en: {
          type: String,
        },
        es: {
          type: String,
        },
      },
    },
    step12: {
      question: {
        en: {
          type: String,
          default: "Do you have a company slogan or tagline?",
        },
        es: {
          type: String,
          default: "Ya cuentas con un eslogan de empresa?",
        },
      },
      answer: {
        en: {
          type: String,
        },
        es: {
          type: String,
        },
      },
    },
    step13: {
      question: {
        en: {
          type: String,
          default: "How many products or services do you offer?",
        },
        es: {
          type: String,
          default: "¿Cuántos productos o servicios ofreces?",
        },
      },
      answer: {
        en: {
          type: String,
        },
        es: {
          type: String,
        },
      },
    },
    step14: {
      question: {
        en: {
          type: String,
          default:
            "Please provide a list of key products or services you will be offering",
        },
        es: {
          type: String,
          default:
            "Proporcione una lista de los productos o servicios clave que ofrecerá",
        },
      },
      answer: {
        en: {
          type: String,
        },
        es: {
          type: String,
        },
      },
    },
    step15: {
      question: {
        en: {
          type: String,
          default:
            "Can you describe your typical customer? What do they value the most?",
        },
        es: {
          type: String,
          default: "¿Puedes describir a tu cliente típico? ¿Qué valoran más?",
        },
      },
      answer: {
        en: {
          type: String,
        },
        es: {
          type: String,
        },
      },
    },
    step16: {
      question: {
        en: {
          type: String,
          default:
            "What differentiates your products/services from your competitors?",
        },
        es: {
          type: String,
          default:
            "¿Qué diferencia tus productos/servicios de los de tus competidores?",
        },
      },
      answer: {
        en: {
          type: String,
        },
        es: {
          type: String,
        },
      },
    },
    step17: {
      question: {
        en: {
          type: String,
          default: "Does you company have a GMail account?",
        },
        es: {
          type: String,
          default: "¿Su empresa tiene una cuenta de GMail?",
        },
      },
      answer: {
        en: {
          type: String,
        },
        es: {
          type: String,
        },
      },
    },
    step18: {
      question: {
        en: {
          type: String,
          default: "¿Cómo se llama tu empresa o marca?",
        },
        es: {
          type: String,
          default: "What is you company's name or brand?",
        },
      },
      answer: {
        en: {
          type: String,
        },
        es: {
          type: String,
        },
      },
    },
    step19: {
      question: {
        en: {
          type: String,
          default:
            "What is your business address that should be displayed on the website?",
        },
        es: {
          type: String,
          default:
            "¿Cuál es la dirección de tu negocio que se debe mostrar en el sitio web?",
        },
      },
      answer: {
        en: {
          type: String,
        },
        es: {
          type: String,
        },
      },
    },
    step20: {
      question: {
        en: {
          type: String,
          default:
            "What is your contact email that should be displayed on the website?",
        },
        es: {
          type: String,
          default:
            "¿Cuál es el email de contacto que se debe mostrar en el sitio web?",
        },
      },
      answer: {
        en: {
          type: String,
        },
        es: {
          type: String,
        },
      },
    },
    step21: {
      question: {
        en: {
          type: String,
          default:
            "What is your contact phone number that should be displayed on the website?",
        },
        es: {
          type: String,
          default:
            "¿Cuál es el teléfono de contacto que se debe mostrar en el sitio web?",
        },
      },
      answer: {
        en: {
          type: String,
        },
        es: {
          type: String,
        },
      },
    },
    step22: {
      question: {
        en: {
          type: String,
          default: "Please name a few websites you like?",
        },
        es: {
          type: String,
          default: "Por favor, nombre algunos sitios web que te gusten.",
        },
      },
      answer: {
        en: {
          type: String,
        },
        es: {
          type: String,
        },
      },
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      require: true,
      ref: "User",
    },
  },
  { timestamps: true }
);

export default mongoose?.models?.Onboarding ||
  mongoose.model("Onboarding", OnboardingSchema);
