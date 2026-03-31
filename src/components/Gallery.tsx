import { useEffect, useState } from "react";
import ArtworkCard from "./ArtworkCard";
import type { Artwork } from "../lib/schema";

export default function Gallery() {
  const [gallery, setGallery] = useState<Artwork[]>([]);

  const loadGallery = () => {
    const data = JSON.parse(localStorage.getItem("gallery") || "[]");
    setGallery(data);
  };

  useEffect(() => {
    loadGallery();
  }, []);

  return (
    <div>
      <h2>My Gallery</h2>

      {gallery.length === 0 && <p>No artworks saved</p>}

      {gallery.map((art) => (
        <ArtworkCard key={art.id} artwork={art} refresh={loadGallery} />
      ))}
    </div>
  );
}