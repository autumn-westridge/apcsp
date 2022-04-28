function iterativeMath(z, c) {
    var num_iterations = 100;
    for (var i = 0; i < num_iterations; i++) {
        z = Math.pow(z, 2) + c;
    }
    console.log(z);
}

iterativeMath(-1, 0.000000001);
