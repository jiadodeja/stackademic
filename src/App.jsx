import { useEffect } from "react";
import { useGameState, GAME_STATE } from "./hooks/useGameState.js";
import StartScreen from "./components/StartScreen.jsx";
import GameScreen from "./components/GameScreen.jsx";
import WinScreen from "./components/WinScreen.jsx";
import "./App.css";

// How long the feedback flash stays on screen before auto-advancing.
// Kept short per spec: "Do not make the failure animation excessively long."
const CORRECT_FEEDBACK_MS = 1100;
const WRONG_FEEDBACK_MS = 1800;

export default function App() {
  const game = useGameState();
  const { state } = game;

  // Auto-advance timers: after showing feedback for a bit, move on.
  useEffect(() => {
    if (state === GAME_STATE.CORRECT_FEEDBACK) {
      const t = setTimeout(() => game.advanceAfterCorrect(), CORRECT_FEEDBACK_MS);
      return () => clearTimeout(t);
    }
    if (state === GAME_STATE.WRONG_FEEDBACK) {
      const t = setTimeout(() => game.restartAfterWrong(), WRONG_FEEDBACK_MS);
      return () => clearTimeout(t);
    }
  }, [state, game]);

  if (state === GAME_STATE.START) {
    return <StartScreen bestStreak={game.bestStreak} onStart={game.startGame} />;
  }

  if (state === GAME_STATE.WIN) {
    return <WinScreen bestStreak={game.bestStreak} onPlayAgain={game.playAgain} />;
  }

  // PLAYING, CORRECT_FEEDBACK, WRONG_FEEDBACK all render the same game screen,
  // with the feedback overlay layered on top when relevant.
  return (
    <GameScreen
      state={state}
      currentQuestion={game.currentQuestion}
      currentQuestionNumber={game.currentQuestionNumber}
      towerHeight={game.towerHeight}
      bestStreak={game.bestStreak}
      selectedChoice={game.selectedChoice}
      lastAnswerCorrect={game.lastAnswerCorrect}
      onAnswer={game.submitAnswer}
    />
  );
}
