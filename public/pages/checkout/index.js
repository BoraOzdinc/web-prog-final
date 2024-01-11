import { addedItems } from "../meals/index.js";

const addedItemsIds = new Array();
addedItems.forEach((value, key) => {
  addedItemsIds.push(key);
});
const mealListCard = document.getElementById("checkout-items-list");

const loadingText = document.createElement("p");
loadingText.innerText = "Loading...";
mealListCard.appendChild(loadingText);
const meals = await axios({
  method: "post",
  url: "/get-meals-with-ids",
  data: { ids: addedItemsIds },
});
mealListCard.removeChild(loadingText);

if (addedItems.size === 0) {
  const err = document.createElement("p");
  err.innerText = "No Items Added";
  mealListCard.appendChild(err);
}
let totalPrice = 0;
addedItems.forEach((value, key) => {
  const mealItem = document.createElement("checkout-item");
  if (mealListCard) {
    totalPrice +=
      meals.data.find((meal) => meal.id === Number(key)).meal_price * value;
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
const totalPriceElement = document.getElementById(
  "checkout-footer-total-price"
);
if (totalPriceElement) {
  totalPriceElement.innerText = String(`Your total is $${totalPrice}`);
}
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
