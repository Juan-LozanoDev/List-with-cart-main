// Cambiar estilo de botones y imagen al hacer clic en Add to Cart

let addToCart = document.querySelectorAll('.add-To-Cart');
let imageProducts = document.querySelectorAll('.product');
let products = document.querySelectorAll('.cards');
let fullCart = document.querySelector('.fullCart');
let emptyCart = document.querySelector('.emptyCart');
let numbersOfProducts = document.getElementById('numbersOfProducts');
let finalPrice = document.querySelector('.finalPrice');


addToCart.forEach((button, index) => {
    let quantity = 0;
    button.addEventListener('click', () => {
        if (button.classList.contains('active')) return;

        // Se agrega al boton el estado active
        quantity = 1;
        button.classList.add('active');                      // Para activar botton carrito
        imageProducts[index].classList.add('active');        // Para activar borde imagen
        button.textContent = '';
        button.innerHTML = `
            <button class = "minus"><img src ="./assets/icons/minus-circle-svgrepo-com.svg" alt="minus"></button>
            <p class ="quantity">${quantity}</p>
            <button class = "add"><img src ="./assets/icons/add-circle-svgrepo-com.svg" alt="add"></button>`;


        /* <----------------------------------------------------------------------------------------------------------------->*/
        // Se seleccionan los botones add y minus y la cantidad

        let addBtn = button.querySelector('.add');
        let minusBtn = button.querySelector('.minus');
        let quantityDisplay = button.querySelector('.quantity');

        //Evento para cuando se oprima el boton addBtn, agregando uno a la cantidad y mostrandolo en pantalla

        addBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            quantity++;
            quantityDisplay.textContent = quantity;
            updateCart();
        });

        //Evento para cuando se oprima el boton minusBtn, quitando uno a la cantidad y mostrandolo en pantalla y en caso de ser menor a 1 volvera a su estado inicial
        minusBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            if (quantity > 1) {
                quantity--;
                quantityDisplay.textContent = quantity;
                updateCart();
            } else {
                quantity--;
                quantityDisplay.textContent = quantity;
                updateCart();
                button.classList.remove('active');
                imageProducts[index].classList.remove('active');
                button.textContent = '';
                button.innerHTML = `<img src="./assets/images/icon-add-to-cart.svg" alt="icon add to cart">Add to Cart`;
            };
        });

    /* <----------------------------------------------------------------------------------------------------------------->*/

    // Agregar el producto al carrito

    function updateCart() {

        let price = products[index].querySelector('.price').textContent.slice(1);
        let description = products[index].querySelector('.description').textContent;
        let productQuantity = parseInt(quantityDisplay.textContent);
        let totalProduct = parseFloat(price) * productQuantity;
        let productsOn = fullCart.querySelectorAll('.product-Cart');
        let found = false;

        // Se verifica si el producto ya se encuentra en el carrito y si la cantidad es mayor a 1

        productsOn.forEach((productOn) => {
            let productDescription = productOn.querySelector('.description').textContent;



            if (productDescription === description) {
                if (productQuantity > 0) {
                    productOn.querySelector('.product-quantity').textContent = productQuantity;
                    productOn.querySelector('.total-product-price').textContent = `$${totalProduct.toFixed(2)}`;
                    found = true;
                } else
                    productOn.remove();
                found = true;
            };
        });


        // En caso de no encontrar el producto en el carrito, se agrega el producto
        if (!found && productQuantity > 0) {
            let productCart = document.createElement('div');
            productCart.classList.add('product-Cart');
            productCart.innerHTML = `
                            <p class="description">${description}</p>
                            <span>
                            <p class ="product-quantity">${productQuantity}</p>
                            <p class="product-price">@ ${price}</p>
                            <p class="total-product-price">$${totalProduct.toFixed(2)}</p>
                            <button class ="delete-product">
                                <svg width="100px" height="100px" viewBox="0 0 1024 1024" fill="#000000" class="icon" version="1.1" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"><path d="M512 897.6c-108 0-209.6-42.4-285.6-118.4-76-76-118.4-177.6-118.4-285.6 0-108 42.4-209.6 118.4-285.6 76-76 177.6-118.4 285.6-118.4 108 0 209.6 42.4 285.6 118.4 157.6 157.6 157.6 413.6 0 571.2-76 76-177.6 118.4-285.6 118.4z m0-760c-95.2 0-184.8 36.8-252 104-67.2 67.2-104 156.8-104 252s36.8 184.8 104 252c67.2 67.2 156.8 104 252 104 95.2 0 184.8-36.8 252-104 139.2-139.2 139.2-364.8 0-504-67.2-67.2-156.8-104-252-104z" fill=""></path><path d="M707.872 329.392L348.096 689.16l-31.68-31.68 359.776-359.768z" fill=""></path><path d="M328 340.8l32-31.2 348 348-32 32z" fill=""></path></g></svg>
                                </button>
                            </span>`;
            fullCart.insertAdjacentElement('afterbegin', productCart);
        };



        // Actualizar estado del carrito

        let productsOnCart = fullCart.querySelectorAll('.product-Cart');
        if (productsOnCart.length == 0) {
            fullCart.classList.remove('active');
            emptyCart.classList.add('active');
        } else {
            fullCart.classList.add('active');
            emptyCart.classList.remove('active');
        };

        // Actualizar precio total
        let totalPriceProducts = document.querySelectorAll('.total-product-price');
        let totalPrice = 0;
        totalPriceProducts.forEach((totalPriceProduct) => {
            totalPrice += parseFloat(totalPriceProduct.textContent.slice(1));
        })

        finalPrice.textContent = `$ ${totalPrice.toFixed(2)}`;


        // Actualizar cantidad de productos
        let totalQuantityProducts = document.querySelectorAll('.product-quantity');
        let totalQuantity = 0;
        totalQuantityProducts.forEach((totalQuantityProduct) => {
            totalQuantity += parseFloat(totalQuantityProduct.textContent);
        });
        numbersOfProducts.textContent = totalQuantity;

    }; updateCart();


    // Boton para eliminar producto del carrito
    let productsOn = fullCart.querySelectorAll('.product-Cart');
    let buttonsDelete = document.querySelectorAll('.delete-product');
    buttonsDelete.forEach((buttonDelete, i) => {
        buttonDelete.addEventListener('click', () => {
            productsOn[i].remove();
            quantity = 0;
            quantityDisplay.textContent = quantity;
            button.textContent = '';
            button.classList.remove('active');
            button.innerHTML = `<img src="./assets/images/icon-add-to-cart.svg" alt="icon add to cart">Add to Cart`;
            imageProducts[index].classList.remove('active');
            updateCart();
        });
    });
});
});

let confirmOrder = document.querySelector('.confirm-order');
let modal = document.getElementById('modal');

confirmOrder.addEventListener('click', () => {
    modal.showModal();
})
