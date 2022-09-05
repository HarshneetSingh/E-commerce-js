
// element for top link
const topLinks = QS(".up-Scroller"); 


// elements for nav

let currentPositionOfNav = 0;
// ELEMENTS FOR CART()
const header = QS('header');
const nav = QS('nav')
const main = QS('main')
const footer = QS('footer');
const cartBtn = QS('.cart');
const cartSide = QS('.cart-side')

const cartCount = QS('.cart-count');

// elements for error in submission
const form = QS('form');
const user = document.getElementById('username');
const lastname = document.getElementById('lastname');
const email = document.getElementById('email');
const password = document.getElementById('password');
const confirmPassword = document.getElementById('confirmPassword');

// ELEMENTS FOR bar
const bars = QS('.bars i');
const barSide = QS('.bar-side')


// ?        cart button
cartBtn.addEventListener('click', cart);
bars.addEventListener('click', bar);

// **** functions for loading qs and qsa
function QS(classORid){
    return document.querySelector(classORid);
}
function QSA(classORid){
    return document.querySelectorAll(classORid);
}

window.addEventListener('DOMContentLoaded', () => {
    // loading of date
    DateRecent();

    cartCount.textContent = JSON.parse(localStorage.getItem('cartCount'));

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
    // toplink
    yOffset>100? topLinks.classList.add('show-scroller'):topLinks.classList.remove('show-scroller')

});


function cart() {

    const crossBtn = QS('.cross-mark')

    // adding class to show cart
    cartSide.classList.add('cart-side-active');
    cartSide.classList.remove('cart-side-not-active');
    // making backgroung opacity increases

    nav.style.opacity = '0.4';
    main.style.opacity = '0.4';
    footer.style.opacity = '0.4';


    crossBtn.addEventListener('click', () => {

        // making opacity normal
        nav.style.opacity = '1';
        main.style.opacity = '1';
        footer.style.opacity = '1';

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
    cartBtn.style.display="none"

    crossBtn.addEventListener('click', () => {
        barSide.removeChild(crossBtn);
        header.classList.remove('bar-content-show');
        cartBtn.style.display="block"


        barSide.classList.add('bar-side-not-active')
        barSide.classList.remove('bar-side-active')
    })


}
function DateRecent() {
    const date = document.getElementById("date")

    date.innerHTML = new Date().getFullYear();
}
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
