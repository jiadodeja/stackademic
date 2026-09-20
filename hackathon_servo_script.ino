#include <ESP32Servo.h>

Servo s;

void setup() {
  s.setPeriodHertz(50);
  s.attach(4, 500, 2400);   // signal wire on GPIO 4

  s.write(90);              // start centered
  delay(1000);

  for (int i = 0; i < 10; i++) {
    s.write(60);            // one way
    delay(200);
    s.write(120);           // the other way
    delay(200);
  }

  s.write(90);              // back to center
}

void loop() {
  // nothing here, so it only runs once
}
