'use strict';

// jshint expr: true

var chai = require('chai');
var expect = chai.expect;

chai.should();

function isEven(num) {
  return num % 2 === 0;
}
function add(num1, num2) {
  return num1 + num2;
}

describe('number tests', function() {

  describe('isEven', function() {
    it('should return true when number is even', function() {
      isEven(4).should.be.true;
    });

    it('should return false when number is odd', function() {
      expect(isEven(3)).be.false;
    });
  });


  describe('add', function() {
    var num;
    beforeEach(function() {
      num = 5;
    })

    it('should return 10 when adding 5 to 5', function() {
      num = add(num, 5);
      num.should.equal(10);
    });

    it('should return 12 when adding 7 to 5', function() {
      num = add(num, 7);
      num.should.equal(12);
    });
  })
})