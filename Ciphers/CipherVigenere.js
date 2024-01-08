function getCipherVigenere(str, key) {
    const alphabet = ['а', 'б', 'в', 'г', 'д', 'е', 'ё', 'ж', 'з', 'и', 'й', 'к', 'л', 'м', 'н', 'о', 'п', 'р', 'с', 'т', 'у', 'ф', 'х', 'ц', 'ч', 'ш', 'щ', 'ъ', 'ы', 'ь', 'э', 'ю', 'я'];

    const [s, k] = [str, key].map(item => item.replaceAll(' ', '').toLowerCase());

    let result = '';
    let countS = 0;
    let countK = 0;

    while(countS < s.length) {
        const iS = alphabet.indexOf(s[countS]);
        const iK = alphabet.indexOf(k[countK % k.length]);

        if(iS === -1) {
            countS++;
            continue;
        }
        else if(iK === -1) {
            countK++;
            continue;
        }

        result += alphabet[(iS + iK) % alphabet.length];
        countS++;
        countK++;
    }

    return result;
}