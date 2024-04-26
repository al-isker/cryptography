const modalWindow = document.querySelector('.blackout');
const btnCloseMW = modalWindow.querySelector('.btn-close');

const closeModalWindow = () => {
    modalWindow.classList.remove('open');
}

const openModalWindow = (description) => {
    const defaultScrollY = window.scrollY;
    const disableScroll = () => window.scrollTo(0, defaultScrollY);

    modalWindow.classList.add('open');
    modalWindow.querySelector('.control p').textContent = description;

    document.addEventListener('scroll', disableScroll);
    setTimeout(() => document.removeEventListener('scroll', disableScroll), 0);
}

btnCloseMW.addEventListener('click', closeModalWindow);

document.addEventListener('keydown', (e) => {
    if(e.code === 'Escape') closeModalWindow();
});

modalWindow.addEventListener('click', (event) => {
    if(modalWindow === event.target) closeModalWindow();
});


const linkOff = document.querySelectorAll('nav .link:not(.active)');

linkOff.forEach(el => {
    el.addEventListener('click', (event) => {
        const link = el.textContent;
        openModalWindow(link);
        event.stopPropagation();
    });
});