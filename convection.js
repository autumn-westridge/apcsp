var const_a = 10.0;
var const_b = 28.0;
var const_c = (8.0/3.0);

var x = 0.1, y = 0.0, z = 0.0;
var t = 0.01;

for (var i = 0; i < 100; i++) {
    x += t * (const_a * (y - x));
    y += t * ((x * (const_b - z)) - y);
    z += t * ((x * y) - (const_c * z));

    console.log(x.toFixed(2) + ", " + y.toFixed(2) + ", " + z.toFixed(2));
}
