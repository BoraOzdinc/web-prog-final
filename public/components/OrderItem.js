import {
  addedItems,
  addItemToCart,
  orderedMeals,
  removeItemFromCart,
} from "../pages/meals/index.js";
class OrderItem extends HTMLElement {
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
        <p class="text text-sm">$${this.getAttribute("meal-price")} per meal</p>
        <div class="flex flex-row gap items-center justify-center">
          <p id="item-counter-${mealId}" class="">0 pcs.</p>
        </div></div>
      </div>`;
    const counterElement = this.querySelector(`#item-counter-${mealId}`);

    counterElement.textContent = `${orderedMeals.get(mealId)} pcs.` ?? "0 pcs.";
  }
}

customElements.define("order-item", OrderItem);
