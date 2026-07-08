import { useEffect, useState } from "react";
import { getPlayers } from "./api/players";
import SetupScreen from "./components/SetupScreen";
import GameCard from "./components/GameCard";
import "./App.css";

const STATS = [
  { key: "pace", label: "Tempo" },
  { key: "shooting", label: "Schuss" },
  { key: "passing", label: "Passen" },
  { key: "dribbling", label: "Dribbling" },
  { key: "defending", label: "Verteidigung" },
  { key: "physical", label: "Physis" },
  { key: "overall", label: "Gesamt" },
];

function shuffle(array) {
  const a = [...array];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

function App() {
  const [allPlayers, setAllPlayers] = useState([]);
  const [loadError, setLoadError] = useState(null);

  const [phase, setPhase] = useState("setup"); // "setup" | "playing" | "gameover"
  const [names, setNames] = useState(["", ""]);
  const [decks, setDecks] = useState([[], []]); // index 0 = oberste Karte
  const [turn, setTurn] = useState(0); // wer ist am Zug
  const [selectedStat, setSelectedStat] = useState(null); // gewählter Wert (aufgedeckt)
  const [result, setResult] = useState(null); // { outcome: 0 | 1 | "tie", statKey }
  const [disabledStats, setDisabledStats] = useState([]); // in dieser Runde schon versucht (Unentschieden)
  const [winner, setWinner] = useState(null);

  useEffect(() => {
    getPlayers()
      .then(setAllPlayers)
      .catch((e) => setLoadError(e.message));
  }, []);

  function startGame(p1, p2) {
    const shuffled = shuffle(allPlayers);
    const mid = Math.floor(shuffled.length / 2);
    setNames([p1, p2]);
    setDecks([shuffled.slice(0, mid), shuffled.slice(mid)]);
    setTurn(0);
    setSelectedStat(null);
    setResult(null);
    setDisabledStats([]);
    setWinner(null);
    setPhase("playing");
  }

  function chooseStat(statKey) {
    if (selectedStat) return; // schon aufgedeckt

    const other = turn === 0 ? 1 : 0;
    const valTurn = decks[turn][0][statKey];
    const valOther = decks[other][0][statKey];

    let outcome;
    if (valTurn > valOther) outcome = turn;
    else if (valOther > valTurn) outcome = other;
    else outcome = "tie";

    setSelectedStat(statKey);
    setResult({ outcome, statKey });
  }

  function nextRound() {
    // Unentschieden: Karten bleiben liegen, gleicher Spieler wählt einen anderen Wert
    if (result.outcome === "tie") {
      setDisabledStats((d) => [...d, result.statKey]);
      setSelectedStat(null);
      setResult(null);
      return;
    }

    const w = result.outcome;
    const l = w === 0 ? 1 : 0;

    const newDecks = [[...decks[0]], [...decks[1]]];
    const winnerCard = newDecks[w].shift();
    const loserCard = newDecks[l].shift();
    // zuerst Verlierer-, dann Gewinner-Karte unten anreihen
    newDecks[w].push(loserCard, winnerCard);

    setSelectedStat(null);
    setResult(null);
    setDisabledStats([]);

    if (newDecks[l].length === 0) {
      setDecks(newDecks);
      setWinner(w);
      setPhase("gameover");
      return;
    }

    setTurn(w); // Gewinner darf wieder anfangen
    setDecks(newDecks);
  }

  if (phase === "setup") {
    return (
      <SetupScreen
        onStart={startGame}
        loading={allPlayers.length === 0}
        error={loadError}
      />
    );
  }

  if (phase === "gameover") {
    return (
      <main className="quartett gameover">
        <h1>🏆 {names[winner]} gewinnt!</h1>
        <p className="subtitle">Alle Karten gewonnen.</p>
        <button className="btn" onClick={() => setPhase("setup")}>
          Neues Spiel
        </button>
      </main>
    );
  }

  // phase === "playing"
  const other = turn === 0 ? 1 : 0;

  const turnResult = result
    ? result.outcome === turn
      ? "win"
      : result.outcome === "tie"
        ? "tie"
        : "lose"
    : undefined;

  const otherResult = result
    ? result.outcome === other
      ? "win"
      : result.outcome === "tie"
        ? "tie"
        : "lose"
    : undefined;

  let banner;
  if (!result) banner = `${names[turn]} ist am Zug – wähle einen Wert`;
  else if (result.outcome === "tie")
    banner = "Unentschieden – wähle einen anderen Wert";
  else banner = `${names[result.outcome]} gewinnt die Runde`;

  return (
    <main className="quartett">
      <h1>Football Quartett</h1>

      <div className="scoreboard">
        {[0, 1].map((i) => (
          <div key={i} className={`score${turn === i ? " active" : ""}`}>
            <span className="pname">{names[i]}</span>
            <span className="pcount">{decks[i].length} Karten</span>
          </div>
        ))}
      </div>

      <p className={`banner${result && result.outcome !== "tie" ? " win" : ""}`}>
        {banner}
      </p>

      <div className="board">
        <GameCard
          player={decks[turn][0]}
          stats={STATS}
          owner={names[turn]}
          interactive={!selectedStat}
          onSelect={chooseStat}
          selectedStat={selectedStat}
          disabledStats={disabledStats}
          resultForCard={turnResult}
        />

        <div className="vs">VS</div>

        <GameCard
          player={decks[other][0]}
          stats={STATS}
          owner={names[other]}
          hidden={!selectedStat}
          selectedStat={selectedStat}
          resultForCard={otherResult}
        />
      </div>

      {result && (
        <button className="btn" onClick={nextRound}>
          {result.outcome === "tie" ? "Nochmal wählen" : "Nächste Runde"}
        </button>
      )}
    </main>
  );
}

export default App;
