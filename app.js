let container =document.querySelector(".container");

async function fetchProducts(){
    let response =await fetch("https://fakestoreapi.com/products");
    const products =await response.json();

    return products;
};

async function init(products){
    checkToken();

    products =await fetchProducts();
    render(products);
};

function checkToken(){
    const token = localStorage.getItem("token");
    

    if(!token){
        window.location.href ="http://127.0.0.1:5500/login.html"
    }
}

function render(products){
    products.forEach(function(product){
        const li =document.createElement("li");
        let a =document.createElement("a");
        a.href =`http://127.0.0.1:5500/product.html?id=${product.id}`;

        const img =document.createElement("img");
        img.src= product.image;
        img.classList.add("images")
        li.appendChild(img);

        const title=document.createElement("p");
        title.textContent =product.title;
        title.classList.add("title");
        a.append(title);
        li.appendChild(a);

        const price =document.createElement("strong");
        price.textContent =product.price;
        price.classList.add("price")
        li.appendChild(price);

        const stars ="<span>⭐️</span>".repeat(Math.round(product.rating.rate));
        li.insertAdjacentHTML("beforeend",stars);

        const ratingCount =document.createElement("div");
        ratingCount.textContent =`(${product.rating.count})`;
        li.appendChild(ratingCount);

        const button =document.createElement("button");
        button.textContent ="Add to cart";
        li.appendChild(button);
        button.style.width ="186px";
        button.style.height ="68px";
        button.style.borderRadius = "30px";
        button.style.background ="transparent";
        button.style.fontWeight ="700"

        li.classList.add("li");

        container.appendChild(li);
    });
};

init();