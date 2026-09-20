export default function StartScreen({ bestStreak, onStart }) {
  return (
    <div className="screen start-screen">
      <h1 className="game-title">BUILD YOUR TOWER</h1>
      <p className="start-tagline">How high can you build?</p>
      <p className="start-instructions">
        Answer 10 AI questions correctly to build your tower.
        <br />
        Get one wrong...
        <br />
        and the tower falls.
      </p>

      <div className="best-streak-badge">
        <div className="best-streak-label">BEST STREAK</div>
        <div className="best-streak-value">{bestStreak}</div>
      </div>

      <button className="start-btn" onClick={onStart}>
        START GAME
      </button>
    </div>
  );
}
