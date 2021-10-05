function selection_sort(sort_arr) {
    // Declare the variables up here so we only have to declare them once
    var min;
    var min_index;
    var temp;

    // For each element in the array...
    for (var i = 0; i < sort_arr.length; i++) {
        console.log(sort_arr);

        // Find the minimum, and its index
        min = sort_arr[i];
        min_index = i;
        for (var j = i; j < sort_arr.length; j++) {
            if (sort_arr[j] < min) {
                min = sort_arr[j];
                min_index = j;
            }
        }

        // Swap the minimum (at index min_index) for the element at index i
        // Gotta use "temp" to store one value while we do the swap
        temp = sort_arr[i];
        sort_arr[i] = min;
        sort_arr[min_index] = temp;
    }
}

function insertion_sort(sort_arr) {
    // Declare this once
    var el;

    // For each element in the array...
    for (var i = 0; i < sort_arr.length; i++) {

        // Compare it with the element to its left
        for (var j = i; j >= 0; j--) {

            // If it's smaller, swap them
            if (sort_arr[j] < sort_arr[j - 1]) {
                console.log(sort_arr);
                el = sort_arr[j];
                sort_arr[j] = sort_arr[j - 1];
                sort_arr[j - 1] = el;
            }

            // If it's bigger, we can stop
            else {
                break;
            }
        }
    }
}

var tree_height = [9, 10, 16, 6, 12, 19];
//selection_sort(tree_height);
insertion_sort(tree_height);
console.log(tree_height);