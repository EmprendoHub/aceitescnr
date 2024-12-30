import React from "react";
import EmailForm from "../forms/EmailForm";
import { getCookiesName } from "@/backend/helpers";
import { cookies } from "next/headers";
import GoogleCaptchaWrapper from "../forms/GoogleCaptchaWrapper";

const ContactUsComponent = ({ contactDic, contactTitle, contactSubTitle }) => {
  //set cookies
  const nextCookies = cookies();
  const cookieName = getCookiesName();
  const nextAuthSessionToken = nextCookies.get(cookieName);
  const cookie = `${cookieName}=${nextAuthSessionToken?.value}`;
  return (
    <div className="flex flex-row maxmd:flex-col w-[95%] justify-center items-center mx-auto">
      <div className="w-full maxmd:w-full z-10  maxmd:px-5 maxsm:px-1">
        <div className=" w-full">
          <h2></h2>
          <GoogleCaptchaWrapper>
            <EmailForm cookie={cookie} contactDic={contactDic} />
          </GoogleCaptchaWrapper>
        </div>
      </div>
    </div>
  );
};

export default ContactUsComponent;
