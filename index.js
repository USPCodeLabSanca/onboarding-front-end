const form = document.getElementById('search-form');

/**
 * Renders the recipes received by the backend
 * @typedef { {id: string, name: string, recipe: string[], url: string} } Recipe
 * @argument { Recipe[] } recipes */
function displayRecipes(recipes) {
    // Clara goes here
}

/**
 * Requests matching recipes from the server. If `ingredientes` is an empty array,
 * returns all recipes.
 * @argument { string[] } ingredientes
 */
function requestRecipes(ingredientes) {
    const promise = fetch('http://localhost:8000/?ingredientes=' + ingredientes.join(','));

    promise.then((response) => {
        const jsonPromise = response.json();
        return jsonPromise;
    }).then(jsonResponse => {
        console.log(jsonResponse);
        displayRecipes(jsonResponse);
    });
}

form.addEventListener('submit', event => {
    event.preventDefault();

    let ingredientes = event.target.ingredientes.value;

    requestRecipes(ingredientes.split(','));
})