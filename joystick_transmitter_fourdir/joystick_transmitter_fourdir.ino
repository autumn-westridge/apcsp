#include <SPI.h>
#include <nRF24L01.h>
#include <RF24.h>

RF24 radio(2, 3); // CE, CSN

const byte address[6] = "00001";

int x, y;

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
  
  int fb = 's';
  if (x > 700) {
    fb = 'b';
  }
  else if (x < 300) {
    fb = 'f';
  }
  if (y > 800) {
    fb = 'r';
  }
  else if (y < 200) {
    fb = 'l';
  }

  Serial.println(buf);
  radio.write(&buf, sizeof(buf));
  
  delay(20);
}
