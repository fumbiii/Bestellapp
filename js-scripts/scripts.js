let basket = JSON.parse(localStorage.getItem("basket")) || [];
const dialog = document.getElementById("dialog");

function init() {
  renderDishes();
  basket.forEach((dish) => {
    addToBasketChange(dish.name, dish.count || 1);
  });
  handleLayoutChange(vieportWidth);
  updateBasket();
  updateBasketForPhone();
}

const sectionsByIdCategory = {
  "Burger & Sandwiches" : "burger-section",
  "Pizza" : "pizza-section",
  "Salad" : "salad-section"
};

function renderDishes() {
  dishes.forEach((dish) => {
    const sectionId = sectionsByIdCategory[dish.category];
    if (!sectionId) return;

    const section = document.getElementById(sectionId);
    if (!section) return;

    section.insertAdjacentHTML("beforeend", getDishTemplate(dish));
  })
}

function addToBasket(dishName, button) {
  const dish = dishes.find((d) => d.name === dishName);
  const existing = basket.find((item) => item.name === dishName);
  const basketElement = document.querySelector(".basket-active");

  if (existing) {
    existing.count = (existing.count || 1) + 1;
  } else {
    dish.count = 1;
    basket.push(dish);
  }

  if (basketElement) {
    basketElement.style.display = "flex";
  }

  const count = existing ? existing.count : dish.count;

  localStorage.setItem("basket", JSON.stringify(basket));
  updateBasket();
  updateBasketForPhone();
  addToBasketChange(dishName, count);
}

function updateBasket() {
  const basketContainer = document.getElementById("empty-basket");
  if (!basketContainer) return;

  basketContainer.innerHTML = updateBasketTemplate(basket);

  subtotalPriceCaltulation();
  totalPriceCalculation();
  payingButtonBasket();
  updatePhoneBasketCounter();
  checkBasketIfSomethingIsInIt();
  subtotalPriceCaltulationForPhone();
  totalPriceCalculationForPhone();
  payingButtonBasketForPhone();
}

function updateBasketForPhone() {
  const basketContainer = document.getElementById("empty-basket-for-phone");
  if (!basketContainer) return;
  basketContainer.innerHTML = updateBasketTemplateForPhone(basket);

  subtotalPriceCaltulationForPhone();
  totalPriceCalculationForPhone();
  payingButtonBasketForPhone();
  updatePhoneBasketCounter();
}

function addCounter(index) {
  if (basket[index]) {
    basket[index].count = (basket[index].count || 1) + 1;
    localStorage.setItem("basket", JSON.stringify(basket));
    updateBasket();
    updateBasketForPhone();
    addToBasketChange(basket[index].name, basket[index].count);
  }
  subtotalPriceCaltulation();
  totalPriceCalculation();
  payingButtonBasket();
}

function decreaseCounter(index) {
  if (basket[index]) {
    const dish = basket[index];
    dish.count = (dish.count || 1) - 1;

    if (dish.count <= 0) {
      basket.splice(index, 1);
      addToBasketChange(dish.name, 0);
    } else {
      addToBasketChange(dish.name, dish.count);
    }

    localStorage.setItem("basket", JSON.stringify(basket));
    updateBasket();
    updateBasketForPhone();
  }
  subtotalPriceCaltulation();
  totalPriceCalculation();
  payingButtonBasket();
}

function deleteDishFromBasket (index) {
  const dish = basket[index];
  if (!dish) return;


  basket.splice(index, 1);
  localStorage.setItem("basket", JSON.stringify(basket));
  addToBasketChange(dish.name, 0);
  updateBasket();
  updateBasketForPhone();
  }
  

function subtotalPriceCaltulation() {
  const subtotal = basket.reduce((total, dish) => {
    return total + dish.price * (dish.count || 1);
  }, 0);

  document.getElementById("subtotalPrice").innerHTML =
    `<p>${subtotal.toFixed(2)} €</p>`;
}

function subtotalPriceCaltulationForPhone() {
  const subtotalforphone = basket.reduce((total, dish) => {
    return total + dish.price * (dish.count || 1);
  }, 0);

  document.getElementById("subtotalPrice-for-phone").innerHTML =
    `<p>${subtotalforphone.toFixed(2)} €</p>`;
}

function totalPriceCalculation() {
  const subtotal = basket.reduce((total, dish) => {
    return total + dish.price * (dish.count || 1);
  }, 0);
  let baskettotal = subtotal + 4.99;
  if (basket.length <= 0) {
    baskettotal = 0;
  }
  document.getElementById("totalpricebasket").innerHTML =
    `<p>${baskettotal.toFixed(2)} €</p>`;
}

function totalPriceCalculationForPhone() {
  const subtotalforphone = basket.reduce((total, dish) => {
    return total + dish.price * (dish.count || 1);
  }, 0);
  let baskettotalforphone = subtotalforphone + 4.99;
  if (basket.length <= 0) {
    baskettotalforphone = 0;
  }
  document.getElementById("totalpricebasket-for-phone").innerHTML =
    `<p>${baskettotalforphone.toFixed(2)} €</p>`;
}

function payingButtonBasket() {
  const subtotal = basket.reduce((total, dish) => {
    return total + dish.price * (dish.count || 1);
  }, 0);
  let baskettotal = subtotal + 4.99;

  if (basket.length <= 0) {
    baskettotal = 0;
  }
  document.getElementById("payingButtonPrice").innerHTML =
    `<p>${baskettotal.toFixed(2)} €</p>`;
}

function payingButtonBasketForPhone() {
  const subtotalforphone = basket.reduce((total, dish) => {
    return total + dish.price * (dish.count || 1);
  }, 0);
  let baskettotalforphone = subtotalforphone + 4.99;

  if (basket.length <= 0) {
    baskettotalforphone = 0;
  }
  document.getElementById("payingButtonPrice-for-phone").innerHTML =
    `<p>${baskettotalforphone.toFixed(2)} €</p>`;
}

function orderConfirmedModal() {
  const modal = document.getElementById("orderconfirmed");
  const basketElement = document.querySelector(".basket-active");
  const basketElementPhone = document.querySelector(".basket-for-phone-view");
  modal.showModal();
  modal.classList.remove("fade-out");
  setTimeout(orderConfirmedModalClose, 2500);
  if (basketElement) {
    basketElement.style.display = "none";
  }
  if (basketElementPhone) {
    basketElementPhone.style.display = "none";
  }
  decreaseCounter();
}

function orderConfirmedModalClose() {
  const modal = document.getElementById("orderconfirmed");
  modal.classList.add("fade-out");
  setTimeout(() => modal.close(), 300);
  basket.splice(0);
  localStorage.setItem("basket", JSON.stringify(basket));
  updateBasket();
  updateBasketForPhone();
  updateAddedButtonOnDish();
  checkBasketIfSomethingIsInIt();
  checkBasketIfSomethingIsInItForPhone();
}

function addToBasketChange(dishName, count) {
  const buttons = document.querySelectorAll(".add-to-basket-btn");
  const button = Array.from(buttons).find(
    (btn) => btn.dataset.dishName === dishName,
  );

  if (button) {
    if (count > 0) {
      button.textContent = `Added ${count}`;
      button.classList.add("is-added");
    } else {
      button.textContent = "Add to Basket";
      button.classList.remove("is-added");
    }
  }
}

function updateAddedButtonOnDish() {
  document.querySelectorAll(".add-to-basket-btn").forEach((button) => {
    button.textContent = "Add to Basket";
    button.classList.remove("is-added");
  });
}

function basketCounterForPhoneView() {
  const basketcounter = document.getElementById("phone-Basket");
  basketcounter.innerHTML = `<button class="Basket-Button-for-Phone" id="phone-Basket" onclick="openPhoneBasketButton()"><img src="./assets/png/Shopping Cart for Phone.png" alt=""><p class="Basketcounter-for-phone-view"></p> </button>`;
}

const vieportWidth = window.matchMedia("(max-width: 1000px)");

function handleLayoutChange(vieportWidth) {
  if (vieportWidth.matches) {
    basketCounterForPhoneView();
    updatePhoneBasketCounter();
  }
}

vieportWidth.addEventListener("change", handleLayoutChange);

function updatePhoneBasketCounter() {
  const counter = document.querySelector(".Basketcounter-for-phone-view");
  if (!counter) return;

  const totalItems = basket.reduce((sum, dish) => sum + (dish.count || 1), 0);
  counter.textContent = totalItems > 0 ? totalItems : "";
}

function openPhoneBasketButton() {
  updateBasketForPhone();
  const basketElement = document.querySelector(".basket-for-phone-view");

  if (!basketElement) return;

  const currentDisplay = window.getComputedStyle(basketElement).display;

  if (currentDisplay === "flex") {
    basketElement.style.display = "none";
  } else {
    basketElement.style.display = "flex";
  }
}

function checkBasketIfSomethingIsInIt() {
  const basketContainer = document.getElementById("empty-basket");
  const controls = document.getElementById("basket-add-delete");

  if (!basketContainer || !controls) return;

  const hasDish = basketContainer.querySelector(".dish-in-basket") !== null;
  controls.style.display = hasDish ? "flex" : "none";
}

function checkBasketIfSomethingIsInItForPhone() {
  const basketContainerForPhone = document.getElementById(
    "empty-basket-for-phone",
  );
  const controlsForPhone = document.getElementById(
    "basket-add-delete-for-phone",
  );

  if (!basketContainerForPhone || !controlsForPhone) return;

  const hasDishForPhone =
    basketContainerForPhone.querySelector(".dish-in-basket-for-phone") !== null;
  controlsForPhone.style.display = hasDishForPhone ? "flex" : "none";
}
