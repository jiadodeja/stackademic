# Stackademic

Quiz bowl game: answer right, place a block on your tower. Answer wrong, a
physical shake plate knocks it over.

## Architecture (why it's built this way)

No backend server. The quiz web app talks **directly** to the ESP32-S3-DevKitC-1
over USB using the **Web Serial API** (Chrome/Edge only). This cuts out an
entire layer (a Python/Node bridge process) that you don't have time for in
17 hours.

```
[Web app in Chrome] --USB serial--> [ESP32-S3-DevKitC-1] --PWM--> [MG996R servo]
      (quiz UX + tower)                (shake_controller.ino)      (shake plate)
```

Single characters go over serial:
- `'C'` = correct answer, board does nothing
- `'W'` = wrong answer, board runs the shake routine

The board writes back `OK` or `SHAKEN` as a line of text so you can confirm
in the browser console that it actually received the command, useful for
debugging without staring at the hardware.

## Wiring — READ THIS BEFORE ZACH WIRES ANYTHING

The MG996R is a standard hobby servo. It has its own motor driver built in
and just needs a PWM signal wire straight from the board. No separate motor
driver module is needed or used here.

- Servo signal wire -> a PWM-capable GPIO pin on the ESP32-S3-DevKitC-1
  (`GPIO18` in the sketch, change `SERVO_PIN` if you wire a different one)
- Servo V+ (red) -> an external 5-6V supply (a 4xAA pack or a bench supply,
  **not** the board's 5V or 3V3 pin, the MG996R draws more current than the
  board can safely supply)
- Servo GND (black/brown) -> tie together: external supply ground AND the
  ESP32's GND pin (common ground is required or the signal won't be readable)

The ESP32 runs its signal pins at 3.3V instead of 5V. That's fine, the
MG996R reads a 3.3V signal without any extra parts, no level shifter needed.

## Running it

1. **First time only**, set up the Arduino IDE for this board:
   - Open Arduino IDE, go to File -> Preferences, and add this URL to
     "Additional Board Manager URLs":
     `https://raw.githubusercontent.com/espressif/arduino-esp32/gh-pages/package_esp32_index.json`
   - Go to Tools -> Board -> Boards Manager, search "esp32", install the one
     published by Espressif Systems.
   - Go to Tools -> Board and select "ESP32S3 Dev Module".
   - Go to Sketch -> Include Library -> Manage Libraries, search
     "ESP32Servo", and install it. (Not the regular "Servo" library, that
     one doesn't work on ESP32 boards.)
2. Plug in the ESP32-S3-DevKitC-1 over USB, pick the right port under
   Tools -> Port, and upload `esp32/shake_controller/shake_controller.ino`.
   If the upload fails or hangs, hold the "BOOT" button on the board while
   it starts uploading, then release once it says "Connecting...". This is
   a normal quirk on some ESP32 boards.
3. Serve the `web/` folder over localhost, Web Serial does not work from a
   `file://` URL. Easiest way:
   ```
   cd web
   python3 -m http.server 8000
   ```
   Then open `http://localhost:8000` in **Chrome or Edge** (not Safari or
   Firefox, they don't support Web Serial).
4. Click "Connect to Shake Plate", pick the ESP32's serial port from the
   browser prompt, and play. If no hardware is connected, the quiz still
   runs and simulates the shake visually, so Sakshi can build/test the UX
   without needing the physical rig on her machine.
5. Edit `web/questions.js` to swap in your real question bank (one subject,
   hardcoded questions, 4 options each).

## What to build next (in priority order)

1. Get the raw loop working on a breadboard: press a key on a laptop ->
   servo shakes. No UX, no quiz, just prove the serial link works.
2. Wire the quiz app's correct/wrong logic to `link.sendCorrect()` /
   `link.sendWrong()` (already done in `index.html`, just needs a real
   board attached).
3. Build the actual stack plate + 3D-printed blocks, tune `SHAKE_LOW`,
   `SHAKE_HIGH`, `SHAKE_CYCLES` in the sketch until a wrong answer reliably
   topples the tower but the plate is calm on a correct answer.
4. (Stretch, for the Espressif "Best Use of Espressif Hardware & Solutions"
   sponsor challenge) Add a cheap tilt or vibration sensor to the plate
   that detects an actual collapse and reports it back over serial (e.g.
   send `'F'` when it trips). That turns your project into something that
   senses the real world, not just triggers it, read the sensor in
   `loop()` alongside the existing serial-read logic.
5. Polish: sound on correct/wrong, block visuals, a proper end screen.

## Suggested 17-hour timeline

- **Hour 0-1**: Confirm wiring approach with Zach (see above), lock the
  quiz subject and pick/write your question bank, confirm which sponsor
  challenges you're submitting to (Education track + the Espressif
  challenge is the safe combo, since you're already using their exact
  board; treat SpaceXAI as optional stretch since it requires building in
  Cursor and calling the Grok API).
- **Hour 1-5**: Parallel work. Sakshi builds out the quiz UX from
  `index.html`. You get the serial link solid and the sketch tested on a
  breadboard servo. Zach + Monica build the physical shake plate and
  mounting.
- **Hour 5-8**: First integration test, real wrong/correct answers driving
  the real servo, even if the plate/tower isn't final yet.
- **Hour 8-10**: Merge final UX with the real hardware loop. Get the full
  correct-answer -> block-appears, wrong-answer -> shake-and-collapse loop
  working end to end.
- **Hour 10-12**: Physical tuning, get the shake intensity dialed in so
  it's reliable (topples on wrong, stays put on correct, every time).
- **Hour 12-14**: Add the sensor if you're going for the Espressif
  challenge; add polish (sound, animations); start on SpaceXAI content
  only if the core loop is already rock solid.
- **Hour 14-16**: Bug fixes, record a backup demo video in case live
  hardware misbehaves at judging, write the submission.
- **Hour 16-17**: Submit, rehearse the pitch.
