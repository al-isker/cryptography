function getCipherRamsay(str, key) {
    const alphabet = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z', '.', '/'];
    let slicedAlphabet = [...alphabet];

    const matrix = [key.split('').map((s) => ({letter: `${s}`}))];

    let i = 1;
    while(slicedAlphabet.length !== 0) {
        matrix.push([]);
        let j = 0;
        while(j < key.length) {
            let fill = true;
            for(const char of key) {
                if(char === slicedAlphabet[0]) fill = false;
            }
            if(fill) {
                matrix[i].push({letter: slicedAlphabet[0] ?? null});
                j++;
            }
            slicedAlphabet = slicedAlphabet.slice(1);
        }
        i++;
    }

    const frequentChar = ['a', 's', 'i', 'n', 't', 'o', 'e', 'r'];

    let countOne = 0;
    let countTwo = 70;

    for(let j = 0; j < matrix[0].length; j++) {
        for(i = 0; i < matrix.length; i++) {
            if(matrix[i][j].letter) {
                let fill = true;
                for(const char of frequentChar) {
                    if(char === matrix[i][j].letter) {
                        matrix[i][j].number = countOne;
                        fill = false;
                        countOne++;
                        break;
                    }
                }
                if(fill) {
                    matrix[i][j].number = countTwo;
                    countTwo++;
                }
            }
        }
    }

    let result = '';
    for(const char of str.toLowerCase().replaceAll(' ', '')) {
        for(const row of matrix) {
            let isBreak = false;
            for(const box of row) {
                if(char === box.letter) {
                    result += box.number;
                    isBreak = true;
                    break;
                }
                else if(box.letter === '/') {
                    if(!isNaN(Number(char))) result += `${box.number}${char}${box.number}`;
                }
            }
            if(isBreak) break;
        }
    }
    console.log(matrix);
    return result;
}