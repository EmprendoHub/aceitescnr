import React from "react";
import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";
import { Upload } from "lucide-react";

const ImageUploadField = ({ label, imageUrl, onChange }) => {
  return (
    <Card className="w-full">
      <CardContent className="p-4">
        <label className="block text-sm font-medium mb-2">{label}</label>
        <div className="border-2 border-dashed border-gray-300 rounded-lg p-4">
          <div className="relative w-full h-48">
            {imageUrl ? (
              <Image
                src={imageUrl}
                alt={label}
                fill
                className="object-contain"
              />
            ) : (
              <div className="flex items-center justify-center h-full">
                <Upload className="w-12 h-12 text-gray-400" />
              </div>
            )}
            <input
              type="file"
              accept="image/*"
              onChange={(e) =>
                e.target.files?.[0] && onChange(e.target.files[0])
              }
              className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
            />
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ImageUploadField;
