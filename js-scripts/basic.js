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
let count = 1;
let foodCount = 1;

function renderFood(foodIndex) {
  currentIndex = foodIndex;

  let contentRef = (document.getElementById("food-list").innerText =
    food[currentIndex]);

  for (let indexFood = 0; indexFood < food.length; indexFood++) {
    contentRef.innerHTML += getFoodTemplate(indexFood);
  }
}

function openTheBasket() {
  let element = document.getElementById("basket-add-delete");
  element.classList.remove("basket-active");
  element.innerHTML = `<div class="basket-active" id="basket-add-delete">
  <h4>Your Basket</h4>
  <div class="order-list" id="food-list"></div>
  <div class="total-price">Subtotal <br> Delivery fee <br><div class="price-line"></div> Total</div>
  <button class="basket-button" onclick="closeBasket()">Buy now ()</button>`;
}

function getFoodTemplate() {
  element = document.getElementById("food-list");
  basket.push(food[currentIndex]);
  element.innerHTML = `<div class="food-styling" id="styling-for-food">
  <div class="food-in-basket-headline">
  <p class="food-counter-headline" id="food-counter"> x
  </p>${food[currentIndex]} 
  </div>
  <div class="delete-and-add-button-div">
  <button class="delete-food-from-basket"onclick="decreaseFoodQuantityInBasket(),decreaseFoodQuantityInBasketHeadline()">
  <img src="./png/delete.png">
  </button>
  <p id="count"></p>
  <button class="add-more-food"onclick="addFoodInTheBasket(), addFoodInTheBasketHeadline()">
  +
  </button>
  </div>
  </div>`;
  let foodStyling = document.getElementById("styling-for-food");
  foodStyling.classList.add("food-styling");
  updateFoodInTheBasket();
  updateFoodInTheBasketHeadline();
}

function changeDeleteImgToDecreaseImg (){
  if ("count" > 0);
  
}

function renderFoodStyle() {
  element = basket[currentIndex];
  element.add();
}

function closeBasket() {
  let element = document.getElementById("basket-add-delete");
  element.innerHTML = " ";
  element.classList.remove("basket-active");
}

function deleteFoodFromBasket() {
  let element = document.getElementById("food-in-orderlist");
  element.innerHTML = " ";
  element.classList.remove("food-in-order-list");

  if ("add-delete-div" !== 1) {
    element.innerHTML = "";
  }
}
