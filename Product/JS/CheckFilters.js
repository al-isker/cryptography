const checkFiltersBlock = document.querySelector('.result .check-filters');

function openCheckFiltersBlock() {
    checkFiltersBlock.classList.remove('open');
    checkFiltersBlock.classList.add('open');
}
function closeCheckFiltersBlock() {
    if(checkFiltersBlock.children.length === 2) {
        checkFiltersBlock.classList.remove('open');
    }
}


checkFiltersBlock
    .querySelector('.reset-filters .filter')
    .addEventListener('click', function() {
        const filters = checkFiltersBlock.querySelectorAll('.btn-close-filter');
        filters.forEach(filter => {
            filter.click();
        });
    });

checkFiltersBlock
    .querySelector('.clear-search')
    .addEventListener('click', function() {
        inputSearch.value = '';
        search();
    });


function showBtnResetFilters() {
    const btnResetFilters = checkFiltersBlock.querySelector('.check-filters .reset-filters .filter');
    btnResetFilters.style.display = 'flex';
}

function hideBtnResetFilters() {
    const btnResetFilters = checkFiltersBlock.querySelector('.check-filters .reset-filters .filter');
    const btnCloseFilters = checkFiltersBlock.querySelectorAll('.btn-close-filter');

    if(btnCloseFilters.length === 0) {
        btnResetFilters.style.display = 'none';
    }
}



function createBtnCloseFilter(caption, prop) {
    const btnClose = document.createElement('div');
    btnClose.className = `filter btn-close-filter ${caption} ${prop}`;

    const text = document.createElement('span');
    text.className = 'text';
    text.textContent = `${caption}: ${prop}`;

    const icon = document.createElement('span');
    icon.className = 'icon material-icons';
    icon.textContent = 'highlight_off';

    btnClose.append(text, icon);
    btnClose.addEventListener('click', function() {
        this.remove();
        const sidebarFilter = document.querySelector(`.filters .filter .${caption.toLowerCase()}`);

        if(sidebarFilter.className.includes('checkboxes')) {
            sidebarFilter.querySelector(`.${prop} input`).checked = false;

            checkFilters[caption] = checkFilters[caption].filter(item => item !== prop);
            drawCards(listCard);
        }
        else if(sidebarFilter.className.includes('slider')) {
            sidebarFilter.querySelector('.range').noUiSlider.set([-99999, 99999]);
        }
        closeCheckFiltersBlock();
        hideBtnResetFilters();
    });

    return btnClose;
}