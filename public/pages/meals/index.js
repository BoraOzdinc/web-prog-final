const urlParams = new URLSearchParams(window.location.search);
const category = urlParams.get("category");

export const addedItems = new Map();
export const orderedMeals = new Map();
const cartBody = document.getElementById("meal-cart-popover-content");
export const allMeals = await axios.get("/get-all-meals");
if (cartBody) {
  updateCart();
}

const mealList = async () => {
  if (category) {
    return await axios({
      method: "post",
      url: "/get-meals-with-category",
      data: {
        category: category,
      },
    });
  }
};
populateMapWithStorage();
populateOrderedMeals();

export function populateOrderedMeals() {
  const orderedMealsStorage = JSON.parse(localStorage.getItem("orderedMeals"));

  orderedMealsStorage
    ? orderedMealsStorage.map((a) => {
        orderedMeals.set(a[0], a[1]);
      })
    : localStorage.setItem("orderedMeals", JSON.stringify([]));
}

const mealsContainer = document.getElementById("meals-container");
if (mealsContainer) {
  const header = document.createElement("h2");
  header.innerText = `Meals in ${category} category.`;
  mealsContainer.prepend(header);
}

const mealListCard = document.getElementById("meal-list-card");
if (category) {
  //? while waiting for the response fill the card with a loading text
  const loadingText = document.createElement("p");
  loadingText.innerText = "Loading...";
  mealListCard.appendChild(loadingText);

  const mealListResponse = await mealList();
  mealListCard.removeChild(loadingText);

  for (let i of mealListResponse.data) {
    const mealItem = document.createElement("meal-item");
    if (mealListCard) {
      mealItem.className = "flex";
      mealItem.setAttribute("meal-name", i.meal_name);
      mealItem.setAttribute("meal-price", i.meal_price);
      mealItem.setAttribute("meal-img", i.meal_img);
      mealItem.setAttribute("meal-id", i.id);
      mealItem.setAttribute("id", `meal-item-${i.id}`);
      mealListCard.appendChild(mealItem);
    }
  }
}

// Function to add an item to the tracking map
export function addItemToCart(itemId) {
  if (addedItems.has(itemId)) {
    addedItems.set(itemId, addedItems.get(itemId) + 1);
  } else {
    addedItems.set(itemId, 1);
  }
  localStorage.setItem(
    "addedItems",
    JSON.stringify(addedItems, (key, value) =>
      value instanceof Map ? [...value] : value
    )
  );
  updateCart();
}

// Function to remove an item from the tracking map
export function removeItemFromCart(itemId) {
  if (addedItems.get(itemId) === 1) {
    addedItems.delete(itemId);
  }
  if (addedItems.has(itemId)) {
    addedItems.set(itemId, Math.max(0, addedItems.get(itemId) - 1));
  }
  localStorage.setItem(
    "addedItems",
    JSON.stringify(addedItems, (key, value) =>
      value instanceof Map ? [...value] : value
    )
  );

  updateCart();
}

export async function updateCart() {
  let totalPrice = 0;

  if (cartBody) {
    removeChilds(cartBody);
    if (addedItems.size === 0) {
      const error = document.createElement("p");
      error.innerText = "No items added.";
      cartBody.appendChild(error);
    }
    addedItems.forEach((value, key) => {
      const itemBox = document.createElement("div");
      itemBox.className = "flex flex-row items-start justify-between";

      const item = document.createElement("p");
      const itemPrice = document.createElement("p");
      item.innerText = `${value}x ${
        allMeals.data.find((meal) => meal.id === Number(key)).meal_name
      }`;

      itemBox.appendChild(item);
      itemBox.appendChild(itemPrice);

      cartBody.appendChild(itemBox);
    });
    const totalPriceElement = document.getElementById("total-price-dropdown");
    addedItems.forEach((value, key) => {
      totalPrice =
        totalPrice +
        allMeals.data.find((meal) => meal.id === Number(key)).meal_price *
          value;
    });
    totalPriceElement.innerText = `Total $${totalPrice}`;
  }

  const orderButton = document.getElementById("checkout-order-btn");

  const checkoutTotalElement = document.getElementById(
    "checkout-footer-total-price"
  );

  if (orderButton) {
    if (addedItems.size === 0) {
      orderButton.disabled = true;
    } else {
      orderButton.disabled = false;
    }
  }
  if (checkoutTotalElement) {
    addedItems.forEach((value, key) => {
      totalPrice =
        totalPrice +
        allMeals.data.find((meal) => meal.id === Number(key)).meal_price *
          value;
    });
    checkoutTotalElement.innerText = `Total Price $${totalPrice}`;
  }

  return totalPrice;
}

function removeChilds(parent) {
  while (parent.firstChild) {
    parent.removeChild(parent.lastChild);
  }
}

export function populateMapWithStorage() {
  const storage = JSON.parse(localStorage.getItem("addedItems"));
  storage
    ? storage.map((a) => {
        addedItems.set(a[0], a[1]);
      })
    : localStorage.setItem("addedItems", JSON.stringify([]));
}
