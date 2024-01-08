function getCardProduct(cipher) {
    let name = ``;
    for(const char of cipher.name) {
        name += `<span>${char}</span>`;
    }

    const addFavorite = cipher.favorite ? 'checked' : '';

    return `
        <div class="card">
            <div class="left">
                <div class="type">${cipher.type}</div>
                <div class="name">${name}</div>
            </div>
            <div class="right">
                <label class="favorite">
                    <input type="checkbox" class="favorite-check material-icons-sharp" ${addFavorite}>
                </label>
                <div class="info">
                    <div class="prop">
                        <div class="caption">
                            <span class="icon material-icons-sharp">language</span>
                            <span class="text">Language</span>
                        </div>
                        <div class="value">
                            <span>${cipher.language}</span>
                        </div>
                    </div>
                    <div class="prop">
                        <div class="caption">
                            <span class="icon material-icons-sharp">hourglass_top</span>
                            <span class="text">Time</span>
                        </div>
                        <div class="value">
                            <span>${cipher.time}</span>
                            <span class="unit">ms</span>
                        </div>
                    </div>
                    <div class="prop">
                        <div class="caption">
                            <span class="icon material-icons">https</span>
                            <span class="text">Protection</span>
                        </div>
                        <div class="value">
                            <span>${cipher.protection}/10</span>
                        </div>
                    </div>
                </div>
                <button type="button" class="btn btn-more-info">
                    <span class="text">more info</span>
                    <span class="icon material-icons-sharp">double_arrow</span>
                </button>
            </div>
        </div>
    `;
}

document.querySelector('.not-found .btn-back').addEventListener('click', function() {
    const btnClearSearch = document.querySelector('.check-filters .clear-search');
    const btnResetFilters = document.querySelector('.check-filters .reset-filters .filter');

    btnClearSearch.click();
    btnResetFilters.click();

    listCard = ciphers.slice(0);
    drawCards(listCard);
});


// добавление в объект разметки карточки товара
let listCard = ciphers.slice(0);


function drawCards(arr) {
    const listProductBlock = document.querySelector('.result .list');
    listProductBlock.querySelectorAll('.card').forEach(card => card.remove());

    arr = processFiltSort(arr);

    const notFound = listProductBlock.querySelector('.not-found');
    const loading = listProductBlock.querySelector('.loading');
    notFound.style.display = 'none';
    loading.style.display = 'block';

    listProductBlock.querySelectorAll('.card').forEach(card => card.remove());

    if(arr.length === 0) {
        notFound.style.display = 'flex';
    }
    else {
        selectSort(arr).forEach(cipher => {
            listProductBlock.insertAdjacentHTML('beforeend', getCardProduct(cipher));

            const btnMoreInfo = listProductBlock.querySelector('.card:last-child .btn-more-info');
            const btnToggleFavorite = listProductBlock.querySelector('.card:last-child .favorite-check');

            btnMoreInfo.addEventListener('click', function() {
                openMoreInfo(cipher);
            });

            btnToggleFavorite.addEventListener('change', function() {
                toggleFavorite(this, cipher);
            });
        });
    }

    setTimeout(() => {
        loading.style.display = 'none';
    }, 1000);
}

document.addEventListener('DOMContentLoaded', () => {
    drawCards(listCard);
});

