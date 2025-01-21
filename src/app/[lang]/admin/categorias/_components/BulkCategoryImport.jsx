"use client";
import React, { useState } from "react";
import { Upload } from "lucide-react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { useRouter } from "next/navigation";
import { addNewCategory } from "../_actions";

const BulkCategoryImport = ({ lang }) => {
  const router = useRouter();
  const [isProcessing, setIsProcessing] = useState(false);
  const [uploadedFile, setUploadedFile] = useState(null);
  const [previewData, setPreviewData] = useState(null);
  const [error, setError] = useState(null);
  const [progress, setProgress] = useState(0);

  const handleFileUpload = async (event) => {
    const file = event.target.files[0];
    if (!file) return;

    setIsProcessing(true);
    setError(null);
    setProgress(0);

    try {
      if (file.type === "application/json") {
        const reader = new FileReader();
        reader.onload = async (e) => {
          try {
            const jsonData = JSON.parse(e.target.result);
            if (jsonData.successful) {
              setPreviewData(jsonData.successful);
            } else {
              setPreviewData([jsonData]); // Handle single category case
            }
            setUploadedFile(file);
          } catch (err) {
            setError("Formato JSON inválido");
          }
        };
        reader.readAsText(file);
      } else if (
        file.type ===
          "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" ||
        file.type === "application/vnd.ms-excel"
      ) {
        setError("Por favor utiliza archivos JSON por el momento");
      } else {
        setError("Por favor sube un archivo JSON");
      }
    } catch (err) {
      setError("Error al procesar el archivo");
    } finally {
      setIsProcessing(false);
    }
  };

  const processCategories = async () => {
    if (!previewData) return;

    setIsProcessing(true);
    setProgress(0);

    try {
      let successCount = 0;
      const total = previewData.length;

      for (const category of previewData) {
        const formData = new FormData();
        const data = category.structuredData || category;

        // Map the data to match your category structure
        const categoryData = {
          name: {
            es: data.product_name,
            en: data.product_name,
          },
          summary: {
            es: data.summary,
            en: data.summary,
          },
          benefits: {
            es: data.BENEFICIOS,
            en: data.BENEFICIOS,
          },
          precautions: {
            es: data.PRECAUCIONES,
            en: data.PRECAUCIONES,
          },
          industryClients: {
            es: data.INDUSTRIA_Y_CLIENTES || data["INDUSTRIA Y CLIENTES"],
            en: data.INDUSTRIA_Y_CLIENTES || data["INDUSTRIA Y CLIENTES"],
          },
          characteristics: data.CARACTERISTICAS.map((char) => ({
            test: {
              es: char.PRUEBAS,
              en: char.PRUEBAS,
            },
            method: {
              es: char.METODO_ASTM || char["METODO ASTM"],
              en: char.METODO_ASTM || char["METODO ASTM"],
            },
            typicalValue: {
              es: char.VALOR_TIPICO || char["VALOR TIPICO"],
              en: char.VALOR_TIPICO || char["VALOR TIPICO"],
            },
          })),
          mainImage: "/images/product-placeholder-minimalist.jpg", // Default image
        };

        // Append all data to formData
        Object.keys(categoryData).forEach((key) => {
          formData.append(key, JSON.stringify(categoryData[key]));
        });

        try {
          const response = await addNewCategory(formData);
          if (response?.success) {
            successCount++;
          }
        } catch (err) {
          console.error(`Error importing category ${data.product_name}:`, err);
        }

        // Update progress
        setProgress(Math.round((successCount / total) * 100));
      }

      if (successCount > 0) {
        router.refresh();
      }

      setPreviewData(null);
      setUploadedFile(null);
    } catch (err) {
      setError("Error al importar categorías");
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <Card className="w-full mb-8">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Upload size={20} />
          Importar Categorías
        </CardTitle>
      </CardHeader>
      <CardContent>
        {error && (
          <Alert variant="destructive" className="mb-4">
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        <div className="space-y-4">
          <div className="flex justify-center items-center w-full">
            <label className="flex flex-col items-center justify-center w-full h-48 border-2 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100">
              <div className="flex flex-col items-center justify-center pt-5 pb-6">
                <Upload className="w-8 h-8 mb-4 text-gray-500" />
                <p className="mb-2 text-sm text-gray-500">
                  <span className="font-semibold">Click para subir</span> o
                  arrastra y suelta
                </p>
                <p className="text-xs text-gray-500">Archivo JSON</p>
              </div>
              <input
                type="file"
                className="hidden"
                accept=".json"
                onChange={handleFileUpload}
                disabled={isProcessing}
              />
            </label>
          </div>

          {previewData && (
            <div className="mt-4">
              <h3 className="text-lg font-semibold mb-2">
                Vista Previa ({previewData.length} categorías)
              </h3>
              <div className="max-h-60 overflow-y-auto border rounded-lg p-4">
                {previewData.map((item, index) => (
                  <div
                    key={index}
                    className="mb-4 pb-4 border-b last:border-b-0"
                  >
                    <p className="font-semibold">
                      {item.structuredData?.product_name || item.product_name}
                    </p>
                    <p className="text-sm text-gray-600 truncate">
                      {item.structuredData?.summary || item.summary}
                    </p>
                  </div>
                ))}
              </div>

              {progress > 0 && progress < 100 && (
                <div className="w-full bg-gray-200 rounded-full h-2.5 mt-4">
                  <div
                    className="bg-secondary h-2.5 rounded-full transition-all duration-300"
                    style={{ width: `${progress}%` }}
                  ></div>
                </div>
              )}

              <button
                onClick={processCategories}
                disabled={isProcessing}
                className="mt-4 px-4 py-2 bg-secondary text-white rounded-md hover:bg-opacity-90 disabled:opacity-50 w-full"
              >
                {isProcessing
                  ? `Procesando... ${progress}%`
                  : "Importar Categorías"}
              </button>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default BulkCategoryImport;
