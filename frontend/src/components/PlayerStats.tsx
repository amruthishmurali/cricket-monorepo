import { useEffect, useState } from "react";
import { getAllPlayers, searchPlayers } from "../api/services";
import SearchBar from "./SearchBar";
import PlayerList from "./PlayerList";

function PlayerStats() {
  const [players, setPlayers] = useState<any[]>([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const loadPlayers = async () => {
    setLoading(true);
    setError("");

    try {
      const data = search.trim()
        ? await searchPlayers(search)
        : await getAllPlayers();
      setPlayers(data);
    } catch (err) {
      setError("Failed to load players from server");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadPlayers();
  }, []);

  return (
    <section>
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
        <h2 className="text-xl font-semibold">Players</h2>
        <SearchBar
          value={search}
          onChange={setSearch}
          onSearch={loadPlayers}
          loading={loading}
        />
      </div>

      {error && (
        <div className="bg-red-100 text-red-700 p-3 rounded mb-4">
          {error}
        </div>
      )}

      <PlayerList players={players} loading={loading} />
    </section>
  );
}

export default PlayerStats;