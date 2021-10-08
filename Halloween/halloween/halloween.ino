#include <Servo.h>
#include <Adafruit_NeoPixel.h>
#include <Adafruit_MPR121.h>

// Knock vars
const int k_sensor = A0;
const int k_threshold = 100;
const int k_retrig = 150;
const int k_timeout = 1200;
long last_knock;
int num_knocks = 0;

// Servo vars
const int num_servos = 8;
Servo window0;
Servo window1;
Servo window2;
Servo window3;
Servo window4;
Servo window5;
Servo window6;
Servo window7;
Servo *servos[num_servos] = {&window0, &window1, &window2, &window3, &window4, &window5, &window6, &window7};
int servo_start_pin = 2;
long last_servo_move[num_servos] = {0, 0, 0, 0, 0, 0, 0, 0};
int servo_curr[num_servos] = {0, 0, 0, 0, 0, 0, 0, 0};
int servo_goals[num_servos] = {0, 0, 0, 0, 0, 0, 0, 0};
int max_servo_move[num_servos] = {60, 60, 60, 60, 60, 60, 60, 60};
int servo_del[num_servos] = {20, 20, 20, 20, 20, 20, 20, 20};

void setup() {
  Serial.begin(115200);

  long ms = millis();
  last_knock = ms;

  for (int i = 0; i < num_servos; i++) {
    servos[i]->attach(servo_start_pin + i);
    servos[i]->write(servo_curr[i]);
    last_servo_move[i] = ms;
  }
}

void loop() {
  checkKnocks();
  updateServos();
}

void checkKnocks() {
  int k_reading = analogRead(k_sensor);

  // If the retrig duration has elapsed and we've detected a knock...
  if (millis() - last_knock > k_retrig && k_reading >= k_threshold) {
    num_knocks++;           // Add one to num_knocks
    last_knock = millis();
  }
  // If it's been at least timeout ms since the last knock...
  else if (millis() - last_knock > k_timeout) {
    // If there had been knocks, open the associated window
    if (num_knocks > 0) {
      openWindow(num_knocks);
    }
    // Reset num_knocks
    num_knocks = 0;
  }
}

void openWindow(int which_window) {
  // Only accept numbers between 1 and 8
  if (which_window > num_servos || which_window < 1) {
    return;
  }
  else {
    // Open the associated window
    servo_goals[which_window - 1] = max_servo_move[which_window - 1];
  }
}

void updateServos() {
  long ms = millis();
  for (int i = 0; i < num_servos; i++) {
    // If this isn't at its goal and enough time has passed...
    if (servo_curr[i] != servo_goals[i] && ms - last_servo_move[i] > = servo_del[i]) {
      // If the goal is larger than the current position, increment the current position
      if (servo_curr[i] < servo_goals[i]) {
        servo_curr[i]++;
      }
      // Otherwise decrement it
      else if (servo_curr[i] > servo_goals[i]) {
        servo_curr[i]--;
      }
      last_servo_move[i] = ms;
      servos[i]->write(servo_curr[i]);
      
      // If it's reached its goal...
      if (servo_curr[i] == servo_goal[i] && servo_goal[i] == max_servo_move[i]) {
        servo_goal[i] = 0;
        servo_del[i] = 2000;
      }
      else {
        servo_del[i] = 20;
      }
    }
    
  }
}
