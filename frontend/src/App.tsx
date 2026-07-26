import Header from "./components/Header";
import PlayerStats from "./components/PlayerStats";
import MatchPrediction from "./components/MatchPrediction";

function App() {
  return (
    <div className="min-h-screen bg-gray-100">
      <Header />
      <main className="max-w-6xl mx-auto p-6 space-y-12">
        <PlayerStats />
        <MatchPrediction />
      </main>
    </div>
  );
}

export default App;