const wrapper = document.querySelector('.wrapper');
const teamLink = document.querySelector('.team-link');
const soloLink = document.querySelector('.solo-link');
const btnPopup = document.querySelector('.btnRegister-popup');
const iconClose = document.querySelector('.icon-close');

soloLink.addEventListener('click', ()=> {
    wrapper.classList.add('active');
});

teamLink.addEventListener('click', ()=> {
    wrapper.classList.remove('active');
});

btnPopup.addEventListener('click', ()=> {
    wrapper.classList.add('active-popup');
});
iconClose.addEventListener('click', ()=> {
    wrapper.classList.remove('active-popup');
});