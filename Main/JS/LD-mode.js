const switchMode = document.querySelector('.switch-mode');
const checkbox = switchMode.querySelector('input');

checkbox.addEventListener('change', () => {
    document.body.classList.toggle('light-mode');
    switchMode.classList.toggle('active');
});