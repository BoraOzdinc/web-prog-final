const allCategories = await axios.get(
  "http://www.themealdb.com/api/json/v1/1/categories.php"
);

const categoryContainer = document.getElementById("category-container");
if (categoryContainer && allCategories) {
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
