import { useState } from "react";

function App() {
  const [genre, setGenre] = useState("");
  const [characters, setCharacters] = useState("");
  const [theme, setTheme] = useState("");
  const [story, setStory] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  async function generateStory() {
    setLoading(true);
    setError(null);
    setStory("");

    try {
      const response = await fetch("http://localhost:5000/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ genre, characters, theme }),
      });

      const data = await response.json();
      if (response.ok) {
        setStory(data.story);
      } else {
        setError(data.error || "Something went wrong");
      }
    } catch (err) {
      setError(err.message || "Network error");
    }
    setLoading(false);
  }

  return (
    <div style={{ maxWidth: 600, margin: "30px auto", fontFamily: "Arial" }}>
      <h1>AI Story Plot Generator</h1>

      <label>
        Genre:
        <input
          type="text"
          value={genre}
          onChange={(e) => setGenre(e.target.value)}
          placeholder="e.g. fantasy, sci-fi"
          style={{ width: "100%", padding: 8, margin: "8px 0" }}
        />
      </label>

      <label>
        Characters:
        <input
          type="text"
          value={characters}
          onChange={(e) => setCharacters(e.target.value)}
          placeholder="e.g. knight, dragon"
          style={{ width: "100%", padding: 8, margin: "8px 0" }}
        />
      </label>

      <label>
        Theme:
        <input
          type="text"
          value={theme}
          onChange={(e) => setTheme(e.target.value)}
          placeholder="e.g. betrayal, redemption"
          style={{ width: "100%", padding: 8, margin: "8px 0" }}
        />
      </label>

      <button
        onClick={generateStory}
        disabled={loading}
        style={{
          padding: "10px 20px",
          backgroundColor: "#007bff",
          color: "white",
          border: "none",
          cursor: "pointer",
          marginTop: 10,
        }}
      >
        {loading ? "Generating..." : "Generate Story"}
      </button>

      {error && (
        <p style={{ color: "red", marginTop: 20 }}>
          Error: {error}
        </p>
      )}

      {story && (
        <div
          style={{
            marginTop: 30,
            whiteSpace: "pre-wrap",
            padding: 15,
            backgroundColor: "#f9f9f9",
            borderRadius: 5,
            border: "1px solid #ddd",
          }}
        >
          <h2>Generated Story:</h2>
          <p>{story}</p>
        </div>
      )}
    </div>
  );
}

export default App;
