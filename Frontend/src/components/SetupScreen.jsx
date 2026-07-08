import { useState } from "react";

export default function SetupScreen({ onStart, loading, error }) {
  const [p1, setP1] = useState("");
  const [p2, setP2] = useState("");

  const canStart = p1.trim() && p2.trim() && !loading && !error;

  function submit(e) {
    e.preventDefault();
    if (!canStart) return;
    onStart(p1.trim(), p2.trim());
  }

  return (
    <main className="quartett">
      <h1>Football Quartett</h1>
      <p className="subtitle">Tragt eure Namen ein und legt los.</p>

      <form className="setup" onSubmit={submit}>
        <label>
          Spieler 1
          <input
            value={p1}
            onChange={(e) => setP1(e.target.value)}
            placeholder="Name Spieler 1"
            maxLength={20}
          />
        </label>

        <label>
          Spieler 2
          <input
            value={p2}
            onChange={(e) => setP2(e.target.value)}
            placeholder="Name Spieler 2"
            maxLength={20}
          />
        </label>

        {error && <p className="error">Karten konnten nicht geladen werden: {error}</p>}
        {loading && !error && <p className="hint">Lade Karten …</p>}

        <button className="btn" type="submit" disabled={!canStart}>
          Spiel starten
        </button>
      </form>
    </main>
  );
}
