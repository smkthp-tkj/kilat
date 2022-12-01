const formReset = document.getElementById('reset-form');
const lableReset = document.getElementById('reset-lable');
let confirmation = false;

formReset.addEventListener('submit', e => {
    if (!confirmation) {
        e.preventDefault();
        lableReset.removeAttribute('style');
        confirmation = true;
    }
});
