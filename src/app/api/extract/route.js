import { NextRequest, NextResponse } from "next/server";
import OpenAI from "openai";
import { extractText, getDocumentProxy } from "unpdf";
import { writeFile } from "fs/promises";
import path from "path";

// Helper function to generate unique filename
function generateFileName() {
  const date = new Date();
  return `extraction_results_${date.getFullYear()}${(date.getMonth() + 1)
    .toString()
    .padStart(2, "0")}${date.getDate().toString().padStart(2, "0")}_${date
    .getHours()
    .toString()
    .padStart(2, "0")}${date.getMinutes().toString().padStart(2, "0")}${date
    .getSeconds()
    .toString()
    .padStart(2, "0")}.json`;
}

// Helper function to save results to file
async function saveResultsToFile(results) {
  try {
    const fileName = generateFileName();
    const filePath = path.join(
      process.cwd(),
      "public",
      "extractions",
      fileName
    );
    await writeFile(filePath, JSON.stringify(results, null, 2));
    return fileName;
  } catch (error) {
    console.error("Error saving results to file:", error);
    throw error;
  }
}

export async function POST(req) {
  try {
    const formData = await req.formData();
    const files = formData.getAll("files");
    const openai = new OpenAI({
      apiKey: process.env.OPEN_AI_KEY,
    });

    if (!files || files.length === 0) {
      return NextResponse.json(
        { message: "No files uploaded." },
        { status: 400 }
      );
    }

    const results = [];
    const failedExtractions = [];

    for (const file of files) {
      try {
        const arrayBuffer = await file.arrayBuffer();
        const pdfBuffer = new Uint8Array(arrayBuffer);

        const pdf = await getDocumentProxy(pdfBuffer);
        const { text, totalPages } = await extractText(pdf, {
          mergePages: true,
        });

        const response = await openai.chat.completions.create({
          messages: [
            {
              role: "system",
              content: `
                You are a tool that organizes the extraction of text in Spanish. This tool is a web application that extracts and organizes text from the following text:\n\n${text}. and produces a json formatted list of all the information points in the given text. Return results strictly in an json format with the following fields:
                { 
                  product_name: "",
                  summary: "",
                  BENEFICIOS: "",
                  PRECAUCIONES: "",
                  CARACTERISTICAS: [
                  {
                  PRUEBAS: "",
                  METODO ASTM: "",
                  VALOR TIPICO: "",
                  }],
                  INDUSTRIA Y CLIENTES: "",
                }
                `,
            },
            {
              role: "user",
              content: `Summarize the following text:\n\n${text}. Return results strictly in an json format with the following fields:
              { 
                  product_name: "",
                  summary: "",
                  BENEFICIOS: "",
                  PRECAUCIONES: "",
                  CARACTERISTICAS: [
                  {
                  PRUEBAS: "",
                  METODO ASTM: "",
                  VALOR TIPICO: "",
                  }],
                  INDUSTRIA Y CLIENTES: "",
                }
              `,
            },
          ],
          model: "gpt-4-turbo-preview",
        });

        let summary = response.choices[0].message.content.trim();
        let cutSummary = summary.replace("```json", "").replace("```", "");
        const parsedText = JSON.parse(cutSummary);

        results.push({
          fileName: file.name,
          status: "success",
          totalPages,
          timestamp: new Date().toISOString(),
          structuredData: parsedText,
        });
      } catch (error) {
        console.error(`Error processing file ${file.name}:`, error);

        failedExtractions.push({
          fileName: file.name,
          status: "failed",
          timestamp: new Date().toISOString(),
          error: error.message,
        });
      }
    }

    // Combine successful and failed results
    const allResults = {
      successful: results,
      failed: failedExtractions,
      totalProcessed: files.length,
      successfulCount: results.length,
      failedCount: failedExtractions.length,
      extractionDate: new Date().toISOString(),
    };

    // Save results to file
    const savedFileName = await saveResultsToFile(allResults);

    return NextResponse.json({
      results: allResults,
      downloadUrl: `/extractions/${savedFileName}`,
    });
  } catch (error) {
    console.error("Error in API route:", error);
    return NextResponse.json(
      {
        message: "An error occurred while processing the files.",
        error: error.message,
      },
      { status: 500 }
    );
  }
}
