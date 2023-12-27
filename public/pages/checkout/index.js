import {
  addedItems,
  updateCart,
  populateMapWithStorage,
} from "../meals/index.js";
populateMapWithStorage();
updateCart();
const addedItemsIds = new Array();
addedItems.forEach((value, key) => {
  addedItemsIds.push(key);
});
console.log(addedItems);
const meals = await axios({
  method: "post",
  url: "/get-meals-with-ids",
  data: { ids: addedItemsIds },
});

const mealListCard = document.getElementById("checkout-items-list");
addedItems.forEach((value, key) => {
  const mealItem = document.createElement("checkout-item");
  if (mealListCard) {
    mealItem.setAttribute(
      "meal-name",
      meals.data.find((meal) => meal.id === Number(key)).meal_name
    );
    mealItem.setAttribute(
      "meal-price",
      meals.data.find((meal) => meal.id === Number(key)).meal_price
    );
    mealItem.setAttribute(
      "meal-img",
      meals.data.find((meal) => meal.id === Number(key)).meal_img
    );
    mealItem.setAttribute(
      "meal-id",
      meals.data.find((meal) => meal.id === Number(key)).id
    );
    mealItem.setAttribute(
      "id",
      `meal-item-${meals.data.find((meal) => meal.id === Number(key)).id}`
    );
    mealListCard.appendChild(mealItem);
  }
});

export const orderedMeals = new Map();

export function populateOrderedMeals() {
  const orderedMealsStorage = JSON.parse(localStorage.getItem("orderedMeals"));
  orderedMealsStorage
    ? orderedMealsStorage.map((a) => {
        orderedMeals.set(a[0], a[1]);
      })
    : localStorage.setItem("orderedMeals", JSON.stringify([""]));
}
populateOrderedMeals();
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
