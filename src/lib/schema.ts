import { z } from "zod";

// FR003: Artwork Schema
export const ArtworkSchema = z.object({
  id: z.number(),
  title: z.string().default("Untitled"),
  artist_title: z.string().nullable().default("Unknown Artist"),
  image_id: z.string().nullable(),
  note: z.string().optional(),
});

// API array validation
export const ArtworkArraySchema = z.array(ArtworkSchema);

// FR010: Notes validation
export const NoteSchema = z.string().max(200);

// FR012: Single source of truth
export type Artwork = z.infer<typeof ArtworkSchema>;