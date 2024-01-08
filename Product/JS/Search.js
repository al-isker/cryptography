const inputSearch = document.querySelector('.input-search label input');
const btnSearch = document.querySelector('.btn-search');

inputSearch.addEventListener('keydown', function(event) {
    if(event.keyCode === 13) {
        search();
    }
});
btnSearch.addEventListener('click', function() {
    search();
});


function search() {
    const value = inputSearch.value;
    const btnClearSearch = document.querySelector('.check-filters .clear-search');

    if(value.length === 0) {
        listCard = ciphers.slice(0);
        btnClearSearch.style.display = 'none';
        closeCheckFiltersBlock();
    }
    else {
        listCard = getSearchResult(value, arrNames, arrTypes);
        btnClearSearch.style.display = 'flex';
        openCheckFiltersBlock();
    }

    drawCards(listCard);
}


function getSearchResult(input, names, types) {
    const searchNames = [];
    let type;

    for(const wd of input.split(' ')) {
        const typeIncludes = getMatch(wd, types)
        if(typeIncludes) {
            type = typeIncludes;
        }
        else {
            const searchEl = getMatch(wd, names);
            if(searchEl) {
                searchNames.push(searchEl);
            }
            else {
                searchNames.push(...getArrResult(wd, names));
            }
        }
    }

    const result = [];
    searchNames.forEach(searchName => {
        ciphers.forEach(cipher => {
            if(searchName=== cipher.name) {
                result.push(cipher);
            }
        });
    });

    return result.filter(item => {
        return item.type.toLowerCase() === (type?.toLowerCase() ?? item.type.toLowerCase());
    });
}


function getMatch(wd, db) {
    for(const dt of db) {
        if(wd.toLowerCase() === dt.toLowerCase()) {
            return dt;
        }
    }
}


function getArrResult(wd, db) {
    const objChances = {};

    for(const dt of db) {
        const wdLow = wd.toLowerCase();
        const dtLow = dt.toLowerCase();

        let chance = 0;
        let point = 1;
        let iwd = 0;
        let idt = 0;

        while(iwd < wdLow.length) {
            if(wdLow[iwd] === dtLow[idt]) {
                chance += point;
                point += 1;
            }
            else if(wdLow[iwd] === dtLow[idt + 1]) {
                if(wdLow[iwd + 1] === dtLow[idt + 2]) {
                    point = 1;
                    chance += point;
                    idt++;
                }
            }
            else if(wdLow[iwd + 1] === dtLow[idt]) {
                if(wdLow[iwd + 2] === dtLow[idt + 1]) {
                    point = 1;
                    chance += point;
                    iwd++;
                }
            }
            else point = 1;
            iwd++;
            idt++;
        }
        objChances[dt] = chance;
    }

    const maxChances = Math.max(...Object.values(objChances));

    if(maxChances < 2) {
        return [];
    }

    // 0.6 - коэф
    // меньше коэф не делать
    // больше делать для более простого вывода
    const result = [];
    for(const cipher in objChances) {
        if(objChances[cipher] > Math.ceil(maxChances * 0.6) - 1) {
            result.push(cipher);
        }
    }

    return result;
}




// система вывода
// 1) Идеальный вывод (один из имён явно выделяется) - выводим один шифр на экран
// 2) Многочисленный вывод (шансы +-равны) -
// 3) Ничего не наёдено (шансы равны единице или нулю) -