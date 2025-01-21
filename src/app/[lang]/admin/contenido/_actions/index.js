"use server";

import { OpenAI } from "openai";
import { writeFile } from "fs/promises";
import { join } from "path";
import { v4 as uuidv4 } from "uuid";
import { delay } from "@/lib/utils";
import { uploadImageFromUrl } from "@/app/[lang]/_actions";
import axios from "axios";

const openai = new OpenAI({
  apiKey: process.env.OPEN_AI_KEY,
});

async function saveFile(file) {
  const bytes = await file.arrayBuffer();
  const buffer = Buffer.from(bytes);

  const uniqueName = `${uuidv4()}-${file.name}`;
  const path = join(process.cwd(), "public", "uploads", uniqueName);

  await writeFile(path, buffer);
  return `/uploads/${uniqueName}`;
}

export async function generateImage(formData) {
  // Save uploaded files
  const productPath = formData.get("product")
    ? await saveFile(formData.get("product"))
    : null;
  const logoPath = formData.get("logo")
    ? await saveFile(formData.get("logo"))
    : null;
  const examplePath = formData.get("example")
    ? await saveFile(formData.get("example"))
    : null;
  const prompt = formData.get("prompt");

  // First, use GPT-4 to enhance the prompt
  const enhancedPromptResponse = await openai.chat.completions.create({
    model: "gpt-4",
    messages: [
      {
        role: "system",
        content:
          "You are an expert at writing image generation prompts. Convert user requests into detailed prompts that will produce high-quality results.",
      },
      {
        role: "user",
        content: `Create a detailed prompt for generating an image based on this request: ${prompt}. The image should maintain the style and composition of the example image, but incorporate the new product and brand elements.`,
      },
    ],
  });

  const enhancedPrompt = enhancedPromptResponse.choices[0].message.content;

  console.log(enhancedPromptResponse.choices[0].message);

  const baseImageUrl = `${process.env.NEXT_PUBLIC_NEXTAUTH_URL}${examplePath}`;
  const result = await uploadImageFromUrl(baseImageUrl, "/social/");
  console.log(result.imageUrl, "result.imageUrl", baseImageUrl);

  const data = JSON.stringify({
    model: "Qubico/flux1-schnell",
    task_type: "img2img",
    input: {
      prompt: enhancedPrompt,
      image: `${result.imageUrl}`,
    },
    config: {
      webhook_config: {
        endpoint: "",
        secret: "",
      },
    },
  });
  const getImageToImageConfig = {
    url: "https://api.goapi.ai/api/v1/task",
    method: "post",
    headers: {
      "X-API-Key": process.env.GO_API_AI_KEY,
      "Content-Type": "application/json",
    },
    data: data,
  };
  // Use Flux for initial image-to-image generation
  //   const fluxResponse = await fetch("https://api.goapi.ai/api/v1/task", {
  //     method: "POST",
  //     headers: {
  //       "x-api-key": process.env.GO_API_AI_KEY,
  //       "Content-Type": "application/json",
  //     },
  //     data: JSON.stringify({
  //       model: "Qubico/flux1-schnell",
  //       task_type: "img2img",
  //       input: {
  //         prompt: enhancedPrompt,
  //         image: `${result.imageUrl}`,
  //       },
  //       config: {
  //         webhook_config: {
  //           endpoint: ``,
  //           secret: "",
  //         },
  //       },
  //     }),
  //   });

  const fluxResponse = await axios(getImageToImageConfig);
  console.log("fluxResponse", fluxResponse);

  const fluxResultId = fluxResponse.data.data.task_id;
  console.log(fluxResultId);
  await delay(50000); // Default 10 seconds
  const getImageConfig = {
    method: "get",
    url: `https://api.goapi.ai/api/v1/task/${fluxResultId}`,
    headers: {
      "x-api-key": `${process.env.GO_API_AI_KEY}`,
    },
  };

  const responseFluxGetImage = await axios(getImageConfig);
  const generatedImageUrl = responseFluxGetImage.data.data.output.image_url;

  console.log(generatedImageUrl, "generatedImageUrl");

  // Use DALL-E 3 for final refinements and logo placement
  const finalResponse = await openai.images.generate({
    model: "dall-e-3",
    prompt: `${enhancedPrompt}. Place the logo in the top-right corner with subtle padding. Ensure the product image is prominently featured in the same position as the example image.`,
    n: 1,
    size: "1024x1024",
  });

  return finalResponse.data[0].url;
}
