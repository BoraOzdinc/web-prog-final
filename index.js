const mealList = [
  {
    id: 0,
    meal_name: "Mac and Cheese",
    meal_price: "",
    meal_img:
      "https://www.seriouseats.com/thmb/YwaJNJc7_TDAjdo8pzN_JElsgb4=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/__opt__aboutcom__coeus__resources__content_migration__serious_eats__seriouseats.com__2021__02__20210214-stovetop-mac-cheese-reshoot-vicky-wasik-9-0760b642ca704cf8b2c5121a363a60a2.jpg",
  },
  {
    id: 1,
    meal_name: "Penne Arrabbiata",
    meal_img:
      "https://www.giallozafferano.com/images/260-26061/Penne-all-arrabbiata_1200x800.jpg",
  },
  {
    id: 2,
    meal_name: "Spaghetti Bolognese",
    meal_img:
      "https://supervalu.ie/thumbnail/800x600/var/files/real-food/recipes/Uploaded-2020/spaghetti-bolognese-recipe.jpg",
  },
];

const addedItems = new Map();

const mealListCard = document.getElementById("meal-list-card");
for (let i of mealList) {
  const mealItem = document.createElement("meal-item");

  mealItem.setAttribute("meal-name", i.meal_name);
  mealItem.setAttribute("meal-img", i.meal_img);
  mealItem.setAttribute("meal-id", i.id);
  mealItem.setAttribute("id", `meal-item-${i.id}`);
  mealListCard.appendChild(mealItem);
}

// Function to add an item to the tracking map
function addItemToCart(itemId) {
  if (addedItems.has(itemId)) {
    addedItems.set(itemId, addedItems.get(itemId) + 1);
  } else {
    addedItems.set(itemId, 1);
  }
  const mealItemName = document
    .getElementById(`meal-item-${itemId}`)
    .getAttribute("meal-name");
  console.log(
    `Item ${mealItemName} added to cart. Quantity: ${addedItems.get(itemId)}`
  );
}

// Function to remove an item from the tracking map
function removeItemFromCart(itemId) {
  if (addedItems.has(itemId)) {
    addedItems.set(itemId, Math.max(0, addedItems.get(itemId) - 1));
  }

  console.log(
    `Item ${itemId} removed from cart. Quantity: ${addedItems.get(itemId)}`
  );
}
