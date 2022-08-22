const logos = [
    "gucci.png", "levis.png", "lv.png", "rolex.png", "casio.png"
]
// ************ELEMENTS***************8
// elements for nav
let currentPositionOfNav= 0;
// Element FOR SLIDER
let current = 0
const slideImg = document.querySelectorAll('.slide');
const parallax = document.querySelector('.slider-parallax');
const rightBtn = document.querySelector('.slideRight');
const leftBtn = document.querySelector('.slideLeft');


// ELEMENTS FOR CART()
const header = document.querySelector('header');
const nav = document.querySelector('nav')
const main = document.querySelector('main')
const footer = document.querySelector('footer');
const cartBtn = document.querySelector('.cart');
const cartSide = document.querySelector('.cart-side')

// ELEMENTS FOR bar
const bars = document.querySelector('.bars i');
const barSide = document.querySelector('.bar-side')

// ********** event listeners ****************

// ?                 window 

window.addEventListener('DOMContentLoaded', () => {
    startImage();
    // loading of date
    DateRecent();
    // loading of co logo
    coLogoLoad(logos);
})

window.addEventListener('scroll', () => {

// for header
    let yOffset = window.pageYOffset;
   
    if (currentPositionOfNav <yOffset) {
         header.classList.add('hiding-navbar');
    } else {
        header.classList.remove ('hiding-navbar');
        header.classList.add ('coloring-navbar');
    }
    
    if(yOffset===0) {
        header.classList.remove ('coloring-navbar')

    }
    currentPositionOfNav = yOffset;
// for paralaax
    slideImg.forEach((slide) => slide.style.backgroundPositionY = `${yOffset * 0.5}px`);

});

//?        SLIDER LEFT RIGHT BUTTON 
leftBtn.addEventListener('click', slideLeft);
rightBtn.addEventListener('click', slideRight);

// ?        cart button
cartBtn.addEventListener('click', cart);
bars.addEventListener('click', bar);


// ***********functions****************


// *functions for slider
function startImage() {
    // making images none in start 
    slideImg.forEach((slide) => slide.style.display = "none");
    // now adding one initial image
    slideImg[current].style.display = "block";
}
function slideRight() {

    if (current === slideImg.length - 1) {
        current = 0;
    } else {
        current++;
    }
    startImage();
}
function slideLeft() {
    if (current === 0) {
        current = slideImg.length - 1;
    } else {
        current--;
    }
    startImage();
}

// *function for cartBtn
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
//* function for loading co logos
function coLogoLoad(logos) {
    const logoContainer = document.querySelector('.logoContainer');
    logos.forEach((logo) => {
        const img = document.createElement('img');

        img.src = "/img/" + logo;
        logoContainer.appendChild(img);
    })


}
// ************SETTING INTERVALS***********

// setInterval(slideRight,3000)

function DateRecent() {
    const date = document.getElementById("date")

    date.innerHTML = new Date().getFullYear();
}



