function getCipherRoute(str, key) {
    const line = str.replaceAll(' ', '');

    const matrix = [];
    let index = 0;
    for(let i = 0; i < Math.ceil(line.length / key.length); i++) {
        matrix.push([]);
        while(index - i*key.length < key.length) {
            matrix[i].push(line[index] ?? 'а')
            index += 1;
        }
    }

    const getArrayIndexes = (word) => {
        const alphabet = ['а', 'б', 'в', 'г', 'д', 'е', 'ё', 'ж', 'з', 'и', 'й', 'к', 'л', 'м', 'н', 'о', 'п', 'р', 'с', 'т', 'у', 'ф', 'х', 'ц', 'ч', 'ш', 'щ', 'ъ', 'ы', 'ь', 'э', 'ю', 'я'];
        const arrayIndexes = [];
        for(const char of alphabet) {
            for(let i = 0; i < word.length; i++) {
                if(char === word[i]) {
                    arrayIndexes.push(i);
                    break;
                }
            }
        }
        return arrayIndexes;
    }

    let result = '';
    for(const column of getArrayIndexes(key)) {
        for(let i = 0; i < matrix.length; i++) {
            result += matrix[i][column];
        }
    }
    return result;
}