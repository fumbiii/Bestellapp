function updateFoodInTheBasket() {
  document.getElementById("count").innerHTML = count;
}

function addFoodInTheBasket() {
  count++;
  updateFoodInTheBasket();
}
function decreaseFoodQuantityInBasket() {
  count--;
  updateFoodInTheBasket();
}
function resetFoodQuantityInBasket() {
  count = 1;
  updateFoodInTheBasket();
}

function updateFoodInTheBasketHeadline() {
  document.getElementById("food-counter").innerHTML = foodCount + "x";
}

function addFoodInTheBasketHeadline() {
  foodCount++;
  updateFoodInTheBasketHeadline();
}

function decreaseFoodQuantityInBasketHeadline() {
  foodCount--;
  updateFoodInTheBasketHeadline();
}

function resetFoodQuantityInBasketHeadline() {
  foodCount = 1;
  updateFoodInTheBasketHeadline();
}
