//add event listener to all buttons
var buttons = document.getElementsByClassName("addButton");
for (var i = 0; i < buttons.length; i++) {
    buttons[i].addEventListener("click", function(event) {
        var button = event.target;
        var item = button.parentNode.parentNode;
        var title = item.getElementsByTagName("h5")[0].innerHTML;
        var price = item.getElementsByTagName("span")[0].innerHTML;
        var img = item.parentNode.getElementsByTagName("img")[0].src;
        
        if (checkCart(title)) {
            alert("This item is already in your cart!");
        }
        else {
        addToCart(title, price, img);
        }
    });
}

function addToCart(name, value, src) {
    // var cart = document.getElementById("cartDiv");
    var cartList = document.getElementById("items-list");
    var item = document.createElement("li");
    var dataDiv = document.createElement("div");
    var insideDiv = document.createElement("div");
    var quantityPrice = document.createElement("div");

    item.style.display = "flex";
    item.style.flexDirection = "row";
    item.style.width = "80%";
    item.style.marginBottom = "2%";

    insideDiv.style.display = "flex";
    insideDiv.style.flexDirection = "column";

    quantityPrice.style.display = "flex";
    quantityPrice.style.flexDirection = "row";

    dataDiv.style.display = "flex";
    dataDiv.style.flexDirection = "row";

    item.className = "item";
    
    var img = document.createElement("img");
    img.src = src;
    img.className = "cartItemImg";

    var title = document.createElement("h5");
    title.innerHTML = name;

    var quantity = document.createElement("input");
    quantity.type = "number";
    quantity.min = "0";
    quantity.step = "1";
    quantity.value = "1";
    quantity.style.width = "75px";
    quantity.style.textAlign = "right";
    quantity.className = "quantity";
    kg = document.createElement("span");
    kg.innerHTML = "piece";

    var price = document.createElement("span");
    price.className = "cartPrice";
    price.innerHTML = value;

    var remove = document.createElement("button");
    remove.innerHTML = '<i class="fa-solid fa-trash"></i>';
    remove.className = "removeButton";
    remove.style.alignSelf = "center";
    remove.onclick = function(event){
        var target = event.target;
        var parent = target.parentNode.parentNode.parentNode;
        parent.remove();
        totalPrice();
    }
    item.appendChild(img);
    insideDiv.appendChild(title);
    quantityPrice.appendChild(quantity);
    quantityPrice.appendChild(kg);
    insideDiv.appendChild(quantityPrice);
    insideDiv.appendChild(price);
    dataDiv.appendChild(insideDiv);
    dataDiv.appendChild(remove);
    item.appendChild(dataDiv);
    cartList.appendChild(item);
    
    item.style.flexDirection = "row";
    updatePrice(title.innerHTML);//update price based on quantity
    totalPrice();//update total price
}

// change price based on quantity
function updatePrice(title){
    var quantities = document.getElementsByClassName("quantity");
    for(var i = 0; i < quantities.length; i++){
        quantities[i].addEventListener("change", function(event){
            var target = event.target;
            var parent = target.parentNode.parentNode.parentNode;
            var quantity = this.value;
            var price = parent.getElementsByClassName("cartPrice")[0];
            var priceName = title + "Price";
            var priceValue = document.getElementById(priceName).innerHTML;
            price.innerHTML = quantity * priceValue;
            if(quantity == 0){
                parent.parentNode.remove();
            }
            if(quantity >1){
                parent.getElementsByClassName("kg")[0].innerHTML = "pieces";
            }
            else{
                parent.getElementsByClassName("kg")[0].innerHTML = "piece";
            }
            totalPrice();
        });
    }
    
}



//button for opening and closing cart
function ShowCart() {
    var cart = document.getElementById("cartDiv");
    if(cart.style.display == "flex"){
    cart.style.display = "none";
    }
    else {
        cart.style.display = "flex";
    }
}

//check if this item is already in cart
function checkCart(name) {
    var cart = document.getElementById("cartDiv");
    var items = cart.getElementsByClassName("item");
    for (var i = 0; i < items.length; i++) {
        if (items[i].getElementsByTagName("h5")[0].innerHTML == name) {
            return true;
        }
    }
    return false;
}

function totalPrice() {
    var cart = document.getElementById("cartDiv");
    var items = cart.getElementsByClassName("item");
    var total = 0;
    for (var i = 0; i < items.length; i++) {
        var price = items[i].getElementsByClassName("cartPrice")[0].innerHTML;
        total += parseFloat(price);
    }
    document.getElementById("totalPrice").innerHTML = total;
}

function clearAll() {
    //delete all items in list
    // var cart = document.getElementById("cartDiv");
    // var items = cart.getElementsByClassName("item");
    // for (var i = 0; i < items.length; i++) {
    //     items[i].remove();
    // }
    document.getElementById("items-list").innerHTML = "";
    totalPrice();
}


//toggle dark mode
function isDark(){
    var body = document.getElementsByTagName("body")[0];
    var nav = document.getElementsByTagName("nav")[0];
    if(body.className == "dark"){
        body.className = "";
        nav.className = "navbar navbar-expand-lg navbar-light bg-light sticky-top";
    }
    else{
        body.className = "dark";
        nav.className = "navbar navbar-expand-lg navbar-dark bg-dark sticky-top";

    }
}


function Checkout() {
    
    total = document.getElementById("totalPrice").innerHTML;
    alert("You have paid : " + total + "£");
    clearAll();
}





window.onscroll = () => {
    var current = "";
  
    sections.forEach((section) => {
      const sectionTop = section.offsetTop;
      if (pageYOffset >= sectionTop ) {
        current = section.getAttribute("id"); }
    });
  
    navLi.forEach((li) => {
      li.classList.remove("active");
      if (li.href.includes(current)) {
        li.classList.add("active");
      }
    });
  };
    




console.log('🍋🍋');