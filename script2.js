// ---------- G E N E R A L ----------

var checkbox = document.querySelector('input[name=theme]');

checkbox.addEventListener('change', function() {
    if(this.checked) {
        trans()
        document.documentElement.setAttribute('data-theme', 'dark')
    } else {
        trans()
        document.documentElement.setAttribute('data-theme', 'light')
    }
})

let trans = () => {
    document.documentElement.classList.add('transition');
    window.setTimeout(() => {
        document.documentElement.classList.remove('transition')
    }, 1000)
}

// ----------   -------    ---       ---     ------   ----------
// ----------   |_____   /     \   /     \   |     \  ---------
// ----------   |       |       | |       |  |     |  ----------
// ----------   |        \_____/   \_____/   |_____/  ----------

let products = [
    {
        name: 'fromage',
        tag: 'fromage',
        price: 2,
        inCart: 0,
        filtres: '-vg-sg-sn-soe-ss-sfdm-',
        toHide: 0
    },
    {
        name: 'pain',
        tag: 'pain',
        price: 5,
        inCart: 0,
        filtres: '-vg-v-sn-soe-H-sfdm-sl-ss-k-',
        toHide: 0
    },
    {
        name: 'raisins',
        tag: 'raisins',
        price: 2,
        inCart: 0,
        filtres: '-vg-v-sg-sn-soe-H-sfdm-sl-ss-k-',
        toHide: 0
    },
    {
        name: 'courge',
        tag: 'courge',
        price: 2,
        inCart: 0,
        filtres: '-vg-v-sg-sn-soe-H-sfdm-sl-ss-k-',
        toHide: 0
    },
    {
        name: 'citrons',
        tag: 'citrons',
        price: 6,
        inCart: 0,
        filtres: '-vg-v-sg-sn-soe-H-sfdm-sl-ss-k-',
        toHide: 0
    },
    {
        name: 'artichauts',
        tag: 'artichauts',
        price: 4,
        inCart: 0,
        filtres: '-vg-v-sg-sn-soe-H-sfdm-sl-ss-k-',
        toHide: 0
    },
    {
        name: 'peches',
        tag: 'peches',
        price: 3,
        inCart: 0,
        filtres: '-vg-v-sg-sn-soe-H-sfdm-sl-ss-k-',
        toHide: 0
    },
    {
        name: 'huitres',
        tag: 'huitres',
        price: 13,
        inCart: 0,
        filtres: '-sg-sn-soe-sl-ss-',
        toHide: 0
    },
    {
        name: 'jambon',
        tag: 'jambon',
        price: 54,
        inCart: 0,
        filtres: '-sg-sn-soe-sfdm-sl-ss-',
        toHide: 0
    },
    {
        name: 'tarte aux pommes',
        tag: 'tarte1',
        price: 24,
        inCart: 0,
        filtres: '-vg-v-soe-H-sfdm-sl-k-',
        toHide: 0
    },
    {
        name: 'tarte aux citrons',
        tag: 'tarte2',
        price: 26,
        inCart: 0,
        filtres: '-v-vg-sn-soe-sfdm-ss-',
        toHide: 0
    },
    {
        name: 'vin blanc',
        tag: 'vin',
        price: 34,
        inCart: 0,
        filtres: '-vg-v-sg-sn-soe-H-sfdm-sl-ss-k-',
        toHide: 0
    }
];

let unfilteredProds = localStorage.getItem('unfilteredProducts');
unfilteredProds = parseInt(unfilteredProds);
if(unfilteredProds == null){
    unfilteredProducts();
}

function unfilteredProducts(){
    let availableProducts;
    var a = 0;
    for (let i=0; i < products.length; i++){
        if (a == 0){
            a=1;
            availableProducts = {
                [products[i].tag]: products[i]
            }
        } else{
            availableProducts = {
                ...availableProducts,
                [products[i].tag]: products[i]
            }
        }
    }
    localStorage.setItem('unfilteredProducts', JSON.stringify(availableProducts));
}

hideAndShow();

let cartPlus = document.querySelectorAll('.plus-one');
let cartMinus = document.querySelectorAll('.minus-one');

for (let i=0; i < cartPlus.length; i++){
    cartPlus[i].addEventListener('click', () => {
        cartUp(products[i]);
        totalCost(products[i], 0);
    })
    cartMinus[i].addEventListener('click', () => {
        totalCost(products[i], 1);
        cartDown(products[i]);
    })
}

function cartUp(product) {
    let productNumbers = localStorage.getItem('productNumbers');
    productNumbers = parseInt(productNumbers);

    if(productNumbers){
        if (product.inCart == 0){
            localStorage.setItem('productNumbers', productNumbers+1);
            document.querySelector('.nav-link-wrapper span').textContent = productNumbers+1;
        }
    } else {
        localStorage.setItem('productNumbers', 1);
        document.querySelector('.nav-link-wrapper span').textContent = 1;
    }
    setItems(product);
}

function setItems(product) {
    let cartItems = localStorage.getItem('productsInCart');
    cartItems = JSON.parse(cartItems);
    
    if(cartItems != null){
        if(cartItems[product.tag] == undefined){
            cartItems = {
                ...cartItems,
                [product.tag]: product
            }
        }
        cartItems[product.tag].inCart += 1;
    }else {
        product.inCart = 1;
        cartItems = {
            [product.tag]: product
        }
    }
    var tag = '.'+product.tag+' span'
    document.querySelector(tag).textContent = cartItems[product.tag].inCart;
    localStorage.setItem('productsInCart', JSON.stringify(cartItems));
}

function cartDown(product) {
    let cartItems = localStorage.getItem('productsInCart');
    cartItems = JSON.parse(cartItems);


    let productNumbers = localStorage.getItem('productNumbers');
    productNumbers = parseInt(productNumbers);

    if(productNumbers){
        if(cartItems[product.tag].inCart <= 1){
            localStorage.setItem('productNumbers', productNumbers-1);
            document.querySelector('.nav-link-wrapper span').textContent = productNumbers-1;
        }
    } else {
        localStorage.setItem('productNumbers', 0);
        document.querySelector('.nav-link-wrapper span').textContent = 0;
    }
    removeItems(product);
}

function removeItems(product) {
    let cartItems = localStorage.getItem('productsInCart');
    cartItems = JSON.parse(cartItems);
    
    if(cartItems != null){

        if(cartItems[product.tag].inCart > 1){
            cartItems[product.tag].inCart -= 1;
        }else {
            cartItems[product.tag].inCart = 0;

        }
        
    }
    var tag = '.'+product.tag+' span'
    document.querySelector(tag).textContent = cartItems[product.tag].inCart;
    localStorage.setItem('productsInCart', JSON.stringify(cartItems));
}


function onLoadCartNumbers() {
    let productNumbers = localStorage.getItem('productNumbers');

    if(productNumbers) {
        document.querySelector('.nav-link-wrapper span').textContent = productNumbers;
    }
}

onLoadCartNumbers();

function totalCost(product, i){
    let cartItems = localStorage.getItem('productsInCart');
    cartItems = JSON.parse(cartItems);
    let cartCost = localStorage.getItem('totalCost');

    if(cartCost != null && cartCost != NaN && cartCost != undefined){
        cartCost = parseInt(cartCost);
        if(i == 0){
            var result = cartCost + product.price;
        }else if(i == 1 && cartItems[product.tag].inCart>0){
            var result = cartCost - product.price;
        }
        localStorage.setItem("totalCost", result);
    }else{
        console.log('product.price : '+product.price)
        localStorage.setItem("totalCost", product.price);
    }

}


// ----------       ____           ___    ____        ____  ----------
// ----------     /     '  |        |    |___   |\  |   |   ---------
// ----------    |         |        |    |      | \ |   |   ----------
// ----------     \_____/  |_____  _|__  |____  |  \|   |   ----------

let filtres = [
    {
        name: 'Végétarien',
        tag: 'vg',
        isChosen: 0
    },
    {
        name: 'Sans gluten',
        tag: 'sg',
        isChosen: 0
    },
    {
        name: 'Sans noix',
        tag: 'sn',
        isChosen: 0
    },
    {
        name: 'Sans Œufs',
        tag: 'soe',
        isChosen: 0
    },
    {
        name: 'Halal',
        tag: 'H',
        isChosen: 0
    },
    {
        name: 'Végétalien',
        tag: 'v',
        isChosen: 0
    },
    {
        name: 'Sans lactose',
        tag: 'sl',
        isChosen: 0
    },
    {
        name: 'Sans soja',
        tag: 'ss',
        isChosen: 0
    },
    {
        name: 'Sans fruits de mer',
        tag: 'sfdm',
        isChosen: 0
    },
    {
        name: 'Kasher',
        tag: 'k',
        isChosen: 0
    }
];
showFiltres();
// ----------     ____   _____   ___    ___        ___        ----------
// ----------    |     \   |     |__   |___|  |   |   | \   / ---------
// ----------    |      |  |        \  |      |   |___|  \ /  ----------
// ----------    |_____/ __|__  \___/  |      |__ |   |   |   ----------


function hideAndShow(){
    let itemSpots = document.querySelectorAll('.product');
    let chosenFiltres = localStorage.getItem('chosenFiltres');
    chosenFiltres = JSON.parse(chosenFiltres);
    let unfilteredProducts = localStorage.getItem('unfilteredProducts');
    unfilteredProducts = JSON.parse(unfilteredProducts);



    if (chosenFiltres == null){ // no filtre selected
        let f = document.querySelectorAll('.displayFiltre');
        for (const element of f){
            element.style.display = "none"
        }
        var aucun = document.getElementById('aucun');
        aucun.style.display = "initial";
    }else{                      // show filtre selected
        for (let i=0; i < products.length; i++){
            let hide = unfilteredProducts[products[i].tag];
            if (hide.toHide == 1){
                console.log('hide '+hide.tag);
                itemSpots[i].style.display   = "none";
            }
            if (hide.toHide == 0){
                console.log('DONT hide '+hide.tag);
                itemSpots[i].style.display   = "";
            }
        }

    }
}

function showFiltres() {
    let chosenFiltres = localStorage.getItem('chosenFiltres');
    chosenFiltres = JSON.parse(chosenFiltres);
    var a = 0;
    var aucun = document.getElementById('aucun');
    if (chosenFiltres != null){
        for(let i = 0; i < filtres.length; i++){
            if (chosenFiltres[filtres[i].tag] == undefined){
                console.log('tag '+filtres[i].tag);
                var f = document.getElementById(filtres[i].tag)
                f.style.display = "none";
            }else{
                a = 1;
            }
        }
        if (a = 0) {
            aucun.style.display = "initial"
        } else {
            aucun.style.display = "none";
        }
    }
    else {
        let f = document.querySelectorAll('.displayFiltre');
        for (const element of f){
            element.style.display = "none"
        }
        var aucun = document.getElementById('aucun');
        aucun.style.display = "initial";
    }
}

searchBar()

function searchBar() {
    let itemSpots = document.querySelectorAll('.product');
    var input = document.querySelector('.search-input').value;
    let unfilteredProducts = localStorage.getItem('unfilteredProducts');
    unfilteredProducts = JSON.parse(unfilteredProducts);

    if (input != null){
        for (let i=0; i < products.length; i++){
            var name = unfilteredProducts[products[i].tag].name;
            if(!name.includes(input)){
                itemSpots[i].style.display   = "none";
            }
        }
    }
}