let product = document.getElementById("product");
// get Product
function getProduct() {
    product.innerHTML = ""
    let wish = JSON.parse(localStorage.getItem("wish")) || [];
    display(wish)
}
getProduct()
// cart products length
function cartLength() {
    let basketLength = document.getElementById("basketLength")
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    basketLength.innerHTML = cart.length
}
cartLength()
// Products remove
function rmvTowish(index) {
    let wish = JSON.parse(localStorage.getItem("wish")) || [];
    wish.splice(index, 1)
    localStorage.setItem("wish", JSON.stringify(wish));
    getProduct()
}

function display(wish) {
    wish.forEach((item, index) => {
        let div = document.createElement("div")
        div.className = "box";
        div.innerHTML = `
        <img src="${item.image}" alt="product photo">
        <p>${item.title}</p>
        <h6>${item.price} $</h6>
        <button onclick="rmvTowish(${index})"><i class="fa-solid mx-1 fa-trash"></i>Remove to cart</button>
        `
        product.appendChild(div)
    })
}