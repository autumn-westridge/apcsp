#include <Servo.h>
#include <Adafruit_NeoPixel.h>
#include <Adafruit_MPR121.h>
#include <Adafruit_PWMServoDriver.h>

// Knock vars
const int k_sensor = A0;
const int k_threshold = 100;
const int k_retrig = 150;
const int k_timeout = 2000;
long last_knock;
int num_knocks = 0;

// Servo vars
const int num_servos = 9;
Adafruit_PWMServoDriver servo_pwm = Adafruit_PWMServoDriver(0x41);
long last_servo_move[num_servos] = {0, 0, 0, 0, 0, 0, 0, 0, 0};
int servo_default[num_servos] = {2000, 2000, 2050, 2050, 2000, 2000, 1900, 2000, 2200};
int servo_curr[num_servos] = {2000, 2000, 2050, 2050, 2000, 2000, 1900, 2000, 2200};
int servo_goal[num_servos] = {2000, 2000, 2050, 2050, 2000, 2000, 1900, 2000, 2200};
int servo_move[num_servos] = {1300, 1450, 1450, 1450, 1450, 1450, 1300, 1400, 1600};
int servo_del[num_servos] = {0, 0, 0, 0, 0, 0, 0, 0, 0};
int door_servo_num = 8;
#define SERVO_FREQ 50 // Analog servos run at ~50 Hz updates

// Light vars
Adafruit_PWMServoDriver pwm = Adafruit_PWMServoDriver();
const int num_leds = 8;
bool led_mode = false; // true for active, false for inactive
bool led_vals[num_leds] = {true, false, true, true, false, false, false, true};
int led_start_pin = 8;
long last_led_update[num_leds] = {0, 0, 0, 0, 0, 0, 0, 0};
int led_goal[num_leds] = {0, 0, 0, 0, 0, 0, 0, 0};
int led_curr[num_leds] = {0, 0, 0, 0, 0, 0, 0, 0};
int led_del[num_leds] = {10, 10, 10, 10, 10, 10, 10, 10};
int led_pwm = 0;

// MPR vars
Adafruit_MPR121 cap = Adafruit_MPR121();
bool side_led_on[num_leds] = {false, false, false, false, false, false, false, false};
bool side_led_win[num_leds] = {true, false, true, true, false, false, true, false};
int side_led_map[num_leds] = {0, 1, 2, 3, 4, 7, 6, 5};
uint16_t lasttouched = 0;
uint16_t currtouched = 0;

void setup() {
  Serial.begin(115200);

  long ms = millis();
  last_knock = ms;

  pwm.begin();
  pwm.setOscillatorFrequency(27000000);
  pwm.setPWMFreq(1600);  // This is the maximum PWM frequency

  servo_pwm.begin();
  servo_pwm.setOscillatorFrequency(27000000);
  servo_pwm.setPWMFreq(SERVO_FREQ);  // Analog servos run at ~50 Hz updates  

  for (int i = 0; i < num_servos; i++) {
    servo_pwm.writeMicroseconds(i, servo_curr[i]);
    last_servo_move[i] = ms;
    last_led_update[i] = ms;
  }
  for (int i = 0; i < 16; i++) {
    ledOnOff(i, false);
  }
  
  if (!cap.begin(0x5A)) {
    Serial.println("MPR121 not found, check wiring?");
  }
  Serial.println("MPR121 found!");
  cap.setThresholds(30, 20);
}

void loop() {
  checkKnocks();
  checkTouch();
  updateLEDs();
  updateServos();
}

void checkKnocks() {
  int k_reading = analogRead(k_sensor);

  // If the retrig duration has elapsed and we've detected a knock...
  if (millis() - last_knock > k_retrig && k_reading >= k_threshold) {
    num_knocks++;           // Add one to num_knocks
    Serial.println(num_knocks);
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
    Serial.println("Invalid number of knocks");
    return;
  }
  else if (led_mode) {
    Serial.println("Window already open");
    return;
  }
  else {
    // Open the associated window
    Serial.println((String)"Opening window " + (which_window - 1));
    servo_goal[which_window - 1] = servo_move[which_window - 1];
    
    led_mode = true;
    for (int i = 8; i < 16; i++) {
      digitalWrite(led_start_pin + i, LOW);
    }
  }
}

void checkTouch() {
  currtouched = cap.touched();
  
  for (uint8_t i=0; i<8; i++) {
    // it if *is* touched and *wasnt* touched before, alert!
    if ((currtouched & _BV(i)) && !(lasttouched & _BV(i)) ) {
      Serial.print(i); Serial.println(" touched");
      side_led_on[i] = !side_led_on[i];
      ledOnOff(side_led_map[i], side_led_on[i]);
      checkOpenDoor();
      
    }
    // if it *was* touched and now *isnt*, alert!
    if (!(currtouched & _BV(i)) && (lasttouched & _BV(i)) ) {
      Serial.print(i); Serial.println(" released");
    }
  }

  lasttouched = currtouched;
}

void checkOpenDoor() {
  for (int i = 0; i < num_leds; i++) {
    Serial.println((String) side_led_on[i] + ": " + side_led_win[i]);
    if (side_led_on[i] != side_led_win[i]) {
      return;
    }
  }
  // If we get down here it's time to open the door
  Serial.println("SIDE LED WIN");
  servo_goal[door_servo_num] = servo_move[door_servo_num];
}

void updateServos() {
  long ms = millis();
  for (int i = 0; i < num_servos; i++) {
    // If this isn't at its goal and enough time has passed...
    if (servo_curr[i] != servo_goal[i] && ms - last_servo_move[i] >= servo_del[i]) {
      // If the goal is larger than the current position, increment the current position
      if (servo_curr[i] < servo_goal[i]) {
        servo_curr[i]++;
      }
      // Otherwise decrement it
      else if (servo_curr[i] > servo_goal[i]) {
        servo_curr[i]--;
      }
      last_servo_move[i] = ms;
      servo_pwm.writeMicroseconds(i, servo_curr[i]);

      // If it's reached its goal...
      if (servo_curr[i] == servo_goal[i] && servo_goal[i] == servo_move[i]) {
        Serial.println("Waiting 2 seconds");
        servo_goal[i] = servo_default[i];
        servo_del[i] = 2000;
        if (i == 8) {
          servo_del[i] = 30000; // Open for 30 seconds
        }

        // Turn on or off the LED
        ledOnOff(led_start_pin + i, led_vals[i]);
      }
      else if (servo_del[i] >= 2000) {
        Serial.println((String) "Closing window " + i);
        ledOnOff(led_start_pin + i, false);
        servo_del[i] = 0;
      }
      else if (servo_curr[i] == servo_goal[i] && led_mode) {
        led_mode = false;
      }
    }

  }
}

void ledOnOff(int index, bool state) {
    if (state) {
      Serial.println((String) "Turning on " + index);
      pwm.setPWM(index, 4096, 0);
    }
    else {
      pwm.setPWM(index, 0, 4096);
    }
  
}

void updateLEDs() {
  if (!led_mode) {
    for (uint8_t pwmnum = 8; pwmnum < 16; pwmnum++) {
      pwm.setPWM(pwmnum, 0, (led_pwm + (4096/16)*pwmnum) % 4096 );
    }
    led_pwm += 8;
    if (led_pwm >= 4069) {
      led_pwm = 0;
    }
  }
}
