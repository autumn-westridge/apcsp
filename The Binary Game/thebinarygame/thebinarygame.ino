#include <Wire.h>
#include <Adafruit_MPR121.h>
#include <Adafruit_NeoPixel.h>

#define LED_PIN    2
#define LED_COUNT  8

Adafruit_MPR121 cap = Adafruit_MPR121();
Adafruit_NeoPixel strip(LED_COUNT, LED_PIN, NEO_GRB + NEO_KHZ800);

uint16_t lasttouched  = 0;
uint16_t currtouched  = 0;

uint32_t color        = 0;
uint32_t max_color    = 65535;
bool led_states[8]    = {false, false, false, false, false, false, false, false};
long touch_start      = -1;
int  touch_dur        = 500;
bool cycle_color      = false;

void setup() {
  Serial.begin(115200);

  if (!cap.begin(0x5A)) {
    Serial.println("MPR121 not found, check wiring?");
    while (1);
  }
  Serial.println("MPR121 found!");
  
  strip.begin();
  strip.show();
  strip.setBrightness(128);
}

void loop() {
  currtouched = cap.touched();
  
  for (int i = 0; i < LED_COUNT; i++) {
    if ((currtouched & _BV(i)) && !(lasttouched & _BV(i))) {
      Serial.print(i); Serial.println(" touched");
      
      touch_start = millis();
      led_states[i] = !led_states[i];
    }
    if (!(currtouched & _BV(i)) && (lasttouched & _BV(i)) ) {
      Serial.print(i); Serial.println(" released");
      touch_start = -1;
      // If we're cycling the color, stop
      if (cycle_color) {
        cycle_color = false;
        Serial.println("stop cycling");
      }
    }
    strip.setPixelColor(i, strip.gamma32(strip.ColorHSV(color, 255, led_states[i] * 255)));
    strip.show();
  }

  if (touch_start > -1 && millis() - touch_start > touch_dur && !cycle_color) {
    Serial.println("cycle color");
    cycle_color = true;
  }
  // If we're cycling the color, increment "color"
  if (cycle_color) {
    color += 30;
    if (color > max_color) {
      color = color % max_color;
    }
  }
  
  lasttouched = currtouched;

}
