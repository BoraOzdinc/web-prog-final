import { orderedMeals } from "../meals/index.js";
const mealListCard = document.getElementById("order-items-list");
const loadingText = document.createElement("p");
loadingText.innerText = "Loading...";
mealListCard.appendChild(loadingText);
const allMeals = await axios.get("/api/get-all-meals");
mealListCard.removeChild(loadingText);

const openEls = document.querySelectorAll("[data-open]");
const isVisible = "is-visible";
for (const el of openEls) {
  el.addEventListener("click", function () {
    const modalId = this.dataset.open;
    document.getElementById(modalId).classList.add(isVisible);
  });
}
const closeEls = document.querySelectorAll("[data-close]");
for (const el of closeEls) {
  el.addEventListener("click", function () {
    this.parentElement.parentElement.parentElement.classList.remove(isVisible);
  });
}
document.addEventListener("click", (e) => {
  if (e.target == document.querySelector(".modal.is-visible")) {
    document.querySelector(".modal.is-visible").classList.remove(isVisible);
  }
});
document.addEventListener("keyup", (e) => {
  if (e.key == "Escape" && document.querySelector(".modal.is-visible")) {
    document.querySelector(".modal.is-visible").classList.remove(isVisible);
  }
});

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
const notyf = new Notyf();
function onSubmit() {
  notyf.localStorage.setItem("orderedMeals", JSON.stringify([]));
}

if (payButton && orderedMeals) {
  payButton.disabled = false;
}
