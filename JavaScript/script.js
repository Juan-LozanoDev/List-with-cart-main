// Cambiar estilo de botones y imagen al hacer clic en Add to Cart

let addToCart = document.querySelectorAll('.add-To-Cart');
let imageProducts = document.querySelectorAll('.product');
let products = document.querySelectorAll('.cards');
let fullCart = document.querySelector('.fullCart');
let emptyCart = document.querySelector('emptyCart');
let numbersOfProducts = document.getElementById('numbersOfProducts');


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
            console.log(productQuantity);
            let totalProduct = parseFloat(price) * productQuantity;
            let productsOnCart = fullCart.querySelectorAll('.product-Cart');
            let found = false;

            // Se verifica si el producto ya se encuentra en el carrito y si la cantidad es mayor a 1

            productsOnCart.forEach((productOnCart) => {
                let productDescription = productOnCart.querySelector('.description').textContent;

                if (productDescription === description) {
                    if (productQuantity > 0) {
                        productOnCart.querySelector('.product-quantity').textContent = productQuantity;
                        productOnCart.querySelector('.total-product-price').textContent = `$${totalProduct.toFixed(2)}`;
                        found = true;
                    } else
                    productOnCart.remove();
                    found = true;
                }
            });


            // En caso de no encontrar el producto en el carrito, se agrega el producto
            if (!found) {
                let productCart = document.createElement('div');
                productCart.classList.add('product-Cart');
                productCart.innerHTML = `
                            <p class="description">${description}</p>
                            <span>
                            <p class ="product-quantity">${productQuantity}</p>
                            <p class="product-price">@ ${price}</p>
                            <p class="total-product-price">$${totalProduct.toFixed(2)}</p>
                            </span>`;
                fullCart.insertAdjacentElement('afterbegin', productCart);
            };
        }; updateCart();
    });
});
