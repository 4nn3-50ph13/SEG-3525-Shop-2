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
        filtres: '-vg-sg-sn-soe-ss-sfdm-'
    },
    {
        name: 'pain',
        tag: 'pain',
        price: 5,
        inCart: 0,
        filtres: '-vg-v-sn-soe-H-sfdm-sl-ss-k-'
    },
    {
        name: 'raisins',
        tag: 'raisins',
        price: 2,
        inCart: 0,
        filtres: '-vg-v-sg-sn-soe-H-sfdm-sl-ss-k-'
    },
    {
        name: 'courge',
        tag: 'courge',
        price: 2,
        inCart: 0,
        filtres: '-vg-v-sg-sn-soe-H-sfdm-sl-ss-k-'
    },
    {
        name: 'citrons',
        tag: 'citrons',
        price: 6,
        inCart: 0,
        filtres: '-vg-v-sg-sn-soe-H-sfdm-sl-ss-k-'
    },
    {
        name: 'artichauts',
        tag: 'artichauts',
        price: 4,
        inCart: 0,
        filtres: '-vg-v-sg-sn-soe-H-sfdm-sl-ss-k-'
    },
    {
        name: 'peches',
        tag: 'peches',
        price: 3,
        inCart: 0,
        filtres: '-vg-v-sg-sn-soe-H-sfdm-sl-ss-k-'
    },
    {
        name: 'huitres',
        tag: 'huitres',
        price: 13,
        inCart: 0,
        filtres: '-sg-sn-soe-sl-ss-'
    },
    {
        name: 'jambon',
        tag: 'jambon',
        price: 54,
        inCart: 0,
        filtres: '-sg-sn-soe-sfdm-sl-ss-'
    },
    {
        name: 'tarte aux pommes',
        tag: 'tarte1',
        price: 24,
        inCart: 0,
        filtres: '-vg-v-soe-H-sfdm-sl-k-'
    },
    {
        name: 'tarte aux citrons',
        tag: 'tarte2',
        price: 26,
        inCart: 0,
        filtres: '-v-sn-soe-sfdm-ss-'
    },
    {
        name: 'Vin blanc',
        tag: 'vin',
        price: 34,
        inCart: 0,
        filtres: '-vg-v-sn-soe-H-sfdm-sl-ss-k-'
    }
];

unfilteredProducts()

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
    let hidden = localStorage.getItem('hidden');
    hidden = JSON.parse(hidden);
    let unfilteredProducts = localStorage.getItem('unfilteredProducts');
    unfilteredProducts = JSON.parse(unfilteredProducts);
    
    for (let i=0; i < products.length; i++){
        for (let j=0; j < hidden.length; j++){
            const f = JSON.stringify(hidden[j].tag);
            const prod = JSON.stringify(unfilteredProducts[products[i].tag].tag);
            if (prod.includes(f)){
                itemSpots[i].style.display   = "none";
            }
        }
    }
}

function showFiltres() {
    let chosenFiltres = localStorage.getItem('chosenFiltres');
    chosenFiltres = JSON.parse(chosenFiltres);
    var a = 0;
    var aucun = document.getElementById('aucun');
    console.log("aucun "+aucun);
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