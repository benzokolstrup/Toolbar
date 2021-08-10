//THEME TOGGLE
const themeSwitch = document.querySelector('.theme-switch');
let htmlTheme = document.querySelector('html');
themeSwitch.addEventListener('change', function(){
    this.checked ? htmlTheme.setAttribute('data-theme', 'dark') : htmlTheme.setAttribute('data-theme', 'light');
});