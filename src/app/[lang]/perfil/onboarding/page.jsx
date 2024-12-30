import OnboardingModal from "@/components/quizzes/OnboardingModal";
import React from "react";
import { getDictionary } from "@/lib/dictionary";
import OnboardingQuiz from "@/components/quizzes/OnboardingQuiz";
import { getOnboarding } from "../../_actions";

const onboardingPage = async ({ params }) => {
  const lang = params.lang;
  const { onboardingDic } = await getDictionary(lang);

  return (
    <div className="mt-5">
      {/* <OnboardingModal onboardingDic={onboardingDic} lang={lang} /> */}
      <OnboardingQuiz onboardingDic={onboardingDic} lang={lang} />
    </div>
  );
};

export default onboardingPage;
