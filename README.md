# Stackademic

Quiz bowl game: answer right, place a block on your tower. Answer wrong, a
physical shake plate knocks it over.

## Architecture (why it's built this way)

No backend server. The quiz web app talks **directly** to the Arduino UNO Q
over USB using the **Web Serial API** (Chrome/Edge only). This cuts out an
entire layer (a Python/Node bridge process) that you don't have time for in
17 hours.

```
[Web app in Chrome] --USB serial--> [Arduino UNO Q] --PWM--> [MG996R servo]
      (quiz UX + tower)                (shake_controller.ino)   (shake plate)
```

Single characters go over serial:
- `'C'` = correct answer, board does nothing
- `'W'` = wrong answer, board runs the shake routine

The board writes back `OK` or `SHAKEN` as a line of text so you can confirm
in the browser console that it actually received the command — useful for
debugging without staring at the hardware.

## Wiring — READ THIS BEFORE ZACH WIRES ANYTHING

The MG996R is a standard hobby servo. It has its own motor driver built in
and just needs a PWM signal — it should **not** be routed through the
Modulino Motors module, which drives DC motors/steppers via an H-bridge,
not PWM servo signals. Wiring it through Modulino is likely to not work at
all and will burn time debugging the wrong problem.

Instead:
- Servo signal wire -> a PWM-capable digital pin on the UNO Q (pin 9 in the
  sketch, change `SERVO_PIN` if you use a different one)
- Servo V+ (red) -> an external 5-6V supply (a 4xAA pack or a bench supply —
  **not** the board's 5V pin, the MG996R draws more current than the board
  can safely supply)
- Servo GND (black/brown) -> tie together: external supply ground AND
  board GND (common ground is required or the signal won't be readable)

If Zach has a specific reason to go through Modulino (e.g. he's actually
using a DC vibration motor instead of the MG996R, or the Modulino board is
just being used as a convenient screw-terminal breakout with the signal
wired around the driver chip), that's fine — just confirm it explicitly
rather than assuming, since this is your "must work perfectly" component.

## Running it

1. Flash `arduino/shake_controller/shake_controller.ino` to the UNO Q (open
   it in Arduino IDE / App Lab, select the board, upload).
2. Serve the `web/` folder over localhost — Web Serial does not work from a
   `file://` URL. Easiest way:
   ```
   cd web
   python3 -m http.server 8000
   ```
   Then open `http://localhost:8000` in **Chrome or Edge** (not Safari or
   Firefox — they don't support Web Serial).
3. Click "Connect to Shake Plate", pick the Arduino's serial port from the
   browser prompt, and play. If no hardware is connected, the quiz still
   runs and simulates the shake visually, so Sakshi can build/test the UX
   without needing the physical rig on her machine.
4. Edit `web/questions.js` to swap in your real question bank (one subject,
   hardcoded questions, 4 options each).

## What to build next (in priority order)

1. Get the raw loop working on a breadboard: press a key on a laptop ->
   servo shakes. No UX, no quiz, just prove the serial link works.
2. Wire the quiz app's correct/wrong logic to `link.sendCorrect()` /
   `link.sendWrong()` (already done in `index.html` — just needs a real
   board attached).
3. Build the actual stack plate + 3D-printed blocks, tune `SHAKE_LOW`,
   `SHAKE_HIGH`, `SHAKE_CYCLES` in the sketch until a wrong answer reliably
   topples the tower but the plate is calm on a correct answer.
4. (Stretch, for the Arduino "Touch Grass" sponsor challenge) Add a
   cheap tilt or vibration sensor to the plate that detects an actual
   collapse and reports it back over serial (e.g. send `'F'` when it
   trips). That turns your project into something that senses the real
   world, not just triggers it — read the sensor in `loop()` alongside the
   existing serial-read logic.
5. Polish: sound on correct/wrong, block visuals, a proper end screen.

## Suggested 17-hour timeline

- **Hour 0-1**: Confirm wiring approach with Zach (see above), lock the
  quiz subject and pick/write your question bank, confirm which sponsor
  challenges you're submitting to (Education track + Arduino "Touch Grass"
  is the safe combo; treat SpaceXAI as optional stretch since it requires
  building in Cursor and calling the Grok API).
- **Hour 1-5**: Parallel work. Sakshi builds out the quiz UX from
  `index.html`. You get the serial link solid and the Arduino sketch
  tested on a breadboard servo. Zach + Monica build the physical shake
  plate and mounting.
- **Hour 5-8**: First integration test — real wrong/correct answers
  driving the real servo, even if the plate/tower isn't final yet.
- **Hour 8-10**: Merge final UX with the real hardware loop. Get the full
  correct-answer -> block-appears, wrong-answer -> shake-and-collapse loop
  working end to end.
- **Hour 10-12**: Physical tuning — get the shake intensity dialed in so
  it's reliable (topples on wrong, stays put on correct, every time).
- **Hour 12-14**: Add the sensor if you're going for the Arduino
  challenge; add polish (sound, animations); start on SpaceXAI content
  only if the core loop is already rock solid.
- **Hour 14-16**: Bug fixes, record a backup demo video in case live
  hardware misbehaves at judging, write the submission.
- **Hour 16-17**: Submit, rehearse the pitch.
