import { getDictionary } from "@/lib/dictionary";
import React from "react";
import Distribuidores from "./_components/Distribuidores";
import GoogleCaptchaWrapper from "@/components/forms/GoogleCaptchaWrapper";

const distribuidoresPage = async ({ params }) => {
  const lang = params.lang;
  const { distributorLandingPage } = await getDictionary(lang);

  return (
    <GoogleCaptchaWrapper>
      <Distribuidores content={distributorLandingPage.content} />
    </GoogleCaptchaWrapper>
  );
};

export default distribuidoresPage;
