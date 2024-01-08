function getCipherMark(str) {
    const slicedAlphabet = ['б', 'г', 'д', 'ж', 'з', 'и', 'й', 'к', 'м', 'п', 'р', 'т', 'у', 'ф', 'х', 'ц', 'ч', 'ш', 'щ', 'ъ', 'ы', 'ь', 'э', 'ю', 'я'];
    const frequentChar = ['с', 'е', 'н', 'о', 'в', 'а', 'л'];

    const matrix = [
        [null, '1', '2', '3', '4', '5', '6', '7', '8', '9', '0'],
        [null, ...frequentChar, null, null, null],
        ['8', ...slicedAlphabet.slice(0,  10)],
        ['9', ...slicedAlphabet.slice(10, 20)],
        ['0', ...slicedAlphabet.slice(20)]
    ];

    let result = '';
    for(const char of str.toLowerCase()) {
        for(let i = 1; i < matrix.length; i++) {
            for(let j = 1; j < matrix[0].length; j++) {
                if(char === matrix[i][j]) result += (matrix[i][0] ?? '') + (matrix[0][j] ?? '') ;
            }
        }
    }
    return result;
}
