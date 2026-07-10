import { useEffect, useState } from "react";
import { getPlayers } from "./api/players";
import PlayerCard from "./components/PlayerCard";

import "./App.css";

function App() {
  const [cards, setCards] = useState([]);
  const [player1, setPlayer1] = useState([]);
  const [player2, setPlayer2] = useState([]);

  useEffect(() => {
    getPlayers()
        .then((apiCards) =>
        {
          setCards(apiCards);

          if (apiCards.length !== 0) {
            const mixed = [...apiCards].sort(() => Math.random() - 0.5);
            const Mitte = Math.floor(mixed.length / 2);
            const slice1 = mixed.slice(0, Mitte);
            const slice2 = mixed.slice(Mitte);
            setPlayer1(slice1);
            setPlayer2(slice2);
          }
        })
  }, []);

  console.log(player1);
  console.log(player2);

function player1gewinnt(){
  if(player2.length > 0) {
    setPlayer1([...player1.slice(1), player2[0], player1[0]]);
    setPlayer2(player2.slice(1))
  }
}
function player2gewinnt(){
  if(player1.length > 0) {
    setPlayer2([...player2.slice(1), player1[0],player2[0]]);
    setPlayer1(player1.slice(1));
  }

}

  return (
      <>
        <main>
          <h1>Football Quartett</h1>

          <div className="layout">
            <div className="spielfeld">
              <div className="cards">
                <h2>Stapel 1</h2>
                {player1[0] && <PlayerCard key={player1[0].id} player={player1[0]} />}
                <button onClick={player1gewinnt}>Player 1 gewinnt</button>
              </div>

              <div className="cards">
                <h2>Stapel 2</h2>
                {player2[0] && <PlayerCard key={player2[0].id} player={player2[0]} />}
                <button onClick={player2gewinnt}>Player 2 gewinnt</button>
              </div>
            </div>


            <div className="alle-karten">
              <h2>Alle Karten</h2>
              {cards.map(card => (
                  <PlayerCard key={card.id} player={card} />
              ))}
            </div>
          </div>
        </main>
      </>
  );

}

export default App;
