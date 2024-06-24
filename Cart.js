//Shopping cart window will appear upon clicking shopping cart icon.
let shoppingCart = document.querySelector('.shopping-cart');

//Shopping cart window must also be hidden so call it back here.
let closeCart = document.querySelector('.close');

//For shopping cart window to appear, add class showCart to body.
let body = document.querySelector('body');

//Create empty list of product array.
let listProductHTML = document.querySelector('.listProduct');

//Put shopping cart list on HTML through listCart class.
let listCartHTML = document.querySelector('.listCart');

/*Span tag containing total number of products in shopping cart
 *will need to be updated. 
 */
let shoppingCartSpan = document.querySelector('.shopping-cart span');

let listProducts = [];
//By default, variable cart to store cart value.
let carts = [];

shoppingCart.addEventListener('click', () => {
    //Call body and pass class showCart.
    body.classList.toggle('showCart');
});

//Listen for mouse click event and run similar function.
closeCart.addEventListener('click', () => {
    body.classList.toggle('showCart');
});

const addDataToHTML = () => {
    listProductHTML.innerHTML = '';
    if (listProducts.length > 0) {
        listProducts.forEach(product => {
            let newProduct = document.createElement('div');
            newProduct.classList.add('item');
            //NB Each product has its own id.
            /*When creating these item classes, pass into it a 
             *dataset.id which is the id of that product.
             */
            newProduct.dataset.id = product.id;
            newProduct.innerHTML = ` 
            <img src = "${product.image}" alt ="">
            <div class="${product.name.replace(/\s+/g, '-')}"></div>     
            <div class="product-description">${product.description}</div>
            <div class="product-price">$${product.price}</div>
            <button class="addToCart">Add to Cart</button>
            `;
            listProductHTML.appendChild(newProduct);
        })
    }
}
//Catch event when the user clicks Add To Cart button.
//It will process Add To Cart.
/*When user or customer clicks anywhere within the scope of
 *the listProduct class, we all run a function.
 */
listProductHTML.addEventListener('click', (event) => {
    //With event.target being the location where the user or customer just clicked.
    let positionClick = event.target;
    /*If that location has class addCart, user or customer
     *has just clicked on the Add to Cart button.
     */
    if (positionClick.classList.contains('addCart')) {
        let product_id = positionClick.parentElement.dataset.id;
        addToCart(product_id);
    }
})

//After having product_id, pass it into function called addToCart.
const addToCart = (product_id) => {
    /*To check if this product is already in the cart, we will use
     *findIndex to find its position in the cart.

     *If not found, it will return the value -1.
     */
    let positionThisProductInCart = carts.findIndex((value) => value.product_id == product_id);
    if (carts.length <= 0) {
        carts = [{
            product_id: product_id,
            quantity: 1
        }]
        /*If there is already data in the shopping cart, then we 
         *will have two cases.
         
         *That is wheather this product is already in the cart or not.
         *If not, the search position is <0.
         */
    } else if (positionThisProductInCart < 0) {
        carts.push({
            product_id: product_id,
            quantity: 1
        });
        /*If it already exists, we will not add half. 
         *Instead we increase the product at the 
         *position we just found in the shopping cart by 1.
         */
    } else {
        carts[positionThisProductInCart].quantity = carts[positionThisProductInCart].quantity = 1;
    }
    //Display shopping cart to screen with addCartToHTML.
    addCartToHTML();
    /*We need shopping cart data to be saved even when the
     *user or customer turns off the computer.
     */
    //Create function addCartToMemory to handle saving to memory.
    addCartToMemory();
}
const addCartToMemory = () => {
    //setItem function saves value of shopping cart to local storage.
    localStorage.setItem('cart', JSON.stringify(carts));
}
const addCartToHTML = () => {
    listCartHTML.innerHTML = '';
    //Update total number of products in shopping cart.
    //Create variable total with value 0.
    let totalQuantity = 0;
    if (carts.length > 0) {
        carts.forEach(cart => {
            totalQuantity = totalQuantity + cart.quantity;
            let newCart = document.createElement('div');
            newCart.classList.add('item');
            newCart.dataset.id = cart.product_id;
            /*We will find the location of the product whose id is
             *equal to the product id of the cart using the findIndex 
             *function.
             */
            let positionProduct = listProducts.findIndex((value) => value.id == cart.product_id);
            /*All information about that product will be in the listProduct
             *whose location is just found.
             */
            let info = listProducts[positionProduct];
            newCart.innerHTML = `
            <div class="image">
            <img src="${info.image}" alt=" ">
            </div>
            <div class="productName">${info.name}</div>
            <div class="product-description">${info.description}</div>
            <div class=" productPrice">$${info.price = cart.quantity}</div>
               <div class="quantity">
                    <span class="minus">-</span>
                    <span>${cart.quantity}</span>
                    <span class="plus">+</span>
                </div>
            `;
            listCartHTML.appendChild(newCart);  
        })
    }
    document.addEventListener('DOMContentLoaded', function () {
        const checkoutButton = document.querySelector('.checkout');
        checkoutButton.addEventListener('click', function() {
            window.location.href = 'Payment.html';
        });
    });

    //Display it on the screen.
    shoppingCartSpan.innerText = totalQuantity;
}
/*When minus and plus buttons are clicked, the number of products in the 
 *cart will change.

 *Catch event when the user or customer clicks on listCart.
 */
listCartHTML.addEventListener('click', (event) => {
    let positionClick = event.target;
    /*If that location has class of min or plus, means that they just 
     *clicked the arrow. 
     *Only then will we continue to process it.
     */
    if (positionClick.classList.contains('minus') || positionClick.classList.contains('plus')) {
        //Class btn as in class item. That is, it is located inside two layers.
        let product_id = positionClick.parentElement.parentElement.dataset.id;
        //Add or decrease amount.
        let type = 'minus';
        if (positionClick.classList.contains('plus')) {
            type = 'plus';
        }
        //Call function changeQuantity.
        changeQuantity(product_id, type);
    }
})
const changeQuantity = (product_id, type) => {
    //Find position of that product in the shopping cart with findIndex.
    let positionItemInCart = carts.findIndex((value) => value.product_id == product_id);
    if (positionItemInCart >= 0) {
        switch (type) {
            case 'plus':
                //If type has value of plus, add quantity to product_id at that position.
                carts[positionItemInCart].quantity = carts[positionItemInCart].quantity + 1;
                break;
            default:
                //Check to see what result is after subtracting 1.
                let valueChange = carts[positionItemInCart].quantity - 1;
                //If > 0, subtract as usual.
                if (valueChange > 0) {
                    carts[positionItemInCart].quantity = valueChange;
                } else {
                    /*If quantity is now 0, then delete that product from the cart with 
                     *splice function.
                     */
                    carts.splice(positionItemInCart, 1);
                }
                break;
        }
    }
    //Run addCartMemory function again so that it updates latest data into memory.
    //At the same time, run addCartToHTML function to refresh data on the screen.
    addCartToMemory();
    addCartToHTML();
}
const initApp = () => {
    //Get data from json.
    fetch('Products.json')
    .then(response => response.json())
    .then(data => {
        listProducts = data;
        /*After getting the data, call function addDataToHTML to 
        display the data on the screen.*/
        addDataToHTML();

            //Get cart from memory.
        if (localStorage.getItem('cart')) {
                //If it exists, then cart variable is equal to cart data in memory.
                carts = JSON.parse(localStorage.getItem('cart'));
                //Run function addCartToHTML to put data on screen.
                addCartToHTML();
            }
        })
}
initApp();