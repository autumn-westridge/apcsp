#include <SPI.h>
#include <nRF24L01.h>
#include <RF24.h>

RF24 radio(2, 3); // CE, CSN

const byte address[6] = "00001";

int motor1a = 4;
int motor1b = 5;
int motor2a = 6;
int motor2b = 7;
int motor1s = 9;
int motor2s = 10;

void setup()
{
  Serial.begin(115200);
  radio.begin();
  radio.openReadingPipe(0, address);
  radio.setPALevel(RF24_PA_MIN);
  radio.startListening();

  pinMode(motor1a, OUTPUT);
  pinMode(motor1b, OUTPUT);
  pinMode(motor2a, OUTPUT);
  pinMode(motor2b, OUTPUT);
  pinMode(motor1s, OUTPUT);
  pinMode(motor2s, OUTPUT);

  analogWrite(motor1s, 200);
  analogWrite(motor2s, 200);

  Serial.println("Finished setting up receiver");
}

void loop()
{
  uint8_t buf[2];
  memset(buf, '\0', sizeof(buf));
  uint8_t buflen = sizeof(buf);
  if (radio.available())
  {
    radio.read(&buf, sizeof(buf));
    Serial.print("Message: ");
    Serial.println((char *)buf);
    if (buf[0] == 'f') {
      Serial.println("FORWARD");
      digitalWrite(motor1a, HIGH);
      digitalWrite(motor1b, LOW);
      digitalWrite(motor2a, HIGH);
      digitalWrite(motor2b, LOW);
    }
    else if (buf[0] == 'l') {
      Serial.println("LEFT");
      digitalWrite(motor1a, HIGH);
      digitalWrite(motor1b, LOW);
      digitalWrite(motor2a, LOW);
      digitalWrite(motor2b, HIGH);
    }
    else if (buf[0] == 'r') {
      Serial.println("RIGHT");
      digitalWrite(motor1a, LOW);
      digitalWrite(motor1b, HIGH);
      digitalWrite(motor2a, HIGH);
      digitalWrite(motor2b, LOW);
    }
    else if (buf[0] == 'b') {
      Serial.println("BACK");
      digitalWrite(motor1a, LOW);
      digitalWrite(motor1b, HIGH);
      digitalWrite(motor2a, LOW);
      digitalWrite(motor2b, HIGH);
    }
    else if (buf[0] == 's') {
      Serial.println("STOP");
      digitalWrite(motor1a, LOW);
      digitalWrite(motor1b, LOW);
      digitalWrite(motor2a, LOW);
      digitalWrite(motor2b, LOW);
    }
    else {
      Serial.println("UNKNOWN");
    }
  }
}
