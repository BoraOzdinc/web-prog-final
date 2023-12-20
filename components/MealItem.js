import { addedItems,addItemToCart,removeItemFromCart } from "../index.js";
class MealItem extends HTMLElement {
  connectedCallback() {
    const mealId = this.getAttribute("meal-id");

    this.innerHTML = `
      <div meal-id="${mealId}" class="card flex flex-col items-center justify-center">
        <img class="rounded" alt="meal-img" height="80px" src="${this.getAttribute(
          "meal-img"
        )}" />
        <p class="text text-base">${this.getAttribute("meal-name")}</p>
        <p class="text text-sm">$${this.getAttribute("meal-price")}</p>
        <div class="flex flex-row gap items-center justify-center">
          <button id="remove-item-button-${mealId}" class="btn" disabled>-</button>
          <p id="item-counter-${mealId}" class="">0</p>
          <button id="add-item-button-${mealId}" class="btn">+</button>
        </div>
      </div>`;

    const counterElement = this.querySelector(`#item-counter-${mealId}`);
    const removeButton = this.querySelector(`#remove-item-button-${mealId}`);
    const addButton = this.querySelector(`#add-item-button-${mealId}`);

    counterElement.textContent = addedItems.get(mealId) ?? "0";

    removeButton.addEventListener("click", () => {
      removeItemFromCart(mealId);
      let currentCount = parseInt(counterElement.textContent, 10);
      currentCount--;
      if (currentCount < 0) {
        currentCount = 0;
      }
      counterElement.textContent = currentCount;
      updateButtonStates();
    });

    addButton.addEventListener("click", () => {
      addItemToCart(mealId);
      let currentCount = parseInt(counterElement.textContent, 10);
      currentCount++;
      counterElement.textContent = currentCount;
      updateButtonStates();
    });

    const updateButtonStates = () => {
      const currentCount = parseInt(counterElement.textContent, 10);
      removeButton.disabled = currentCount === 0;
    };
    updateButtonStates();
  }
}

customElements.define("meal-item", MealItem);
