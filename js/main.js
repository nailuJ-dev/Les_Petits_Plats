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

const getData = async () =>
	await fetch("../js/Data/recipes.json", {
		mode: "no-cors",
		method: "GET",
		headers: {
			"Content-Type": "application/json",
			Accept: "application/json",
		},
	})
		.then((res) => res.json())
		.catch((err) => console.log("An error occurs when fetching recipes", err));


const generateRecipesMainPart = (recipes) => {
	recipes.forEach((recipe) => {
		recipesPart.append(new builderMainPart(recipe).createMainPart);
	});
};

const init = async () => {
	const { recipes } = await getData();
	generateFilters(recipes);
	inputEventsOnClick(recipes);
	generateRecipesMainPart(recipes)
	recipesFiltered(recipes, mainSearchBarInput);
};

init();