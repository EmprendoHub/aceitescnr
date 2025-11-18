import { NextResponse } from "next/server";
import { mc } from "@/lib/minio";

export async function GET(request) {
  try {
    const bucketName = "aceitescnr";
    const prefix = "fichas/";
    
    const objectsList = [];
    
    // Create a stream to list objects
    const stream = mc.listObjects(bucketName, prefix, false);
    
    // Collect all objects from the stream
    await new Promise((resolve, reject) => {
      stream.on('data', (obj) => {
        // Filter only PDF files
        if (obj.name.toLowerCase().endsWith('.pdf')) {
          objectsList.push({
            name: obj.name.replace(prefix, ''), // Remove prefix for cleaner display
            fullPath: obj.name,
            size: obj.size,
            lastModified: obj.lastModified,
            etag: obj.etag
          });
        }
      });
      
      stream.on('error', (err) => {
        reject(err);
      });
      
      stream.on('end', () => {
        resolve();
      });
    });

    // Generate presigned URLs for each PDF (valid for 24 hours)
    const pdfList = await Promise.all(
      objectsList.map(async (obj) => {
        try {
          const url = await mc.presignedGetObject(bucketName, obj.fullPath, 24 * 60 * 60);
          return {
            ...obj,
            url
          };
        } catch (err) {
          console.error(`Error generating URL for ${obj.fullPath}:`, err);
          return {
            ...obj,
            url: null
          };
        }
      })
    );

    return NextResponse.json({
      success: true,
      pdfs: pdfList,
      count: pdfList.length
    });

  } catch (error) {
    console.error("Error listing PDFs from MinIO:", error);
    return NextResponse.json(
      { 
        success: false, 
        error: "Failed to fetch PDFs",
        message: error.message 
      },
      { status: 500 }
    );
  }
}
