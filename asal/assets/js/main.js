const content = document.querySelector('.content');
const items = document.querySelector('.items');
const menu = document.querySelector('.menu-links').children;
const convert = document.querySelector('.switch');
var currCard;
var total = 0;
const taxes = 0.15;

const cartTot = document.querySelector('.order').querySelector('.total');
const cartTax = document.querySelector('.order').querySelector('.taxes');
const cartSum = document.querySelector('.order').querySelector('.sum');


//fetching data

/* var addToCart = (id) => {
    fetch(`https://fakestoreapi.com/products/${id}`)
        .then(res => res.json())
        .then(json => addItem(json));
}; */

var displayCards = (s) => {
    fetch(`https://fakestoreapi.com/products${s}`)
        .then(res => res.json())
        .then(json => {
            content.innerHTML = '';
            _.each(json, (p) => {
                addCard(p);
            });
        });
};
displayCards('');

//end fetching



//events
items.addEventListener('dragover', (e) => {
    e.preventDefault();
    items.classList.add('good');
    items.classList.remove('hovered');
});
items.addEventListener('dragenter', () => {
    console.log('entered');
});
items.addEventListener('dragleave', () => {
    items.classList.remove('good');
    items.classList.add('hovered');
});
items.addEventListener('drop', () => {
    items.classList.remove('good');
    let list = items.querySelectorAll('.id');
    console.log(list);
    let curr;
    let flag = false;
    let price = currCard.price;
    let count = 1;
    _.each(list, (i) => {
        console.log(i.innerText);
        console.log(i.innerText == currCard.id);

        console.log(currCard.id);
        if (i.innerText == currCard.id) {

            flag = true;
            curr = i.parentElement;

            console.log(curr);
        }
    })
    if (!flag)
        addItem(currCard);
    else {
        count = ++curr.querySelector('.count').innerText;
        console.log(count);


    }
    total += price;

    checkOut(total);

});

_.each(menu, (link) => {
    link.addEventListener('click', (e) => {
        let active = document.querySelector('.menu-links .active');
        active.classList.remove('active');

        switch (e.target.innerText) {
            case 'Random':
                displayCards('');
                active = e.target;
                e.target.classList.add('active');
                break;
            case 'Men':
                displayCards('/category/men clothing');
                active = e.target;
                e.target.classList.add('active');
                break;
            case 'Women':
                displayCards('/category/women clothing');
                active = e.target;
                e.target.classList.add('active');
                break;
            case 'Electronics':
                displayCards('/category/electronics');
                active = e.target;
                e.target.classList.add('active');
                break;
            case 'Jewelery':
                displayCards('/category/jewelery');
                active = e.target;
                e.target.classList.add('active');
                break;
        }
    })
})



convert.addEventListener('click', () => {
    let body = document.querySelector('body');
    let items = document.querySelectorAll('.item');
    if (body.classList.contains('dark')) {
        body.classList.remove('dark');
        body.classList.add('light');
        _.each(items, (item) => {
            item.classList.remove('dark');
            item.classList.add('light');
        });


    } else {
        body.classList.remove('light');
        body.classList.add('dark');
        _.each(items, (item) => {
            item.classList.remove('light');
            item.classList.add('dark');
        });
    }
})






//checkOut function

var checkOut = (price = 0) => {
    cartTot.innerText = price.toFixed(2) + ' $';
    cartTax.innerText = (price * taxes).toFixed(2) + ' $';
    cartSum.innerText = (price + price * taxes).toFixed(2) + ' $';
}


//add card function

var addCard = (product) => {
    let id = document.createElement('p');
    id.classList.add('id');
    id.innerText = product.id;

    let card = document.createElement('div');
    card.classList.add('card');

    let image = document.createElement('div');
    image.classList.add('image');
    image.style.backgroundImage = `url( ${product.image})`;

    let category = document.createElement('p');
    category.classList.add('category');
    category.innerText = product.category;

    let price = document.createElement('p');
    price.classList.add('price');
    price.innerText = product.price + "$";

    image.appendChild(category);
    image.appendChild(price);

    let title = document.createElement('h2');
    title.classList.add('title');
    title.innerText = product.title.slice(0, 30);

    let description = document.createElement('h2');
    let less = product.description.slice(0, 75);
    let more = product.description.slice(75, product.description.length);
    description.classList.add('description');
    description.innerText = less + " ...";
    let showMore = document.createElement('button');
    showMore.classList.add('show-more');
    showMore.innerText = "Show More";

    showMore.addEventListener('click', () => {
        if (description.innerText === less + more) {
            description.innerText = less + " ...";
            showMore.innerText = "Show More";
        } else {
            description.innerText = less + more;
            showMore.innerText = "Show Less";
        }
    });
    card.appendChild(id);
    card.appendChild(image);
    card.appendChild(title);
    card.appendChild(description);
    card.appendChild(showMore);
    content.appendChild(card);
    card.draggable = true;
    card.addEventListener('dragstart', (e) => {
        currCard = product;
        items.classList.add('hovered');
    });
    card.addEventListener('drag', () => {

    })
    card.addEventListener('dragend', (e) => {
        items.classList.remove('hovered');
    });

}

//add item function
var addItem = (product) => {
    let id = document.createElement('p');
    id.classList.add('id');
    id.innerText = product.id;

    let item = document.createElement('div');
    item.classList.add('item');

    let image = document.createElement('div');
    image.classList.add('image');
    image.style.backgroundImage = `url( ${product.image})`;

    let remove = document.createElement('button');
    remove.classList.add('remove');
    remove.addEventListener('click', () => {
        if (item.querySelector('.count').innerText > 1) {
            item.querySelector('.count').innerText--;

        } else {
            items.removeChild(item);


        }
        total -= product.price;
        checkOut(total);

    });

    let count = document.createElement('button');
    count.classList.add('count');

    image.appendChild(remove);
    image.appendChild(count);
    count.innerText = 1;

    let title = document.createElement('p');
    title.classList.add('title');
    title.innerText = product.title.slice(0, 20);

    let price = document.createElement('p');
    price.classList.add('price-count');
    price.innerText = product.price + ' $';

    item.appendChild(id);
    item.appendChild(image);
    item.appendChild(title);
    item.appendChild(price);
    items.appendChild(item);
    let body = document.querySelector('body');
    if (body.classList.contains('dark')) {
        item.classList.add('dark');
    } else {
        item.classList.add('light');
    }
}