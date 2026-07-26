import { useEffect, useState } from "react";
import { getAllTeams, predictMatch } from "../api/services";

function MatchPrediction() {
  const [teams, setTeams] = useState<any[]>([]);
  const [teamAId, setTeamAId] = useState("");
  const [teamBId, setTeamBId] = useState("");
  const [result, setResult] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    async function loadTeams() {
      try {
        const data = await getAllTeams();
        setTeams(data);
      } catch (err) {
        setError("Failed to load teams");
      }
    }
    loadTeams();
  }, []);

  const handlePredict = async () => {
    if (!teamAId || !teamBId) {
      setError("Please select both teams");
      return;
    }

    if (teamAId === teamBId) {
      setError("Please select two different teams");
      return;
    }

    setLoading(true);
    setError("");
    setResult(null);

    try {
      const data = await predictMatch(teamAId, teamBId);
      setResult(data);
    } catch (err) {
      setError("Failed to get prediction");
    } finally {
      setLoading(false);
    }
  };

  const getTeamName = (id: string) => {
    const team = teams.find((t) => t.id === id);
    return team ? `${team.name} (${team.short_name})` : id;
  };

  return (
    <section className="mt-12">
      <h2 className="text-xl font-semibold mb-4">Match Prediction</h2>

      <div className="bg-white p-6 rounded-lg shadow border max-w-2xl">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          {/* Team A */}
          <div>
            <label className="block text-sm font-medium mb-1">Team A</label>
            <select
              value={teamAId}
              onChange={(e) => setTeamAId(e.target.value)}
              className="border px-3 py-2 rounded w-full"
            >
              <option value="">Select Team</option>
              {teams.map((team) => (
                <option key={team.id} value={team.id}>
                  {team.name} ({team.short_name})
                </option>
              ))}
            </select>
          </div>

          {/* Team B */}
          <div>
            <label className="block text-sm font-medium mb-1">Team B</label>
            <select
              value={teamBId}
              onChange={(e) => setTeamBId(e.target.value)}
              className="border px-3 py-2 rounded w-full"
            >
              <option value="">Select Team</option>
              {teams.map((team) => (
                <option key={team.id} value={team.id}>
                  {team.name} ({team.short_name})
                </option>
              ))}
            </select>
          </div>
        </div>

        <button
          onClick={handlePredict}
          disabled={loading}
          className="bg-green-700 text-white px-4 py-2 rounded hover:bg-green-800 disabled:opacity-50"
        >
          {loading ? "Predicting..." : "Predict Winner"}
        </button>

        {error && <p className="text-red-500 mt-3">{error}</p>}

        {result && (
          <div className="mt-6 p-4 bg-green-50 border border-green-200 rounded">
            <h3 className="font-semibold mb-2">Prediction Result</h3>

            <p>
              <strong>{getTeamName(result.team_a_id)}</strong>:{" "}
              {(result.team_a_win_probability * 100).toFixed(0)}%
            </p>

            <p>
              <strong>{getTeamName(result.team_b_id)}</strong>:{" "}
              {(result.team_b_win_probability * 100).toFixed(0)}%
            </p>

            <p className="mt-2 font-medium">
              Predicted Winner:{" "}
              <span className="text-green-700">
                {getTeamName(result.predicted_winner_id)}
              </span>
            </p>

            <p className="text-xs text-gray-500 mt-1">
              Model: {result.model}
            </p>
          </div>
        )}
      </div>
    </section>
  );
}

export default MatchPrediction;