#include <Servo.h>

Servo servo;

const int alarmPin = 3;
const int unlockPin = 4;
const int soundPin = 5;
const int vibrationPin = 7;
const int servoPin = 6;
const int ledPin =  13;

int buttonState = 0;
int isLocked = 0;

int lockedAngle = 0;
int unlockedAngle = 100;

void setup() {
  pinMode(vibrationPin, INPUT);
  pinMode(unlockPin, INPUT);
  
  pinMode(alarmPin, OUTPUT);
  pinMode(soundPin, OUTPUT);
  pinMode(ledPin, OUTPUT);

  servo.attach(servoPin);

  Serial.begin(9600);
}

void loop() {
  buttonState = digitalRead(vibrationPin);

  Serial.println(buttonState);
  
  if (buttonState == HIGH) {
    digitalWrite(ledPin, LOW);
    // digitalWrite(soundPin, LOW);    
  } else {
    digitalWrite(alarmPin, HIGH);
    digitalWrite(ledPin, HIGH);

    tone(soundPin, 440, 2000);
  }

  int isUnlocked = digitalRead(unlockPin);

  if (isUnlocked == HIGH) {
     tone(soundPin, 440, 500);
     servo.write(unlockedAngle);
  } else {
     tone(soundPin, 440, 500);
     servo.write(lockedAngle);
  }

  delay(15);
}

