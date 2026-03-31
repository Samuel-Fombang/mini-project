import { useState } from "react";
import SearchBar from "./components/SearchBar";
import ArtworkCard from "./components/ArtworkCard";
import Gallery from "./components/Gallery";
import { searchArtworks } from "./lib/api";
import type { Artwork } from "./lib/schema";

export default function App() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<Artwork[]>([]);

  const handleSearch = async () => {
    const data = await searchArtworks(query);
    setResults(data);
  };

  return (
    <div style={{ padding: 20 }}>
      <h1>🎨 Mini Project</h1>

      <SearchBar
        query={query}
        setQuery={setQuery}
        onSearch={handleSearch}
      />

      <div>
        {results.map((art) => (
          <ArtworkCard key={art.id} artwork={art} />
        ))}
      </div>

      <Gallery />
    </div>
  );
}