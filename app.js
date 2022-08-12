// ************ELEMENTS***************8

// Element FOR SLIDER
let current = 0
const slideImg = document.querySelectorAll('.slide');
const rightBtn = document.querySelector('.slideRight');
const leftBtn = document.querySelector('.slideLeft');


// ELEMENTS FOR CART
const nav = document.querySelector('nav')
const main = document.querySelector('main')
const cartBtn = document.querySelector('.cart');
 const cartSide = document.querySelector('.cart-side')
// ********** event listeners ****************

// ?                 window 

window.addEventListener('DOMContentLoaded', () => {
    startImage();
})

//?        SLIDER LEFT RIGHT BUTTON 
leftBtn.addEventListener('click', slideLeft);
rightBtn.addEventListener('click', slideRight);

// ?        cart button
cartBtn.addEventListener('click', cart)


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
   
    const crossBtn = document.createElement('i')

    // adding class to show cart
    cartSide.classList.add('cart-side-active');
    cartSide.classList.remove('cart-side-not-active');
    // making backgroung opacity increases

    nav.style.opacity = '0.5';
    main.style.opacity = '0.5';

    // adding cross

    crossBtn.className = 'fa-solid fa-xmark cross-mark';
    cartSide.appendChild(crossBtn);
    crossBtn.addEventListener('click', () => {
        // removing cross btn
        cartSide.remove(crossBtn)



        // making opacity normal
        nav.style.opacity = '1';
        main.style.opacity = '1';

        // adding cart-side-not-active
        cartSide.classList.add('cart-side-not-active')
        // removing cart-side-active
        cartSide.classList.remove('cart-side-active')
    })


}
// ************SETTING INTERVALS***********

// setInterval(slideRight,5000)





