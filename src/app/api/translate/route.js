import { Translate } from "@google-cloud/translate/build/src/v2";
import { NextResponse } from "next/server";

// Create a translate instance with credentials
const translate = new Translate({
  projectId: process.env.GOOGLE_CLOUD_PROJECT_ID,
  key: process.env.GOOGLE_CLOUD_KEY,
});

export const POST = async (request) => {
  const { text, targetLang } = await request.json();
  try {
    const [translation] = await translate.translate(text, targetLang);
    const response = NextResponse.json({
      message: "Translated successfully",
      success: true,
      translation,
    });
    return response;
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      {
        error: "Translation error",
      },
      { status: 500 }
    );
  }
};
