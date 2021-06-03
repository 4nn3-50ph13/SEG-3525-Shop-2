// ---------- G E N E R A L ----------

var checkbox = document.querySelector('input[name=theme]');

checkbox.addEventListener('change', function() {
    if(this.checked) {
        trans()
        document.documentElement.setAttribute('data-theme', 'dark')
        localStorage.setItem('theme', 'dark');
    } else {
        trans()
        document.documentElement.setAttribute('data-theme', 'light')
        localStorage.setItem('theme', 'light');
    }
})

let trans = () => {
    document.documentElement.classList.add('transition');
    window.setTimeout(() => {
        document.documentElement.classList.remove('transition')
    }, 1000)
}

let theme = localStorage.getItem('theme');
if (theme){
    document.documentElement.setAttribute('data-theme', theme);
}

// ----------   -------    ---       ---     ------   ----------
// ----------   |_____   /     \   /     \   |     \  ---------
// ----------   |       |       | |       |  |     |  ----------
// ----------   |        \_____/   \_____/   |_____/  ----------

let products = [
    {
        name: 'courge',
        tag: 'courge',
        price: 2,
        inCart: 0,
        filtres: '-vg-v-sg-sn-soe-H-sfdm-sl-ss-bio-',
        toHide: 0
    },
    {
        name: 'fromage',
        tag: 'fromage',
        price: 2,
        inCart: 0,
        filtres: '-vg-sg-sn-soe-ss-sfdm-',
        toHide: 0
    },
    {
        name: 'raisins',
        tag: 'raisins',
        price: 2,
        inCart: 0,
        filtres: '-vg-v-sg-sn-soe-H-sfdm-sl-ss-bio-',
        toHide: 0
    },
    {
        name: 'peches',
        tag: 'peches',
        price: 3,
        inCart: 0,
        filtres: '-vg-v-sg-sn-soe-H-sfdm-sl-ss-bio-',
        toHide: 0
    },
    {
        name: 'artichauts',
        tag: 'artichauts',
        price: 4,
        inCart: 0,
        filtres: '-vg-v-sg-sn-soe-H-sfdm-sl-ss-bio-',
        toHide: 0
    },
    {
        name: 'pain',
        tag: 'pain',
        price: 5,
        inCart: 0,
        filtres: '-vg-v-sn-soe-H-sfdm-sl-ss-bio-',
        toHide: 0
    },
    {
        name: 'citrons',
        tag: 'citrons',
        price: 6,
        inCart: 0,
        filtres: '-vg-v-sg-sn-soe-H-sfdm-sl-ss-bio-',
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
        name: 'tarte aux pommes',
        tag: 'tarte1',
        price: 24,
        inCart: 0,
        filtres: '-vg-v-soe-H-sfdm-sl-bio-',
        toHide: 0
    },
    {
        name: 'tarte aux citrons',
        tag: 'tarte2',
        price: 26,
        inCart: 0,
        filtres: '-vg-sn-soe-sfdm-ss-',
        toHide: 0
    },
    {
        name: 'vin blanc',
        tag: 'vin',
        price: 34,
        inCart: 0,
        filtres: '-vg-v-sg-sn-soe-H-sfdm-sl-ss-bio-',
        toHide: 0
    },
    {
        name: 'jambon',
        tag: 'jambon',
        price: 54,
        inCart: 0,
        filtres: '-sg-sn-soe-sfdm-sl-ss-',
        toHide: 0
    }
];

unfilteredProducts();

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
        name: 'Biologique',
        tag: 'bio',
        isChosen: 0
    }
];

let filtreBoxes = document.querySelectorAll('.row');

for (let i=0; i < filtreBoxes.length; i++){
    filtreBoxes[i].addEventListener('change', function() {
        console.log('before '+filtres[i].tag+" "+filtreBoxes[i].isChosen);
        if(filtreBoxes[i].isChosen == 0 || filtreBoxes[i].isChosen == undefined) { //checking the box, adding filter
            filtreBoxes[i].isChosen = 1;
            filtres[i].isChosen = 1;
            console.log('checqued '+filtres[i].tag+" "+filtreBoxes[i].isChosen);
            changeFiltre(filtres[i], 0);
            hideAndShow(filtres[i], 0)
        } else {                           //unchecking the box, removing filter
            filtreBoxes[i].isChosen = 0;
            filtres[i].isChosen = 0;
            console.log('unchecqued '+filtres[i].tag+" "+filtreBoxes[i].isChosen);
            changeFiltre(filtres[i], 1);
            hideAndShow(filtres[i], 1)
        }
    })
}

function changeFiltre(filtre, i) {
    let chosenFiltres = localStorage.getItem('chosenFiltres');
    chosenFiltres = JSON.parse(chosenFiltres);

    if (i == 0) { // if we want to add the filter
        if(chosenFiltres != null){
            console.log('adding filtre '+filtre.tag+" "+filtre.isChosen);
            if(chosenFiltres[filtre.tag] == undefined){
                chosenFiltres = {
                ...chosenFiltres,
                [filtre.tag]: filtre
                }
            }
        }else {
            localStorage.setItem('chosenFiltres', filtre);
            console.log('creating filtre '+filtre.tag+" "+filtre.isChosen);
            chosenFiltres = {
                [filtre.tag]: filtre
            }
        }
        chosenFiltres[filtre.tag].isChosen = 1;
        localStorage.setItem('chosenFiltres', JSON.stringify(chosenFiltres));
    }else { // if we want to remove the filter
        filtre.isChosen = 0;
        chosenFiltres[filtre.tag].isChosen = 0;
        console.log("tryign to remove... "+filtre.tag+" "+filtre.isChosen);
        var a = 0;
        localStorage.removeItem('chosenFiltres');
        for (const element of filtres) {
            if(element.isChosen == 1){
                if(a == 0){
                    a = 1;
                    chosenFiltres = {
                        [element.tag]: filtre
                        }
                }else{
                    chosenFiltres = {
                        ...chosenFiltres,
                        [element.tag]: filtre
                    }
                }
            }
        }
        if (a == 1){
            localStorage.setItem('chosenFiltres', JSON.stringify(chosenFiltres));
        }
    }
    //document.querySelector('.info span').textContent = cartItems[filtre.tag].inCart;
}


// ----------     ____   _____   ___    ___        ___        ----------
// ----------    |     \   |     |__   |___|  |   |   | \   / ---------
// ----------    |      |  |        \  |      |   |___|  \ /  ----------
// ----------    |_____/ __|__  \___/  |      |__ |   |   |   ----------

function hideAndShow(filtre, x){
    let unfilteredProducts = localStorage.getItem('unfilteredProducts');
    unfilteredProducts = JSON.parse(unfilteredProducts);
    var f = '-'+filtre.tag+'-';

    for (const element of products){
        if (!unfilteredProducts[element.tag].filtres.includes(f)){
            if (x==0){
                unfilteredProducts[element.tag].toHide=1;
            }else{
                console.log('!??');
                unfilteredProducts[element.tag].toHide=0;
            }
        }
    }
    localStorage.setItem('unfilteredProducts', JSON.stringify(unfilteredProducts));
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

let chkbx = document.querySelectorAll('.chk');
let chosenFiltres = localStorage.getItem('chosenFiltres');
chosenFiltres = JSON.parse(chosenFiltres);

if (chosenFiltres != null) {
    for (const element of chkbx){
        for (const filtre of filtres){
            f = chosenFiltres[filtre.tag];
            if(f == undefined){
                check(filtre.tag,false);
            }else if (f.tag == element.value){
                check(f.tag,true);
            }
        }
        //console.log(chosenFiltres);
    }
}

var resetBtn = document.querySelector('.soumettre.reset');

resetBtn.addEventListener('click', function() {
    localStorage.removeItem('chosenFiltres');
    for (const element of chkbx){
        check(element.value,false);
    }
});

function check(value,checked) {
    const cbs = document.querySelectorAll('input[value='+value+']');
    cbs.forEach((cb) => {
        cb.checked = checked;
    });
}