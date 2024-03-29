import {
  addedItems,
  addItemToCart,
  removeItemFromCart,
} from "../pages/meals/index.js";
class CheckoutItem extends HTMLElement {
  connectedCallback() {
    const mealId = this.getAttribute("meal-id");

    this.innerHTML = `
      <div meal-id="${mealId}" class="card flex items-center justify-between">
        <div class=" gap flex flex-row items-center justify-center">
          <img class="rounded w-[80px] lg:w-[120px]" alt="meal-img"  src="${this.getAttribute(
            "meal-img"
          )}" />
          <p class="text text-base">${this.getAttribute("meal-name")}</p>
        </div>
        <div class="flex flex-row items-center justify-center gap">
          <p class="text text-sm">$${this.getAttribute("meal-price")}</p>
          <div class="flex flex-row gap items-center justify-center">
            <button id="remove-item-button-${mealId}" class="btn" disabled><svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 -960 960 960" width="24"><path fill="white" d="M200-440v-80h560v80H200Z"/></svg></button>
            <p id="item-counter-${mealId}" class="">0</p>
            <button id="add-item-button-${mealId}" class="btn"><svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 -960 960 960" width="24"><path fill="white" d="M440-440H200v-80h240v-240h80v240h240v80H520v240h-80v-240Z"/></svg></button>
          </div>
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

customElements.define("checkout-item", CheckoutItem);
