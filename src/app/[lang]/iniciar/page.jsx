import { getCookiesName } from "@/backend/helpers";
import GoogleCaptchaWrapper from "@/components/forms/GoogleCaptchaWrapper";
import LoginComponent from "@/components/forms/LoginComponent";
import { cookies } from "next/headers";

const LoginPage = ({ params }) => {
  //set cookies
  const lang = params.lang;
  const nextCookies = cookies();
  const cookieName = getCookiesName();
  const nextAuthSessionToken = nextCookies.get(cookieName);
  const cookie = `${cookieName}=${nextAuthSessionToken?.value}`;
  return (
    <GoogleCaptchaWrapper>
      <LoginComponent cookie={cookie} lang={lang} />
    </GoogleCaptchaWrapper>
  );
};

export default LoginPage;
