function getCipherDora(str) {
    const slicedAlphabet = ['b', 'c', 'd', 'f', 'g', 'h', 'j', 'k', 'l', 'm', 'p', 'q', 'u', 'v', 'w', 'x', 'y', 'z'];
    const frequentChar = ['a', 's', 'i', 'n', 't', 'o', 'e', 'r'];

    const matrix = [
        [null,'1', '2', '3', '4', '5', '6', '7', '8', '9'],
        [['4', '5', '6', '7', '8', '9'], ...frequentChar, null],
        [['2', '3'], ...slicedAlphabet.slice(0, slicedAlphabet.length / 2)],
        [['1'], ...slicedAlphabet.slice(slicedAlphabet.length / 2, slicedAlphabet.length)]
    ];

    const getRandomElement = (arr) => arr[Math.floor(Math.random() * arr.length)];

    let result = '';
    for(const char of str.replaceAll(' ', '').toLowerCase()) {
        for(let i = 1; i < matrix.length; i++) {
            for(let j = 1; j < matrix[0].length; j++) {
                if(char === matrix[i][j]) result += getRandomElement(matrix[i][0]) + matrix[0][j];
            }
        }
    }
    return result;
}