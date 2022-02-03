
const generateFilters = (recipes) => {
	let ingredients = [];
	let devices = [];
	let ustensiles = [];
	recipes.forEach((recipe) => {
		ingredients = [...new Set([...ingredients, ...recipe.ingredients.map((el) => el.ingredient)])].sort();
		ustensiles = [...new Set([...ustensiles, ...recipe.ustensils.map((ustensil) => ustensil)])].sort();
		devices = [...new Set([...devices, ...[recipe.appliance]])].sort();
	});
	return { ingredients, ustensiles, devices };
};

const generateRecipesMainPart = (input) => {
	input.forEach((recipe) => {
		recipesPart.append(new BuilderMainPart(recipe).createMainPart);
	});
};

const init = () => {
	const data = require('./Data/recipes.json')
    let recipes = data.recipes
    console.log(recipes)
    generateFilters(recipes);
    inputEventsOnClick(recipes);
    generateRecipesMainPart(recipes)
    recipesFiltered(mainSearchBarInput);
};

init();