import React from "react";
import GoogleCaptchaWrapper from "./GoogleCaptchaWrapper";
import SubscribeForm from "./SubscribeForm";
import { getDictionary } from "@/lib/dictionary";

const SuscribeWrapper = async ({ cookie, params }) => {
  const lang = params.lang;
  const { homeDic } = await getDictionary(lang);
  return (
    <div>
      <GoogleCaptchaWrapper>
        <SubscribeForm cookie={cookie} homeDic={homeDic} />
      </GoogleCaptchaWrapper>
    </div>
  );
};

export default SuscribeWrapper;
