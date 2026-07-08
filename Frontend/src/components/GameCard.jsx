export default function GameCard({
  player,
  stats,
  owner,
  interactive = false,
  onSelect,
  selectedStat,
  disabledStats = [],
  hidden = false,
  resultForCard, // "win" | "lose" | "tie" | undefined
}) {
  if (hidden) {
    return (
      <div className="game-card back">
        <div className="card-owner">{owner}</div>
        <div className="back-art">⚽</div>
        <div className="back-text">Gegner-Karte</div>
      </div>
    );
  }

  return (
    <div className={`game-card${resultForCard ? " " + resultForCard : ""}`}>
      <div className="card-owner">{owner}</div>
      <h2>{player.name}</h2>
      <p className="meta">
        {player.club} • {player.nation} • {player.position}
      </p>

      <ul className="stats">
        {stats.map((s) => {
          const isSelected = selectedStat === s.key;
          const isDisabled = disabledStats.includes(s.key);

          return (
            <li key={s.key} className={`stat-row${isSelected ? " selected" : ""}`}>
              {interactive ? (
                <button
                  type="button"
                  className="stat-btn"
                  disabled={isDisabled}
                  onClick={() => onSelect(s.key)}
                >
                  <span className="label">{s.label}</span>
                  <span className="val">{player[s.key]}</span>
                </button>
              ) : (
                <div className="stat-line">
                  <span className="label">{s.label}</span>
                  <span className="val">{player[s.key]}</span>
                </div>
              )}
            </li>
          );
        })}
      </ul>
    </div>
  );
}
