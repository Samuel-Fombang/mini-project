import { useState } from "react";
import type { Artwork } from "../lib/schema";

type Props = {
  artwork: Artwork;
};

export default function ArtworkCard({ artwork }: Props) {
  const [note, setNote] = useState(artwork.note || "");

  const imageUrl = artwork.image_id
    ? `https://www.artic.edu/iiif/2/${artwork.image_id}/full/400,/0/default.jpg`
    : "";

  // ✅ ADD TO GALLERY
  const addToGallery = () => {
    const gallery: Artwork[] = JSON.parse(
      localStorage.getItem("gallery") || "[]"
    );

    const exists = gallery.some((item) => item.id === artwork.id);

    if (!exists) {
      gallery.push({ ...artwork, note: "" });
      localStorage.setItem("gallery", JSON.stringify(gallery));
    }

    alert("Added to Gallery");
  };

  // ✅ SAVE NOTE
  const saveNote = () => {
    const gallery: Artwork[] = JSON.parse(
      localStorage.getItem("gallery") || "[]"
    );

    const updated = gallery.map((item) => {
      if (item.id === artwork.id) {
        return { ...item, note };
      }
      return item;
    });

    localStorage.setItem("gallery", JSON.stringify(updated));

    alert("Note saved");
  };

  // ✅ DELETE
  const deleteArtwork = () => {
    const gallery: Artwork[] = JSON.parse(
      localStorage.getItem("gallery") || "[]"
    );

    const filtered = gallery.filter((item) => item.id !== artwork.id);

    localStorage.setItem("gallery", JSON.stringify(filtered));

    alert("Deleted");
  };

  return (
    <div className="card">
      {imageUrl && <img src={imageUrl} alt={artwork.title} />}

      <h3>{artwork.title}</h3>
      <p>{artwork.artist_title}</p>

      {/* ✅ BUTTONS MUST HAVE type="button" */}
      <button type="button" className="add-btn" onClick={addToGallery}>
        Add to Gallery
      </button>

      <button type="button" className="delete-btn" onClick={deleteArtwork}>
        Delete
      </button>

      <input
        className="note-input"
        value={note}
        onChange={(e) => setNote(e.target.value)}
        placeholder="Write note..."
      />

      <button type="button" className="note-btn" onClick={saveNote}>
        Save Note
      </button>

      {artwork.note && <p>📝 {artwork.note}</p>}
    </div>
  );
}