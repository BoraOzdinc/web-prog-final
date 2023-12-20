import {
  mealList,
  addedItems,
  addItemToCart,
  removeItemFromCart,
  updateCart,
} from "../../index.js";
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
