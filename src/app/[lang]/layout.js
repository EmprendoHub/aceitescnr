import CustomSessionProvider from "./SessionProvider";
import "./css/globals.css";
import FooterComponent from "@/components/footer/FooterComponent";
//import BackToTopButton from "@/components/buttons/BackToTopButton";
import WhatsAppButton from "@/components/buttons/WhatsAppButton";
import { GoogleAnalytics } from "@next/third-parties/google";
import HeaderComponent from "@/components/headers/HeaderComponent";
import { options } from "../api/auth/[...nextauth]/options";
import { getServerSession } from "next-auth";
import AdminThemeToggle from "@/components/layout/AdminThemeToggle";
import BackToTopButton from "@/components/buttons/BackToTopButton";
import ThemeToggleVertical from "@/components/layout/ThemeToggleVertical";
import { ThemeProvider } from "./ThemeProvider";

export const metadata = {
  manifest: "/manifest.json",
  metadataBase: new URL("https://www.aceitescnr.com"),
  title: "Aceites CNR | Rendimiento y Protección para Tu Motor",
  description:
    "Descubre los aceites de motor de alta calidad de Aceites CNR. Diseñados para brindar protección, rendimiento y eficiencia a tu vehículo en cada kilómetro recorrido.",
  openGraph: {
    title: "Aceites CNR | Rendimiento y Protección para Tu Motor",
    description:
      "En Aceites CNR, fabricamos aceites de motor que garantizan un alto rendimiento y protección en cualquier condición. Perfectos para autos, camiones y maquinaria pesada.",
    image: "/images/opengraph-oil.png",
  },
  twitter: {
    card: "summary_large_image",
    site: "@aceitescnr",
    title: "Aceites CNR | Rendimiento y Protección para Tu Motor",
    description:
      "Protege tu motor con aceites diseñados para ofrecer durabilidad y eficiencia. Aceites CNR, la elección confiable para tus necesidades automotrices.",
    image: "/images/twitter-oil.png",
  },
};

export const viewport = {
  themeColor: "#0D121B",
};

export default async function RootLayout({ children, params }) {
  const session = await getServerSession(options);
  const isLoggedIn = Boolean(session?.user);
  const lang = params.lang;
  return (
    <html lang={`${lang}`}>
      {/* <GoogleAnalytics gaId="G-XHDKY7FLQ5" /> */}
      <body
        className={`body-class relative overflow-x-hidden h-full bg-background dark:text-white`}
      >
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <CustomSessionProvider>
            <HeaderComponent lang={lang} />

            {children}
            <FooterComponent session={session} lang={lang} />
            <BackToTopButton />
            {!isLoggedIn && <WhatsAppButton lang={lang} />}
            {isLoggedIn && session?.user.role === "manager" && (
              <div className="fixed z-50 right-0 top-1/2">
                <AdminThemeToggle />
              </div>
            )}
            <ThemeToggleVertical />
          </CustomSessionProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
