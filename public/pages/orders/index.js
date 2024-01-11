import { orderedMeals } from "../meals/index.js";
const mealListCard = document.getElementById("order-items-list");
console.log(orderedMeals);
const loadingText = document.createElement("p");
loadingText.innerText = "Loading...";
mealListCard.appendChild(loadingText);
const allMeals = await axios.get("/api/get-all-meals");
mealListCard.removeChild(loadingText);

let totalPrice = 0;
const payButton = document.getElementById("pay-meals-btn");
if (payButton && orderedMeals.size === 0) {
  const error = document.createElement("p");
  error.innerText = "No Ordered Meals...";
  mealListCard.appendChild(error);
  payButton.classList = "btn-disabled";
}

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

if (payButton && orderedMeals) {
  payButton.disabled = false;
  payButton.addEventListener("click", (ev) => {
    localStorage.setItem("orderedMeals", JSON.stringify([]));
    window.location.replace("/");
  });
}
