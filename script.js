const API_KEY = "cdf77a6c9cd141fda1926272cc9747f2";

// Fallback sample data
const sampleRecipes = [
  {
    title: "Classic Italian Pasta",
    image: "https://source.unsplash.com/300x200/?pasta",
    summary: "Simple and delicious pasta with fresh tomatoes and basil.",
  },
  {
    title: "Fresh Garden Salad",
    image: "https://source.unsplash.com/300x200/?salad",
    summary: "A healthy mix of greens, cucumbers, and vinaigrette.",
  },
  {
    title: "Chocolate Delight",
    image: "https://source.unsplash.com/300x200/?dessert",
    summary: "A sweet treat for all dessert lovers.",
  }
];

// Section toggle
const navLinks = document.querySelectorAll(".sidebar nav ul li a");
const sections = document.querySelectorAll(".content-section");

navLinks.forEach(link => {
  link.addEventListener("click", e => {
    e.preventDefault();
    const sectionId = link.getAttribute("data-section");

    sections.forEach(sec => sec.classList.remove("active"));
    document.getElementById(sectionId).classList.add("active");
  });
});

// Search button
document.getElementById("search-btn").addEventListener("click", () => {
  const ingredients = document.getElementById("ingredients-input").value;
  const cuisine = document.getElementById("cuisine").value;
  const mealType = document.getElementById("mealType").value;
  fetchRecipes(ingredients, cuisine, mealType);
});

// Surprise Me button
document.getElementById("random-btn").addEventListener("click", () => {
  fetchRandomRecipe();
});

// Fetch recipes by filters
async function fetchRecipes(ingredients, cuisine, mealType) {
  const url = `https://api.spoonacular.com/recipes/complexSearch?apiKey=${API_KEY}&includeIngredients=${ingredients}&cuisine=${cuisine}&type=${mealType}&number=9&addRecipeInformation=true`;

  try {
    const res = await fetch(url);
    const data = await res.json();
    if (data.results && data.results.length > 0) {
      renderRecipes(data.results);
    } else {
      renderRecipes(sampleRecipes);
    }
  } catch (error) {
    console.error("Error fetching recipes:", error);
    renderRecipes(sampleRecipes);
  }
}

// Fetch random recipes
async function fetchRandomRecipe() {
  const url = `https://api.spoonacular.com/recipes/random?apiKey=${API_KEY}&number=6&addRecipeInformation=true`;

  try {
    const res = await fetch(url);
    const data = await res.json();
    if (data.recipes && data.recipes.length > 0) {
      renderRecipes(data.recipes);
    } else {
      renderRecipes(sampleRecipes);
    }
  } catch (error) {
    console.error("Error fetching random recipes:", error);
    renderRecipes(sampleRecipes);
  }
}

// Render recipes
function renderRecipes(recipes) {
  const container = document.getElementById("recipes-list");
  container.innerHTML = "";

  if (recipes.length === 0) {
    container.innerHTML = "<p>No recipes found. Try different filters.</p>";
    return;
  }

  recipes.forEach(r => {
    const card = document.createElement("div");
    card.classList.add("recipe-card");

    // Use fallback if no image
    const imageUrl = r.image ? r.image : "https://source.unsplash.com/300x200/?food";

    card.innerHTML = `
      <img src="${imageUrl}" alt="${r.title}">
      <h3>${r.title}</h3>
      <p>${r.summary ? r.summary.replace(/<[^>]+>/g, "").slice(0,100)+"..." : "Delicious recipe!"}</p>
      <button class="fav-btn"><i class="fas fa-heart"></i></button>
    `;

    // Add to favourites
    const favBtn = card.querySelector(".fav-btn");
    favBtn.addEventListener("click", () => {
      favBtn.classList.toggle("active");
      if (favBtn.classList.contains("active")) {
        saveFavourite(r);
      }
    });

    container.appendChild(card);
  });
}

// Save favourite recipes
function saveFavourite(recipe) {
  const favList = document.getElementById("favourites-list");
  if (favList.querySelector("p")) favList.innerHTML = ""; // clear default text

  const favItem = document.createElement("div");
  favItem.classList.add("recipe-card");

  const imageUrl = recipe.image ? recipe.image : "https://source.unsplash.com/300x200/?food";

  favItem.innerHTML = `
    <img src="${imageUrl}" alt="${recipe.title}">
    <h3>${recipe.title}</h3>
  `;
  favList.appendChild(favItem);
}










