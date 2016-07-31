'use strict';

// jshint expr: true

var chai = require('chai');
var expect = chai.expect;
var assert = chai.assert;

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
            arr = [0, 0, 0, 0];
            var outArr = kitaro.grabLargestCombo(arr);
            outArr.length.should.equal(0);
        });

        it('should return an array with all the member are equal 1', function () {
            arr = [1, 4, 6, 0, 2, 4, 0, 4];
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
            arr = [5, 4, 0, 1, 2];
            var sortedArr = Util.sortArray(arr);
            var grabbedCombo = kitaro.grabLargestCombo(sortedArr);

            var outArr = kitaro.getOutGrabbedDishes(sortedArr, grabbedCombo);
            expect(outArr).to.deep.not.equal(sortedArr);
        })

        it('should return array which is already take out the grabbed items', function () {
            arr = [4, 0, 1, 5, 6];
            var sortedArr = Util.sortArray(arr);
            var grabbedCombo = kitaro.grabLargestCombo(sortedArr);
            var outArr = kitaro.getOutGrabbedDishes(sortedArr, grabbedCombo);
            var expectedArr = [5, 4, 3, 0, 0];
            expect(outArr).to.deep.equal(expectedArr);

        })
    });

    describe('get all largest combos', function () {
        it('should return array', function () {
            arr = [5, 4, 3, 1, 2];
            var outArr = kitaro.getAllLargestCombos(arr);
            expect(outArr instanceof Array).be.true;
        });

        it('should return array of arrays', function () {
            arr = [4,1,5,2,3];
            var outArr = kitaro.getAllLargestCombos(arr);
            for(var i = 0 ; i < outArr.length ; i++) {
                expect(outArr[i] instanceof Array).be.true;
            }
        });
    })
})