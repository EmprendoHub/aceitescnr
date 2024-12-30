import { FaFolder, FaHome } from "react-icons/fa";
import { FaGear } from "react-icons/fa6";

export const NAV_LINKS = [
  { title: "Acerca", url: "/acerca" },
  { title: "Blog", url: "/blog" },
  { title: "Portfolio", url: "/portfolio" },
  { title: "Servicios", url: "/servicios" },
  { title: "Contacto", url: "/#contacto" },
];

export const TESTIMONIALS = [
  {
    id: 1,
    name: "Carlos Ortega",
    position: "POS con",
    text: "Lorem ipsum dolor sit amet consectetur adipisicing elit.",
    textPop: "Dolores ab id ad?",
    textTwo:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptate, quos sunt dolorum facilis, id eum sequi placeat accusantium saepe eos laborum.",
    icon: "/images/2149416730.jpg",
  },
  {
    id: 2,
    name: "Karla Ortiz",
    position: "POS con",
    text: "Lorem ipsum dolor sit amet consectetur adipisicing elit.",
    textPop: "Dolores ab id ad?",
    textTwo:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptate, quos sunt dolorum facilis, id eum sequi placeat accusantium saepe eos laborum.",
    icon: "/images/2149416730.jpg",
  },
  {
    id: 3,
    name: "Mario Fernandez",
    position: "POS con",
    text: "Lorem ipsum dolor sit amet consectetur adipisicing elit.",
    textPop: "Dolores ab id ad?",
    textTwo:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptate, quos sunt dolorum facilis, id eum sequi placeat accusantium saepe eos laborum.",
    icon: "/images/2149416730.jpg",
  },
  {
    id: 4,
    name: "Esteban Rodriguez",
    position: "POS con",
    text: "Lorem ipsum dolor sit amet consectetur adipisicing elit.",
    textPop: "Dolores ab id ad?",
    textTwo:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptate, quos sunt dolorum facilis, id eum sequi placeat accusantium saepe eos laborum.",
    icon: "/images/2149416730.jpg",
  },
];

export const MAIN_SLIDER = [
  {
    preTitle: "Digital",
    title: "We Bring",
    titleTwo: "Customers",
    text: "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Amet qui architecto sapiente soluta eveniet et quae sit sint",
    btnText: "Descubre Mas",
    btnPath: "/servicios",
    imgPath: "/images/branding_para_marca.webp",
  },
  {
    preTitle: "Digital",
    title: "We Build",
    titleTwo: "Relationships",
    text: "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Amet qui architecto sapiente soluta eveniet et quae sit sint",
    btnText: "Descubre Mas",
    btnPath: "/servicios",
    imgPath: "/images/como_desarrollar_una_marca.webp",
  },

  {
    preTitle: "Digital",
    title: "Grow Your",
    titleTwo: "Business",
    text: "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Amet qui architecto sapiente soluta eveniet et quae sit sint",
    btnText: "Descubre Mas",
    btnPath: "/servicios",
    imgPath: "/images/ocupo_un_sitio_web.webp",
  },
];
export const SIDENAV_ITEMS = [
  {
    title: "Inicio",
    path: "/admin",
    icon: <FaHome width="24" height="24" />,
  },
  {
    title: "Pedidos",
    path: "/admin/pedidos",
    icon: <FaHome width="24" height="24" />,
  },
  {
    title: "Publicaciones",
    path: "/admin/blog",
    icon: <FaFolder width="24" height="24" />,
    submenu: true,
    subMenuItems: [
      { title: "Todas", path: "/admin/blog" },
      { title: "Nueva", path: "/admin/blog/editor" },
    ],
  },
  {
    title: "servicios",
    path: "/admin/productos",
    icon: <FaFolder width="24" height="24" />,
    submenu: true,
    subMenuItems: [
      { title: "Todos", path: "/admin/productos" },
      { title: "Nuevo", path: "/admin/productos/nuevo/variaciones" },
    ],
  },
  {
    title: "Usuarios",
    path: "/admin/clientes",
    icon: <FaGear width="24" height="24" />,
    submenu: true,
    subMenuItems: [
      { title: "Clientes", path: "/admin/clientes" },
      { title: "Afiliados", path: "/admin/asociados" },
    ],
  },
  {
    title: "Paginas",
    path: "/admin/config",
    icon: <FaGear width="24" height="24" />,
    submenu: true,
    subMenuItems: [
      { title: "Nosotros", path: "/admin/config/nosotros" },
      { title: "Contacto", path: "/admin/config/contacto" },
    ],
  },
];

export const flip_box_data = [
  {
    bgColor: "pink",
    bgColorTwo: "pink",
    preTitle: " ¡Llega a mas clientes!",
    title: "Desarrollo de E-commerce",
    titleTwo: "¡Expande Tu Alcance!",
    subTitle: "Box Subtitle 1",
    textTitle: "BIOGRAPHY",
    text: "Transforma tu negocio minorista con soluciones de comercio electrónico personalizadas. Utilizamos tecnologías avanzadas como Nextjs 14.",
    textTwo:
      "¿Listo para llevar tu negocio al siguiente nivel? Descubre cómo nuestro desarrollo e-commerce.",
    img: "/images/beach_bonus.jpg",
    imgTwo: "/images/beach_bonus.jpg",
    btnText: "Comprar Boletos",
    btnLink: "/servicios",
    icon: `FaBezierCurve`,
  },
  {
    bgColor: "blue",
    bgColorTwo: "blue",
    preTitle: "¡Soluciones de Sistema!",
    title: "¡Todo en un mismo lugar!",
    titleTwo: "¡Mejora tu Eficiencia!",
    subTitle: "Box Subtitle 2",
    text: "Moderniza la gestión de tu punto de venta con sistemas POS integrados y eficientes. Diseñamos sistemas que facilitan las operaciones.",
    textTwo:
      "Aumenta la precisión de tus datos y mejora tu eficiencia operacional.",
    img: "/images/GTI-interior.jpeg",
    imgTwo: "/images/GTI-interior.jpeg",
    btnText: "Comprar Boletos",
    btnLink: "/servicios",
    icon: `FaUsers`,
  },
  {
    bgColor: "purple",
    bgColorTwo: "purple",
    preTitle: "¡Código Personalizado!",
    title: " ¡Aplicaciones Web Personalizadas!",
    titleTwo: "¡Escala con Confianza!",
    subTitle: "Participa para una Oportunidad de Cambiar tu Vida",
    textTitle: "BIOGRAPHY",
    text: "Desarrollamos aplicaciones web robustas y escalables específicamente para startups. Nuestro enfoque se centra en la necesidad de rápido.",
    textTwo:
      "Garantiza el éxito de tu startup con aplicaciones diseñadas para el crecimiento y la flexibilidad.",
    img: "/images/Premio_10_mil_pesos.jpg",
    imgTwo: "/images/Premio_10_mil_pesos.jpg",
    btnText: "Comprar Boletos",
    btnLink: "/servicios",
    icon: `FaCode`,
  },
];

export const POSNAV_ITEMS = [
  {
    title: "Inicio",
    path: "/puntodeventa",
    icon: <FaHome width="24" height="24" />,
  },
  {
    title: "Pedidos",
    path: "/puntodeventa/pedidos",
    icon: <FaHome width="24" height="24" />,
  },
  {
    title: "servicios",
    path: "/puntodeventa/servicios",
    icon: <FaHome width="24" height="24" />,
  },
  {
    title: "Scanner",
    path: "/puntodeventa/qr/scanner",
    icon: <FaHome width="24" height="24" />,
  },
  {
    title: "Etiquetas QR",
    path: "/puntodeventa/qr/generador",
    icon: <FaHome width="24" height="24" />,
  },
];
