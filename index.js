const form = document.getElementById("search-form");

const receitasTeste = [
  {
    id: "305716",
    name: "-molho-de-pimenta-para-lanche",
    recipe: [
      "cebola",
      "alho",
      "cenoura grande",
      "folhas louro",
      "tomates grandes",
      "azeite",
      "meia vinagre limao",
      "sache sazon vermelho",
      "sal",
      "pimentas dedo moca",
    ],
    url:
      "https://www.tudogostoso.com.br/receita/305716-molho-de-pimenta-para-lanche.html",
  },
  {
    id: "305720",
    name: "-sonhos",
    recipe: [
      "kg farinha trigo",
      "sopa açúcar",
      "chá sal",
      "margarina",
      "ovos",
      "fermento biológico seco",
      "xícara água morna",
    ],
    url: "https://www.tudogostoso.com.br/receita/305720-sonhos.html",
  },
  {
    id: "305722",
    name: "-mousse-de-maracuja-com-chantili",
    recipe: [
      "caixas leite condensado",
      "caixas creme leite",
      "maracujá",
      "gelatina incolor",
      "chantili",
    ],
    url:
      "https://www.tudogostoso.com.br/receita/305722-mousse-de-maracuja-com-chantili.html",
  },
];

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
  const promise = fetch(
    "http://localhost:8000/?ingredientes=" + ingredientes.join(",")
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
