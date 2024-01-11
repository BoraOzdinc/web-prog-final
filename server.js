const express = require("express");
const axios = require("axios");
const path = require("path");
const app = express();
const port = 3000;

app.use(express.static("public"));
app.use(express.json());

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "../public/index.html"));
});

app.listen(port, () => {
  console.log(`app listening on port ${port}`);
});

app.get("/get-categories", async (req, res) => {
  try {
    const response = await axios({
      url: "http://www.themealdb.com/api/json/v1/1/categories.php",
    });
    res.json(response.data);
  } catch (error) {
    console.error(error);
    res.status(500).send("An error occurred while making the request.");
  }
});
app.get("/get-all-meals", async (req, res) => {
  try {
    const categories = await axios({
      url: "http://www.themealdb.com/api/json/v1/1/categories.php",
    });
    const allMeals = Promise.all(
      categories.data.categories.map(async (category) => {
        const meals = await axios({
          url: `http://www.themealdb.com/api/json/v1/1/filter.php?c=${category.strCategory}`,
        });
        const mealsWithPrice = Promise.all(
          meals.data.meals.map((meal) => {
            const mealPrice = Number(meal.idMeal.slice(-2));
            if (mealPrice < 10) {
              return {
                meal_price: Math.round(Number(meal.idMeal.slice(-3)) / 10),
                id: Number(meal.idMeal),
                meal_name: meal.strMeal,
                meal_img: meal.strMealThumb,
              };
            }
            return {
              meal_price: mealPrice,
              id: Number(meal.idMeal),
              meal_name: meal.strMeal,
              meal_img: meal.strMealThumb,
            };
          })
        );
        return mealsWithPrice;
      })
    );
    const allMealsResponse = await allMeals;
    const editedMeals = allMealsResponse.flat();
    isLoading = false;
    res.json(editedMeals);
  } catch (error) {
    console.error(error);
    res.status(500).send("An error occurred while making the request.");
  }
});
app.post("/get-meals-with-category", async (req, res) => {
  if (req.body.category) {
    try {
      const response = await axios({
        url: `http://www.themealdb.com/api/json/v1/1/filter.php?c=${req.body.category}`,
      });
      const mealsWithPrice = response.data.meals.map((meal) => {
        const mealPrice = Number(meal.idMeal.slice(-2));
        if (mealPrice < 10) {
          return {
            meal_price: Math.round(Number(meal.idMeal.slice(-3)) / 10),
            id: Number(meal.idMeal),
            meal_name: meal.strMeal,
            meal_img: meal.strMealThumb,
          };
        }
        return {
          meal_price: mealPrice,
          id: Number(meal.idMeal),
          meal_name: meal.strMeal,
          meal_img: meal.strMealThumb,
        };
      });
      res.json(mealsWithPrice);
    } catch (error) {
      console.log(error);
      res.status(500).send("An error occured while getting meals");
    }
  } else {
    res.status(500).send("invalid payload");
  }
});

app.post("/get-meals-with-ids", async (req, res) => {
  if (req.body.ids) {
    const meals = Promise.all(
      req.body.ids.map(async (id) => {
        try {
          const response = await axios({
            url: `http://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`,
          });
          const meal = response.data.meals[0];
          const mealPrice = Number(meal.idMeal.slice(-2));
          if (mealPrice < 10) {
            return {
              meal_price: Math.round(Number(meal.idMeal.slice(-3)) / 10),
              id: Number(meal.idMeal),
              meal_name: meal.strMeal,
              meal_img: meal.strMealThumb,
            };
          } else
            return {
              meal_price: mealPrice,
              id: Number(meal.idMeal),
              meal_name: meal.strMeal,
              meal_img: meal.strMealThumb,
            };
        } catch (error) {
          console.log(error);
          res.status(500).send("An error occured while getting meals");
        }
      })
    );
    const listOfMeals = await meals;
    res.json(listOfMeals);
  }
});
