function getDishTemplate(dish) {
  return `
    <div class="dish">
      <div class="dish-image">
        <img src="${dish.image}" alt="${dish.name}">
      </div>
      <div class="dish-name-and-ingredients">
        <h3 class="dish-name">${dish.name}</h3>
        <p class="dish-ingredients">${dish.indigredients}</p>
      </div>
      <div class="dish-price-and-add-button">
        <p class="dish-price">${dish.price} €</p>
        <button
          class="add-to-basket-btn"
          data-dish-name="${dish.name}"
          onclick="addToBasket('${dish.name}', this)"
        >Add to Basket</button>
      </div>
    </div>
  `;
}

function updateBasketTemplate(dish, index) {
  return `
      <div class="dish-in-basket">
        <div class="dish-in-basket-active">
          <div class="dish-name-and-count">
            <p class="headerDishInBasket ">
            <span id="dishCounter-meals-${index}">${dish.count || 1}</span> x <p>${dish.name}</p>
            </p>
          </div>
          <div class="delete-dish-button-second">
            <button class="deleteDishFromBasketSecond" onclick="deleteDishFromBasket(${index})"><img src="./assets/png/delete.png" alt="Trash Bin"></button>
          </div>
          </div>
          <div class="basketButtonsAndPrice ">
          <div class="add-delete-buttons id="add-delete-buttons-basket-${index}">
            <button class="deleteDishFromBasket" onclick="deleteDishFromBasket(${index})">
            <img src="./assets/png/delete.png" alt="Delte Dish from Basket">
            </button>
            <button class ="decreaseDishFromBasket ${(dish.count || 1) >= 2 ? "is-visible" : ""}" onclick="decreaseCounter(${index})" id="decreaseDishFromBasket"> - </button> 
            <p id="dishCounter-basket-${index}">${dish.count || 1}</p>
            <button class="addMoreDishes" onclick="addCounter(${index})">+</button>
          </div>
          <div>
            <p id="dishPriceInBasket">${(dish.price * (dish.count || 1)).toFixed(2)} €</p>
          </div>
        </div>
      </div>
    `;
}

function updateBasketTemplateForPhone(dish, index) {
  return `
      <div class="dish-in-basket-for-phone">
        <div class="dish-in-basket-active-for-phone">
          <div class="dish-name-and-count-for-phone">
            <p class="headerDishInBasket-for-phone">
            <span id="dishCounter-meals-for-phone-${index}">${dish.count || 1}</span> x <p>${dish.name}</p>
            </p>
          </div>
          <div class="delete-dish-button-second-for-phone">
            <button class="deleteDishFromBasket-for-phoneSecond" onclick="deleteDishFromBasket(${index})"><img src="./assets/png/delete.png" alt="Trash Bin"></button>
          </div>
          </div>
          <div class="basketButtonsAndPrice-for-phone">
          <div class="add-delete-buttons-for-phone" id="add-delete-buttons-basket-for-phone-${index}">
            <button class="deleteDishFromBasket-for-phone" onclick="deleteDishFromBasket(${index})">
             <img src="./assets/png/delete.png" alt="Delte Dish from Basket">
             </button>
            <button class="decreaseDishFromBasket-for-phone ${(dish.count || 1) >= 2 ? "is-visible" : ""}" onclick="decreaseCounter(${index})" id="decreaseDishFromBasketForPhone"> - </button>
            <p id="dishCounter-basket-for-phone-${index}">${dish.count || 1}</p>
            <button class="addMoreDishes-for-phone" onclick="addCounter(${index})">+</button>
          </div>
          <div>
            <p id="dishPriceInBasket-for-phone">${(dish.price * (dish.count || 1)).toFixed(2)} €</p>
          </div>
        </div>
      </div>
    `;
}
