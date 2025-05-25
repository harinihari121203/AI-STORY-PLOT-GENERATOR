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
      const response = await fetch("http://localhost:5000/generate-story", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
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
    <div
      style={{
        maxWidth: 600,
        margin: "40px auto",
        fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
        padding: "0 20px",
      }}
    >
      <h1
        style={{
          textAlign: "center",
          color: "#4b6cb7",
          background:
            "linear-gradient(90deg, #4b6cb7 0%, #182848 100%)",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
          fontWeight: "700",
          fontSize: "2.8rem",
          marginBottom: 30,
          userSelect: "none",
        }}
      >
        AI Story Plot Generator
      </h1>

      {/** Input fields */}
      <label style={{ display: "block", marginBottom: 12, fontWeight: "600", color: "#333" }}>
        Genre:
        <input
          type="text"
          value={genre}
          onChange={(e) => setGenre(e.target.value)}
          placeholder="e.g. fantasy, sci-fi"
          style={{
            width: "100%",
            padding: "10px 12px",
            marginTop: 6,
            borderRadius: 8,
            border: "1.5px solid #ddd",
            boxShadow: "inset 1px 2px 5px #eee",
            fontSize: 16,
            transition: "border-color 0.3s",
          }}
          onFocus={(e) => (e.target.style.borderColor = "#4b6cb7")}
          onBlur={(e) => (e.target.style.borderColor = "#ddd")}
        />
      </label>

      <label style={{ display: "block", marginBottom: 12, fontWeight: "600", color: "#333" }}>
        Characters:
        <input
          type="text"
          value={characters}
          onChange={(e) => setCharacters(e.target.value)}
          placeholder="e.g. knight, dragon"
          style={{
            width: "100%",
            padding: "10px 12px",
            marginTop: 6,
            borderRadius: 8,
            border: "1.5px solid #ddd",
            boxShadow: "inset 1px 2px 5px #eee",
            fontSize: 16,
            transition: "border-color 0.3s",
          }}
          onFocus={(e) => (e.target.style.borderColor = "#4b6cb7")}
          onBlur={(e) => (e.target.style.borderColor = "#ddd")}
        />
      </label>

      <label style={{ display: "block", marginBottom: 20, fontWeight: "600", color: "#333" }}>
        Theme:
        <input
          type="text"
          value={theme}
          onChange={(e) => setTheme(e.target.value)}
          placeholder="e.g. betrayal, redemption"
          style={{
            width: "100%",
            padding: "10px 12px",
            marginTop: 6,
            borderRadius: 8,
            border: "1.5px solid #ddd",
            boxShadow: "inset 1px 2px 5px #eee",
            fontSize: 16,
            transition: "border-color 0.3s",
          }}
          onFocus={(e) => (e.target.style.borderColor = "#4b6cb7")}
          onBlur={(e) => (e.target.style.borderColor = "#ddd")}
        />
      </label>

      <button
        onClick={generateStory}
        disabled={loading}
        style={{
          width: "100%",
          padding: "14px",
          background: "linear-gradient(90deg, #4b6cb7 0%, #182848 100%)",
          border: "none",
          borderRadius: 10,
          color: "white",
          fontWeight: "700",
          fontSize: 18,
          cursor: loading ? "not-allowed" : "pointer",
          boxShadow: "0 4px 12px rgba(27, 43, 82, 0.4)",
          transition: "background 0.3s",
          userSelect: "none",
        }}
        onMouseEnter={(e) => {
          if (!loading) e.target.style.background = "linear-gradient(90deg, #182848 0%, #4b6cb7 100%)";
        }}
        onMouseLeave={(e) => {
          if (!loading) e.target.style.background = "linear-gradient(90deg, #4b6cb7 0%, #182848 100%)";
        }}
      >
        {loading ? "Generating..." : "Generate Story"}
      </button>

      {error && (
        <p
          style={{
            color: "#d93025",
            marginTop: 24,
            backgroundColor: "#fce8e6",
            borderRadius: 8,
            padding: "12px 16px",
            fontWeight: "600",
            boxShadow: "inset 1px 1px 3px #d93025",
          }}
        >
          Error: {error}
        </p>
      )}

      {story && (
        <div
          style={{
            marginTop: 30,
            whiteSpace: "pre-wrap",     // preserves line breaks and spaces
            padding: 20,
            backgroundColor: "#f0f4f8", // subtle light background
            borderRadius: 8,
            border: "1px solid #ccc",
            fontFamily: "'Georgia', serif",  // nice readable font for story text
            fontSize: 16,
            color: "#333",
            boxShadow: "0 4px 6px rgba(0,0,0,0.1)",
            lineHeight: 1.6,
          }}
        >
          <h2 style={{ marginTop: 0, marginBottom: 15, color: "#2c3e50" }}>Generated Story:</h2>
          <p>{story}</p>
        </div>
      )}
    </div>
  );
}

export default App;
