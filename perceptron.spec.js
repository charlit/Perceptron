var Perceptron = require("./perceptron.js")
describe("Perceptron", function() {
    var perceptron;
    var THRESHOLD = 0.4;
    var ACTIVE = 1;
    var INACTIVE = 0;

    describe("with one input and one output", function() {

        beforeEach(function () {
            perceptron = new Perceptron(THRESHOLD, 1);
        });

        function expectOutput(input, weight, output) {
            var result = perceptron.process([input], [[weight]]);
            expect(result[0]).toEqual(output);
        }

        it("should output 0 if inactive input", function() {
            expectOutput(INACTIVE,0,0);
        });

        it("should output input*weight if input is over threshold", function() {
            var input = THRESHOLD + 0.1;
            var weight = 0.6;
            expectOutput(input,weight,input*weight);
        });

        it("should output 0 if input is below threshold", function() {
            var input = THRESHOLD - 0.1;
            expectOutput(input,1,0);
        });
    });

    describe("set up for AND", function() {
        var AND_WEIGHTS = [[THRESHOLD/2], [THRESHOLD/2]];

        function expectActiveOutput(expected, inputs) {
            var result = perceptron.process(inputs, AND_WEIGHTS);
            var outputActive = perceptron.isActive(result[0]);
            expect(outputActive).toBe(expected);
        }

        beforeEach(function() {
            perceptron = new Perceptron(THRESHOLD, 1);
        });

        it("should act like a AND", function() {
            expectActiveOutput(false,   [INACTIVE,  INACTIVE]);
            expectActiveOutput(false,   [INACTIVE,  ACTIVE]);
            expectActiveOutput(false,   [ACTIVE,    INACTIVE]);
            expectActiveOutput(true,    [ACTIVE,    ACTIVE]);
        });
    });

    describe("with multiple outputs", function() {
       it("should handle 2 outputs", function() {
            perceptron = new Perceptron(THRESHOLD, 2);
            var result = perceptron.process([1], [[0, 1]]);
            expect(result).toEqual([0, 1]);
       });
    });
});