const basket = [];
const food = [
  "Veggie Mushroom black burger",
  "All meat Burger",
  "Beef red Burger",
  "Big chicken Burger",
  "Pizza Marherita",
  "Pizza Choriza",
  "Pizza Funghi",
  "Pizza Quattro Formaggi with Chicken",
  "Warm beef arugula Sala",
  "Mini green Salad",
  "Green Salad with sea food",
  "Vegan green salad with Tofu",
];

let currentIndex = 0;

function renderFood(foodIndex){

    currentIndex = foodIndex;

    let contentRef = document.getElementById("food-list").innerText = food[currentIndex];

    for (let indexFood = 0; indexFood < food.length; indexFood++) {
        contentRef.innerHTML += getFoodTemplate(indexFood);
    }
}


function openTheBasket(){
    let element = document.getElementById("basket-add-delete");
    element.classList.remove("basket-active");
    element.innerHTML =`<div class="basket-active" id="basket-add-delete"><h4>Your Basket</h4><div class="order-list" id="food-list"></div>
        <div class="total-price">Subtotal <br> Delivery fee <br><div class="price-line"></div> Total</div>
        <button class="basket-button" onclick="closeBasket()">Buy now ()</button>`

    
}



function getFoodTemplate(indexFood){
    element = document.getElementById("food-list");
    element.innerHTML =  `<div> <p>${food[indexFood]}</p> <button></button></div> `;
    //was wird hergenommen?
    //von wo wird es hergenommen?
    //wohin wird es gesteckt?
    //was soll es anziegen?
    // in welchem format soll es angezeigt werden?
    //wie viel soll es anzeigen?
    //
}

function closeBasket (){
    let element = document.getElementById("basket-add-delete");
    element.innerHTML = " ";
    element.classList.remove("basket-active");
}