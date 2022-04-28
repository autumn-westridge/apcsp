double radius = 150.0; 
double rsquared = Math.pow(radius, 2);

void setup() {
  size(400, 400);
  background(255);
  stroke(0);
  drawCircle();
}

void drawCircle() {
  for (float row = 0; row < height; row++) {
    for (float col = 0; col < width; col++) {
      double calc = Math.pow(row - (height / 2), 2) + Math.pow(col - (width / 2), 2);
      if (Math.abs(rsquared - calc) < 150) {
        point(row, col);
      }
    }
  }
}
