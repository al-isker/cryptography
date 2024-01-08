function getCipherBook(str, key) {
    const alphabet = ['я', 'а', 'б', 'в', 'г', 'д', 'е', 'ж', 'з', 'и', 'й', 'к', 'л', 'м', 'н', 'о', 'п', 'р', 'с', 'т', 'у', 'ф', 'х', 'ц', 'ч', 'ш', 'щ', 'ъ', 'ы', 'ь', 'э', 'ю'];

    if(str.length > key.length) {
        alert(`Введите ключ, длиннее на ${str.length - key.length} символ(-a)`);
        return;
    }

    const strCipher = str
        .toLowerCase()
        .split('')
        .map(item => alphabet.indexOf(item))
        .filter(item => item >= 0)
        .join('');

    const keyCipher = key
        .toLowerCase()
        .split('')
        .map(item => alphabet.indexOf(item))
        .filter(item => item >= 0)
        .join('');

    return [...new Array(str.length)]
        .map((_, index) => alphabet[(Number(strCipher[index]) + Number(keyCipher[index])) % 32])
        .join('')
        .toUpperCase();
}