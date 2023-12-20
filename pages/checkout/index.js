import mealList from "../..";

const checkoutItemsFromStorage = JSON.parse(localStorage.getItem("addedItems"));
const checkoutItems = new Map();
checkoutItemsFromStorage.map((a) => {
  checkoutItems.set(a[0], a[1]);
});

console.log(mealList);
