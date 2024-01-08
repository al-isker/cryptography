function getCipherCaesar(str, key) {
    const alphabet = ['а', 'б', 'в', 'г', 'д', 'е', 'ё', 'ж', 'з', 'и', 'й', 'к', 'л', 'м', 'н', 'о', 'п', 'р', 'с', 'т', 'у', 'ф', 'х', 'ц', 'ч', 'ш', 'щ', 'ъ', 'ы', 'ь', 'э', 'ю', 'я'];

    const offset = Number(key); 
    const circularAlphabet = [...alphabet];
    for(let i = 0; i < Math.ceil(offset/alphabet.length); i++) {
        circularAlphabet.push(...alphabet);
    }

    let result = '';
    for(const char of str) {
        const index = alphabet.indexOf(char.toLowerCase());
        result +=
            (index === -1) ? char :
                (char === char.toLowerCase()) ? circularAlphabet[index + offset] :
                    circularAlphabet[index + offset].toUpperCase();
    }

    return result;
}