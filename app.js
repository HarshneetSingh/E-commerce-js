// ************ELEMENTS***************8

// Element FOR SLIDER
let current = 0
const slideImg = document.querySelectorAll('.slide');
const parallax = document.querySelector('.slider-parallax');
const rightBtn = document.querySelector('.slideRight');
const leftBtn = document.querySelector('.slideLeft');


// ELEMENTS FOR CART()
const header = document.querySelector('header');
const headerHeight = header.getBoundingClientRect().bottom;
const nav = document.querySelector('nav')
const main = document.querySelector('main')
const footer = document.querySelector('footer');
const cartBtn = document.querySelector('.cart');
 const cartSide = document.querySelector('.cart-side')
// ********** event listeners ****************

// ?                 window 

window.addEventListener('DOMContentLoaded', () => {
    startImage();
})

window.addEventListener('scroll', () => {

    
    let yOffset =window.pageYOffset;
    slideImg.forEach((slide)=>slide.style.backgroundPositionY =`${yOffset * 0.5}px`);

    if(yOffset>headerHeight){
        header.classList.add('fixed-header');
        document.querySelectorAll('nav ul li button').forEach((button)=>button.style.color="white")
    }else{
        header.classList.remove('fixed-header');
        document.querySelectorAll('nav ul li button').forEach((button)=>button.style.color="black")

    }
});

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
   
    const crossBtn = document.querySelector('.cross-mark')
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
// ************SETTING INTERVALS***********

// setInterval(slideRight,5000)





