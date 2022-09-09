"use strict";
//! element for top link
const topLinks = QS(".up-Scroller");
// !elements for productdetail up
const productDetails = QS(".product-details");
// !elements for nav
let currentPositionOfNav = 0;

//! ELEMENTS FOR CART()
const header = QS('header');
const nav = QS('nav')
const main = QS('main')
const footer = QS('footer');
const cartBtn = QS('.cart');
const cartSide = QS('.cart-side')

// !ELEMENTS FOR bar
const bars = QS('.bars i');
const barSide = QS('.bar-side')

// !for manipulating  product  in btn and  in cart
let chosenProduct = checkingLocalStorage('chosenProduct');

const cartArticlesContainer = QS('.cart-articles');

const cartTtlDiv = QS('.cart-ttl');
const clearCartBtn = QS('.clear-cart-button');
// !ELEMENTS FOR PRODUCT and buttons

const oldCount = checkingLocalStorage('cartCount')
const oldamount = checkingLocalStorage('Amount')
let amount = oldamount;
let count = oldCount;
const productContainer = QS('.products');
const productButton = QS('.product-ul');
const cartCount = QS('.cart-count');
// ! for local storage
let storage = checkingLocalStorage('Products');
let storageObject = {};
// !        cart button
cartBtn.addEventListener('click', cart);
bars.addEventListener('click', bar);


function QS(classORid) {
    return document.querySelector(classORid);
}
function QSA(classORid) {
    return document.querySelectorAll(classORid);
}
// ! *******************************************event listeners*******************************************************
// *******dom content loading*****

window.addEventListener('DOMContentLoaded', () => {
    
    makingObserver("showWrapper", "0px", 0).observe(QS('.products-wrapper'))
    // loading of date
    DateRecent();
    // loading of co logo
    let oldChosenProduct = JSON.parse(localStorage.getItem('chosenProduct'))
    const product = new products();

    product.getProducts().then((products) => {
        productLoader(products)
        pListLoader(products)

        // loading of local storage 
        if (oldChosenProduct != null) {
            elementsForCart(oldChosenProduct)
            const displayProduct = QSA('.product');
            // displayProduct.forEach((product) => {
            oldChosenProduct.forEach((product, index) => {
                const preSelectedbtn = displayProduct[product - 1].lastElementChild.lastElementChild.lastElementChild
                preSelectedbtn.style.backgroundColor = "red";
                preSelectedbtn.style.color = "white";
                preSelectedbtn.innerHTML = `IN CART  <img src="https://img.icons8.com/material-outlined/24/111/ok--v1.png" style="width:14px; height:14px; "/> `;
                preSelectedbtn.removeEventListener('click', onlickCondition);

            })


        }
        QSA('.product').forEach((product) => makingObserver("productShow", "0px", 0.04).observe(product))

    })

});

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
    const addToCart = QSA('.addToCart');

    addToCart.forEach((btn) => {
        btn.addEventListener('click', onlickCondition);
    })
}
// ! *******************************************functions*******************************************************

// ******* INTERSECTION OBSERVER *************
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
    const parentDivId = element.parentElement.parentElement.parentElement.id
    element.style.backgroundColor = "red";
    element.style.color = "white";
    element.innerHTML = `IN CART  <img src="https://img.icons8.com/material-outlined/24/111/ok--v1.png" style="width:14px; height:14px; "/> `;

    // ****increaing count on click and adding its innerhtml**** 
    ++count
    storingCartInLS(count)


    // !sending the product to the cart display

    chosenProduct.push(parentDivId)
    console.log(chosenProduct)

    localStorage.setItem('chosenProduct', JSON.stringify(chosenProduct))
    elementsForCart(chosenProduct)

    // **** SETTING LOCAL STORAGE ****

    storageObject["id"] = parentDivId;
    storageObject["quantity"] = 1;
    storage.push(storageObject)

    localStorage.setItem('Products', JSON.stringify(storage))

    // **setting amount
    amount += JSON.parse(previousElemDetail(element));
    storingAmountInLS(amount)

    //? removing event listener
    element.removeEventListener('click', onlickCondition);
    storageObject = {};
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
    QSA('.product').forEach((product) => makingObserver("productShow", "0px", 0.04).observe(product))


}
//********  button list loader
function pListLoader(products) {
    let filteredBtn = products.reduce((acc, curr) => {
        if (!acc.includes(curr.category)) {
            acc.push(curr.category);
        }
        return acc
    }, ['All']).map((btn) => {
        return `<li><button class="btn-cotegory" data-cotegory="${btn}">${btn}</button></li>`
    });
    filteredBtn = filteredBtn.join(' ');
    productButton.innerHTML = filteredBtn;

    const btnCotegory = QSA('.btn-cotegory')
    btnCotegory.forEach((btn) => {
        btn.addEventListener('click', (e) => {
            const btnTarget = e.target.textContent
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
    cartCount.textContent = JSON.parse(localStorage.getItem('cartCount'));
    const bringingProduct = new products();
    // chosenBtnArr.forEach((chosen) => {
    bringingProduct.getProducts().then(productsList => {

        const filterProductList = productsList.filter((items => {

            if (chosenBtnArr.includes(`${items.id}`)) {
                return items;
            }

        }))
        ccL(filterProductList)
    })
    // });

}
// ******* cart content loader ****************
function ccL(products) {
    console.log(products)
    let content = products.map(product => {
        let localStorageCurrentItem = JSON.parse(localStorage.getItem('Products'))

        localStorageCurrentItem = localStorageCurrentItem.filter(item => {
            if (item.id == product.id) {
                return item;
            }
        });
        localStorageCurrentItem = localStorageCurrentItem[0].quantity
        return `<article class="your-cart-article" id="${product.id}">
        <img src="${product.Img}" alt="">
        <div class="article-info">
            <span class="article-name">${product.productName}</span>
            <p class="article-price">$${product.price}</p>
            <p class="article-remove">remove</p>
        </div>
        <div class="Arrow">
            <i class="fa-solid fa-angle-up "></i>
            <p class="item-count">${localStorageCurrentItem}</p>
            <i class="fa-solid fa-angle-down "></i>
        </div>
    </article>`

    })
    // calling removing button

    content = content.join('');
    cartArticlesContainer.innerHTML = content;

    // calling function for inc dec of an element   
    incDecOFproduct();
    removeCartContent();
}
// *****remove and arrow btns*********
function removeCartContent() {
    const cartArticleRemove = QSA('.article-remove');
    cartArticleRemove.forEach(articalRmvBtn => {
        articalRmvBtn.addEventListener('click', (e) => {
            const parentElement = e.target.parentElement.parentElement;
            const parentElementId = parentElement.id;
            const quantityOfProduct = e.target.parentElement.parentElement.querySelector('.item-count').textContent;

            chosenProduct = chosenProduct.filter((elemID ,index)=> {
                if (!(elemID === parentElementId)) {
                    return elemID;
                }else{
                    chosenProduct.splice[index,1]
                }
            });
            
            localStorage.setItem('chosenProduct', JSON.stringify(chosenProduct))

            // !decrementing the count of the cart TTL NUMBER
            count = count - quantityOfProduct;
            storingCartInLS(count)
            //! deducting the amount from the cart TTL number quanties price
            let removingElementPrice = previousElemDetail(e.target)
            amount -= JSON.parse(removingElementPrice * quantityOfProduct);
            storingAmountInLS(parseFloat(amount).toFixed(2))

            // !removing the child element
            cartArticlesContainer.removeChild(parentElement)
           
            // *removing 
            let localStorageArr = JSON.parse(localStorage.getItem('Products'));

            let targetIndex = localStorageArr.reduce(function (acc, curr, index) {

                if (curr.id == parentElementId) {
                    acc.push(index)
                }
                return acc;
            }, []);
            // localStorage.
            storage.splice(targetIndex[0], 1);
            localStorage.setItem('Products', JSON.stringify(storage));
             // ! adding event listeners again in the product btn 

            // !bringing the displayed products
            reAssignEventListeners(parentElementId)
        })
    })
    // ******removing all product from the cart ******
    clearCartBtn.addEventListener('click', (e) => {
        const cartArticles = QSA('.your-cart-article');

        cartArticles.forEach((item) => {
            cartArticlesContainer.removeChild(item);
        })
        // ! making chosenproducts=0; 
        chosenProduct = [];
        //!  making cart count to 0

        count = 0;
        storingCartInLS(count)
        //! making cart ttl to 0
        amount = 0;
        storingAmountInLS(parseFloat(amount).toFixed(2))

        // ! adding event listeners again in the product btn 
        const addToCart = QSA('.addToCart');

        addToCart.forEach((btn) => {
            // ? Adding event listener again to the removed btn 
            aRmvElemListener(btn)

        })

        // clearing local storage
        localStorage.clear();
    })
}
// ******* reassigning event listener to the remove products****
function reAssignEventListeners(parentElementId) {
    const product = QSA('.product');
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
function incDecOFproduct() {

    const arrordiv = QSA('.Arrow');

    arrordiv.forEach((arrors) => {
        // for adding ttl to product list
        arrors.addEventListener('click', (e) => {
            const parentElement = e.target.parentElement.parentElement
            const parentElementId = e.target.parentElement.parentElement.id
            const itemCountDom = e.target.parentElement.querySelector('.item-count');
            let previousElemDetailPrice = previousElemDetail(e.target.parentElement.previousElementSibling.lastElementChild);


            // ? setting local storageObject
            let localStorageArr = JSON.parse(localStorage.getItem('Products'));
            let targetIndex = localStorageArr.reduce(function (acc, curr, index) {

                if (curr.id == parentElementId) {
                    acc.push(index)
                }
                return acc;
            }, []);

            // const localStorageCurrentItem = localStorageArr[targetIndex[0]];

            if (e.target.classList.contains('fa-angle-up')) {
                //?  increasing count of products in the cart COUNT 


                ++count
                storingCartInLS(count)
                // ! increasing amount
                amount += JSON.parse(previousElemDetailPrice);
                storingAmountInLS(parseFloat(amount).toFixed(2))

                // ? setting prouct buying count 
                // ?increasing quantity amount

                ++storage[targetIndex[0]].quantity

                localStorage.setItem('Products', JSON.stringify(storage));

                // !getting quantityOfProduct and priniting in dom
                let localStorageArr = JSON.parse(localStorage.getItem('Products'));
                itemCountDom.textContent = localStorageArr[targetIndex[0]].quantity;



            } else if (e.target.classList.contains('fa-angle-down')) {

                //?  increasing count of products in the cart COUNT
                --count;
                storingCartInLS(count)


                //! deducting the amount from the cart TTL NUMBER

                amount -= parseFloat(previousElemDetailPrice).toFixed(2);
                storingAmountInLS(parseFloat(amount).toFixed(2))



                //! setting local storage

                --storage[targetIndex[0]].quantity;
                localStorage.setItem('Products', JSON.stringify(storage));

                // *decreasing count of products in the productsList
                let localStorageArr = JSON.parse(localStorage.getItem('Products'));
                itemCountDom.textContent = localStorageArr[targetIndex[0]].quantity;

                // ? if item count ==0

                if (localStorageArr[targetIndex[0]].quantity === 0) {
                    reAssignEventListeners(parentElementId)

                    // !removing the child element
                    cartArticlesContainer.removeChild(parentElement)

                    // ? removing the element from the local storage
                    storage.splice(targetIndex[0], 1);
                    localStorage.setItem('Products', JSON.stringify(storage));

                    // *deductingfrom chosen productsList

                    chosenProduct = chosenProduct.filter(elemID => {
                        if (!elemID == parentElementId) {
                            return elemID;
                        }
                    });
                    localStorage.setItem('chosenProduct', JSON.stringify(chosenProduct));
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

    const crossBtn = QS('.cross-mark')

    // !adding class to show cart
    cartSide.classList.add('cart-side-active');
    cartSide.classList.remove('cart-side-not-active');
    // ?making backgroung opacity increases

    nav.style.opacity = '0.7';
    main.style.opacity = '0.7';
    footer.style.opacity = '0.7';

    cartTtlDiv.textContent = parseFloat(amount).toFixed(2);

    crossBtn.addEventListener('click', () => {

        // !making opacity normal
        nav.style.opacity = '1';
        main.style.opacity = '1';
        footer.style.opacity = '1';

        // ?adding cart-side-not-active
        cartSide.classList.add('cart-side-not-active')
        // !removing cart-side-active
        cartSide.classList.remove('cart-side-active')
    })


}
//********bars onclick******
function bar() {

    const crossBtn = document.createElement('i');
    crossBtn.className = "fa-solid fa-xmark for-bar";
    barSide.appendChild(crossBtn);
    // !adding class to show cart
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
// ***** functions for storing local storage ****
function storingCartInLS(count) {
    localStorage.setItem('cartCount', JSON.stringify(count))
    cartCount.textContent = JSON.parse(localStorage.getItem('cartCount'));
}
function storingAmountInLS(amount) {
    localStorage.setItem('Amount', JSON.stringify(amount))
    cartTtlDiv.textContent = JSON.parse(localStorage.getItem('Amount'));
}
// *****checkingLocalStorage*****
function checkingLocalStorage(localStoragekey) {
    let storage;
    if (localStoragekey === 'Amount' || localStoragekey === 'cartCount') {

        (JSON.parse(localStorage.getItem(localStoragekey))) ? storage = JSON.parse(localStorage.getItem(localStoragekey)) : storage = 0
    } else {
        (JSON.parse(localStorage.getItem(localStoragekey))) ? storage = JSON.parse(localStorage.getItem(localStoragekey)) : storage = []
    }

    return storage;
}