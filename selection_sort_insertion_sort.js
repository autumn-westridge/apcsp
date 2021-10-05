function selection_sort(sort_arr) {
    for (var i = 0; i < sort_arr.length; i++) {
        console.log(sort_arr);
        var min = sort_arr[i];
        var min_loc = i;
        for (var j = i; j < sort_arr.length; j++) {
            if (sort_arr[j] < min) {
                min = sort_arr[j];
                min_loc = j;
            }
        }
        var temp = sort_arr[i];
        sort_arr[i] = min;
        sort_arr[min_loc] = temp;
    }
}

function insertion_sort(sort_arr) {
    var el;
    for (var i = 0; i < sort_arr.length; i++) {
        for (var j = i; j >= 0; j--) {
            if (sort_arr[j] < sort_arr[j - 1]) {
                console.log(sort_arr);
                el = sort_arr[j];
                sort_arr[j] = sort_arr[j - 1];
                sort_arr[j - 1] = el;
            }
        }
    }
}

var tree_height = [9, 10, 16, 6, 12, 19];
//selection_sort(tree_height);
insertion_sort(tree_height);
console.log(tree_height);