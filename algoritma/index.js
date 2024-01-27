// #1
function reverseAlphabetWithNumberAtEnd(inputString) {
    let reversedAlphabet = '';

    const alphabetChars = inputString.replace(/\d/g, '');

    for (let i = alphabetChars.length - 1; i >= 0; i--) {
        reversedAlphabet += alphabetChars[i];
    }

    const result = reversedAlphabet + inputString.replace(/\D/g, '');

    return result;
}

const input = "NEGIE1";
const hasil = reverseAlphabetWithNumberAtEnd(input);
console.log(hasil); // Output: "EIGEN1"

// #2
function longestWord(sentence) {
    let currentWord = '';
    let longest = '';

    for (let i = 0; i < sentence.length; i++) {
        const char = sentence[i];

        if (char !== ' ') {
            currentWord += char;
        } else {
            if (currentWord.length > longest.length) {
                longest = currentWord;
            }
            currentWord = '';
        }
    }

    if (currentWord.length > longest.length) {
        longest = currentWord;
    }

    return longest;
}

const sentence = "Saya sangat senang mengerjakan soal algoritma";
const longestWordResult = longestWord(sentence);
console.log(`${longestWordResult}: ${longestWordResult.length} characters`);

// #3
function countOccurrences(input, query) {
    const output = [];

    for (let i = 0; i < query.length; i++) {
        const queryWord = query[i];
        let count = 0;

        for (let j = 0; j < input.length; j++) {
            const inputWord = input[j];
            if (inputWord === queryWord) {
                count++;
            }
        }

        output.push(count);
    }

    return output;
}


// #4
const INPUT = ['xc', 'dz', 'bbb', 'dz'];
const QUERY = ['bbb', 'ac', 'dz'];
const output = countOccurrences(INPUT, QUERY);
console.log(output);  // Output: [1, 0, 2]

function diagonalDifference(matrix) {
    let diagonal1 = 0;
    let diagonal2 = 0;

    for (let i = 0; i < matrix.length; i++) {
        diagonal1 += matrix[i][i];
        diagonal2 += matrix[i][matrix.length - 1 - i];
    }

    const difference = diagonal1 > diagonal2 ? diagonal1 - diagonal2 : diagonal2 - diagonal1;

    return difference;
}

const matrix = [[1, 2, 0], [4, 5, 6], [7, 8, 9]];
const result = diagonalDifference(matrix);
console.log(result);  // Output: 3
