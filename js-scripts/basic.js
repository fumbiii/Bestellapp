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
  "Vegan green sala with Tofu",
];

function renderFood(){
    let contentRef = document.getElementById("order-list");
    contentRef.innerHTML= "";

    for (let indexFood = 0; indexFood < food.length; i++) {
        contentRef.innerHTML = getFoodTemplate(indexFood);
    }
}

function addFoodTotTheBasket(){
    let element = document.getElementById("basket-add-delete")
    return `<div class="order-list">TEST</div>
        <div class="total-price">Subtotal <br> Delivery fee <br><div class="price-line"></div> Total</div>
        <button class="basket-button" onclick="closeBasket(), finishOrder()">Buy now ()</button>`
}
