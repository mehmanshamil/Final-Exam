let product = document.getElementById("product");
// get Product
function getProduct(){
    product.innerHTML=""
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    display(cart)
}
getProduct()
// Cart products length
function cartLength(){
    let basketLength = document.getElementById("basketLength")
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    basketLength.innerHTML=cart.length
}
cartLength()
// Products remove
function rmvToCart(index){
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    let cartItem = cart[index]
    if(cartItem && cartItem.count > 1){
        cartItem.count-- 
    }else{
        cart.splice(index,1)
    }
    localStorage.setItem("cart",JSON.stringify(cart));
    cartLength()
    getProduct()
}

function display(cart){
    cart.forEach((item,index) => {
        let div = document.createElement("div")
        div.className = "box";
        div.innerHTML = `
        <img src="${item.image}" alt="product photo">
        <p>${item.title}</p>
        <h6>count : ${item.count} </h6>
        <h6>${item.price} $</h6>
        <button onclick="rmvToCart(${index})"><i class="fa-solid mx-1 fa-trash"></i>Remove to cart</button>
        `
        product.appendChild(div)
    })
}