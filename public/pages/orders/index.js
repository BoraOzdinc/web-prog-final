import {
  populateOrderedMeals,
  orderedMeals,
  allMeals,
} from "../meals/index.js";
populateOrderedMeals();

let totalPrice = 0;
const mealListCard = document.getElementById("order-items-list");
orderedMeals.forEach((value, key) => {
  const mealItem = document.createElement("order-item");
  if (mealListCard) {
    mealItem.setAttribute(
      "meal-name",
      allMeals.data.find((meal) => meal.id === Number(key)).meal_name
    );
    mealItem.setAttribute(
      "meal-price",
      allMeals.data.find((meal) => meal.id === Number(key)).meal_price
    );
    mealItem.setAttribute(
      "meal-img",
      allMeals.data.find((meal) => meal.id === Number(key)).meal_img
    );
    mealItem.setAttribute(
      "meal-id",
      allMeals.data.find((meal) => meal.id === Number(key)).id
    );
    mealItem.setAttribute(
      "id",
      `meal-item-${allMeals.data.find((meal) => meal.id === Number(key)).id}`
    );
    mealListCard.appendChild(mealItem);
  }

  totalPrice =
    totalPrice +
    allMeals.data.find((meal) => meal.id === Number(key)).meal_price * value;
  document.getElementById(
    "order-footer-total-price"
  ).innerText = `Your Total is $${totalPrice}`;
});
