const form = document.getElementById("search-form");

const BaseRecipeURL = 'https://www.tudogostoso.com.br/busca?q=';

/**
 * Renders the recipes received by the backend
 * @typedef { {id_: string, recipe: string[], url: string} } Recipe
 * @argument { Recipe[] } recipes */
function displayRecipes(recipes) {

    document.getElementById("results").innerHTML = '';
    recipes.forEach((element) => {

        var temp = document.createElement("div");

        var title = document.createElement("p");
        const name = element.id_.replace(/-/g, ' ');
        title.innerHTML += name;
        title.classList.add("title");

        var ingredients = document.createElement("p");
        ingredients.innerHTML += "Ingredientes:<br><br>"+element.recipe+"<br>";
        ingredients.classList.add("ingredients");

        var url = document.createElement("p");
        url.innerHTML += "Fonte: " + "<a href='"+BaseRecipeURL + element.id_+"' rel='noreferrer noopener'>Tudo Gostoso</a>"
        url.classList.add("url");

        temp.appendChild(title);
        temp.appendChild(ingredients);
        temp.appendChild(url);
        document.getElementById("results").appendChild(temp);
    })
}

/**
 * Requests matching recipes from the server. If `ingredientes` is an empty array,
 * returns all recipes.
 * @argument { string[] } ingredientes
 */
function requestRecipes(ingredientes) {
  const promise = fetch(
    "/.netlify/functions/recipes?ingredientes=" + ingredientes.join(",")
  );

  promise
    .then((response) => {
      const jsonPromise = response.json();
      return jsonPromise;
    })
    .then((jsonResponse) => {
      console.log(jsonResponse);
      displayRecipes(jsonResponse);
    });
}

form.addEventListener("submit", (event) => {
  event.preventDefault();

  let ingredientes = event.target.ingredientes.value;

  requestRecipes(ingredientes.split(","));
});