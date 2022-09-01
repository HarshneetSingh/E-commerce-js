"use strict";
//! element for top link
const topLinks = document.querySelector(".up-Scroller");
// !elements for productdetail up
const productDetails = document.querySelector(".product-details");
// !elements for nav
let currentPositionOfNav = 0;

//! ELEMENTS FOR CART()
const header = document.querySelector('header');
const nav = document.querySelector('nav')
const main = document.querySelector('main')
const footer = document.querySelector('footer');
const cartBtn = document.querySelector('.cart');
const cartSide = document.querySelector('.cart-side')

// !ELEMENTS FOR bar
const bars = document.querySelector('.bars i');
const barSide = document.querySelector('.bar-side')

// !for manipulating  product  in btn and  in cart
let chosenPoduct = [];
let itemcount
let amount = 0;
const cartArticlesContainer = document.querySelector('.cart-articles');

const cartTtlDiv = document.querySelector('.cart-ttl');
const clearCartBtn = document.querySelector('.clear-cart-button');
// !ELEMENTS FOR PRODUCT and buttons
let count = 0;
const productContainer = document.querySelector('.products');
const productButton = document.querySelector('.product-ul');
const cartCount = document.querySelector('.cart-count');

// !        cart button
cartBtn.addEventListener('click', cart);
bars.addEventListener('click', bar);



// ! *******************************************event listeners*******************************************************
// *******dom content loading*****

window.addEventListener('DOMContentLoaded', () => {
    // loading of date
    DateRecent();
    // loading of co logo
    const product = new products();

    product.getProducts().then((products) => {
        productLoader(products)
        pListLoader(products)
    });


})
// ****scroll *****

window.addEventListener('scroll', () => {

    // for navbar
    let yOffset = window.pageYOffset;

    if (currentPositionOfNav < yOffset) {
        header.classList.add('hiding-navbar');
        productDetails.classList.add('product-details-up');
    } else {
        header.classList.remove('hiding-navbar');
        productDetails.classList.remove('product-details-up');

    }

    if (yOffset === 0) {
        header.classList.remove('coloring-navbar')

    }
    currentPositionOfNav = yOffset;
    // toplink
    yOffset > 400 ? topLinks.classList.add('show-scroller') : topLinks.classList.remove('show-scroller')

});
// ****product btn listener*****
function btnListener() {
    const addToCart = document.querySelectorAll('.addToCart');

    addToCart.forEach((btn) => {
        btn.addEventListener('click', onlickCondition);
    })
}
// ! *******************************************functions*******************************************************
// *******btnListener function*********
function onlickCondition(e) {
    const element = e.target;

    if (element.getAttribute('class') === 'addToCart') {
        onClick(element)

    } else {
        // element.parentElement.getAttribute('class') === 'addToCart  if clicked on img
        onClick(element.parentElement)

    }

};
function onClick(eTarget) {
    const element = eTarget;
    element.style.backgroundColor = "red";
    element.style.color = "white";
    element.innerHTML = `IN CART  <img src="https://img.icons8.com/material-outlined/24/111/ok--v1.png" style="width:14px; height:14px; "/> `;

    // ****increaing count on click and adding its innerhtml**** 
    cartCount.textContent = ++count;

    // sending the product to the cart display
    chosenPoduct.push(element.parentElement.parentElement.parentElement.id)
    elementsForCart(chosenPoduct)

    amount += JSON.parse(previousElemDetail(element));
    cartTtlDiv.textContent = amount;
    // removing event listener
    element.removeEventListener('click', onlickCondition);
}
// ********products loader*****
class products {
    async getProducts() {
        try {

            const productFile = await fetch('products.json');
            const response = await productFile.json();
            const products = response.products;
            return products;
        } catch (error) {
            console.error(error);
        }
    }
}
function productLoader(menu) {
    let displayProduct = menu.map((pDetails) => {

        return `<article class="product" id="${pDetails.id}">
        <div><img src=${pDetails.Img} alt=""></div>
        <div class="product-description">
            <h4>${pDetails.productName}</h4>
            <hr>
            <p>${pDetails.productDetails}</p>
            <div class="product-price">
                <span class="amount">$${pDetails.price}</span >
                <button class="addToCart">BUY NOW  <i class="fa-solid fa-cart-shopping "></i></button>
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
        return `<li><button class="btn-cotegory" data-cotegory="${btn}">${btn}</button></li>`
    });
    filteredBtn = filteredBtn.join(' ');
    productButton.innerHTML = filteredBtn;

    const btnCotegory = document.querySelectorAll('.btn-cotegory')
    btnCotegory.forEach((btn) => {
        btn.addEventListener('click', (e) => {
            const btnTarget = e.target.textContent
            console.log(btnTarget)
            const filteredProductList = products.filter(p => {
                if (p.category == btnTarget) {
                    return p;
                }
            })
            if (btnTarget === 'All') {
                productLoader(products)
            } else {
                productLoader(filteredProductList)
            }
        })
    })


}
// ******* bringing elements to cart *********

function elementsForCart(chosenBtnArr) {
    const bringingProduct = new products();

    bringingProduct.getProducts().then(productsList => {

        const filterProductList = productsList.filter((items => {

            if (chosenBtnArr.includes(`${items.id}`)) {
                return items;
            }

        }))
        ccL(filterProductList)
    })

}
// ******* cart content loader ****************
function ccL(products) {


    let content = products.map(product => {
        // for adding ttl to product list
         itemcount = 1;


        return `<article class="your-cart-article" id="${product.id}">
        <img src="${product.Img}" alt="">
        <div class="article-info">
            <span class="article-name">${product.productName}</span>
            <p class="article-price">$${product.price}</p>
            <p class="article-remove">remove</p>
        </div>
        <div class="Arrow">
            <i class="fa-solid fa-angle-up "></i>
            <p class="item-count">${1}</p>
            <i class="fa-solid fa-angle-down "></i>
        </div>
    </article>`

    })
    // calling removing button

    content = content.join('');
    cartArticlesContainer.innerHTML = content;
    // calling function for inc dec of an element
    incDecOFproduct(itemcount);
    removeCartContent();
}
// *****remove and arrow btns*********
function removeCartContent() {
    const cartArticleRemove = document.querySelectorAll('.article-remove');
    cartArticleRemove.forEach(articalRmvBtn => {
        articalRmvBtn.addEventListener('click', (e) => {
            const parentElement = e.target.parentElement.parentElement;
            const parentElementId = parentElement.id;
            const quantityOfProduct= e.target.parentElement.parentElement.querySelector('.item-count').textContent;
            //! using delete method to remove the id from chooseProducts
            chosenPoduct = chosenPoduct.filter(elemID => {
                if (!elemID == parentElementId) {
                    return elemID;
                }
            });

            // !decrementing the count of the cart TTL NUMBER
            cartCount.textContent = count -quantityOfProduct;

            //! deducting the amount from the cart TTL number quanties price
            let removingElementPrice = previousElemDetail(e.target)
            amount -= JSON.parse(removingElementPrice*quantityOfProduct);
            cartTtlDiv.textContent = amount;

            // !removing the child element
            cartArticlesContainer.removeChild(parentElement)
            // ! adding event listeners again in the product btn 

            // !bringing the displayed products
            reAssignEventListeners(parentElementId)
        })
    })
    // ******removing all product from the cart ******
    clearCartBtn.addEventListener('click', (e) => {
        const cartArticles = document.querySelectorAll('.your-cart-article');

        cartArticles.forEach((item) => {
            cartArticlesContainer.removeChild(item);
        })
        // ! making chosenproducts=0; 
        chosenPoduct = [];
        //!  making cart count to 0
        count = 0;
        cartCount.textContent = count;
        //! making cart ttl to 0
        amount = 0;
        cartTtlDiv.textContent = amount;
        // ! adding event listeners again in the product btn 
        const addToCart = document.querySelectorAll('.addToCart');

        addToCart.forEach((btn) => {
            // ? Adding event listener again to the removed btn 
            aRmvElemListener(btn)

        })
    })
}
// ******* reassigning event listener to the remove products****
function reAssignEventListeners(parentElementId) {
    const product = document.querySelectorAll('.product');
    const filtered_product = Array.from(product).filter(item => {
        // here product is an nodelist we cant apply filter on nodelist so we made the nodelist to array 
        // with( Array.from(product)) 

        // ? and item.getAttribute('id') => products id 

        if (parentElementId === item.getAttribute('id')) {
            return item;
        }
    })
    const btnOFfilterdProduct = filtered_product[0].querySelector('.addToCart');
    // ? Adding event listener again to the removed btn 
    aRmvElemListener(btnOFfilterdProduct)
}

// ******increading and decrsing of the product******
function incDecOFproduct(itemcount) {

    const arrordiv = document.querySelectorAll('.Arrow');

    arrordiv.forEach((arrors) => {
        arrors.addEventListener('click', (e) => {
            const parentElement = e.target.parentElement.parentElement
            const parentElementId = e.target.parentElement.parentElement.id
            const itemCountDom = e.target.parentElement.querySelector('.item-count');
            let previousElemDetailPrice = previousElemDetail(e.target.parentElement.previousElementSibling.lastElementChild);

            if (e.target.classList.contains('fa-angle-up')) {
                // !increasing count of products in the product
                itemCountDom.textContent = ++itemcount;

                //?  increasing count of products in the cart COUNT 

                cartCount.textContent = ++count;

                // ! increasing amount
                amount += JSON.parse(previousElemDetailPrice);
                cartTtlDiv.textContent = amount;
            } else if (e.target.classList.contains('fa-angle-down')) {

                // !decreasing count of products in the product
                itemcount--;
                itemCountDom.textContent = itemcount;

                //?  increasing count of products in the cart COUNT
                cartCount.textContent = --count;


                //! deducting the amount from the cart TTL NUMBER
                amount -= previousElemDetailPrice;
                cartTtlDiv.textContent = amount;
                //?  increasing count of products in the cart COUNT 

                cartCount.textContent = --count;
                // ? if item count ==0
                if (itemcount === 0) {
                    reAssignEventListeners(parentElementId)

                    // !removing the child element
                    cartArticlesContainer.removeChild(parentElement)

                }


            } else {
                return
            }
        })

    })

}
// *****finding prev elem details ********
function previousElemDetail(e) {
    let removingElementPrice = e.previousElementSibling.textContent;
    removingElementPrice = removingElementPrice.slice(1)
    return removingElementPrice;
}
// ******cart onclick******
function cart() {

    const crossBtn = document.querySelector('.cross-mark')

    // adding class to show cart
    cartSide.classList.add('cart-side-active');
    cartSide.classList.remove('cart-side-not-active');
    // making backgroung opacity increases

    nav.style.opacity = '0.7';
    main.style.opacity = '0.7';
    footer.style.opacity = '0.7';

    cartTtlDiv.textContent = amount;

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
//********bars onclick******
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
// ********date loader ******
function DateRecent() {
    const date = document.getElementById("date")

    date.innerHTML = new Date().getFullYear();
}
// ******** Adding event listener again to the removed btn ******
function aRmvElemListener(btn) {
    btn.innerHTML = `BUY NOW <i class="fa-solid fa-cart-shopping "></i>`;
    btn.style.backgroundColor = 'transparent';
    btn.style.color = 'black';
    console.log(btn);
    btn.addEventListener('click', onlickCondition);


}