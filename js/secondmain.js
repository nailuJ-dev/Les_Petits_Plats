const generateFilters = (input) => {
	let ingredients = [];
	let appliance = [];
	let ustensils = [];
	input.forEach((recipe) => {
		ingredients = [...new Set([...ingredients, ...recipe.ingredients.map((el) => el.ingredient)])].sort();
		ustensils = [...new Set([...ustensils, ...recipe.ustensils.map((ustensil) => ustensil)])].sort();
		appliance = [...new Set([...appliance, ...[recipe.appliance]])].sort();
	});
	return { ingredients, ustensils, appliance };
};

const generateRecipesMainPart = (recipes) => {
	recipes.forEach((recipe) => {
		recipesPart.append(new BuilderMainPart(recipe).createMainPart);
	});
};

let lastSearch = [];

const recipesFiltered = (mainSearchBar, recipes) => { // merde
	mainSearchBar.addEventListener('keyup', (el) => {
		if (el.target.value.length >= 3) {
			recipesPart.innerHTML = "";
			const request = el.target.value.toLowerCase();
			const results = recipes.filter((recipe) => {
				return (recipe.name.toLowerCase().startsWith(request) ||
                recipe.description.toLowerCase().includes(request) ||
                recipe.ingredients.some((ingredient) => ingredient.ingredient.toLowerCase().includes(request)));
			});
			generateRecipesMainPart(results);
            lastSearch = results
			if (!results.length) {
                lastSearch = recipes
				recipesPart.append(
					createDomElements(
						'div', `Aucune recette ne correspond à votre critère… vous pouvez
     chercher « tarte aux pommes », « poisson », etc.`, { class: 'no__matching' }
					)
				);
			};
		} else if (el.target.value.length <= 3) {
			recipesPart.innerHTML = '';
			generateRecipesMainPart(recipes);
		};
	});
    return lastSearch;
};

const init = async () => {
	const res = await getData();
	const data = await res.json();
		//
    let recipes = data.recipes;

    const mainSearchBar = mainSearchBarInput;
    let selectedTags = [];

    generateRecipesMainPart(recipes);
    recipesFiltered(mainSearchBar, recipes);

    
};

init();