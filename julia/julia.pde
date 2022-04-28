int num_x = 600;
int num_y = 600;
int pixel_size = 1;
int max_iteration = 100;

void setup() {
  size(600, 600);
  background(255);
  noStroke();
  fill(0);
}

void draw () {
  for (int i = 0; i < num_x; i++) {
    for (int j = 0; j < num_y; j++) {
      float x0 = map(i, 0, num_x, -2.0, 0.47);
      float y0 = map(j, 0, num_y, -1.12, 1.12);
      float x = 0;
      float y = 0;
      int iteration = 0;
      while ((x*x + y*y) <= 2*2 && iteration < max_iteration) {
        float x_temp = x*x - y*y + x0;
        y = 2*x*y + y0;
        x = x_temp;
        iteration++;
      }
      fill(255);
      if (iteration == max_iteration) {
        fill(0);
      }
      rect(i * pixel_size, j * pixel_size, i * pixel_size + pixel_size, j * pixel_size * pixel_size);
    }
  }
}
