function getCipherVernam(str, key) {
    const codeBodo = {
        a: '11000',
        b: '10011',
        c: '01110',
        d: '10010',
        e: '10000',
        f: '10110',
        g: '01011',
        h: '00101',
        i: '01100',
        j: '11010',
        k: '11110',
        l: '01001',
        m: '00111',
        n: '00110',
        o: '00011',
        p: '01101',
        q: '11101',
        r: '01010',
        s: '10100',
        t: '00001',
        u: '11100',
        v: '01111',
        w: '11001',
        x: '10111',
        y: '10101',
        z: '10001',
    };

    let keyCipher = '';
    for(const int of key) keyCipher += ('000' + Number(int).toString(2)).slice(-4);

    let strCipher = '';
    for(const char of str.replaceAll(' ', '').toLowerCase()) strCipher += codeBodo[char] ?? '';

    if(strCipher.length > keyCipher.length) {
        alert(`Введите ключ, длиннее на ${Math.ceil((strCipher.length - keyCipher.length) / 4)} символ(-a)`)
        return;
    }

    let result = '';
    for(let i = 0; i < strCipher.length; i++) {
        result += strCipher[i] ^ keyCipher[i];
    }
    return result;
}