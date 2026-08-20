import type { Imagen } from "@/lib/types";

interface ImageGalleryProps {
  imagenes: Imagen[];
}

export default function ImageGallery({ imagenes }: ImageGalleryProps) {
  if (!imagenes || imagenes.length === 0) {
    return null;
  }

  return (
    <section aria-label="Galería de imágenes" className="w-full space-y-3">
      {imagenes.map((imagen, index) => (
        <figure
          key={`${imagen.src}-${index}`}
          className="w-full border border-[#8b7d5e] bg-white p-1"
          style={{ boxShadow: "0 1px 2px rgba(0,0,0,0.15)" }}
        >
          <img
            src={imagen.src}
            alt={imagen.alt}
            className="w-full max-w-full h-auto"
            loading="lazy"
          />
          {imagen.caption && (
            <figcaption className="mt-1 px-1 py-0.5 text-[11px] text-[#6b5d3e] text-center bg-[#f8f4e8] border-t border-[#e8e0c8]">
              {imagen.caption}
            </figcaption>
          )}
        </figure>
      ))}
    </section>
  );
}
