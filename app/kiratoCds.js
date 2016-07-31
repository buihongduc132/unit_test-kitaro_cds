
exports.grabLargestCombo = function (arr) {

    var combo = [];
    for (var i = 0; i < arr.length; i++) {
        if (arr[i] > 0) {
            combo.push(1);
        }
    }

    return combo;
}

exports.getOutGrabbedDishes = function (pool, grabbedCombo) {
    var poolAfter = [];

    for (var i = 0; i < grabbedCombo.length; i++) {
        poolAfter.push(pool[i] - grabbedCombo[i]);
    }
    for(; i < pool.length;i ++) {
        poolAfter.push(pool[i]);
    }

    return poolAfter;
}

exports.getAllLargestCombos = function(arr) {
    

    return [
        [1,2,3],
        [2,3,4]
    ]
}