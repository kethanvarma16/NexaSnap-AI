import { useState } from "react";

const API = "http://127.0.0.1:8000";

export default function App() {
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [busy, setBusy] = useState(false);
  const [fileName, setFileName] = useState("");
  const [mode, setMode] = useState("study");

  async function askAI() {
    if (!question.trim()) return;
    setBusy(true);
    setAnswer("");

    try {
      const response = await fetch(`${API}/api/ask`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ question, mode }),
      });
      const data = await response.json();
      setAnswer(data.answer);
    } catch {
      setAnswer(
        "The backend is not running. Start FastAPI with: uvicorn main:app --reload"
      );
    } finally {
      setBusy(false);
    }
  }

  async function uploadImage(event) {
    const file = event.target.files?.[0];
    if (!file) return;

    setFileName(file.name);
    setBusy(true);

    const form = new FormData();
    form.append("file", file);

    try {
      const response = await fetch(`${API}/api/analyze-image`, {
        method: "POST",
        body: form,
      });
      const data = await response.json();
      setAnswer(data.answer || "Image received.");
    } catch {
      setAnswer("Could not connect to the NexaSnap AI backend.");
    } finally {
      setBusy(false);
    }
  }

  return (
    <div className="app-shell">
      <header className="topbar">
        <div className="brand">
          <div className="logo">N</div>
          <div>
            <h1>NexaSnap AI</h1>
            <p>Intelligent AI for Snapdragon PCs</p>
          </div>
        </div>
        <div className="status">
          <span className="dot" />
          Prototype mode
        </div>
      </header>

      <main className="content">
        <section className="hero">
          <p className="eyebrow">ON-DEVICE AI ASSISTANT</p>
          <h2>Understand. Learn. Create.</h2>
          <p>
            A simple AI workspace for students, designed around the AI
            capabilities of Snapdragon-powered PCs.
          </p>
        </section>

        <section className="cards">
          <button className="card" onClick={() => document.getElementById("question").focus()}>
            <span>💬</span>
            <strong>Ask AI</strong>
            <small>Get simple explanations</small>
          </button>
          <label className="card upload-card">
            <span>📷</span>
            <strong>Analyze Screenshot</strong>
            <small>{fileName || "Upload an image"}</small>
            <input type="file" accept="image/*" onChange={uploadImage} hidden />
          </label>
          <button className="card" onClick={() => setMode("summary")}>
            <span>📚</span>
            <strong>Study Mode</strong>
            <small>Summaries and key points</small>
          </button>
        </section>

        <section className="workspace">
          <div className="workspace-head">
            <div>
              <h3>Ask NexaSnap</h3>
              <p>Type a question or paste a problem below.</p>
            </div>
            <select value={mode} onChange={(e) => setMode(e.target.value)}>
              <option value="study">Study</option>
              <option value="summary">Summary</option>
              <option value="coding">Coding</option>
            </select>
          </div>

          <textarea
            id="question"
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            placeholder="Example: Explain dynamic programming in simple words..."
          />

          <button className="ask-button" onClick={askAI} disabled={busy}>
            {busy ? "Processing..." : "Ask NexaSnap AI →"}
          </button>

          {answer && (
            <div className="answer">
              <div className="answer-title">AI Response</div>
              <p>{answer}</p>
            </div>
          )}
        </section>

        <section className="snapdragon">
          <div>
            <p className="eyebrow">DESIGNED FOR SNAPDRAGON</p>
            <h3>AI where it makes sense: on your PC.</h3>
            <p>
              The prototype keeps the AI model layer separate so compatible
              optimized models can be connected to the Snapdragon AI/NPU path
              during hardware testing.
            </p>
          </div>
          <div className="chip">⚡ AI / NPU</div>
        </section>
      </main>

      <footer>
        NexaSnap AI · Prototype · Built for the Snapdragon AI Lab challenge
      </footer>
    </div>
  );
}