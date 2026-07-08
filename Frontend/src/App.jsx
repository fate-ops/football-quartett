import { useEffect, useState } from "react";
import { getPlayers } from "./api/players";
import PlayerCard from "./components/PlayerCard";

function App() {
  const [players, setPlayers] = useState([]);

  useEffect(() => {
    getPlayers().then(setPlayers).catch(console.error);
  }, []);

  return (
    <main>
      <h1>Football Quartett</h1>

      <div className="cards">
        {players.map((player) => (
          <PlayerCard key={player.id} player={player} />
        ))}
      </div>
    </main>
  );
}

export default App;
