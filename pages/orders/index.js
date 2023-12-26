import { populateOrderedMeals, orderedMeals, mealList } from "../../index.js";
populateOrderedMeals();

let totalPrice = 0;
const mealListCard = document.getElementById("order-items-list");
orderedMeals.forEach((value, key) => {
  const mealItem = document.createElement("order-item");
  if (mealListCard) {
    mealItem.setAttribute("meal-name", mealList[key].meal_name);
    mealItem.setAttribute("meal-price", mealList[key].meal_price);
    mealItem.setAttribute("meal-img", mealList[key].meal_img);
    mealItem.setAttribute("meal-id", mealList[key].id);
    mealItem.setAttribute("id", `meal-item-${mealList[key].id}`);
    mealListCard.appendChild(mealItem);
  }

  totalPrice = totalPrice + mealList[key].meal_price * value;
  document.getElementById(
    "order-footer-total-price"
  ).innerText = `Your Total is $${totalPrice}`;
});
