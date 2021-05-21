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





let cartPlus = document.querySelectorAll('.plus-one');
console.log(cartPlus);

for (let i=0; i < cartPlus.length; i++){
    cartPlus[i].addEventListener('click', () => {
        cartUp();
    })
}

function cartUp() {
    let productNumbers = localStorage.getItem('productNumbers');
    productNumbers = parseInt(productNumbers);

    if(productNumbers){
        localStorage.setItem('productNumbers', productNumbers+1);
        document.querySelector('.nav-link-wrapper span').textContent = productNumbers+1;
    } else {
        localStorage.setItem('productNumbers', 1);
        document.querySelector('.nav-link-wrapper span').textContent = 1;
    }
}

let cartMinus = document.querySelectorAll('.minus-one');
console.log(cartPlus);

for (let i=0; i < cartMinus.length; i++){
    cartMinus[i].addEventListener('click', () => {
        cartDown();
    })
}

function cartDown() {
    let productNumbers = localStorage.getItem('productNumbers');
    productNumbers = parseInt(productNumbers);

    if(productNumbers){
        localStorage.setItem('productNumbers', productNumbers-1);
        document.querySelector('.nav-link-wrapper span').textContent = productNumbers-1;
    } else {
        localStorage.setItem('productNumbers', 0);
        document.querySelector('.nav-link-wrapper span').textContent = 0;
    }
}

function onLoadCartNumbers() {
    let productNumbers = localStorage.getItem('productNumbers');

    if(productNumbers) {
        document.querySelector('.nav-link-wrapper span').textContent = productNumbers;
    }
}

onLoadCartNumbers();











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