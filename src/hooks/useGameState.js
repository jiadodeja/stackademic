// ============================================================================
// GAME LOGIC
// ----------------------------------------------------------------------------
// This file contains ALL the rules of the game: picking questions, tracking
// score/streak, and moving between states. It has NO knowledge of how
// anything looks on screen — that's the job of the components in src/components.
//
// GAME STATES (kept intentionally simple, per spec):
//   START           - the title screen, waiting for the player to press Start
//   PLAYING         - a question is on screen, waiting for an answer
//   CORRECT_FEEDBACK- brief "CORRECT!" animation after a right answer
//   WRONG_FEEDBACK  - "WRONG!" + tower falling animation after a wrong answer
//   GAME_OVER       - (unused as a screen; wrong answer flows straight back to START)
//   WIN             - all 10 questions answered correctly
// ============================================================================

import { useCallback, useRef, useState } from "react";
import { QUESTION_BANK } from "../data/questions.js";
import { triggerTowerShake } from "../hardware/shakePlate.js";

export const TOTAL_QUESTIONS = 10;

export const GAME_STATE = {
  START: "START",
  PLAYING: "PLAYING",
  CORRECT_FEEDBACK: "CORRECT_FEEDBACK",
  WRONG_FEEDBACK: "WRONG_FEEDBACK",
  GAME_OVER: "GAME_OVER",
  WIN: "WIN",
};

const BEST_STREAK_KEY = "buildYourTower.bestStreak";

// Fisher-Yates shuffle - returns a new shuffled array, doesn't mutate input.
function shuffle(array) {
  const result = [...array];
  for (let i = result.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [result[i], result[j]] = [result[j], result[i]];
  }
  return result;
}

// Shuffles ONE question's answer choices, and keeps track of which shuffled
// position the correct answer landed on. Returns a NEW question object,
// never changes the original in QUESTION_BANK, so this is safe to call
// every round without messing up the source data.
function shuffleChoices(question) {
  const order = shuffle(question.choices.map((_, i) => i)); // e.g. [2, 0, 3, 1]
  return {
    ...question,
    choices: order.map((originalIndex) => question.choices[originalIndex]),
    correctIndex: order.indexOf(question.correctIndex),
  };
}

// Picks TOTAL_QUESTIONS unique random questions from the bank for a new
// round, and shuffles each question's answer order too. Without this
// second shuffle, the correct answer would always sit wherever the
// question bank happened to put it (in practice, always option A).
function pickRound() {
  return shuffle(QUESTION_BANK).slice(0, TOTAL_QUESTIONS).map(shuffleChoices);
}

function loadBestStreak() {
  try {
    const raw = localStorage.getItem(BEST_STREAK_KEY);
    const parsed = raw ? parseInt(raw, 10) : 0;
    return Number.isFinite(parsed) ? parsed : 0;
  } catch {
    // localStorage can throw in some environments (e.g. privacy mode) - fail safe.
    return 0;
  }
}

function saveBestStreak(value) {
  try {
    localStorage.setItem(BEST_STREAK_KEY, String(value));
  } catch {
    // Ignore write failures - best streak just won't persist this session.
  }
}

export function useGameState() {
  const [state, setState] = useState(GAME_STATE.START);
  const [round, setRound] = useState(() => pickRound());
  const [currentIndex, setCurrentIndex] = useState(0); // 0-based index into `round`
  const [towerHeight, setTowerHeight] = useState(0); // correct answers in THIS round
  const [bestStreak, setBestStreak] = useState(() => loadBestStreak());
  const [selectedChoice, setSelectedChoice] = useState(null); // index player clicked
  const [lastAnswerCorrect, setLastAnswerCorrect] = useState(null);

  // Guards against double-clicks / rapid re-clicks while feedback is showing.
  const answering = useRef(false);

  const currentQuestion = round[currentIndex] ?? null;

  const startGame = useCallback(() => {
    setRound(pickRound());
    setCurrentIndex(0);
    setTowerHeight(0);
    setSelectedChoice(null);
    setLastAnswerCorrect(null);
    answering.current = false;
    setState(GAME_STATE.PLAYING);
  }, []);

  const submitAnswer = useCallback(
    (choiceIndex) => {
      if (state !== GAME_STATE.PLAYING || answering.current) return;
      answering.current = true;

      const isCorrect = choiceIndex === currentQuestion.correctIndex;
      setSelectedChoice(choiceIndex);
      setLastAnswerCorrect(isCorrect);

      if (isCorrect) {
        const newHeight = towerHeight + 1;
        setTowerHeight(newHeight);
        if (newHeight > bestStreak) {
          setBestStreak(newHeight);
          saveBestStreak(newHeight);
        }
        setState(GAME_STATE.CORRECT_FEEDBACK);
      } else {
        // Physical hardware hook - see src/hardware/shakePlate.js
        triggerTowerShake();
        setState(GAME_STATE.WRONG_FEEDBACK);
      }
    },
    [state, currentQuestion, towerHeight, bestStreak]
  );

  // Called after the CORRECT_FEEDBACK animation finishes.
  const advanceAfterCorrect = useCallback(() => {
    answering.current = false;
    const nextIndex = currentIndex + 1;
    if (nextIndex >= TOTAL_QUESTIONS) {
      setState(GAME_STATE.WIN);
    } else {
      setCurrentIndex(nextIndex);
      setSelectedChoice(null);
      setLastAnswerCorrect(null);
      setState(GAME_STATE.PLAYING);
    }
  }, [currentIndex]);

  // Called after the WRONG_FEEDBACK / tower-falling animation finishes.
  const restartAfterWrong = useCallback(() => {
    setRound(pickRound());
    setCurrentIndex(0);
    setTowerHeight(0);
    setSelectedChoice(null);
    setLastAnswerCorrect(null);
    answering.current = false;
    setState(GAME_STATE.PLAYING);
  }, []);

  // Called from the WIN screen's "Build Again" button.
  const playAgain = useCallback(() => {
    startGame();
  }, [startGame]);

  return {
    state,
    currentQuestion,
    currentQuestionNumber: currentIndex + 1, // 1-based for display
    totalQuestions: TOTAL_QUESTIONS,
    towerHeight,
    bestStreak,
    selectedChoice,
    lastAnswerCorrect,
    startGame,
    submitAnswer,
    advanceAfterCorrect,
    restartAfterWrong,
    playAgain,
  };
}
