const API_BASE_URL = "http://localhost:3000";

// ==================== PLAYERS ====================
export async function getAllPlayers() {
  const res = await fetch(`${API_BASE_URL}/players`);
  if (!res.ok) throw new Error("Failed to fetch players");
  return res.json();
}

export async function searchPlayers(query: string) {
  const res = await fetch(
    `${API_BASE_URL}/players/search?q=${encodeURIComponent(query)}`
  );
  if (!res.ok) throw new Error("Failed to search players");
  return res.json();
}

export async function getPlayerById(id: string) {
  const res = await fetch(`${API_BASE_URL}/players/${id}`);
  if (!res.ok) throw new Error("Player not found");
  return res.json();
}

// ==================== TEAMS ====================
export async function getAllTeams() {
  const res = await fetch(`${API_BASE_URL}/teams`);
  if (!res.ok) throw new Error("Failed to fetch teams");
  return res.json();
}

// ==================== MATCHES ====================
export async function getAllMatches() {
  const res = await fetch(`${API_BASE_URL}/matches`);
  if (!res.ok) throw new Error("Failed to fetch matches");
  return res.json();
}

// ==================== ANALYTICS ====================
export async function predictMatch(teamAId: string, teamBId: string) {
  const res = await fetch(
    `${API_BASE_URL}/analytics/predict-match?teamAId=${teamAId}&teamBId=${teamBId}`,
    {
      method: "POST",
    }
  );

  if (!res.ok) {
    throw new Error("Failed to get prediction");
  }

  return res.json();
}