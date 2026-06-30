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
  const existing = basket.find((item) => item.name === dishName);

  if (existing) {
    existing.count++;
  } else {
    dish.count = 1;
    basket.push(dish);
  }

  localStorage.setItem("basket", JSON.stringify(basket));
  updateBasket();
}

function updateBasket() {
  const basketContainer = document.getElementById("empty-basket");

  basketContainer.innerHTML = basket
    .map(
      (dish, index) => `
      <div class="dish-in-basket">
        <p class="headerDishInBasket">
          <span id="dishCounter-meals-${index}">${dish.count || 1}</span> x ${dish.name}
        </p>
        <div class="basketButtonsAndPrice">
          <div class="add-delete-buttons" id="add-delete-buttons-basket-${index}">
            <button class="deleteDishFromBasket" onclick="decreaseCounter(${index})" 
              id="deleteDishFromBasket-${index}">
              ${(dish.count || 1) >= 2 ? '-' : '<img src="./assets/png/delete.png">'}
            </button>
            <p id="dishCounter-basket-${index}">${dish.count || 1}</p>
            <button class="addMoreDishes" onclick="addCounter(${index})">+</button>
          </div>
          <div>
            <p id="dishPriceInBasket">${(dish.price * (dish.count || 1)).toFixed(2)} €</p>
          </div>
        </div>
      </div>
    `,

  
    )
    .join("");

  basket.forEach((dish, index) => {
    const counterElement = document.getElementById(
      `dishCounter-basket-${index}`,
    );
    if (counterElement) {
      counterElement.innerHTML = dish.count || 1;
    }
  });
  subtotalPriceCaltulation();
  totalPriceCalculation();
  payingButtonBasket();
}

function addCounter(index) {
  if (basket[index]) {
    basket[index].count = (basket[index].count || 1) + 1;
    localStorage.setItem("basket", JSON.stringify(basket));
    updateBasket();
  }
  subtotalPriceCaltulation();
  totalPriceCalculation();
  payingButtonBasket();
}

function decreaseCounter(index) {
  if (basket[index]) {
    basket[index].count = (basket[index].count || 1) - 1;

    if (basket[index].count <= 0) {
      basket.splice(index, 1);
    }

    localStorage.setItem("basket", JSON.stringify(basket));
    updateBasket();
  }
  subtotalPriceCaltulation();
  totalPriceCalculation();
  payingButtonBasket();
}

function subtotalPriceCaltulation() {
  const subtotal = basket.reduce((total, dish) => {
    return total + (dish.price * (dish.count || 1));
  }, 0);
  
  document.getElementById("subtotalPrice").innerHTML = `<p>${subtotal.toFixed(2)} €</p>`;
}

function totalPriceCalculation() {
  const subtotal = basket.reduce((total, dish) => {
    return total + (dish.price * (dish.count || 1));
  }, 0);
  let baskettotal = subtotal + 4.99;
  if (basket.length <= 0) {
    baskettotal = 0;
  }
  document.getElementById("totalpricebasket").innerHTML = `<p>${baskettotal.toFixed(2)} €</p>`;
}

function payingButtonBasket(){
   const subtotal = basket.reduce((total, dish) => {
    return total + (dish.price * (dish.count || 1));
  }, 0);
  let baskettotal = subtotal + 4.99;

  if (basket.length <= 0) {
    baskettotal = 0;
  }
  document.getElementById("payingButtonPrice").innerHTML = `<p>${baskettotal.toFixed(2)} €</p>`;
}

function orderConfirmedModal() {
  const modal = document.getElementById("orderconfirmed");
  modal.showModal();
  modal.classList.remove("fade-out");
  setTimeout(orderConfirmedModalClose, 2500);
}

function orderConfirmedModalClose() {
  const modal = document.getElementById("orderconfirmed");
  modal.classList.add("fade-out");
  setTimeout(() => modal.close(), 300);
  basket.splice(0);
  localStorage.setItem("basket", JSON.stringify(basket));
  updateBasket();
}