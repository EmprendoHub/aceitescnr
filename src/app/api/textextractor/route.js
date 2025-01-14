import { NextResponse } from "next/server";
import OpenAi from "openai";

export async function POST(request) {
  const cookie = await request.headers.get("cookie");
  if (!cookie) {
    // Not Signed in
    const notAuthorized = "You are not authorized no no no";
    return new Response(JSON.stringify(notAuthorized), {
      status: 400,
    });
  }
  const openai = new OpenAi({
    apiKey: process.env.OPEN_AI_KEY,
  });

  const { imageUrl } = await request.json();
  console.log(imageUrl, "imageUrl");
  try {
    const response = await openai.chat.completions.create({
      model: "gpt-4o",
      messages: [
        {
          role: "user",
          content: [
            {
              type: "text",
              text: "extract all the product fields from this product image and create a product object to save to a mongoose db connection with the following product structure:{ title: {    es: { type: String },    en: { type: String },  }, description: {    es: { type: String },    en: { type: String },  }, brand: {    type: String,  }, weight: {    es: { type: Number },    en: { type: Number },  },\npacking: {    es: { type: String },    en: { type: String },  }, category: {    es: { type: String },    en: { type: String },  }, images: [    {      url: {        type: String,      },    },  ]}. Adjust the English and Spanish translations as necessary for the actual product text.",
            },
            {
              type: "image_url",
              image_url: {
                url: imageUrl,
              },
            },
          ],
        },
        {
          role: "assistant",
          content: [
            {
              type: "text",
              text: `Please return the response with only the following JSON format:{  title: { es: "Aditivo para Motocicletas 2 Tiempos",  en: "Additive for 2-Stroke Motorcycles" },  description: {  es: "CNR Oil calidad superior para motores de 2 tiempos.",    en: "CNR Oil superior quality for 2-stroke engines."  },  brand: {  type: "CNR Oil"  },  weight: {    es: 220,    en: 220 },  packing: { es: "Botella de 220 ml",  en: "220 ml bottle"  },  category: {  es: "Lubricantes para motocicletas",   en: "Motorcycle Lubricants" }, images: [ { url: ${imageUrl} } ]}`,
            },
          ],
        },
      ],
      response_format: {
        type: "text",
      },
      temperature: 1,
      max_completion_tokens: 2048,
      top_p: 1,
      frequency_penalty: 0,
      presence_penalty: 0,
    });

    const contentString = response.choices[0].message.content;

    let cleanString = contentString.split("```json");
    cleanString = cleanString[1].replace("```", "");

    // Parse the string into a JSON object
    const parsedObject = JSON.parse(cleanString);

    // Log the parsed object
    console.log("Parsed Object:", parsedObject);
    return {
      data: cleanString,
      status: 200,
    };
  } catch (error) {
    console.error("Error analyzing image with OpenAI API:", error);
    return NextResponse.json(
      { message: "Failed to analyze image" },
      { status: 500 }
    );
  }
}
