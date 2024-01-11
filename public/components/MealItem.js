import { addItemToCart } from "../pages/meals/index.js";
class MealItem extends HTMLElement {
  connectedCallback() {
    const mealId = this.getAttribute("meal-id");
    this.innerHTML = `
<div meal-id="${mealId}" class="meal-card">
            <div class="card__image">
               <img src="${this.getAttribute("meal-img")}" alt="meal-img" />
            </div>
            <div class="card__info">
               <div class="card__info--title">
                  <h3>${this.getAttribute("meal-name")}</h3>
               </div>
               <div class="card__info--price">
                  <p id="item-counter-${mealId}" >$${this.getAttribute(
      "meal-price"
    )}</p>
                  <button id="add-item-button-${mealId}" class="btn" >Add to card</button>
               </div>
            </div>
         </div>`;
    const addButton = document.getElementById(`add-item-button-${mealId}`);

    addButton.addEventListener("click", () => {
      addItemToCart(mealId);
    });
  }
}

customElements.define("meal-item", MealItem);
