'use strict';

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

var _perf_hooks = require('perf_hooks');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var generateVector = function generateVector() {
    var nbPersons = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 20;
    var nbWords = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 50;

    var vector = {};
    var t0 = _perf_hooks.performance.now();

    console.time('buildingVector');
    _lodash2.default.times(nbPersons, function (personIdx) {
        _lodash2.default.times(nbWords, function (wordIdx) {
            var randomNumber = _lodash2.default.random(0, 10000);
            var numberToWrite = randomNumber >= 9400 ? 1 : 0;

            if (_lodash2.default.isNil(vector[personIdx])) {
                vector[personIdx] = [numberToWrite];
            }
            vector[personIdx].push(numberToWrite);
        });
    });
    console.timeEnd('buildingVector');
    var t1 = _perf_hooks.performance.now();
    console.log('Building vector time is ' + (t1 - t0) + ' milliseconds');

    return vector;
};

var getTimeExecution = function getTimeExecution() {
    var nbPersons = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 20;
    var nbWords = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 50;

    var vector = generateVector(nbPersons, nbWords);
    var personRandomIndex = _lodash2.default.random(0, nbPersons);
    var wordRandomIndex = _lodash2.default.random(0, nbWords);
    var t0 = _perf_hooks.performance.now();
    console.time('timeExecution');
    var value = vector[personRandomIndex][wordRandomIndex];
    var t1 = _perf_hooks.performance.now();
    console.timeEnd('timeExecution');

    console.log('Value of person ' + personRandomIndex + ' for word ' + wordRandomIndex + ' : ' + value);
    console.log('Performance time is ' + (t1 - t0) + ' milliseconds');

    var countOccurencesArray = [];
    var countOccurences = 0;
    var index = 0;

    var t2 = _perf_hooks.performance.now();
    console.time('countOccurencesArray');
    _lodash2.default.times(nbWords, function (idxWord) {
        _lodash2.default.each(vector, function (employee) {
            if (employee[index] === 1) {
                countOccurences++;
            }
        });
        countOccurencesArray[index] = countOccurences;
        countOccurences = 0;
        index++;
    });
    var t3 = _perf_hooks.performance.now();
    console.timeEnd('countOccurencesArray');
    console.log('Occurences array time is ' + (t3 - t2) + ' milliseconds');
    console.log('countOccurencesArray is ', JSON.stringify(countOccurencesArray));
};

var TESTS_TO_EXECUTE = [{
    nbEmployees: 20,
    nbWords: 50
}, {
    nbEmployees: 100,
    nbWords: 100
}, {
    nbEmployees: 500,
    nbWords: 75
}, {
    nbEmployees: 1000,
    nbWords: 250
}, {
    nbEmployees: 10000,
    nbWords: 500
}];

_lodash2.default.each(TESTS_TO_EXECUTE, function (test) {
    console.log('-------------~/Perso/Zest/Labo/index.js-----------------');
    console.log('Execution for ' + test.nbEmployees + ' employees and ' + test.nbWords + ' words');
    getTimeExecution(test.nbEmployees, test.nbWords);
    console.log('------------------------------\n');
});