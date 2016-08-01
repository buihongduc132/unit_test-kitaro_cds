/*
The idea is : 
Get the input as and array which have 5 elements represent the number of each type of disk bought
For example:
    Let's say the 5 types are (A B C D E)
    [5,4,3,2,1]: means that the customer buy 5 disk A, 4 disk B, 3 disk C, 2 disk D, 1 disk 

In order to calculate discount, we have to group them into combo.
    So, the constructSummaryCombo function will do that
    for the above example [5,4,3,2,1], we can have many many combos around that. Some example
    -   ABCDE (5 disks)
        ABCD (4 disks)
        ABC (3 disks)
        AB (2 disks)
        A (1 disk)
    Which can also preresent as the SummaryCombo like this : [5,4,3,2,1]
    -   (4 disks) ABCD
        (4 disks) ABC E
        (2 disks) AB
        (2 disks) AB
        (2 disks) A C
    Which have the SummaryCombo is [4,4,2,2,2]

    for another basket, let's say [2,2,1,1,0];
    Largest combo is : ABCD + AB [4,2]
    But we can do another combo : ABC + ABD [3,3]
    Or even other combo like : AB + CD + AB [2,2,2]

After having the combos.
    we will go through all the combos to calculate the discount.

*In this excecise, I am not cover every case of combos, I only cover some of it.

*/
var kitaro = require('./app/kiratoCds.js');
var Util = require('./app/util.js');

var customerBasket = [
    [1,1,1,1,1],
    [1,0,1,1,1],
    [1,1,0,1,0],
    [1,0,1,0,0],
    [0,0,0,0,1],
    [2,1,2,1,2],
    [3,2,3,2,3],
    [6,3,1,0,0]
]

for(var i = 0 ; i < customerBasket.length; i++) {
    var currentBasket = Util.sortArray(customerBasket[i]);
    var largestCombos = kitaro.getAllLargestCombos(currentBasket);
    var constructedSummary = kitaro.constructComboSummary(largestCombos);
    var othersPossibleCombos = kitaro.getSomeOthersPossibleCombos(constructedSummary);
    var bestDiscount = kitaro.findBestDiscount(othersPossibleCombos);
    console.log("For basket: " + currentBasket + ", best discount is $" + (bestDiscount*kitaro.diskPrice/100) + ". Which is " + bestDiscount + "% value of 1 disk");
}