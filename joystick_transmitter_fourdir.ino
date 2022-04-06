#include <SPI.h>
#include <nRF24L01.h>
#include <RF24.h>

RF24 radio(2, 3); // CE, CSN

const byte address[6] = "00001";

int x, y;
int last_fb = 0;

void setup() {
  radio.begin();
  radio.openWritingPipe(address);
  radio.setPALevel(RF24_PA_MIN);
  radio.stopListening();
  
  Serial.begin(115200);
  Serial.println("Finished setting up transmitter on 1");
}

void loop() {
  x = analogRead(A0);
  y = analogRead(A1);
  //Serial.println(x);
  //Serial.println(y);
  int fb = 0;
  if (x > 700) {
    fb = 1;
  }
  else if (x < 300) {
    fb = 2;
  }
  if (y > 800) {
    fb = 3;
  }
  else if (y < 200) {
    fb = 4;
  }

  //if (fb != last_fb) {
    char buf;
    switch (fb) {
      case 0:
        buf = 's';
        break;
      case 1:
        buf = 'b';
        break;
      case 2:
        buf = 'f';
        break;
      case 3:
        buf = 'r';
        break;
      case 4:
        buf = 'l';
        break;
    }
    Serial.println(buf);
    radio.write(&buf, sizeof(buf));
    //last_fb = fb;
  //}
  delay(20);
}
