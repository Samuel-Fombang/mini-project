import { ArtworkArraySchema } from "./schema";

export async function searchArtworks(query: string) {
  const res = await fetch(
    `https://api.artic.edu/api/v1/artworks/search?q=${query}&fields=id,title,artist_title,image_id`
  );

  const json = await res.json();

  const parsed = ArtworkArraySchema.safeParse(json.data);

  if (!parsed.success) {
    console.error("Invalid API data", parsed.error);
    return [];
  }

  return parsed.data;
}