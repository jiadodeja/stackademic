# Build Your Tower

A front-end prototype for a hackathon game: answer 10 AI trivia questions in a
row correctly while your teammate physically builds a Jenga-style tower.
Get one wrong and the on-screen tower "falls" — the game then restarts.

This is **front-end only**. There is no Arduino code, no servo control, no
backend, and no USB communication here — see "For your hardware teammate"
below.

## How to run this on your computer (step by step)

You need [Node.js](https://nodejs.org) installed (version 18 or newer is
fine — this was built and tested on Node 22).

1. Open a terminal and go into this project folder:
   ```
   cd build-your-tower
   ```
2. Install the project's dependencies (this downloads the libraries the
   code needs, like React, into a folder called `node_modules`). You only
   need to do this once, or again if you pull new changes:
   ```
   npm install
   ```
3. Start the local dev server:
   ```
   npm run dev
   ```
4. The terminal will print a URL, usually `http://localhost:5173/`. Open
   that in your browser (Chrome recommended). The game will hot-reload —
   if you edit a file and save it, the browser updates automatically
   without needing a refresh.
5. To stop the server, click into the terminal and press `Ctrl + C`.

### Building a production version (optional, for demo day)

If you want a fast, optimized static version to run on the demo laptop
without the dev server:
```
npm run build
npm run preview
```
`npm run build` creates a `dist/` folder with plain HTML/CSS/JS files.
`npm run preview` serves that folder so you can double check it works.

## Project structure (what each file does)

```
src/
  data/questions.js          <- THE question bank. Add/edit/remove
                                 questions here. Nothing else needs to
                                 change when you edit this file.
  hooks/useGameState.js      <- All game LOGIC: picking random questions,
                                 tracking score/streak, moving between
                                 game states, saving best streak to
                                 localStorage. No visual code lives here.
  hardware/hardwarePlaceholder.js
                              <- The ONE function your hardware teammate
                                 needs to wire up. See below.
  components/
    StartScreen.jsx           <- Title screen with BEST STREAK + Start button
    GameScreen.jsx             <- Wraps header + tower + question during play
    Tower.jsx                  <- The small on-screen progress tower
    QuestionCard.jsx           <- The question + 4 big answer buttons
    FeedbackOverlay.jsx        <- The full-screen CORRECT!/WRONG! flash
    WinScreen.jsx               <- The YOU WIN! screen
  App.jsx                      <- Top-level component: decides which
                                 screen to show based on game state, and
                                 times the auto-advance after feedback
  App.css                      <- All styling and animations
  index.css                    <- Minimal global reset
```

## For your hardware teammate

Open `src/hardware/hardwarePlaceholder.js`. There is exactly one function:

```js
export function triggerTowerShake() {
  console.log("TOWER SHAKE TRIGGERED");
  // TODO: Hardware teammate will connect this event to Arduino/USB/servo control.
}
```

This function is called at the exact moment the player answers incorrectly.
Right now it only logs a message to the browser's developer console (press
F12 or right-click → Inspect → Console to see it). Your teammate can replace
the inside of this function with whatever talks to the Arduino (Web Serial
API, a WebSocket to a local server, a fetch() call to a backend, etc.) — the
rest of the app doesn't need to change at all.

## Game rules (what's implemented)

- 10 random, unique questions are picked from a bank of ~57 AI questions
  at the start of every round.
- Correct answer: green flash, tower gains a block, auto-advances to the
  next question after ~1.1 seconds.
- Wrong answer: red flash on the button you picked, the correct answer is
  revealed with a short explanation, the on-screen tower "falls" apart,
  the screen shakes, and the game automatically restarts from Question 1
  after ~1.8 seconds.
- Answering all 10 correctly shows a YOU WIN! screen with a "BUILD AGAIN"
  button to start a new round.
- "Best streak" (the most correct answers in a row ever achieved) is saved
  in your browser's `localStorage`, so it survives page refreshes. It is
  NOT sent to any server — it only lives in that one browser.

## What's intentionally NOT included

No login, no accounts, no database, no leaderboard, no multiplayer, no
backend, and no real Arduino/servo/USB code — per the project spec, this
is a front-end prototype only.
