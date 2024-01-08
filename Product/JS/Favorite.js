const btnOpenFavorite = document.querySelector('.btn-open-favorite');
const btnBackCloseFavorite = document.querySelector('.opened-favorite .btn-back');
const counterFavorite = btnOpenFavorite.querySelector('.counter');


btnOpenFavorite.addEventListener('click', openFavorite);
btnBackCloseFavorite.addEventListener('click', closeFavorite);


function openFavorite() {
    if(isFilters) btnFilt.click();
    if(isSort) btnSort.click();

    const btnFiltSort = document.querySelector('.btn-filt-sort');
    btnFiltSort.style.display = 'none';

    const openedFavorite = document.querySelector('.opened-favorite');
    openedFavorite.style.display = 'flex';

    listCard = ciphers.filter(item => item.favorite === true);
    drawCards(listCard);
}

function closeFavorite() {
    const btnFiltSort = document.querySelector('.btn-filt-sort');
    btnFiltSort.style.display = 'flex';

    const openedFavorite = document.querySelector('.opened-favorite');
    openedFavorite.style.display = 'none';

    const btnClearSearch = document.querySelector('.check-filters .clear-search');
    const btnResetFilters = document.querySelector('.check-filters .reset-filters .filter');

    btnClearSearch.click();
    btnResetFilters.click();

    listCard = ciphers.slice(0);
    drawCards(listCard);
}


function toggleFavorite(btn, cipher) {
    ciphers.find(item => item.name === cipher.name).favorite = btn.checked;

    const listFavorite = ciphers.filter(item => item.favorite === true);

    if(listFavorite.length > 0) {
        counterFavorite.style.display = 'flex';
        counterFavorite.textContent = String(listFavorite.length);
    }
    else {
        counterFavorite.style.display = 'none';
    }
}