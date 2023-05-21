// modo noche
let toggle = document.getElementById('toggle');
let label_toggle = document.getElementById('label_toggle');
let isChecked = localStorage.getItem('isChecked') === 'true';
if (isChecked) {
    document.body.classList.add('dark');
    label_toggle.innerHTML = '<i class="fa-solid fa-sun"></i>';
    label_toggle.style.color = 'white';
    toggle.checked = true;
}

toggle.addEventListener('change', (event) => {
    let checked = event.target.checked;
    document.body.classList.toggle('dark');
    if (checked) {
        label_toggle.innerHTML = '<i class="fa-solid fa-sun"></i>';
        label_toggle.style.color = 'white';
    } else {
        label_toggle.innerHTML = '<i class="fa-solid fa-moon"></i>';
        label_toggle.style.color = 'black';
    }
    localStorage.setItem('isChecked', checked);
});
