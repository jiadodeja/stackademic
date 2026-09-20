// Full-screen flash feedback shown briefly after each answer.
// `kind` is either "correct" or "wrong".
// `explanation` is shown only for wrong answers, so the player learns
// the right answer before the round restarts.
export default function FeedbackOverlay({ kind, correctAnswerText, explanation }) {
  if (!kind) return null;

  if (kind === "correct") {
    return (
      <div className="overlay overlay--correct">
        <div className="overlay-big">CORRECT!</div>
        <div className="overlay-sub">Add a block to the real tower!</div>
      </div>
    );
  }

  return (
    <div className="overlay overlay--wrong">
      <div className="overlay-big">WRONG!</div>
      <div className="overlay-answer">
        Correct answer: <strong>{correctAnswerText}</strong>
      </div>
      {explanation && <div className="overlay-explanation">{explanation}</div>}
      <div className="overlay-tower-down">TOWER DOWN!</div>
    </div>
  );
}
