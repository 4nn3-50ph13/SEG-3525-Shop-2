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
    document.querySelector('.info span').textContent = cartItems[product.tag].inCart;
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
    document.querySelector('.info span').textContent = cartItems[product.tag].inCart;
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

let filtreBoxes = document.querySelectorAll('.row');

for (let i=0; i < filtreBoxes.length; i++){
    filtreBoxes[i].addEventListener('click', function() {
        if(filtreBoxes[i].isChosen == 0 || filtreBoxes[i].isChosen == undefined) { //checking the box, adding filter
            filtreBoxes[i].isChosen = 1;
            console.log('checqued');
            changeFiltre(filtres[i], 0);
        } else {                           //unchecking the box, removing filter
            filtreBoxes[i].isChosen = 0;
            console.log('unchecqued');
            changeFiltre(filtres[i], 1);
        }
    })
}

function changeFiltre(filtre, i) {
    let chosenFiltres = localStorage.getItem('chosenFiltres');
    chosenFiltres = JSON.parse(chosenFiltres);

    if (i == 0) { // if we want to add the filter
        console.log('i = 0');
        if(chosenFiltres != null){
            console.log('adding filtre');
            if(chosenFiltres[filtre.tag] == undefined){
                chosenFiltres = {
                ...chosenFiltres,
                [filtre.tag]: filtre
                }
            }
        }else {
            localStorage.setItem('chosenFiltres', filtre);
            console.log('creating filtre');
            chosenFiltres = {
                [filtre.tag]: filtre
            }
        }
        chosenFiltres[filtre.tag].isChosen = 1;
    }else {
        filtre.isChosen = 0;
        chosenFiltres[filtre.tag].isChosen = 0;
        console.log("tryign to remove...");
        var a = 0;
        for (const element of filtres) {
            console.log(element);
            if(element.isChosen == 1){
                if(a == 0){
                    a == 1;
                    chosenFiltres = {
                        [element.tag]: filtre
                        }
                    console.log('aaaa' +chosenFiltres);
                }else{
                    chosenFiltres = {
                        ...chosenFiltres,
                        [element.tag]: filtre
                    }
                    console.log('bbbb' +chosenFiltres);
                }
            }
        }
    }
    //document.querySelector('.info span').textContent = cartItems[filtre.tag].inCart;
    localStorage.setItem('chosenFiltres', JSON.stringify(chosenFiltres));
}

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

let products = [
    {
        name: 'fromage',
        tag: 'fromage',
        price: 1.99,
        inCart: 0
    },
    {
        name: 'pain',
        tag: 'pain',
        price: 4.99,
        inCart: 0
    },
    {
        name: 'raisins',
        tag: 'raisins',
        price: 1.99,
        inCart: 0
    },
    {
        name: 'courge',
        tag: 'courge',
        price: 1.99,
        inCart: 0
    },
    {
        name: 'citrons',
        tag: 'citrons',
        price: 5.99,
        inCart: 0
    },
    {
        name: 'artichauts',
        tag: 'artichauts',
        price: 3.99,
        inCart: 0
    },
    {
        name: 'peches',
        tag: 'peches',
        price: 2.99,
        inCart: 0
    },
    {
        name: 'huitres',
        tag: 'huitres',
        price: 13.99,
        inCart: 0
    },
    {
        name: 'jambon',
        tag: 'jambon',
        price: 54.99,
        inCart: 0
    },
    {
        name: 'tarte aux pommes',
        tag: 'tarte1',
        price: 24.99,
        inCart: 0
    },
    {
        name: 'tarte aux citrons',
        tag: 'tarte2',
        price: 26.99,
        inCart: 0
    },
    {
        name: 'fromage',
        tag: 'fromage',
        price: 34.99,
        inCart: 0
    }
];