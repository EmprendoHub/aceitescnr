import Image from "next/image";

export default function PreviewImage({ images }) {
  return (
    <div>
      {Object.keys(images).map(
        (key) =>
          images[key] && (
            <div key={key}>
              <h3>{key.replace(/([A-Z])/g, " $1")}</h3>
              <Image
                src={URL.createObjectURL(images[key])}
                alt={key}
                width="200"
              />
            </div>
          )
      )}
    </div>
  );
}
