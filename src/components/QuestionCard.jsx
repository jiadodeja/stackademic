const LETTERS = ["A", "B", "C", "D"];

// Displays the current question and 4 large answer buttons.
// After an answer is chosen, buttons are locked and colored:
//   - the chosen wrong answer -> red
//   - the correct answer -> green (always revealed, even if not chosen)
export default function QuestionCard({ question, selectedChoice, onAnswer, locked }) {
  if (!question) return null;

  return (
    <div className="question-card">
      <p className="question-text">{question.question}</p>
      <div className="choices-grid">
        {question.choices.map((choice, i) => {
          let variant = "";
          if (selectedChoice !== null) {
            if (i === question.correctIndex) variant = "choice--correct";
            else if (i === selectedChoice) variant = "choice--wrong";
            else variant = "choice--dimmed";
          }
          return (
            <button
              key={i}
              className={`choice-btn ${variant}`}
              onClick={() => onAnswer(i)}
              disabled={locked}
            >
              <span className="choice-letter">{LETTERS[i]}</span>
              <span className="choice-text">{choice}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
