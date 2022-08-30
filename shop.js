
// element for top link
const topLinks = document.querySelector(".up-Scroller");
// elements for productdetail up
const productDetails = document.querySelector(".product-details");
// elements for nav
let currentPositionOfNav = 0;

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

// ELEMENTS FOR PRODUCT and buttons
let count=0;
const productContainer = document.querySelector('.products');
const productButton = document.querySelector('.product-ul');
const cartCount= document.querySelector('.cart-count');
// ?        cart button
cartBtn.addEventListener('click', cart);
bars.addEventListener('click', bar);



// event listeners 
window.addEventListener('DOMContentLoaded', () => {
    // loading of date
    DateRecent();
    // loading of co logo
    const product = new products();
    product.getProducts()
})
window.addEventListener('scroll', () => {

    // for header
    let yOffset = window.pageYOffset;

    if (currentPositionOfNav < yOffset) {
        header.classList.add('hiding-navbar');
        productDetails.classList.add('product-details-up');
    } else {
        header.classList.remove('hiding-navbar');
        // header.classList.add('coloring-navbar');
        productDetails.classList.remove('product-details-up');

    }

    if (yOffset === 0) {
        header.classList.remove('coloring-navbar')

    }
    currentPositionOfNav = yOffset;
    // toplink
    yOffset > 400 ? topLinks.classList.add('show-scroller') : topLinks.classList.remove('show-scroller')

});
// ***************functions***************
// ******cart onclick
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
//******** */ bars onclick
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
// ********date loader 
function DateRecent() {
    const date = document.getElementById("date")

    date.innerHTML = new Date().getFullYear();
}

// ********products loader
class products {
    async getProducts() {
        try {

            const productFile = await fetch('products.json');
            const response = await productFile.json();
            productLoader(response.products)
            pListLoader(response.products)

        } catch (error) {
            console.error(error);
        }
    }
}
function productLoader(menu) {
    console.log(menu)
    let displayProduct = menu.map((pDetails) => {

        return `<article class="product" id="${pDetails.id}">
        <div><img src=${pDetails.Img} alt=""></div>
        <div class="product-description">
            <h4>${pDetails.productName}</h4>
            <hr>
            <p>${pDetails.productDetails}</p>
            <div class="product-price">
                <span class="amount">$${pDetails.price}</span >
                <button class="addToCart">BUY NOW <i class="fa-solid fa-cart-shopping "></i></button>
            </div>


        </div>

    </article>`
    });

    displayProduct = displayProduct.join('');
    // here if we not put the '' then it will throw error in page as (,) will be added in it as
    
    productContainer.innerHTML = displayProduct;
    // adding listeneres to the products
    btnListener()
}
//********  button list loader
function pListLoader(products) {
    let filteredBtn = products.reduce((acc, curr) => {
        if (!acc.includes(curr.category)) {
            acc.push(curr.category);
        }
        return acc
    }, ['All']).map((btn) => {
        const li = document.createElement('li');
        const button = document.createElement('button');
        return `<li><button>${btn}</button></li>`
    });
    filteredBtn = filteredBtn.join(' ');
    productButton.innerHTML = filteredBtn;

}
function btnListener(){
    const addToCart = document.querySelectorAll('.addToCart');
    addToCart.forEach((btn) => {
    btn.addEventListener('click', function onclick(e){
        // ****increaing count on click and adding its innerhtml****
        const element = e.target;
                        
        element.innerHTML=`IN CART  <img src="https://img.icons8.com/material-outlined//008000/ok--v1.png" style="width:14px; height:14px; "/> `;
        count++;
        cartCount.textContent = `${count}`;
        // sending the product to the cart display
        const chosenPoduct=e.target.parentElement.parentElement.parentElement.id

        console.log(chosenPoduct);
        // removing event listener
        btn.removeEventListener('click',onclick);
    });
})
}

