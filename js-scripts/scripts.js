let basket = JSON.parse(localStorage.getItem("basket")) || [];
const dialog = document.getElementById("dialog");

function init() {
  renderDishes();
}

function renderDishes() {
  dishes.forEach((dish) => {
    let sectionId;
    if (dish.category === "Burger & Sandwiches") {
      sectionId = "burger-section";
    } else if (dish.category === "Pizza") {
      sectionId = "pizza-section";
    } else if (dish.category === "Salad") {
      sectionId = "salad-section";
    } else {
      return;
    }

    const section = document.getElementById(sectionId);
    if (!section) return;

    const dishDiv = document.createElement("div");
    dishDiv.className = "dish";

    dishDiv.innerHTML = `
            <div class="dish-image">
            <img src="${dish.image}" alt="${dish.name}">
            </div>
            <div class="dish-name-and-ingredients">
            <h3 class="dish-name">${dish.name}</h3>
            <p class="dish-ingredients">${dish.indigredients}</p>
            </div>
            <div class="dish-price-and-add-button">
            <p class="dish-price">${dish.price} €</p>
            <button class="add-to-basket-btn" onclick="addToBasket('${dish.name}')">Add to Basket</button>
            </div>
        `;

    section.appendChild(dishDiv);
  });
}

function addToBasket(dishName) {
  const dish = dishes.find((d) => d.name === dishName);
  if (dish) {
    basket.push(dish);
    localStorage.setItem("basket", JSON.stringify(basket));
    updateBasket();
  }
  updateCounter();
  updateDecreaseButtonBasket();
}

function updateBasket() {
  const basketContainer = document.getElementById("empty-basket");

  // Display all items in the basket
  basketContainer.innerHTML = basket
    .map(
      (dish) => `
        <div class="dish-in-basket">
            <p class="headerDishInBasket"><span id="dishCounter-meals"></span> x ${dish.name}</p>
            <div class="basketButtonsAndPrice">
            <div class="add-delete-buttons" id="add-delete-buttons-basket">
                <button class="deleteDishFromBasket" onclick="decreaseCounter()" id="deleteDishFromBasket"><img src="./assets/png/delete.png"></button>
                <p id="dishCounter-basket"></p>
                <button class="addMoreDishes" id="addMoreDishesCounter" onclick="addCounter()">+</button>
                </div>
                <div>
                <p>${dish.price} €</p>
                </div>
                </div>
            
        </div>
    `,
    )
    .join("");
}

let dishCounter = 1;

function updateCounter() {
  document.getElementById("dishCounter-basket").innerHTML = dishCounter;
  document.getElementById("dishCounter-meals").innerHTML = dishCounter;
}

function addCounter() {
  dishCounter++;
  updateCounter();
  updateDecreaseButtonBasket();
}

function decreaseCounter() {
  dishCounter--;
  updateCounter();
  updateDecreaseButtonBasket();
}

function updateDecreaseButtonBasket() {
  if (dishCounter > 1) {
    document.getElementById("deleteDishFromBasket").style.display = "none";
    document.getElementById("add-delete-buttons-basket").innerHTML =
      `<button class="decreaseDishCounter" onclick="decreaseCounter ()">-</button>
                                                                        <p id="dishCounter-basket"></p>
                                                                        <button class="addMoreDishes" id="addMoreDishesCounter" onclick="addCounter()">+</button>`;
  } else if(dishCounter = 1) {
    document.getElementById("add-delete-buttons-basket").innerHTML = `<button class="deleteDishFromBasket" onclick="decreaseCounter()" id="deleteDishFromBasket"><img src="./assets/png/delete.png"></button>
                <p id="dishCounter-basket"></p>
                <button class="addMoreDishes" id="addMoreDishesCounter" onclick="addCounter()">+</button>`
    
  }
  updateCounter();
}
