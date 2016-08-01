'use strict';

// jshint expr: true

var chai = require('chai');
var assert = chai.assert;

var expect = chai.expect;
var kitaro = require('../app/kiratoCds.js');
var Util = require('../app/util.js');

describe('kirato logic functions', function () {
    var arr = [];

    describe('grab largest combo', function () {
        it('should return array', function () {
            arr = [5, 4, 3, 1, 2];
            var outArr = kitaro.grabLargestCombo(arr);
            expect(outArr instanceof Array).be.true;
        });

        it('should return array with the same length of input', function () {
            arr = [1, 2, 3, 4, 5, 6];
            var outArr = kitaro.grabLargestCombo(arr);
            outArr.length.should.equal(6);
        });

        it('should return array with fewer member than input', function () {
            arr = [0, 7, 3, 0, 5, 6];
            var sortedArr = Util.sortArray(arr);
            var outArr = kitaro.grabLargestCombo(sortedArr);
            outArr.length.should.equal(4);
        });

        it('should return empty array if there is nothing left', function () {
            arr = [0, 0, 0, 0, 0];
            var outArr = kitaro.grabLargestCombo(arr);
            outArr.length.should.equal(0);
        });

        it('should return an array with all the member are equal 1', function () {
            arr = [1, 4, 6, 2, 4, 4];
            var sortedArray = Util.sortArray(arr);
            var outArr = kitaro.grabLargestCombo(sortedArray);
            expect(outArr).to.deep.equal([1, 1, 1, 1, 1, 1]);
        });
    });

    describe('get out the dishes which already grabbed to make combo', function () {
        it('should return array', function () {
            arr = [5, 4, 3, 1, 2];
            var outArr = kitaro.getOutGrabbedDishes(arr, [1, 1, 1]);
            expect(outArr instanceof Array).be.true;
        });

        it('should return array which is not equal to input', function () {
            arr = [5, 4, 2, 1, 0];
            var outArr = kitaro.getOutGrabbedDishes(arr, [1, 1, 1, 1]);
            expect(outArr).to.deep.not.equal(arr);
        });

        it('should not grab items when the number of item reach 0', function () {
            arr = [2, 1, 1, 0, 0];


            var outArr = kitaro.getOutGrabbedDishes(arr, [1, 1, 1]);
            var expectedArr = [1, 0, 0, 0, 0];
            expect(outArr).to.deep.equal(expectedArr);
        })

        it('should return array which is already take out the grabbed items', function () {
            arr = [6, 5, 4, 1, 0];


            var outArr = kitaro.getOutGrabbedDishes(arr, [1,1,1,1]);
            var expectedArr = [5, 4, 3, 0, 0];
            expect(outArr).to.deep.equal(expectedArr);
        });
    });

    describe('get all largest combos', function () {
        it('should return array', function () {
            arr = [5, 4, 3, 2, 1];
            var outArr = kitaro.getAllLargestCombos(arr);
            expect(outArr instanceof Array).be.true;
        });

        it('should return array of arrays', function () {
            arr = [5, 4, 3, 2, 1]
            var outArr = kitaro.getAllLargestCombos(arr);
            for (var i = 0; i < outArr.length; i++) {
                expect(outArr[i] instanceof Array).be.true;
            }
        });

        it('should return the correct combo after grabbed', function () {
            arr = [5, 4, 3, 2, 2]; //

            var outArr = kitaro.getAllLargestCombos(arr);
            var expected = [
                [1, 1, 1, 1, 1],
                [1, 1, 1, 1, 1],
                [1, 1, 1],
                [1, 1],
                [1]
            ]
            expect(outArr).to.deep.equal(expected);
        })
    });

    describe('construct combo summary', function () {
        it('should return array', function () {
            var combos = [
                [1, 1, 1, 1, 1],
                [1, 1, 1, 1],
                [1, 1],
                [1],
                [1]
            ]
            var outArr = kitaro.constructComboSummary(combos);
            expect(outArr instanceof Array).be.true;
        });

        it('should have the same number of items as the number of array in the input', function () {
            var combos = [
                [1, 1, 1, 1, 1],
                [1, 1, 1, 1],
                [1, 1],
                [1],
                [1]
            ]
            var constructedSummary = kitaro.constructComboSummary(combos);
            combos.length.should.equal(constructedSummary.length);
        });

        it('should return correct value for 5,5,4,2,1,1', function () {
            var combos = [
                [1, 1, 1, 1, 1],
                [1, 1, 1, 1, 1],
                [1, 1, 1, 1],
                [1, 1],
                [1],
                [1]
            ]

            var constructedSummary = kitaro.constructComboSummary(combos);
            var expectedSummary = [5, 5, 4, 2, 1, 1];
            expect(constructedSummary).to.deep.equal(expectedSummary);
        });

        it('should return correct value', function () {
            var combos = [
                [1, 1, 1, 1, 1],
                [1, 1, 1, 1],
                [1, 1],
                [1],
                [1]
            ]

            var constructedSummary = kitaro.constructComboSummary(combos);
            var expectedSummary = [5, 4, 2, 1, 1];
            expect(constructedSummary).to.deep.equal(expectedSummary);
        });
    });

    describe('calculate discount', function () {
        it('should return a number', function () {

            var combos = [5, 4, 2, 1, 1];

            var calculatedDiscount = kitaro.calculateDiscount(combos);
            expect(typeof calculatedDiscount === 'number').be.true;
        });

        it('should return a positive number', function () {
            var combos = [5, 4, 2, 1, 1];

            var calculatedDiscount = kitaro.calculateDiscount(combos);

            expect(calculatedDiscount).to.be.above(0);
        });

        it('should be 30 percentage of 1 disk if there are 3 dishes in the combo', function () {
            var combos = [3];

            var calculatedDiscount = kitaro.calculateDiscount(combos);

            calculatedDiscount.should.equal(30);
        });

        it('should be 125 percentage of 1 disk if there are 5 dishes in the combo', function () {

            var combos = [5];

            var calculatedDiscount = kitaro.calculateDiscount(combos);

            calculatedDiscount.should.equal(125);
        });

        it('should be 80 percentage of 1 disk if there are 4 dishes in the combo', function () {
            var combos = [4];

            var calculatedDiscount = kitaro.calculateDiscount(combos);

            calculatedDiscount.should.equal(80);
        });

        it('should describe correct value of discount using the method get all largest combos for 8 dishes', function () {
            var combos = [5, 3];

            var calculatedDiscount = kitaro.calculateDiscount(combos);

            calculatedDiscount.should.equal(155);
        });
    });

    describe('can take out', function () {
        it('should be able to swap (1)', function () {
            arr = [5, 4, 3, 2, 1];
            kitaro.canSwap(arr).should.be.true;
        });

        it('should be able to swap (2)', function () {
            arr = [4, 4, 3];
            kitaro.canSwap(arr).should.be.true;
        });

        it('should be able to swap (3)', function () {
            arr = [4, 4, 4, 2, 1];
            kitaro.canSwap(arr).should.be.true;
        });

        it('should be able to swap (4)', function () {
            arr = [4, 4, 3, 3, 2];
            kitaro.canSwap(arr).should.be.true;
        });

        it('should not be able to swap (1)', function () {
            arr = [2];
            kitaro.canSwap(arr).should.be.false;
        });

        it('should not be able to swap (2)', function () {
            arr = [2, 1, 1];
            kitaro.canSwap(arr).should.be.false;
        });

        it('should not be able to swap (3)', function () {
            arr = [2, 2, 2, 2, 2, 2, 2, 2];
            kitaro.canSwap(arr).should.be.false;
        });
    });

    describe('deduplicated combos', function () {
        it('should deduplicate combos correctly', function () {
            var combos = [
                [5, 5, 4, 3, 2],
                [4, 3, 2, 1],
                [6, 3, 2, 1],
                [4, 3, 2, 1],
                [5, 5, 4, 3, 2]
            ]
            var expectedResult = [
                [5, 5, 4, 3, 2],
                [4, 3, 2, 1],
                [6, 3, 2, 1]
            ]

            expect(kitaro.deduplicateCombos(combos)).to.deep.equal(expectedResult);
        });

        it('should deduplicate combos correctly', function () {
            var combos = [
                [5, 5, 4, 3, 2],
                [4, 3, 2, 1],
                [6, 3, 2, 1],
            ]
            var expectedResult = [
                [5, 5, 4, 3, 2],
                [4, 3, 2, 1],
                [6, 3, 2, 1]
            ]

            expect(kitaro.deduplicateCombos(combos)).to.deep.equal(expectedResult);
        });
    });

    describe('get some other possible combos', function () {
        it('should get some other possible combo correctly for [5,4,3,2,1]', function () {
            var combos = [5, 4, 3, 2, 1];
            var expectedCombos = [
                [4, 4, 4, 2, 1],
                [4, 4, 3, 3, 1],
                [4, 4, 3, 2, 2],
                [5, 3, 3, 3, 1],
                [5, 3, 3, 2, 2],
                [5, 4, 2, 2, 2],
                [5, 4, 3, 2, 1]
            ]

            expect(kitaro.getSomeOthersPossibleCombos(combos)).to.deep.equal(expectedCombos);
        });

        it('should get some other possible combo correctly for [3,3,2,2,2]', function () {
            var combos = [3, 3, 2, 2, 2];
            var expectedCombos = [
                [3, 3, 2, 2, 2]
            ]

            expect(kitaro.getSomeOthersPossibleCombos(combos)).to.deep.equal(expectedCombos);
        });
    });

    describe('find best discount', function () {
        it('best discount for [5,5,0,0,0] should be 250% of 1 disk', function () {
            var combos = [
                [5, 5],
                [4, 3, 3],
                [5, 3, 2]
            ];


            kitaro.findBestDiscount(combos).should.equal(250);
        });

        it('best discount for [3,3,3,2,2] should be 160% of 1 disk', function () {
            var combos = [
                [5, 3],
                [4, 4]
            ]
            kitaro.findBestDiscount(combos).should.equal(160);
        });

        it('best discount for [6,3,1,0,0] should be 30% of 1 disk', function () {
            var combos = [
                [3, 2, 2, 1, 1, 1],
                [2, 2, 2, 2, 1, 1],
                [1, 1, 1, 1, 1, 1, 1, 1, 1, 1]
            ];
            kitaro.findBestDiscount(combos).should.equal(30);
        });
    })

    describe('checking potential better combo', function () {
        it('[3, 3, 3, 3, 3] combo is a potential combo for [4, 4, 4, 3]', function () {
            expect(kitaro.isPotentialBetterCombo([4, 4, 4, 3], [3, 3, 3, 3, 3])).to.be.true;
        });
        it('[3, 3, 3, 3, 3] combo is a potential combo for [5, 4, 3, 3]', function () {
            expect(kitaro.isPotentialBetterCombo([5, 4, 3, 3], [3, 3, 3, 3, 3])).to.be.true;
        });
        it('[4, 4, 2, 2] combo is a potential combo for [5, 3, 2, 2]', function () {
            expect(kitaro.isPotentialBetterCombo([5, 3, 2, 2], [4, 4, 2, 2])).to.be.true;
        });
        it('[4, 2, 2, 2, 2] combo is a potential combo for [5, 2, 2, 2, 1]', function () {
            expect(kitaro.isPotentialBetterCombo([5, 2, 2, 2, 1], [4, 2, 2, 2, 2])).to.be.true;
        });
        it('[3, 3, 3, 2] combo is a potential combo for [5, 2, 2, 2]', function () {
            expect(kitaro.isPotentialBetterCombo([5, 2, 2, 2], [3, 3, 3, 2])).to.be.true;
        });

        it('[3,3,2,1,0] combo is not a potential combo for [3,3,3,0,0]', function () {
            var oldCombo = [3, 3, 3, 0, 0];
            var newCombo = [3, 3, 2, 1, 0];
            expect(kitaro.isPotentialBetterCombo(oldCombo, newCombo)).to.be.false;
        });

        it('[4,2,2,2,0] combo is not a potential combo for [4,3,3,0,0]', function () {
            var oldCombo = [4, 3, 3, 0, 0];
            var newCombo = [4, 2, 2, 2, 0];
            expect(kitaro.isPotentialBetterCombo(oldCombo, newCombo)).to.be.false;
        });

        it('[3,3,2,2,1] combo is not a potential combo for [5,3,3,0,0]', function () {
            var oldCombo = [5, 3, 3, 0, 0];
            var newCombo = [3, 3, 2, 2, 1];
            expect(kitaro.isPotentialBetterCombo(oldCombo, newCombo)).to.be.false;
        });
    });

    describe('get all possible comobos from 1 combo', function () {
        it('should get all possible combos from combo [3,1,0,0,0]', function () {
            var initCombo = [3, 1, 0, 0, 0];
            var allPossibleCombos = [
                [2, 2, 0, 0, 0],
                [2, 1, 1, 0, 0],
                [1, 1, 1, 1, 0]
            ]
        })
    });

    describe('get other combos', function () {
        it('should get combos by moving 1 dish for [5, 5, 4, 3, 0]', function () {
            var initCombo = [5, 5, 4, 3, 0];
            var possibleCombos = [
                [5, 4, 4, 4, 0],
                [5, 4, 4, 3, 1],
                [5, 5, 3, 3, 1],
                [5, 5, 4, 2, 1]
            ]
            var matchesArr = 0;
            var resultCombos = kitaro.getOtherCombosByMoving1Dish(initCombo);

            for (var i = 0; i < possibleCombos.length; i++) {
                for (var j = 0; j < resultCombos.length; j++) {
                    if (Util.compareArr(possibleCombos[i], resultCombos[j])) {
                        matchesArr++;
                    }
                }
            }
            matchesArr.should.equal(possibleCombos.length);
        });

        it('should get combos by moving 1 dish for [3, 1, 0, 0, 0]', function () {
            var initCombo = [3, 1, 0, 0, 0];
            var possibleCombos = [
                [2, 2, 0, 0, 0],
                [2, 1, 1, 0, 0]
            ]
            var matchesArr = 0;
            var resultCombos = kitaro.getOtherCombosByMoving1Dish(initCombo);

            for (var i = 0; i < possibleCombos.length; i++) {
                for (var j = 0; j < resultCombos.length; j++) {
                    if (Util.compareArr(possibleCombos[i], resultCombos[j])) {
                        matchesArr++;
                    }
                }
            }
            matchesArr.should.equal(possibleCombos.length);
        });

    })
})