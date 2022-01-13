// Filter main requests and display recipes matching with them

const recipesFiltered = (recipes, mainSearchBar) => {
	mainSearchBar.addEventListener('keyup', (el) => {
		if (el.target.value.length >= 3) {
			recipesPart.innerHTML = "";
			const request = el.target.value.toLowerCase();
			const results = matchingContent(recipes, request)
			generateRecipesMainPart(results);
			if (!results.length) {
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
};

function matchingContent(recipes, request) {
    let matchingRecipes = [];
    for (let recipe of recipes) {
        if (recipe.name.toLowerCase().includes(request) ||
            recipe.description.toLowerCase().includes(request) ||
            recipe.ingredients.filter(ingredient => ingredient.ingredient.toLowerCase().includes(request)).length > 0) {
                matchingRecipes.push(recipe)
        };
    };
    return matchingRecipes;
};