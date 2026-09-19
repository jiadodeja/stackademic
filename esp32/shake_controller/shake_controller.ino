/*
 * Stackademic — shake plate controller
 *
 * Runs on an ESP32-S3-DevKitC-1. Talks over USB serial to the web app
 * (Web Serial API), listening for one of two single-character commands:
 *
 *   'C'  -> correct answer: do nothing (idle)
 *   'W'  -> wrong answer: trigger the shake motion
 *
 * The board also sends a status line back after each command so the
 * web app (or you, watching the Serial Monitor) can confirm it actually
 * happened. If you add a tilt/vibration sensor later (recommended for
 * the Espressif "Best Use of Espressif Hardware" challenge), read it in
 * loop() and send 'F' (fell) whenever it trips, independent of whatever
 * command was last sent.
 *
 * IMPORTANT — this uses the ESP32Servo library, NOT the regular Arduino
 * Servo library. The regular one does not work on ESP32 boards.
 * Install "ESP32Servo" through Arduino IDE's Library Manager first
 * (Sketch -> Include Library -> Manage Libraries -> search "ESP32Servo").
 *
 * WIRING (see README for the full rationale):
 *   MG996R servo signal -> SERVO_PIN below (any PWM-capable GPIO works,
 *     GPIO18 is a safe default on the DevKitC-1)
 *   MG996R V+  -> external 5-6V supply (NOT the board's 5V/3V3 pin —
 *     the ESP32 cannot supply enough current for the MG996R)
 *   MG996R GND -> tie together: external supply ground, servo ground,
 *     AND the ESP32's GND pin. All three must share one ground.
 *   The servo signal wire connects directly to the ESP32 — there is no
 *   motor driver board in this path. Standard hobby servos like the
 *   MG996R have their own driver built in and only need a PWM signal.
 */

#include <ESP32Servo.h>

const int SERVO_PIN = 18;      // change if you wire a different GPIO
const int REST_ANGLE = 90;     // resting position of the shake plate
const int SHAKE_LOW = 60;      // sweep endpoints for the shake motion
const int SHAKE_HIGH = 120;
const int SHAKE_CYCLES = 6;    // how many back-and-forth sweeps per shake
const int SHAKE_STEP_DELAY = 25; // ms between degree steps (lower = faster/harder)

Servo shakeServo;

void setup() {
  Serial.begin(9600);
  shakeServo.setPeriodHertz(50);      // standard 50Hz servo PWM
  shakeServo.attach(SERVO_PIN, 500, 2400); // min/max pulse width in microseconds
  shakeServo.write(REST_ANGLE);
}

void loop() {
  if (Serial.available() > 0) {
    char cmd = Serial.read();

    if (cmd == 'W') {
      doShake();
      Serial.println("SHAKEN");
    } else if (cmd == 'C') {
      // correct answer: no motion, just acknowledge
      Serial.println("OK");
    }
    // ignore anything else (newlines, stray bytes)
  }
}

void doShake() {
  for (int i = 0; i < SHAKE_CYCLES; i++) {
    sweepTo(SHAKE_HIGH);
    sweepTo(SHAKE_LOW);
  }
  sweepTo(REST_ANGLE);
}

void sweepTo(int targetAngle) {
  int current = shakeServo.read();
  int step = (targetAngle > current) ? 1 : -1;
  for (int angle = current; angle != targetAngle; angle += step) {
    shakeServo.write(angle);
    delay(SHAKE_STEP_DELAY);
  }
  shakeServo.write(targetAngle);
}
