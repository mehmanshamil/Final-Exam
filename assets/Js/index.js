let ul = document.querySelector("ul");
let btn = document.getElementById("burgerMenu")
let toggle = true;
btn.addEventListener("click", burgerMenu)
// Menu toggle
function burgerMenu() {
    if (toggle) {
        ul.classList.add("miniMenu")
    } else {
        ul.classList.remove("miniMenu")
    }
    toggle = !toggle
}

// get Product
let product = document.getElementById("product")
let loadMore = document.getElementById("loadMore")

let page = 1;
let limit = 4;
loadMore.addEventListener("click", getProduct)
async function getProduct() {
    await axios.get(`https://6589aaa6324d4171525951a6.mockapi.io/user/Product?page=${page}&limit=${limit}`)
        .then((res) => {
            data = res.data
            display(data)
            page++
        })
        .catch((err) => console.log(err))
}
getProduct()

// ADD to wish 
function addToWish(id) {
    let wish = JSON.parse(localStorage.getItem("wish")) || [];
    let wishItem = wish.find((item) => item.id == id)
    if (wishItem) {
        alert("Məhsul artıq wishlistdə mövcutdur !")
    } else {
        wish.push(data.find((item) => item.id == id))
        localStorage.setItem("wish", JSON.stringify(wish))
    }
    console.log(wish);
}
// ADD to cart
function addToCart(id) {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    let cartItem = cart.find((item) => item.id == id)
    if (cartItem) {
        cartItem.count = (cartItem.count || 1) + 1
    } else {
        let newProduct = { ...data.find((item) => item.id == id), count: 1 }
        cart.push(newProduct)
    }
    localStorage.setItem("cart", JSON.stringify(cart))
    console.log(cart);
    cartLength()
}

// display seen products
function display(data) {
    data.forEach((item) => {
        let div = document.createElement("div")
        div.className = "box";
        div.innerHTML = `
        <i  onclick="addToWish(${item.id})" class="fa-solid wish fa-heart"></i>
        <img src="${item.image}" alt="product photo">
        <p>${item.title}</p>
        <h6>${item.price} $</h6>
        <button onclick="addToCart(${item.id})"><i class="fa-solid mx-1 fa-cart-shopping"></i>Add to cart</button>
        `
        product.appendChild(div)
    })
}
// Cart products length
function cartLength() {
    let basketLength = document.getElementById("basketLength")
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    basketLength.innerHTML = cart.length
}
cartLength()