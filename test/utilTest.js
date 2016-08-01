'use strict';

// jshint expr: true

var chai = require('chai');
var expect = chai.expect;
var assert = chai.assert;

chai.should();

var Util = require('../app/util.js');

describe('util features', function() {
    var arr = [];

    describe('sortArray', function() {
        it('should return array', function() {
            arr = [1,2,3];
            var outArr = Util.sortArray(arr);
            expect(outArr instanceof Array).be.true;
        });

        it('should return the same length as input', function() {
            arr = [1,2,3,5];
            var outArr = Util.sortArray(arr);
            outArr.length.should.equal(4);
        });

        it('should return array with largest number at the begining', function() {
            arr = [4,1,2,5];
            var outArr = Util.sortArray(arr);
            outArr[0].should.equal(5);
        });

        it('should return array with smallest number at last', function() {
            arr = [4,1,3,2];
            var outArr = Util.sortArray(arr);
            outArr[outArr.length-1].should.equal(1);
        })

        it('should return array sorted from largest to smallest', function() {
            arr = [4,3,5,6,2,7,2];
            var outArr = Util.sortArray(arr);
            expect(outArr).to.deep.equal([7,6,5,4,3,2,2]);
        })
    });

    describe('compare array', function() {
        it('should return true with 2 same array', function() {
            var arr1 = [1,2,3,4];
            var arr2 = [1,2,3,4];
            expect(Util.compareArr(arr1,arr2)).be.true;
        });

        it('should return false with 2 difference array', function() {
            var arr1 = [1,2,4];
            var arr2 = [1,2,3];
            expect(Util.compareArr(arr1,arr2)).be.false;

        })
    })
})



// function isEven(num) {
//   return num % 2 === 0;
// }
// function add(num1, num2) {
//   return num1 + num2;
// }

// describe('number tests', function() {

//   describe('isEven', function() {
//     it('should return true when number is even', function() {
//       isEven(4).should.be.true;
//     });

//     it('should return false when number is odd', function() {
//       expect(isEven(3)).be.false;
//     });
//   });


//   describe('add', function() {
//     var num;
//     beforeEach(function() {
//       num = 5;
//     })

//     it('should return 10 when adding 5 to 5', function() {
//       num = add(num, 5);
//       num.should.equal(10);
//     });

//     it('should return 12 when adding 7 to 5', function() {
//       num = add(num, 7);
//       num.should.equal(12);
//     });
//   })
// })