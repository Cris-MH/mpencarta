import type { Imagen } from "@/lib/types";

interface ImageGalleryProps {
  imagenes: Imagen[];
}

export default function ImageGallery({ imagenes }: ImageGalleryProps) {
  if (!imagenes || imagenes.length === 0) {
    return null;
  }

  return (
    <section aria-label="Galería de imágenes" className="w-full space-y-6">
      {imagenes.map((imagen, index) => (
        <figure key={`${imagen.src}-${index}`} className="w-full">
          <img
            src={imagen.src}
            alt={imagen.alt}
            className="w-full max-w-full h-auto rounded-lg"
            loading="lazy"
          />
          {imagen.caption && (
            <figcaption className="mt-2 text-sm text-gray-600 text-center">
              {imagen.caption}
            </figcaption>
          )}
        </figure>
      ))}
    </section>
  );
}
