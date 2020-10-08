import _ from 'lodash';
import { performance } from 'perf_hooks';

const generateVector = (nbPersons = 20, nbWords = 50) => {
    const vector = {};
    const t0 = performance.now();

    console.time('buildingVector');
    _.times(nbPersons, personIdx => {
        _.times(nbWords, wordIdx => {
            const randomNumber = _.random(0, 10000);
            const numberToWrite = randomNumber >= 9400 ? 1 : 0;

            if (_.isNil(vector[personIdx])) {
                vector[personIdx] = [numberToWrite]
            }
            vector[personIdx].push(numberToWrite);
        });
    });
    console.timeEnd('buildingVector');
    const t1 = performance.now();
    console.log(`Building vector time is ${t1 - t0} milliseconds`);

    return vector;
};

const getTimeExecution = (nbPersons = 20, nbWords = 50) => {
    const vector = generateVector(nbPersons, nbWords);
    const personRandomIndex = _.random(0, nbPersons);
    const wordRandomIndex = _.random(0, nbWords);
    const t0 = performance.now();
    console.time('timeExecution');
    const value = vector[personRandomIndex][wordRandomIndex];
    const t1 = performance.now();
    console.timeEnd('timeExecution');

    console.log(`Value of person ${personRandomIndex} for word ${wordRandomIndex} : ${value}`);
    console.log(`Performance time is ${t1 - t0} milliseconds`);

    const countOccurencesArray = [];
    let countOccurences = 0;
    let index = 0;

    const t2 = performance.now();
    console.time('countOccurencesArray');
    _.times(nbWords, idxWord => {
        _.each(vector, employee => {
            if (employee[index] === 1) {
                countOccurences++;
            }
        });
        countOccurencesArray[index] = countOccurences;
        countOccurences = 0;
        index++;
    });
    const t3 = performance.now();
    console.timeEnd('countOccurencesArray');
    console.log(`Occurences array time is ${t3 - t2} milliseconds`);
    console.log('countOccurencesArray is ', JSON.stringify(countOccurencesArray));
};

const TESTS_TO_EXECUTE = [
    {
        nbEmployees: 20,
        nbWords: 50,
    },
    {
        nbEmployees: 100,
        nbWords: 100,
    },
    {
        nbEmployees: 500,
        nbWords: 75,
    },
    {
        nbEmployees: 1000,
        nbWords: 250,
    },
    {
        nbEmployees: 10000,
        nbWords: 500,
    },
];

_.each(TESTS_TO_EXECUTE, test => {
    console.log('-------------~/Perso/Zest/Labo/index.js-----------------');
    console.log(`Execution for ${test.nbEmployees} employees and ${test.nbWords} words`);
    getTimeExecution(test.nbEmployees, test.nbWords);
    console.log('------------------------------\n');
});
