"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import ImageUploadField from "./ImageUploadField";
import Image from "next/image";
import { generateImage } from "../_actions";

export default function ImageGenerationForm() {
  const { toast } = useToast();
  const [prompt, setPrompt] = useState("");
  const [loading, setLoading] = useState(false);
  const [images, setImages] = useState({
    product: null,
    logo: null,
    example: null,
  });
  const [result, setResult] = useState(null);

  const handleImageChange = (type, file) => {
    const url = URL.createObjectURL(file);
    setImages((prev) => ({
      ...prev,
      [type]: { url, file },
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const formData = new FormData();
      formData.append("prompt", prompt);

      Object.entries(images).forEach(([key, value]) => {
        if (value?.file) {
          formData.append(key, value.file);
        }
      });

      const generatedImage = await generateImage(formData);
      setResult(generatedImage);

      toast({
        title: "Success!",
        description: "Your image has been generated successfully.",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to generate image. Please try again.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 max-w-2xl mx-auto">
      <div className="space-y-2">
        <label className="text-sm font-medium">Prompt</label>
        <Input
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          placeholder="Enter your design prompt..."
          required
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <ImageUploadField
          label="Product Image"
          imageUrl={images.product?.url || null}
          onChange={(file) => handleImageChange("product", file)}
        />
        <ImageUploadField
          label="Logo"
          imageUrl={images.logo?.url || null}
          onChange={(file) => handleImageChange("logo", file)}
        />
        <ImageUploadField
          label="Example Image"
          imageUrl={images.example?.url || null}
          onChange={(file) => handleImageChange("example", file)}
        />
      </div>

      <Button type="submit" disabled={loading} className="w-full">
        {loading ? "Generating..." : "Generate Image"}
      </Button>

      {result && (
        <div className="mt-6">
          <h3 className="text-lg font-medium mb-2">Generated Result</h3>
          <div className="relative w-full h-96">
            <Image
              src={result}
              alt="Generated image"
              fill
              className="object-contain rounded-lg"
            />
          </div>
        </div>
      )}
    </form>
  );
}
