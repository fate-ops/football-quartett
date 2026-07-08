const API_URL = "http://localhost:8080/api/players";

export async function getPlayers() {
  const response = await fetch(API_URL);

  if (!response.ok) {
    throw new Error("Spieler konnten nicht geladen werden");
  }

  return response.json();
}
