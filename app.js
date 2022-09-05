const logos = [
    "gucci.png", "levis.png", "lv.png", "rolex.png", "casio.png"
]
// ************ELEMENTS***************8
// elemet for top link 
const topLinks = QS(".up-Scroller");
// elements for nav
let currentPositionOfNav = 0;
// Element FOR SLIDER
let current = 0
const slideImg = QSA('.slide');
const parallax = QS('.slider-parallax');
const rightBtn = QS('.slideRight');
const leftBtn = QS('.slideLeft');


// ELEMENTS FOR CART()
const header = QS('header');
const nav = QS('nav')
const main = QS('main')
const footer = QS('footer');
const cartBtn = QS('.cart');
const cartSide = QS('.cart-side')
const cartCount = QS('.cart-count');
// ELEMENTS FOR bar
const bars = QS('.bars i');
const barSide = QS('.bar-side')

// elements for intersectionObserver
const containerVideo = QSA('.containerVideo');
const containerH2 = QSA('.containerH2')
const containerArticle = QSA('.article-inner')
const dealsHeading = QSA('.deals-heading');
const rolex = QS('.containerVideoWatch')
const benefitBox = QSA('.box');
// **** functions for loading qs and qsa
function QS(classORid) {
    return document.querySelector(classORid);
}
function QSA(classORid) {
    return document.querySelectorAll(classORid);
}
// ********** event listeners ****************

// ?                 window 

window.addEventListener('DOMContentLoaded', () => {
    startImage();
    // loading of date
    DateRecent();
    // loading of co logo
    coLogoLoad(logos);
    // cart count 
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
    // for paralaax
    slideImg.forEach((slide) => slide.style.backgroundPositionY = `${yOffset * 0.3}px`);

    // for top link 
    yOffset > 700 ? topLinks.classList.add('show-scroller') : topLinks.classList.remove('show-scroller')

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

slideImg.forEach((slide) => makingObserver("showSlide", "0px", 0).observe(slide))

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
// ***** intersection observer ****************

function makingObserver(classorId, rootMargi, threshold) {
    let observer5 = new IntersectionObserver(entries => {
        entries.forEach(entry => {

            if (entry.isIntersecting) {
                entry.target.classList.add(classorId);
                observer5.unobserve(entry.target)
            }

        })
    }, {
        threshold: threshold,
        rootMargin: rootMargi
    }
    )
    return observer5;
}
// obsever 1
containerVideo.forEach((video) => makingObserver("showVideo", "0px", 0.1).observe(video))
// observer2 
containerH2.forEach((h2) => makingObserver("showH2", "-50px", 0.5).observe(h2))
// observer3
containerArticle.forEach((articles) => {
    if (articles.getAttribute('data-id') == "4") {
        makingObserver("showArticle", "500px", 0.1).observe(articles)

    } else {
        makingObserver("showArticle", "-50px", 0.1).observe(articles)

    }
})
// observer4
dealsHeading.forEach((heading) => makingObserver("showHeading", "-30px", 1.0).observe(heading))
// observer5
makingObserver("rolexShow", "0px", 0.3).observe(rolex)
// observer6
benefitBox.forEach((box) => makingObserver("box-show", "0px", 0.4).observe(box))
// observer7



// *function for cartBtn
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
    cartBtn.style.display = "none"

    crossBtn.addEventListener('click', () => {
        barSide.removeChild(crossBtn);
        header.classList.remove('bar-content-show');
        cartBtn.style.display = "block"

        barSide.classList.add('bar-side-not-active')
        barSide.classList.remove('bar-side-active')
    })


}

//* function for loading co logos
 function coLogoLoad(logos) {
    const logoContainer = QS('.logoContainer');
    logos.forEach((logo) => {
        const img = document.createElement('img');
        img.className="logo-img";
        
        img.src = "/img/" + logo;
        logoContainer.appendChild(img);
    })
    
     const logoContainerIMG = QSA('.logo-img');
     console.log(logoContainerIMG);
   logoContainerIMG.forEach((logo) => makingObserver("showLogoContainer", "0px", 1.0).observe(logo))
}
// ************SETTING INTERVALS***********


function DateRecent() {
    const date = document.getElementById("date")

    date.innerHTML = new Date().getFullYear();
}
// ************SETTING INTERVALS***********

setInterval(slideRight, 7000)
