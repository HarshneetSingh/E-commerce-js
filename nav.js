// elements for nav
let currentPositionOfNav = 0;
// ELEMENTS FOR CART()
const header = document.querySelector('header');
const nav = document.querySelector('nav')
const main = document.querySelector('main')
const footer = document.querySelector('footer');
const cartBtn = document.querySelector('.cart');
const cartSide = document.querySelector('.cart-side')

// elements for error in submission
const form = document.querySelector('form');
const user = document.getElementById('username');
const lastname = document.getElementById('lastname');
const email = document.getElementById('email');
const password = document.getElementById('password');
const confirmPassword = document.getElementById('confirmPassword');
// ELEMENTS FOR bar
const bars = document.querySelector('.bars i');
const barSide = document.querySelector('.bar-side')


// ?        cart button
cartBtn.addEventListener('click', cart);
bars.addEventListener('click', bar);


window.addEventListener('DOMContentLoaded', () => {
    // loading of date
    DateRecent();
    // loading of co logo
})

window.addEventListener('scroll', () => {

    // for header
    let yOffset = window.pageYOffset;

    if (currentPositionOfNav < yOffset) {
        header.classList.add('hiding-navbar');
    } else {
        header.classList.remove('hiding-navbar');
        header.classList.add('coloring-navbar');
    }

    if (yOffset === 0) {
        header.classList.remove('coloring-navbar')

    }
    currentPositionOfNav = yOffset;

});

form.addEventListener('submit', (e) => {
    e.preventDefault();
    submit(user);
    submit(lastname);
    submit(email);
    submit(password);
    submit(confirmPassword);

});
let submit = (user) => {
    const success = user.previousElementSibling;

    const failure = user.previousElementSibling.previousElementSibling;
    const errorMessage = user.nextElementSibling;
    console.log(errorMessage);
    if (user.value.trim() === '') {
        errorMessage.textContent = `Please enter your ${user.getAttribute('id')}.`;
        failure.style.opacity = 1;
        success.style.opacity = 0;
    } else {
        failure.style.opacity = 0;
        errorMessage.textContent = "";
        success.style.opacity = 1;
    }
    if (user.value === password.value ||     user.value ===confirmPassword.value) {
        if (password.value !== confirmPassword.value) {
            const errorMessage = password.nextElementSibling;
            failure.style.opacity = 1;
            success.style.opacity = 0;
            errorMessage.innerHTML = "Passwords do not match";
        }
    }


}
function cart() {

    const crossBtn = document.querySelector('.cross-mark')

    // adding class to show cart
    cartSide.classList.add('cart-side-active');
    cartSide.classList.remove('cart-side-not-active');
    // making backgroung opacity increases

    nav.style.opacity = '0.4';
    // main.style.opacity = '0.4';
    // footer.style.opacity = '0.4';


    crossBtn.addEventListener('click', () => {

        // making opacity normal
        nav.style.opacity = '1';
        // main.style.opacity = '1';
        // footer.style.opacity = '1';

        // adding cart-side-not-active
        cartSide.classList.add('cart-side-not-active')
        // removing cart-side-active
        cartSide.classList.remove('cart-side-active')
    })


}
function bar() {

    const crossBtn = document.createElement('i');
    crossBtn.className = "fa-solid fa-xmark for-bar";
    barSide.appendChild(crossBtn);
    // adding class to show cart
    barSide.classList.add('bar-side-active');
    barSide.classList.remove('bar-side-not-active');
    header.classList.add('bar-content-show');

    crossBtn.addEventListener('click', () => {
        barSide.removeChild(crossBtn);
        header.classList.remove('bar-content-show');


        barSide.classList.add('bar-side-not-active')
        barSide.classList.remove('bar-side-active')
    })


}
function DateRecent() {
    const date = document.getElementById("date")

    date.innerHTML = new Date().getFullYear();
}

