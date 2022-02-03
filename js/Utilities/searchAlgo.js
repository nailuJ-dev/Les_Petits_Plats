// Filter main requests and display recipes matching with them

const recipesFiltered = (mainSearchBar) => {
	mainSearchBar.addEventListener('keyup', (el) => {
		if (el.target.value.length >= 3) {
			recipesPart.innerHTML = "";
			const request = el.target.value.toLowerCase();
			recipes = recipes.filter((recipe) => {
				return (recipe.name.toLowerCase().startsWith(request) ||
                recipe.description.toLowerCase().includes(request) ||
                recipe.ingredients.some((ingredient) => ingredient.ingredient.toLowerCase().includes(request)));
			});
			generateRecipesMainPart(recipes);
			if (!recipes.length) {
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