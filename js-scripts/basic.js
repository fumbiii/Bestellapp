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
  addFoodToTheBasket()
}

function addFoodToTheBasket(){
  element.innerHTML = `<div class="food-styling" id="styling-for-food">
  <div class="food-in-basket-headline">
  <p class="food-counter-headline" id="food-counter"> x
  </p>${food[currentIndex]} 
  </div>
  <div id="delete-and-add-button-div-id" class="delete-and-add-button-div">
  <button id="delete-food-from-basket-button" class="delete-food-from-basket" style="display: flex;" onclick="decreaseFoodQuantityInBasket(),decreaseFoodQuantityInBasketHeadline(), changeDeleteImgToDecreaseImg()">
  <img src="./png/delete.png">
  </button>
  
  <button id="decrease-basket-quantity-basket" class="decrease-basket-quantity" style="display: none;" onclick="removeTheMinusButton(), decreaseFoodQuantityInBasket(), decreaseFoodQuantityInBasketHeadline(), updateDeleteButton()"> - </button>
  
  <p id="count"></p>
  <button class="add-more-food" onclick="addFoodInTheBasket(), addFoodInTheBasketHeadline(), changeDeleteButtonToMinusButton()">
  +
  </button>
  </div>
  </div>`;
   let foodStyling = document.getElementById("styling-for-food");
  foodStyling.classList.add("food-styling");
  updateFoodInTheBasket();
  updateFoodInTheBasketHeadline();
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

function updateDeleteButton() {
  const deleteButton = document.getElementById("delete-food-from-basket-button");
  const decreaseButton = document.getElementById("decrease-basket-quantity-basket");

  if (count >= 2) {
    // Show minus button, hide delete button
    if (deleteButton) deleteButton.style.display = "none";
    if (decreaseButton) decreaseButton.style.display = "inline-block";
  } else if (count === 1) {
    // Show delete button, hide minus button
    if (deleteButton) deleteButton.style.display = "flex";
    if (decreaseButton) decreaseButton.style.display = "none";
    
  }
  updateFoodInTheBasket()
}

function changeDeleteImgToDecreaseImg() {
  if (count === 0) {
    element = document.getElementById("styling-for-food");
    element.remove();
  } else {
    decreaseFoodQuantityInBasket();
    updateDeleteButton();
  }
}

function changeDeleteImgToDecreaseImgHeadline() {
  if (foodCount === 0) {
    element = document.getElementById("styling-for-food");
    element.remove();
  } else {
    decreaseFoodQuantityInBasketHeadline();
    updateDeleteButton();
    }
}

function changeDeleteButtonToMinusButton(){
  updateDeleteButton();
}

function removeTheMinusButton() {
  updateDeleteButton();
}