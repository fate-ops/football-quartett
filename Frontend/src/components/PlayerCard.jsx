export default function PlayerCard({ player }) {
  return (
    <div className="card">
      <h2>{player.name}</h2>
      <p>
        {player.club} • {player.nation}
      </p>
      <p>Position: {player.position}</p>

      <ul>
        <li>Pace: {player.pace}</li>
        <li>Shooting: {player.shooting}</li>
        <li>Passing: {player.passing}</li>
        <li>Dribbling: {player.dribbling}</li>
        <li>Defending: {player.defending}</li>
        <li>Physical: {player.physical}</li>
        <li>Overall: {player.overall}</li>
      </ul>
    </div>
  );
}
