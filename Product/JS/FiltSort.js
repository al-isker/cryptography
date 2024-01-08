// кнопки открытия/закрытия фильтров и сортровки
const btnFilt = document.querySelector('.btn-filt-sort .btn-filt');
const btnSort = document.querySelector('.btn-filt-sort .btn-sort');
let isFilters = false;
let isSort = false;

btnFilt.onclick = function() {
    this.classList.toggle('active');
    if(!isFilters) {
        setTimeout(() => {
            this.querySelector('.icon').textContent = 'close';
        }, 150);
    }
    else {
        setTimeout(() => {
            this.querySelector('.icon').textContent = 'tune';
        }, 150);
    }
    isFilters = !isFilters;

    const product = document.querySelector('.product');
    const filtersList = product.querySelector('.sidebar .filters');

    if(isFilters || isSort) product.classList.add('open-sidebar');
    else product.classList.remove('open-sidebar');

    filtersList.classList.toggle('open');
}

btnSort.onclick = function() {
    this.classList.toggle('active');
    if(!isSort) {
        setTimeout(() => {
            this.querySelector('.icon').innerHTML = 'close';
        }, 150);
    }
    else {
        setTimeout(() => {
            this.querySelector('.icon').innerHTML = 'filter_list';
        }, 150);
    }
    isSort = !isSort;

    const product = document.querySelector('.product');
    const sortList = product.querySelector('.sidebar .sort');

    if(isFilters || isSort) product.classList.add('open-sidebar');
    else product.classList.remove('open-sidebar');

    sortList.classList.toggle('open');
}



// кнопки открытия/закрытия свойств фильтра
document.querySelectorAll('.filters .filter').forEach((filter) => {
    const btn = filter.querySelector('.btn');
    btn.onclick = function() {
        filter.classList.toggle('open');
    }
});



// функционал и вёрстка фильтров и сортировки
document.querySelector('.checkboxes.type').append(...getNewCheckboxes(arrTypes));
document.querySelector('.checkboxes.language').append(...getNewCheckboxes(arrLangs));
document.querySelector('.slider.time').append(...getNewSlider(arrTime, 'ms'));
document.querySelector('.slider.protection').append(...getNewSlider(arrProtection, '/10'));


const checkFilters = (function() {
    const result = {};
    document.querySelectorAll('.sidebar .caption').forEach(caption => {
        result[caption.textContent] = [];
    });
    return result;
})();

const sortsByFunc = {
    byAlphabetically: (arr) => arr.sort((a, b) => a.name > b.name ? 1 : -1),
    byTime: (arr) => arr.sort((a, b) => a.time > b.time ? 1 : -1),
    byProtection: (arr) => arr.sort((a, b) => a.protection < b.protection ? 1 : -1)
}

let selectSort = (function() {
    let select;
    document.querySelectorAll('.sidebar .sort input').forEach(sort => {
        if(sort.checked) {
            select = sortsByFunc[sort.value];
        }
    });
    return select;
})();

document.querySelectorAll('.sort input[name="sort"]').forEach(sort => {
    sort.addEventListener('change', function() {
        selectSort = sortsByFunc[sort.value];
        drawCards(listCard);
    });
})


function processFiltSort(arr) {
    for(const prop in checkFilters) {
        if(checkFilters[prop].length === 0) continue;
        // обработка чекбоксов
        if(typeof checkFilters[prop][0] === "string") {
            arr = arr.filter(cipher => {
                return checkFilters[prop].includes(cipher[prop.toLowerCase()]);
            });
        }
        // обработка рейнджа
        else if(typeof checkFilters[prop][0] === "number") {
            arr = arr.filter(cipher => {
                return (
                    cipher[prop.toLowerCase()] >= checkFilters[prop][0]
                    &&
                    cipher[prop.toLowerCase()] <= checkFilters[prop][1]
                );
            });
        }
    }
    return selectSort(arr);
}


function getNewCheckboxes(bd) {
    const checkboxes = [];
    bd.forEach((item) => {
        const input = document.createElement('input');
        input.type = 'checkbox';
        input.className = 'material-icons';

        const span = document.createElement('span');
        span.textContent = `${item}`;

        const label = document.createElement('label');
        label.className = `${item}`;
        label.append(input, span);

        label.addEventListener('change', function() {
            const caption = this.closest('.filter').querySelector('.caption').textContent;
            const prop = this.querySelector('span').textContent;

            if(this.querySelector('input').checked) {
                checkFiltersBlock.append(createBtnCloseFilter(caption, prop));
                openCheckFiltersBlock();
                showBtnResetFilters();

                checkFilters[caption].push(prop);
                drawCards(listCard);
            } else {
                checkFiltersBlock.querySelector(`.${caption}.${prop}`).remove();
                closeCheckFiltersBlock();
                hideBtnResetFilters();

                checkFilters[caption] = checkFilters[caption].filter(item => item !== prop);
                drawCards(listCard);
            }
        });

        checkboxes.push(label);
    });

    return checkboxes;
}



function getNewSlider(bd, unit) {
    const spanTextFrom = document.createElement('span');
    const spanTextTo = document.createElement('span');
    spanTextFrom.textContent = 'from';
    spanTextTo.textContent = 'to';

    const inputFrom = document.createElement('input');
    const inputTo = document.createElement('input');
    inputFrom.type = 'number';
    inputTo.type = 'number';

    const spanUnitFrom = document.createElement('span');
    const spanUnitTo = document.createElement('span');
    spanUnitFrom.textContent = `${unit}`;
    spanUnitTo.textContent = `${unit}`;

    const labelFrom = document.createElement('label');
    const labelTo = document.createElement('label');
    labelFrom.append(spanTextFrom, inputFrom, spanUnitFrom);
    labelTo.append(spanTextTo, inputTo, spanUnitTo);

    const inputBlock = document.createElement('div');
    inputBlock.className = 'inputs';
    inputBlock.append(labelFrom, labelTo);


    const minValue = Number(bd.at(0));
    const maxValue = Number(bd.at(-1));

    const rangeSlider = document.createElement('div');
    rangeSlider.className = 'range';

    noUiSlider.create(rangeSlider, {
        start: [minValue, maxValue],
        connect: true,
        range: {
            min: [minValue],
            max: [maxValue]
        },
        step: 1
    });

    const inputArr = [inputFrom, inputTo];

    inputArr.forEach(input => {
        input.addEventListener('change', () => {
            rangeSlider.noUiSlider.set([inputArr[0].value, inputArr[1].value]);
        });

        input.addEventListener('change', () => {
            const caption = rangeSlider.closest('.filter').querySelector('.caption').textContent;
            const prop = `${inputArr[0].value} - ${inputArr[1].value}`;

            if(inputArr[0].valueAsNumber === minValue && inputArr[1].valueAsNumber === maxValue) {
                checkFiltersBlock.querySelector(`.${caption}`)?.remove();
                closeCheckFiltersBlock();
                hideBtnResetFilters();

                checkFilters[caption] = [];
                drawCards(listCard);
            } else {
                checkFiltersBlock.querySelector(`.${caption}`)?.remove();
                checkFiltersBlock.append(createBtnCloseFilter(caption, prop));
                openCheckFiltersBlock();
                showBtnResetFilters();

                checkFilters[caption] = [inputArr[0].valueAsNumber, inputArr[1].valueAsNumber];
                drawCards(listCard);
            }
        });
    });

    rangeSlider.noUiSlider.on('update', (values, handle) => {
        inputArr[handle].value = String(Math.round(values[handle]));
    });

    rangeSlider.noUiSlider.on('update', (values) => {
        values = values.map(Math.round);

        const caption = rangeSlider.closest('.filter')?.querySelector('.caption').textContent;
        const prop = `${values[0]} - ${values[1]}`;

        if(values[0] === minValue && values[1] === maxValue) {
           if(caption) {
               checkFiltersBlock.querySelector(`.${caption}`)?.remove();
               closeCheckFiltersBlock();
               hideBtnResetFilters();

               checkFilters[caption] = [];
               drawCards(listCard);
           }
        } else {
            checkFiltersBlock.querySelector(`.${caption}`)?.remove();
            checkFiltersBlock.append(createBtnCloseFilter(caption, prop));
            openCheckFiltersBlock();
            showBtnResetFilters();

            checkFilters[caption] = values;
            drawCards(listCard);
        }
    });

    return [inputBlock, rangeSlider];
}