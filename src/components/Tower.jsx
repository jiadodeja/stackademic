import { TOTAL_QUESTIONS } from "../hooks/useGameState.js";

// Small visual progress tower. This is explicitly a PROGRESS INDICATOR,
// not a stand-in for the real physical tower. It shows `height` blocks
// out of TOTAL_QUESTIONS, stacked bottom-up like a real Jenga tower.
//
// `falling` triggers the "tower collapse" animation for a wrong answer.
export default function Tower({ height, falling }) {
  const blocks = Array.from({ length: TOTAL_QUESTIONS }, (_, i) => i);

  return (
    <div className={`tower-wrap ${falling ? "tower-wrap--falling" : ""}`}>
      <div className="tower-label">YOUR PROGRESS TOWER</div>
      <div className={`tower ${falling ? "tower--falling" : ""}`}>
        {blocks.map((i) => {
          const filled = i < height;
          // Stagger each block's fall animation slightly for a chaotic collapse.
          const style = falling
            ? {
                animationDelay: `${(TOTAL_QUESTIONS - i) * 0.04}s`,
                "--fall-x": `${(Math.random() - 0.5) * 220}px`,
                "--fall-rot": `${(Math.random() - 0.5) * 720}deg`,
              }
            : undefined;
          return (
            <div
              key={i}
              className={`tower-block ${filled ? "tower-block--filled" : ""} ${
                falling && filled ? "tower-block--fall" : ""
              }`}
              style={style}
            />
          );
        })}
      </div>
      <div className="tower-height-caption">
        {height} / {TOTAL_QUESTIONS} blocks
      </div>
    </div>
  );
}
