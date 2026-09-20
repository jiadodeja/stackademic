import Tower from "./Tower.jsx";
import QuestionCard from "./QuestionCard.jsx";
import FeedbackOverlay from "./FeedbackOverlay.jsx";
import { GAME_STATE, TOTAL_QUESTIONS } from "../hooks/useGameState.js";

export default function GameScreen({
  state,
  currentQuestion,
  currentQuestionNumber,
  towerHeight,
  bestStreak,
  selectedChoice,
  lastAnswerCorrect,
  onAnswer,
}) {
  const isFalling = state === GAME_STATE.WRONG_FEEDBACK;
  const locked = state !== GAME_STATE.PLAYING;
  const progressPct = ((currentQuestionNumber - 1) / TOTAL_QUESTIONS) * 100;

  const feedbackKind =
    state === GAME_STATE.CORRECT_FEEDBACK
      ? "correct"
      : state === GAME_STATE.WRONG_FEEDBACK
      ? "wrong"
      : null;

  return (
    <div className={`screen game-screen ${isFalling ? "shake" : ""}`}>
      <div className="game-header">
        <h1 className="game-title game-title--small">BUILD YOUR TOWER</h1>
        <div className="header-stats">
          <div className="stat-pill">
            Question {currentQuestionNumber} / {TOTAL_QUESTIONS}
          </div>
          <div className="stat-pill stat-pill--streak">BEST STREAK: {bestStreak}</div>
        </div>
        <div className="progress-bar-track">
          <div className="progress-bar-fill" style={{ width: `${progressPct}%` }} />
        </div>
      </div>

      <Tower height={towerHeight} falling={isFalling} />

      <QuestionCard
        question={currentQuestion}
        selectedChoice={selectedChoice}
        onAnswer={onAnswer}
        locked={locked}
      />

      {feedbackKind && (
        <FeedbackOverlay
          kind={feedbackKind}
          correctAnswerText={currentQuestion?.choices[currentQuestion.correctIndex]}
          explanation={lastAnswerCorrect === false ? currentQuestion?.explanation : null}
        />
      )}
    </div>
  );
}
