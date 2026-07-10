
export default function PlayerCard({ player }) {
    return (
        <div className="card">
            <h2>{player.name}</h2>
            <p className="subtitle">
                {player.club} • {player.nation}
            </p>
            <p className="meta">Position: {player.position}</p>

            <div className="stats">
                <p><span>Pace</span> <span>{player.pace}</span></p>
                <p><span>Shooting</span> <span>{player.shooting}</span></p>
                <p><span>Passing</span> <span>{player.passing}</span></p>
                <p><span>Dribbling</span> <span>{player.dribbling}</span></p>
                <p><span>Defending</span> <span>{player.defending}</span></p>
                <p><span>Physical</span> <span>{player.physical}</span></p>
            </div>

            <p className="overall"><span>Overall</span> <span>{player.overall}</span></p>
        </div>
    );
}