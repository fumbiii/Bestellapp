let basket = JSON.parse(localStorage.getItem("basket")) || [];
const dialog = document.getElementById('dialog');

function init () {
  renderDishes();
}

function renderDishes(){
    dishes.forEach(dish => {
        let sectionId;
        if (dish.category === "Burger & Sandwiches"){
            sectionId = "burger-section";
        }
        else if (dish.category === "Pizza") {
            sectionId = "pizza-section";
        }
        else if (dish.category === "Salad") {
            sectionId = "salad-section";
        }
        else {
            return;
        }

        const section = document.getElementById(sectionId);
        if (!section) return;

        const dishDiv = document.createElement('div');
        dishDiv.className = 'dish';

        dishDiv.innerHTML =  `
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
    // Find the dish by name
    const dish = dishes.find(d => d.name === dishName);
    if (dish) {
        basket.push(dish);
        localStorage.setItem("basket", JSON.stringify(basket));
        // TODO: Update basket UI (e.g., refresh the basket display)
    }
}