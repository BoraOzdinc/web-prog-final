import { mealList, addedItems, updateCart } from "../meals/index.js";
updateCart();

const mealListCard = document.getElementById("checkout-items-list");
addedItems.forEach((value, key) => {
  const mealItem = document.createElement("checkout-item");
  if (mealListCard) {
    mealItem.setAttribute("meal-name", mealList[key].meal_name);
    mealItem.setAttribute("meal-price", mealList[key].meal_price);
    mealItem.setAttribute("meal-img", mealList[key].meal_img);
    mealItem.setAttribute("meal-id", mealList[key].id);
    mealItem.setAttribute("id", `meal-item-${mealList[key].id}`);
    mealListCard.appendChild(mealItem);
  }
});

export const orderedMeals = new Map();

populateOrderedMeals();

export function populateOrderedMeals() {
  const orderedMealsStorage = JSON.parse(localStorage.getItem("orderedMeals"));
  orderedMealsStorage.length === 0
    ? localStorage.setItem("orderedMeals", JSON.stringify([""]))
    : orderedMealsStorage.map((a) => {
        orderedMeals.set(a[0], a[1]);
      });
}

const orderButton = document.getElementById("checkout-order-btn");
if (orderButton) {
  console.log(addedItems);
  orderButton.addEventListener("click", () => {
    addedItems.forEach((value, key) => {
      if (orderedMeals.has(key)) {
        orderedMeals.set(key, orderedMeals.get(key) + value);
      } else {
        orderedMeals.set(key, value);
      }
    });
    localStorage.setItem(
      "orderedMeals",
      JSON.stringify(orderedMeals, (key, value) =>
        value instanceof Map ? [...value] : value
      )
    );
    localStorage.setItem("addedItems", JSON.stringify([]));
    window.location.replace("/pages/orders");
  });
}
