export const mealList = [
  {
    id: 0,
    meal_name: "Mac and Cheese",
    meal_price: 20,
    meal_img:
      "https://www.seriouseats.com/thmb/YwaJNJc7_TDAjdo8pzN_JElsgb4=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/__opt__aboutcom__coeus__resources__content_migration__serious_eats__seriouseats.com__2021__02__20210214-stovetop-mac-cheese-reshoot-vicky-wasik-9-0760b642ca704cf8b2c5121a363a60a2.jpg",
  },
  {
    id: 1,
    meal_name: "Penne Arrabbiata",
    meal_price: 15,
    meal_img:
      "https://www.giallozafferano.com/images/260-26061/Penne-all-arrabbiata_1200x800.jpg",
  },
  {
    id: 2,
    meal_name: "Spaghetti Bolognese",
    meal_price: 18,
    meal_img:
      "https://supervalu.ie/thumbnail/800x600/var/files/real-food/recipes/Uploaded-2020/spaghetti-bolognese-recipe.jpg",
  },
];

export const addedItems = new Map();
populateMapWithStorage();
const totalPrice = updateCart();

const mealListCard = document.getElementById("meal-list-card");
for (let i of mealList) {
  const mealItem = document.createElement("meal-item");
  if (mealListCard) {
    mealItem.setAttribute("meal-name", i.meal_name);
    mealItem.setAttribute("meal-price", i.meal_price);
    mealItem.setAttribute("meal-img", i.meal_img);
    mealItem.setAttribute("meal-id", i.id);
    mealItem.setAttribute("id", `meal-item-${i.id}`);
    mealListCard.appendChild(mealItem);
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

export function updateCart() {
  const cartBody = document.getElementById("meal-cart-popover-content");
  const checkoutTotalElement = document.getElementById(
    "checkout-footer-total-price"
  );
  let totalPrice = 0;
  addedItems.forEach((value, key) => {
    totalPrice = totalPrice + mealList[key].meal_price * value;
  });

  if (cartBody) {
    removeChilds(cartBody);
    if (addedItems.size === 0) {
      const error = document.createElement("p");
      error.innerText = "No items added.";
      cartBody.appendChild(error);
    }
    addedItems.forEach((value, key) => {
      const itemBox = document.createElement("div");
      itemBox.className = "flex flex-row items-center justify-center ";

      const item = document.createElement("p");
      const itemPrice = document.createElement("p");
      item.innerText = `${value}x ${mealList[key].meal_name}`;
      itemPrice.innerText = `$${mealList[key].meal_price}`;

      itemBox.appendChild(item);
      itemBox.appendChild(itemPrice);

      cartBody.appendChild(itemBox);
    });
    const totalPriceElement = document.getElementById("total-price-dropdown");
    totalPriceElement.innerText = `Total $${totalPrice}`;
  }

  if (checkoutTotalElement) {
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
  storage.length === 0
    ? localStorage.setItem("addedItems", "")
    : storage.map((a) => {
        addedItems.set(a[0], a[1]);
      });
}
