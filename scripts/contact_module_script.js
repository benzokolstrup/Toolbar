//CONTACT MODULE TOGGLE
const body = document.querySelector('body');
const contactModule = document.querySelector('#contact-module-container');
const contactNavItem = document.querySelector('.nav-item.contact');
const closeModule = document.querySelector('.contact-module-close');
const backdrop = document.querySelector('.backdrop');
document.addEventListener('click', (e) =>{
    if(e.target == backdrop || e.target == closeModule){
        toggleBackdrop();
        toggleBodyBlur();
        toggleContactModule();
    }
});
contactNavItem.addEventListener('click', () =>{
    toggleBackdrop();
    toggleBodyBlur();    
    toggleContactModule();
});
function toggleBackdrop(){
    backdrop.classList.contains('hidden') ? backdrop.classList.remove('hidden') : backdrop.classList.add('hidden');
}
function toggleContactModule(){
    contactModule.classList.contains('hidden') ? contactModule.classList.remove('hidden') : contactModule.classList.add('hidden');
}
function toggleBodyBlur(){
    body.classList.contains('body-blur') ? body.classList.remove('body-blur') : body.classList.add('body-blur');
}
//CONTACT MODULE VERIFICATION
const nameInput = document.querySelector('.contact-module-input[name=name]');
const emailInput = document.querySelector('.contact-module-input[name=email]');
const contactSubmit = document.querySelector('.contact-module-button');
const emailRegex = /^[a-zA-Z0-9\.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+\.[a-zA-Z]*$/;
const nameRegex = /^[a-zA-Z]*$/;
let contactErrorMessage = document.querySelector('.contact-module-error-message');
contactSubmit.addEventListener('click', () =>{
    contactFormValidation();
});
function contactFormValidation(){
    if(emailInput.value.match(emailRegex) && nameInput.value.match(nameRegex)){
        contactErrorMessage.classList.add('hidden');
    }else{
        contactErrorMessage.classList.remove('hidden');
        contactErrorMessage.textContent = 'Something went wrong. Try a different name or email';
        return false;
    }
}