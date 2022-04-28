double radius   = 150.0;               // Radius of the circle in pixels
double rsquared = Math.pow(radius, 2); // Storing r^2 so I don't have to calculate it over and over
double compare  = 0.01 * rsquared;     // 1% of the squared radius

// This function automatically gets called when you run the code, no need to call it explicitly
void setup() {
  size(400, 400);    // Our canvas size, in pixels
  background(255);   // Paint the background white
  stroke(0);         // We'll be drawing in black
  drawCircle();      // Draw a circle
}

// Use the circle formula x^2 + y^2 = r^2 to figure out which points to draw
void drawCircle() {
  for (float row = 0; row < height; row++) {                            // For each row of pixels...
    float offset_row = row - (height / 2);                              // Re-center so it goes from -200 to 200, not 0 to 400
    for (float col = 0; col < width; col++) {                           // For each pixel in that row...
      float offset_col = col - (width / 2);                             // Re-center so it goes from -200 to 200, not 0 to 400
      double calc = Math.pow(offset_row, 2) + Math.pow(offset_col, 2);  // calc will store x^2 + y^2
      if (Math.abs(rsquared - calc) < compare) {                        // If x^2 + y^2 is within 1% of r^2...
        point(row, col);                                                // Paint the pixel at (x, y) black
      }
    }
  }
}
