import { TOTAL_QUESTIONS } from "../hooks/useGameState.js";

export default function WinScreen({ bestStreak, onPlayAgain }) {
  return (
    <div className="screen win-screen">
      <div className="confetti" aria-hidden="true">
        {Array.from({ length: 40 }, (_, i) => (
          <span
            key={i}
            className="confetti-piece"
            style={{
              left: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 1.2}s`,
              backgroundColor: ["#ffd54a", "#4ade80", "#60a5fa", "#f472b6", "#fb923c"][i % 5],
            }}
          />
        ))}
      </div>

      <h1 className="win-title">YOU WIN!</h1>
      <div className="win-stat">
        {TOTAL_QUESTIONS} / {TOTAL_QUESTIONS} CORRECT
      </div>
      <div className="win-stat win-stat--tower">Tower Height: {TOTAL_QUESTIONS}</div>
      <div className="win-best-streak">BEST STREAK: {bestStreak}</div>

      <button className="start-btn" onClick={onPlayAgain}>
        BUILD AGAIN
      </button>
    </div>
  );
}
