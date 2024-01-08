function getCipherJeanna(str, key) {
    const matrix = [];
    const arrayKey = key.replaceAll(' ', '').split('');

    const alphabet = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z']
    const filterAlphabet = alphabet.filter(item => !arrayKey.includes(item));

    for(let i = 0; i < 5; i++) {
        matrix.push([]);
        for(let j = 0; j < 5; j++) {
            if(arrayKey.length > 0) {
                matrix[i].push(arrayKey[0]);
                arrayKey.shift();
            } else {
                matrix[i].push(filterAlphabet[0]);
                filterAlphabet.shift();
            }
        }
    }

    const queueShifts = [
        {i: -1, j:  0},
        {i:  0, j:  1},
        {i:  1, j:  0},
        {i:  0, j: -1},
    ]

    let result = '';
    for(let char of str.replaceAll(' ', '')) {
        for(let i = 0; i < matrix.length; i++) {
            let isBreak = false;
            for(let j = 0; j < matrix[i].length; j++) {
                if(char === 'j') char = i;
                if(char === matrix[i][j]) {
                    result += matrix
                        .at((i + queueShifts[0].i) % matrix.length)
                        .at((j + queueShifts[0].j) % matrix.length);

                    queueShifts.push(queueShifts[0]);
                    queueShifts.shift();
                    isBreak = true;
                    break;
                }
                else if(char.toLowerCase() === matrix[i][j]) {
                    result += matrix
                        .at((i + queueShifts[0].i) % matrix.length)
                        .at((j + queueShifts[0].j) % matrix.length)
                        .toUpperCase();

                    queueShifts.push(queueShifts[0]);
                    queueShifts.shift();
                    isBreak = true;
                    break;
                }
                else if(i * j === 16) {
                    result += char;
                }
            }
            if(isBreak) break;
        }
    }
    return result;
}