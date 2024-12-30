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

export const metadata = {
  manifest: "/manifest.json",
  metadataBase: new URL("https://www.aceitescnr.com"),
  title: "Aceites CNR",
  description:
    "En Aceites CNR, diseñamos remolques más fuertes y resistentes, pensados para soportar los desafíos más exigentes.",
  openGraph: {
    title: "Aceites CNR",
    description:
      "En Aceites CNR, diseñamos remolques más fuertes y resistentes, pensados para soportar los desafíos más exigentes.",
    image: "url/opengraph-image.png",
  },
  twitter: {
    card: "summary_large_image",
    site: "@aceitescnr",
    title: "Aceites CNR",
    description:
      "En Aceites CNR, diseñamos remolques más fuertes y resistentes, pensados para soportar los desafíos más exigentes.",
    image: "url/opengraph-image.png",
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
        className={`body-class relative overflow-x-hidden h-full dark:bg-dark bg-white dark:text-white`}
      >
        <CustomSessionProvider>
          {/* <HeaderComponent lang={lang} /> */}

          {children}
          {/* <FooterComponent session={session} lang={lang} />
          <BackToTopButton />
          {!isLoggedIn && <WhatsAppButton lang={lang} />}
          {isLoggedIn && session?.user.role === "manager" && (
            <div className="fixed z-50 right-0 top-1/2">
              <AdminThemeToggle />
            </div>
          )}
          <ThemeToggleVertical /> */}
        </CustomSessionProvider>
      </body>
    </html>
  );
}
