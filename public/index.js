import "./pages/meals/index.js";
const categoryContainer = document.getElementById("category-container");

if (categoryContainer) {
  const loadingText = document.createElement("p");
  loadingText.innerText = "Loading...";
  categoryContainer.appendChild(loadingText);

  const allCategories = await axios.get("/get-categories");
  categoryContainer.removeChild(loadingText);

  allCategories.data.categories.map((category) => {
    const box = document.createElement("div");
    box.className = "btn flex flex-col items-center justify-center gap";
    const name = document.createElement("p");
    const img = document.createElement("img");
    name.innerText = category.strCategory;
    img.src = category.strCategoryThumb;

    box.appendChild(img);
    box.appendChild(name);
    categoryContainer.appendChild(box);
    box.addEventListener("click", (e) => {
      e.preventDefault();
      window.location.replace(
        `/pages/meals/index.html?category=${category.strCategory}`
      );
    });
  });
}
