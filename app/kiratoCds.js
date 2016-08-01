var Util = require('./util.js');

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
    for (; i < pool.length; i++) {
        poolAfter.push(pool[i]);
    }

    return poolAfter;
}

exports.getAllLargestCombos = function (arr) {
    var result = [];

    var grabbed = this.grabLargestCombo(arr);
    var arrayAfter = this.getOutGrabbedDishes(arr, grabbed);
    while (grabbed.length) {
        result.push(grabbed);
        grabbed = this.grabLargestCombo(arrayAfter);
        arrayAfter = this.getOutGrabbedDishes(arrayAfter, grabbed);
    }
    return result;
}

exports.constructComboSummary = function (comboArr) {
    var result = [];
    for (var i = 0; i < comboArr.length; i++) {
        result.push(comboArr[i].length);
    }
    return result;
}

exports.diskPrice = 8;
const discount1 = 0;
const discount2 = 0;
const discount3 = 10;
const discount4 = 20;
const discount5 = 25;
const finalDiscount1 = discount1;
const finalDiscount2 = discount2 * 2;
const finalDiscount3 = discount3 * 3;
const finalDiscount4 = discount4 * 4;
const finalDiscount5 = discount5 * 5;
const minToEarnDiscount = function () {
    if (discount1) return 1;
    if (discount2) return 2;
    if (discount3) return 3;
    if (discount4) return 4;
    if (discount5) return 5;
    return 0;
}

exports.calculateDiscount = function (summaryArr) {
    var result = 0;
    for (var i = 0; i < summaryArr.length; i++) {
        switch (summaryArr[i]) {
            case 1:
                result += finalDiscount1;
                break;
            case 2:
                result += finalDiscount2;
                break;
            case 3:
                result += finalDiscount3;
                break;
            case 4:
                result += finalDiscount4;
                break;
            case 5:
                result += finalDiscount5;
                break;

            default:
                break;
        }
    }

    return result;
}

exports.findBestDiscount = function(combos) {
    var bestDiscount = 0;
    for(var i = 0; i < combos.length; i++) {

        var currentDiscount =this.calculateDiscount(combos[i]);
        if(currentDiscount > bestDiscount) {
            bestDiscount = currentDiscount;
        }
    }

    return bestDiscount;
}

exports.canSwap = function (combos) {
    return combos[0] > 2;
}

exports.getSomeOthersPossibleCombos = function (largestCombos) {
    var smallerCombos = this.getOtherCombosByMoving1Dish(largestCombos);
    var totalCombos = smallerCombos.splice(0);


    totalCombos.push(largestCombos);
    for(var i = 0 ; i < smallerCombos.length; i++) {
        totalCombos.push(smallerCombos[i].slice(0));
    }

    return this.deduplicateCombos(totalCombos);
}

exports.deduplicateCombos = function(combos) {
    for(var i = 0 ; i < combos.length; i++) {
        combos[i] = Util.sortArray(combos[i]);
    }

    var tempCombos = [];

    for(var i = 0 ; i < combos.length; i++) {
        var isDuplicated = false;
        for(var j = i-1; j >= 0 ; j -- ) {
            if(Util.compareArr(combos[j], combos[i])) {
                isDuplicated = true;
            }
        }
        if(!isDuplicated) {
            tempCombos.push(combos[i].slice(0));
        }
    }

    return tempCombos;
}


exports.getOtherCombosByMoving1Dish = function (combos) {
    var otherCombos = [];
    if (this.canSwap(combos)) {
        for (var i = 0; i < combos.length - 1; i++) {
            for (var j = i + 1; j < combos.length; j++) {
                if (combos[i] > combos[j] + 1) {
                    
                    var tempArr = combos.slice(0);
                    tempArr[i]--;
                    for (var k = j; k < combos.length; k++) {
                        var candidateArr = tempArr.slice(0);
                        candidateArr[k]++;
                        candidateArr = Util.sortArray(candidateArr);
                        var shouldAddIntoOtherCombos = true;

                        for (var l = 0; l < otherCombos.length; l++) {
                            if(Util.compareArr(otherCombos[l], candidateArr)) {
                                shouldAddIntoOtherCombos = false;
                            }
                        }
                        if (shouldAddIntoOtherCombos) {
                            otherCombos.push(candidateArr);
                        }
                    }
                }
            }
        }
    }

    return otherCombos;
}

exports.isPotentialBetterCombo = function (oldCombo, newCombo) {
    var oldComboDiscounts = 0;
    var newComboDiscounts = 0;

    for (var i = 0; i < oldCombo.length; i++) {
        if (oldCombo[i] >= minToEarnDiscount()) {
            oldComboDiscounts++;
        }
        if (newCombo[i] >= minToEarnDiscount()) {
            newComboDiscounts++;
        }
    }

    return newComboDiscounts >= oldComboDiscounts;
}
