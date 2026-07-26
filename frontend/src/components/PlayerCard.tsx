interface PlayerCardProps {
  player: {
    id: string;
    name: string;
    country?: string;
    role?: string;
    batting_style?: string;
    bowling_style?: string;
  };
}

function PlayerCard({ player }: PlayerCardProps) {
  return (
    <div className="bg-white p-4 rounded-lg shadow border hover:shadow-md transition">
      <h3 className="font-bold text-lg">{player.name}</h3>
      <p className="text-sm text-gray-600">
        {player.country} • {player.role}
      </p>
      {player.batting_style && (
        <p className="text-xs text-gray-500 mt-1">
          Batting: {player.batting_style}
        </p>
      )}
      {player.bowling_style && (
        <p className="text-xs text-gray-500">
          Bowling: {player.bowling_style}
        </p>
      )}
    </div>
  );
}

export default PlayerCard;