// From here: https://openprocessing.org/sketch/112722/
// Lightly modified

int max_iterations = 20;

float view_width = 5.0; // Essentially how far zoomed in we are
float upper_left_x = 0 - (view_width/2); // Scales the X coordinates
float upper_left_y = view_width/2;

//  Set the size and font
void setup() {
  size(700, 700);
  drawJuliaSet(-1, 0);
}

// Empty, but needs to be here in order
// for mouse interaction
void draw() {
}

// When the mouse moves, update the coordinates (just print out in the top corner)
void mouseMoved() {
  float a = getReal(mouseX);
  float b = getImaginary(mouseY);
  writeCoordinates(a, b);
}

// Draws the Julia Set for the given complex number ca + cb*i
void drawJuliaSet(float d, float e) {
  // Draw a black background (overwrite previous drawing)
  background(0);

  // Iterate over every pixel from top to bottom, left to right
  for (float row = 0; row <= height; row++)
    for (float col = 0; col <= width; col++) {
      
      int iterations = 0;

      float a = getReal(col);
      float b = getImaginary(row);

      while ((a*a + b*b) <= 2*2 && iterations < max_iterations) {
        float new_a = a*a - b*b + d;
        float new_b = 2*a*b + e;
        a = new_a;
        b = new_b;
        iterations++;
      }

      if (iterations == max_iterations) {
        stroke(255);
      }
      else {
        // The more iterations it took to escape, the smaller this number will be -> the closer to black
        stroke(1.0*iterations/max_iterations * 255);
      }

      point(col, row);
    }
}

// If the mouse is pressed, draw the Julia set for the new coordinates
void mousePressed() {
  drawJuliaSet(getReal(mouseX), getImaginary(mouseY));
  writeCoordinates(getReal(mouseX), getImaginary(mouseY));
}

// Compute the real component for a given x coordinate on
// the grid, scaled by the window size.
float getReal(float x) {
  return upper_left_x + ((x / width) * view_width);
}

// Compute the real component for a given y coordinate on
// the grid, scaled by the window size.
float getImaginary(float y) {
  return upper_left_y - ((y / height) * view_width);
}

// Writes the coordinates to the screen
void writeCoordinates(float x, float y) {
  // Draw a black box
  fill(0);
  rect(0, 0, 350, 50);
  // Write the numbers in white
  fill(255);
  // Print three decimal points of the X/Y coordinates
  text(String.format("%.3f + %.3fi", x, y), 25, 25);
}
