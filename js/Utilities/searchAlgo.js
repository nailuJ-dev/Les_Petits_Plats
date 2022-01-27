// Filter main requests and display recipes matching with them
let mainSearch = async () =>
await fetch("../js/Data/recipes.json")
    .then((res) => res.json())
    .catch((err) => console.log("An error occurs when fetching recipes", err));

const recipesFiltered = (recipes, mainSearchBar) => {
    let filterTag = [];
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
			if (!results.length) {
				recipesPart.append(
					createDomElements(
						'div', `Aucune recette ne correspond à votre critère… vous pouvez
     chercher « tarte aux pommes », « poisson », etc.`, { class: 'no__matching' }
					)
				);
			};
            let mainSearch = results;
            let filterTag = results;
            console.log(filterTag);
		} else if (el.target.value.length <= 3) {
			recipesPart.innerHTML = '';
			generateRecipesMainPart(recipes);
		};
	});
};

console.log(mainSearch);