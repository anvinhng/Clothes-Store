
//------------------------------- NavBar Function--------------------------------
//Pop Up Form Function
let flag = false;
function openCloseForm() {
    if (flag==false)
    {
        document.getElementById("user").style.display = "block";
        flag=true;
    }
    else {
        document.getElementById("user").style.display = "none";
        flag=false;
    }
}

let flagRegister = false;
function openRegisterForm() {
    if (flagRegister==false)
    {
        document.getElementById("user").style.display = "none";
        document.getElementById("register").style.display = "block";
        flagRegister=true;
        flag=false;
    }
    else {
        document.getElementById("register").style.display = "none";
        flagRegister=false;
    }
}
function backToLogIn() {
    document.getElementById("user").style.display = "block";
    document.getElementById("register").style.display = "none";
}

//----------------------------Shopping-Cart Functions----------------------------

function changeVNDtoNumber(input){
    return (input.innerHTML.replace(' VND',"")).replaceAll(",","");
}

//Add Item from suggested list

var addToCartButton = document.getElementsByClassName("btn-add-item")
for (let i = 0; i < addToCartButton.length; i++) {
    var button = addToCartButton[i]
    button.addEventListener('click', addToCartClick)
}

function addToCartClick(event){
    var button = event.target;
    var product = button.parentNode;
    var title = product.getElementsByClassName("product-name")[0].innerHTML;
    var price = product.getElementsByClassName("product-price")[0].innerHTML;
    var image = product.getElementsByClassName("product-image")[0].src;
    
    console.log(title, price, image);
    addItemtoCart(title, price, image)
}

function addItemtoCart(title, price, image){
    var item = document.createElement('section')
    item.classList.add("item");
    var productsInCart = document.getElementsByClassName("product-in-cart")[0];
    var cartItemNames = productsInCart.getElementsByClassName('product-name');
    for (var i = 0; i < cartItemNames.length; i++){
        if (cartItemNames[i].innerHTML == title){
            alert("This item is already added to the cart.")
            return;
        }
    }
    var itemContents = `
        <img class="cart-item-img" src="${image}">
        <div class="product-cart-center">
            <h2 class="product-name">${title}</h2>
            <p id="hoodiePrice" class="product-price">${price}</p>
            <div class="form">
                <div>
                    <label for="size">Size:</label>&nbsp;
                    <form>
                        <input value="M" list="size" name="size" style="width: 80px;">
                        <datalist id="size">
                            <option value="S">
                            <option value="M">
                            <option value="L">
                            <option value="XL">
                        </datalist>
                    </form>
                </div>

                <div id="quantityForm">
                    <label for="quantity">Quantity:</label><br>&nbsp;
                    <input value="1" type="number" class="quantity" name="quantity" min="1" max="10">
                </div>
            </div>
        </div>

        <div class="product-cart-right">
            <p><span class="item-total">0</span></p>
            <p><span class="status">Available</span></p>
            <div>
                <button class="addFavorite"><img src="images/heart.png"></button>
                <button type="button" class="btn-delete"><img src="images/trash.png"></button>
            </div>
        </div>`;
    item.innerHTML = itemContents;
    productsInCart.append(item);
    document.getElementById('emptyCart').style.display = "none";
    updateTotalAmount();
    updateItemTotal();

    //Update delete function to new items //Cần chỉnh chút cho đỡ lặp
    var removeItemButton = document.getElementsByClassName("btn-delete")
    for (let i = 0; i < removeItemButton.length; i++) {
        var button = removeItemButton[i];
        button.addEventListener('click', function(event) {
            var buttonClicked = event.target
            buttonClicked.parentNode.parentNode.parentNode.parentNode.remove()
            updateTotalAmount();
        })
    }

    //Update quantity change function to new items
    let quantityInputs = document.getElementsByClassName("quantity");
    for (let i = 0; i < quantityInputs.length; i++){
        let input = quantityInputs[i];
        input.addEventListener('change', quantityChanged);
    }
}

//Clear Item
var removeItemButton = document.getElementsByClassName("btn-delete")
for (let i = 0; i < removeItemButton.length; i++) {
    var button = removeItemButton[i];
    button.addEventListener('click', function(event) {
        var buttonClicked = event.target
        buttonClicked.parentNode.parentNode.parentNode.parentNode.remove()
        updateTotalAmount();
    })
}

//Clear All
function clearAll(){
    if (confirm("Do you want to clear all items?") == true) {
        var elements = document.getElementsByClassName("item");
        while(elements.length > 0){
        elements[0].parentNode.removeChild(elements[0]);
        }
        document.getElementById("clearAll").style.display = "none";
        document.getElementById("emptyCart").style.display = "block";
        updateTotalAmount();
    }
}

//Return Item Total

function updateItemTotal(){
    var items = document.getElementsByClassName("item");
    for (let i = 0; i < items.length; i++) {
        let item = items[i]
        let priceElement = item.getElementsByClassName('product-price')[0]
        let quantityElement = item.getElementsByClassName("quantity")[0]
        let price = parseFloat(changeVNDtoNumber(priceElement))
        let quantity = quantityElement.value 
        let itemTotal = item.getElementsByClassName("item-total")[0]
        itemTotal = (price * quantity);
        document.getElementsByClassName("item-total")[i].innerHTML = itemTotal.toLocaleString('en', {useGrouping:true}) + " VND";
    }
}

updateItemTotal();

// Return Total and Total Amount after Discount


function updateTotal(){
    var items = document.getElementsByClassName("item")
    var total = 0;
    for (let i = 0; i < items.length; i++) {
        let item = items[i]
        let priceElement = item.getElementsByClassName('product-price')[0]
        let quantityElement = item.getElementsByClassName("quantity")[0]
        let price = parseFloat(changeVNDtoNumber(priceElement))
        let quantity = quantityElement.value 
        total = total + (price * quantity)
    }
    document.getElementById("total").innerHTML = total.toLocaleString('en', {useGrouping:true}) + " VND";
    return total;
}



function updateTotalAmount(){
    updateTotal();
    document.getElementById("discount").innerHTML = "0 VND";
    let discount = parseFloat(changeVNDtoNumber(document.getElementById("discount")));
    console.log(discount);
    total = parseFloat(changeVNDtoNumber(document.getElementById("total")));
    console.log(total);
    totalAmount = total - discount;
    console.log(totalAmount);
    document.getElementById("totalAmount").innerHTML = totalAmount.toLocaleString('en', {useGrouping:true}) + " VND";
}

updateTotalAmount();

//Return Total of Quantity Change

let quantityInputs = document.getElementsByClassName("quantity");
for (let i = 0; i < quantityInputs.length; i++){
    let input = quantityInputs[i];
    input.addEventListener('change', quantityChanged);
}

function quantityChanged(event){
    var input = event.target;
    updateItemTotal();
    updateTotalAmount();
}

// Place Order
function placeOrder() {
    console.log(document.getElementById("emptyCart").style.display)
    if (document.getElementById("emptyCart").style.display == "block")
    {
        alert("Please add items to cart to purchase.")
    }
    else {
        alert("Your order is successfully made.")
        var elements = document.getElementsByClassName("item");
        while(elements.length > 0){
        elements[0].parentNode.removeChild(elements[0]);
        }
        document.getElementById("clearAll").style.display = "none";
        document.getElementById("emptyCart").style.display = "block";
        updateTotalAmount();
    }
}