const ciphers = [
    // time проверяется на 10-50 инетраций * 10
    {
        name: 'Caesar',
        type: 'Cipher',
        language: 'Ru',
        description: 'каждый символ в открытом тексте заменяется символом, находящимся на некотором постоянном числе позиций левее или правее него в алфавите',
        defaultStr: 'Привет, Боб!',
        defaultKey: 3,
        time: '18',
        protection: 2,
        getCipher: (str, key) => getCipherCaesar(str, key),
        favorite: false
    },
    {
        name: 'Route',
        type: 'Cipher',
        language: 'Ru',
        description: 'в таблицу по определённому маршруту записывается текст, затем переставляются столбцы и строки, далее по определённому маршруту выписывается шифрограмма',
        defaultStr: 'Нельзя недооцеивать противника!',
        defaultKey: 'пароль',
        time: '32',
        protection: 5,
        getCipher: (str, key) => getCipherRoute(str, key),
        favorite: false
    },
    {
        name: 'Dora',
        type: 'Cipher',
        language: 'En',
        description: 'шифрование производится заменой каждой буквы на двузначное число, составленное из номера строки и номера столбца, где находится эта буква',
        defaultStr: 'Hello, Bob!',
        time: '20',
        protection: 4,
        getCipher: (str) => getCipherDora(str),
        favorite: false
    },
    {
        name: 'Mark',
        type: 'Cipher',
        language: 'Ru',
        description: null,
        defaultStr: 'Привет, Боб!',
        time: '20',
        protection: 4,
        getCipher: (str) => getCipherMark(str),
        favorite: false
    },
    {
        name: 'Ramsay',
        type: 'Cipher',
        language: 'En',
        description: null,
        defaultStr: 'Hello, Bob!',
        defaultKey: 'subway',
        time: '90',
        protection: 7,
        getCipher: (str, key) => getCipherRamsay(str, key),
        favorite: false
    },
    {
        name: 'Jeanna',
        type: 'Cipher',
        language: 'En',
        description: 'первая буква каждого блока заменяется на своего верхнего соседа в таблице, вторая – на правого, третья – на нижнего, четвертая – на левого',
        defaultStr: 'Hello, Bob!',
        defaultKey: 'eighty four',
        time: '45',
        protection: 5,
        getCipher: (str, key) => getCipherJeanna(str, key),
        favorite: false
    },
    {
        name: 'Vernam',
        type: 'Cipher',
        language: 'En',
        description: 'сообщение разбивается на отдельные символы и каждый символ представляется в бинарном виде, по классике криптографии - пятизначный код бодо для каждой буквы',
        defaultStr: 'Friend',
        defaultKey: '14159265',
        time: '12',
        protection: 10,
        getCipher: (str, key) => getCipherVernam(str, key),
        favorite: false
    },
    {
        name: 'Book',
        type: 'Cipher',
        language: 'Ru',
        description: 'элементы открытого текста (каждая буква или слово) заменяются на указатель (например, номер страницы, строки и столбца) аналогичного элемента в дополнительном тексте-ключе',
        defaultStr: 'смените шифр',
        defaultKey: 'у лукоморья дуб',
        time: '24',
        protection: 4,
        getCipher: (str, key) => getCipherBook(str, key),
        favorite: false
    },
    {
        name: 'Vigenere',
        type: 'Cipher',
        language: 'Ru',
        description: null,
        defaultStr: 'Привет, Андрей',
        defaultKey: 'пароль',
        time: '10',
        protection: 8,
        getCipher: (str, key) => getCipherVigenere(str, key),
        favorite: false
    },
    {
        name: 'Festel',
        type: 'Network',
        language: 'En',
        description: null,
        defaultStr: 'avadakedavra',
        defaultKey: '12',
        time: '65',
        protection: 6,
        getCipher: (str, key) => getNetworkFestel(str, key),
        favorite: false
    }
];



const arrNames = ciphers.map(item => item.name).sort();

const arrTypes = (function() {
    const result = [];
    for(const item of ciphers) {
        if(!result.includes(item.type)) {
            result.push(item.type);
        }
    }
    return result.sort();
})();

const arrLangs = (function() {
    const result = [];
    for(const item of ciphers) {
        if(!result.includes(item.language)) {
            result.push(item.language);
        }
    }
    return result.sort();
})();

const arrTime =  (function() {
    const result = [];
    for(const item of ciphers) {
        if(!result.includes(item.time)) {
            result.push(item.time);
        }
    }
    return result.sort();
})();

const arrProtection = (function() {
    const result = [];
    for(const item of ciphers) {
        if(!result.includes(item.protection)) {
            result.push(item.protection);
        }
    }
    return result.sort((a, b) => a - b);
})();