const boxButton = document.getElementById('box-button');
const boxParent = document.getElementById('box-parent');
const box = boxParent.firstElementChild.cloneNode(true);

boxButton.addEventListener('click', () => {
    const div = box.cloneNode(true);
    const btn = document.createElement('button');
    btn.type = 'button';
    btn.setAttribute('style', 'order: -1');
    btn.classList.add('delete', 'ml-auto');
    btn.addEventListener('click', () => {
        boxParent.removeChild(div);
    });

    div.appendChild(btn);
    boxParent.appendChild(div);
});
