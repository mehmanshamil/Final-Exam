let product = document.getElementById("product")
let productName = document.getElementById("productName")
let productPrice = document.getElementById("productPrice")
let productImage = document.getElementById("productImage")
let form = document.getElementById("form")

// Form & create new products
form.addEventListener("submit", formFunc)
async function formFunc(e) {
    e.preventDefault();
    let data = {
        title: productName.value,
        price: productPrice.value,
        image: productImage.value
    }
    await axios.post("https://6589aaa6324d4171525951a6.mockapi.io/user/Product", data)
        .then(() => {
            form.reset();
            getProduct();
            getTable()
        })
        .catch((err) => console.log(err))
}
// SORT
let maxPrice = document.getElementById("maxPrice")
let minPrice = document.getElementById("minPrice")
let abc = document.getElementById("abc")
let cba = document.getElementById("cba")
let defalut = document.getElementById("default")

maxPrice.addEventListener("click", maxFunc)
minPrice.addEventListener("click", minFunc)
abc.addEventListener("click", abcFunc)
cba.addEventListener("click", cbaFunc)
defalut.addEventListener("click", getProduct)

async function maxFunc() {
    await axios.get("https://6589aaa6324d4171525951a6.mockapi.io/user/Product")
        .then((res) => {
            db = res.data;
            let data = db.sort((a, b) => b.price - a.price)
            display(data)
        })
        .catch((err) => console.log(err))
}

async function minFunc() {
    await axios.get("https://6589aaa6324d4171525951a6.mockapi.io/user/Product")
        .then((res) => {
            db = res.data;
            let data = db.sort((a, b) => a.price - b.price)
            display(data)
        })
        .catch((err) => console.log(err))
}

async function abcFunc() {
    await axios.get("https://6589aaa6324d4171525951a6.mockapi.io/user/Product")
        .then((res) => {
            db = res.data;
            let data = db.sort((a, b) => a.title.localeCompare(b.title))
            display(data)
        })
        .catch((err) => console.log(err))
}
async function cbaFunc() {
    await axios.get("https://6589aaa6324d4171525951a6.mockapi.io/user/Product")
        .then((res) => {
            db = res.data;
            let data = db.sort((a, b) => b.title.localeCompare(a.title))
            display(data)
        })
        .catch((err) => console.log(err))
}

// SEARCH product function
let srcFunc = document.getElementById("srcFunc")
let inp = document.getElementById("inp")
srcFunc.addEventListener("submit", searchFunc)

async function searchFunc(e) {
    e.preventDefault()
    await axios.get(`https://6589aaa6324d4171525951a6.mockapi.io/user/Product`)
        .then((res) => {
            db = res.data
            let data = db.filter((item) => item.title.toLowerCase().includes(inp.value.toLowerCase()));
            display(data)
        })
        .catch((err) => console.log(err))
}

// Get Table
let productList = document.getElementById("productList")

async function getTable() {
    productList.innerHTML = ""
    await axios.get("https://6589aaa6324d4171525951a6.mockapi.io/user/Product")
        .then((res) => {
            db = res.data
            db.forEach((item) => {
                let tr = document.createElement("tr")
                tr.innerHTML = `
            <td>${item.id}</td>
            <td>${item.title}</td>
            <td>${item.price} $</td>
            <td><div class="img">${item.image}</div></td>
            <td><button onclick="rmvToCart(${item.id})"><i class="fa-solid mx-1 fa-trash"></i>Remove</button></td>
            `
                productList.appendChild(tr)
            })
        })
        .catch((err) => console.log(err))
}
getTable()

// Get Products

async function getProduct() {
    product.innerHTML = ''
    await axios.get(`https://6589aaa6324d4171525951a6.mockapi.io/user/Product`)
        .then((res) => {
            data = res.data
            display(data)
        })
        .catch((err) => console.log(err))
}
getProduct()
// Remove to cart
async function rmvToCart(id) {
    try {
        await axios.delete(`https://6589aaa6324d4171525951a6.mockapi.io/user/Product/${id}`)
            .then(() => {
                getProduct()
                getTable()
            })
    } catch (error) {
        console.log(error);
    }
}

// display seen products
function display(data) {
    product.innerHTML = ""
    data.forEach((item) => {
        let div = document.createElement("div")
        div.className = "box";
        div.innerHTML = `
        <img src="${item.image}" alt="product photo">
        <p>${item.title}</p>
        <h6>${item.price} $</h6>
        <button onclick="rmvToCart(${item.id})"><i class="fa-solid mx-1 fa-trash"></i>Remove to cart</button>
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