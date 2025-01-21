import ImageGenerationForm from "./_componentes/ImageGenerationForm";

export default function UploadPage() {
  return (
    <main className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-8 text-center">
        Image Generation Tool
      </h1>
      <ImageGenerationForm />
    </main>
  );
}
