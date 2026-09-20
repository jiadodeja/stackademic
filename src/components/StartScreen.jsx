import { useState } from "react";
import { connectHardware, isHardwareConnected } from "../hardware/shakePlate.js";

export default function StartScreen({ bestStreak, onStart }) {
  const [hwStatus, setHwStatus] = useState(
    isHardwareConnected() ? "connected" : "idle"
  );

  async function handleConnect() {
    setHwStatus("connecting");
    try {
      await connectHardware();
      setHwStatus("connected");
    } catch (err) {
      console.error(err);
      setHwStatus("error");
    }
  }

  const connectLabel = {
    idle: "Connect Shake Plate",
    connecting: "Connecting...",
    connected: "Shake Plate Connected",
    error: "Connection Failed, Try Again",
  }[hwStatus];

  return (
    <div className="screen start-screen">
      <h1 className="game-title">STACKADEMIC</h1>
      <p className="brand-label">Build Your Tower</p>
      <p className="start-tagline">How high can you build?</p>
      <p className="start-instructions">
        Answer 20 AI questions correctly to build your tower.
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

      <button
        className={`connect-hw-btn connect-hw-btn--${hwStatus}`}
        onClick={handleConnect}
        disabled={hwStatus === "connected" || hwStatus === "connecting"}
      >
        {connectLabel}
      </button>
    </div>
  );
}
