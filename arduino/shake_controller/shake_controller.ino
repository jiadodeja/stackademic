/*
 * Stackademic — shake plate controller
 *
 * Runs on the Arduino UNO Q's microcontroller (STM32) side, using
 * the standard Servo library. Talks over the board's USB serial
 * connection to the web app (Web Serial API), listening for one
 * of two single-character commands:
 *
 *   'C'  -> correct answer: do nothing (idle)
 *   'W'  -> wrong answer: trigger the shake motion
 *
 * The board also sends a status byte back after each command so the
 * web app can confirm it actually happened (useful if the sensor
 * add-on isn't wired up yet). If you add a tilt/vibration sensor
 * later (recommended for the Arduino "Touch Grass" challenge), read
 * it in loop() and send 'F' (fell) when it trips, independent of
 * whatever command was last sent.
 *
 * WIRING (see README for the full rationale):
 *   MG996R servo signal -> a PWM-capable digital pin (SERVO_PIN below)
 *   MG996R V+  -> external 5-6V supply (NOT the board's 5V pin)
 *   MG996R GND -> same ground as the external supply AND the board GND
 *   Do NOT route the servo signal through the Modulino Motors module —
 *   that module drives DC motors/steppers via an H-bridge, not PWM
 *   hobby servos. Wire the servo directly to the board.
 */

#include <Servo.h>

const int SERVO_PIN = 9;       // change to whatever pin you actually wire
const int REST_ANGLE = 90;     // resting position of the shake plate
const int SHAKE_LOW = 60;      // sweep endpoints for the shake motion
const int SHAKE_HIGH = 120;
const int SHAKE_CYCLES = 6;    // how many back-and-forth sweeps per shake
const int SHAKE_STEP_DELAY = 25; // ms between degree steps (lower = faster/harder)

Servo shakeServo;

void setup() {
  Serial.begin(9600);
  shakeServo.attach(SERVO_PIN);
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
