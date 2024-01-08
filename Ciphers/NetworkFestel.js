function getNetworkFestel(str, key) {
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

    const encryption = (str) => {
        let result = '';
        for(const char of str) result += (char in codeBodo) ? codeBodo[char] : '';
        return result;
    }

    const round = (strArr, offset) => {
        // сдвиг
        strArr = strArr.map(item => item.split(''));
        for(let k = 0; k < offset; k++) strArr[0].push(strArr[0].shift());

        // xor
        const copyStrArr = [strArr[1], []];
        for(let i = 0; i < strArr[0]; i++) {
            copyStrArr[1].push(strArr[0][i] ^ strArr[1][i]);
        }
        return copyStrArr[0].join('') + copyStrArr[1].join('');
    }

    // деление на раунды
    const l = 8;
    let result = '';
    const text = (str + 'aaaaaaaa').slice(0, Math.ceil(str.length / l) * l).toLowerCase();

    for(let i = 0; i < text.length; i += l) {
        const block = text.slice(i * l, (i+1) * l);

        const strArray = [block.slice(0, l/2), block.slice(l/2, l)]
            .map(item => encryption(item));
        console.log(strArray);
        for(const offset of key) {
            result += round(strArray, offset);
        }
    }
    return result;
}