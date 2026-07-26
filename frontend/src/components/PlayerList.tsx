import PlayerCard from "./PlayerCard";

interface PlayerListProps {
  players: any[];
  loading: boolean;
}

function PlayerList({ players, loading }: PlayerListProps) {
  if (loading) {
    return <p className="text-gray-500">Loading players...</p>;
  }

  if (players.length === 0) {
    return <p className="text-gray-500">No players found.</p>;
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {players.map((player) => (
        <PlayerCard key={player.id} player={player} />
      ))}
    </div>
  );
}

export default PlayerList;