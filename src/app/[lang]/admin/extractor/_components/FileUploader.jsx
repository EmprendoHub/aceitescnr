"use client";
import React, { useState } from "react";
import { Card } from "@/components/ui/card";
import { Download } from "lucide-react";

export default function FileUploader() {
  const [files, setFiles] = useState([]);
  const [results, setResults] = useState(null);
  const [loading, setLoading] = useState(false);
  const [downloadUrl, setDownloadUrl] = useState(null);

  const handleFileChange = (e) => {
    if (e.target.files) {
      setFiles(Array.from(e.target.files));
    }
  };

  const handleSubmit = async () => {
    if (files.length === 0) {
      alert("Please upload at least one file.");
      return;
    }

    setLoading(true);

    const formData = new FormData();
    files.forEach((file) => formData.append("files", file));

    try {
      const endpoint = `/api/extract/`;
      const res = await fetch(endpoint, {
        method: "POST",
        headers: {
          "Access-Control-Allow-Origin": "*",
        },
        body: formData,
      });

      if (!res.ok) {
        throw new Error("Failed to process files.");
      }

      const data = await res.json();
      setResults(data.results);
      setDownloadUrl(data.downloadUrl);
    } catch (error) {
      console.error(error);
      alert("Error processing files. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleDownload = () => {
    if (downloadUrl) {
      window.location.href = downloadUrl;
    }
  };

  return (
    <div className="container mx-auto py-8 px-4">
      <Card className="p-6 mb-6">
        <h1 className="text-2xl font-bold mb-4">Upload and Extract PDFs</h1>
        <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center">
          <input
            type="file"
            multiple
            onChange={handleFileChange}
            className="border p-2 rounded"
          />
          <button
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors disabled:opacity-50"
            onClick={handleSubmit}
            disabled={loading}
          >
            {loading ? "Processing..." : "Upload and Extract"}
          </button>
        </div>
      </Card>

      {results && (
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-bold">Results Summary</h2>
            {downloadUrl && (
              <button
                onClick={handleDownload}
                className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition-colors"
              >
                <Download size={20} /> Download Results
              </button>
            )}
          </div>

          <div className="grid gap-6">
            {/* Summary Stats */}
            <Card className="p-4">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="text-center p-4 bg-gray-50 rounded">
                  <div className="text-sm text-gray-600">Total Processed</div>
                  <div className="text-2xl font-bold">
                    {results.totalProcessed}
                  </div>
                </div>
                <div className="text-center p-4 bg-green-50 rounded">
                  <div className="text-sm text-gray-600">Successful</div>
                  <div className="text-2xl font-bold text-green-600">
                    {results.successfulCount}
                  </div>
                </div>
                <div className="text-center p-4 bg-red-50 rounded">
                  <div className="text-sm text-gray-600">Failed</div>
                  <div className="text-2xl font-bold text-red-600">
                    {results.failedCount}
                  </div>
                </div>
              </div>
            </Card>

            {/* Successful Extractions */}
            {results.successful.length > 0 && (
              <Card className="overflow-hidden">
                <h3 className="text-lg font-bold p-4 bg-gray-50">
                  Successful Extractions
                </h3>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="p-4 text-left">File Name</th>
                        <th className="p-4 text-left">Product Name</th>
                        <th className="p-4 text-left">Pages</th>
                        <th className="p-4 text-left">Status</th>
                        <th className="p-4 text-left">Timestamp</th>
                      </tr>
                    </thead>
                    <tbody>
                      {results.successful.map((result, index) => (
                        <tr key={index} className="border-t">
                          <td className="p-4">{result.fileName}</td>
                          <td className="p-4">
                            {result.structuredData.product_name}
                          </td>
                          <td className="p-4">{result.totalPages}</td>
                          <td className="p-4">
                            <span className="px-2 py-1 bg-green-100 text-green-800 rounded-full text-sm">
                              {result.status}
                            </span>
                          </td>
                          <td className="p-4">
                            {new Date(result.timestamp).toLocaleString()}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </Card>
            )}

            {/* Failed Extractions */}
            {results.failed.length > 0 && (
              <Card className="overflow-hidden">
                <h3 className="text-lg font-bold p-4 bg-gray-50">
                  Failed Extractions
                </h3>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="p-4 text-left">File Name</th>
                        <th className="p-4 text-left">Error</th>
                        <th className="p-4 text-left">Timestamp</th>
                      </tr>
                    </thead>
                    <tbody>
                      {results.failed.map((result, index) => (
                        <tr key={index} className="border-t">
                          <td className="p-4">{result.fileName}</td>
                          <td className="p-4 text-red-600">{result.error}</td>
                          <td className="p-4">
                            {new Date(result.timestamp).toLocaleString()}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </Card>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
