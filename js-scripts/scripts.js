let basket = JSON.parse(localStorage.getItem("basket")) || [];
const dialog = document.getElementById('dialog');

function init () {
  renderDishes(dish => {
    let sectionId;
    if (dish.category === "Burger & Sandwiches"){
        sectionId = "burger-section";
    } else if (dish.category === "Pizza"){
        sectionId = "pizza-section"
    } else if (dish.category === "Salad"){
        sectionId = "salad-section"
    } else {
        return;
    }
    const section = document.getElementById(sectionId)
    if(!section) return;

    const dishDiv = document.createElement('div');
    dishDiv.className = 'dish';

    dishDiv.innerHTML = `<img src="${dish.image}" alt="${dish.name}" class="dish-image">
    <h3 class="dish-name">${dish.name}</h3>
    <p class="dish-ingredients">${dish.ingredients}</p>
    <p class="dish-price">${dish.price}</p>
    <button class="add-to-basket-btn" onclick="addToBasket('${dish.name})">Add to Basket </button>;
    `

    section.appendChild(dishDiv);
  })
}