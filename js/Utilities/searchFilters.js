const createFilterElements = (recipes, selectedTags) => {
	filterElements.innerHTML = "";
	selectedTags.forEach((filter) => {
		return filterElements.append(
			createDomElements(
				"div",
				`${filter.label}`,
				{ class: `filter__request__${filter.type}` },
				createDomElements("i", { class: "fas fa-times-circle filter__request__icon" })
			)
		);
	});
    console.log(selectedTags)
	searchIntoFilters(recipes, selectedTags);
};

const searchIntoFilters = (input, filters = []) => {
    recipesFiltered(input);
	const filterRequest = document.querySelectorAll(".filter__request__ingredient, .filter__request__ustensil, .filter__request__device");
	filters = Array.from(filterRequest);
	recipes = recipes.filter((recipe) => {
		return filters.filter((item) => {
			const formatedElement = item.textContent.toLowerCase();
			return (
				recipe.ingredients.map((el) => {
					return el.ingredient.toLowerCase().includes(formatedElement);
				}) ||
				recipe.appliance.toLowerCase().includes(formatedElement) ||
				recipe.ustensils.map((ustensil) => {
					return ustensil.toLowerCase() === formatedElement;
				})
			);
		});
	});
	if (filters.length) {
		recipesPart.innerHTML = "";
		generateRecipesMainPart(filters);
		searchFilterOnClick(filters, input);
	} else if (!filters.length) {
		searchFilterOnClick(filters, input);
		recipesPart.innerHTML = "";
		recipesPart.append(
			createDomElements(
				"div",
				`Aucune recette ne correspond à votre critère… vous pouvez
		chercher « tarte aux pommes », « poisson », etc.`,
				{ class: "no__matching" }
			)
		);
	};
};

const searchFilterOnClick = (filters, input) => {
	filters.forEach((filter) => {
		filter.addEventListener("click", () => {
			removeTag(input, selectedTags);
		});
	});
};

const removeTag = (tag) => {
    selectedTags = selectedTags.filter(item => item !== tag);
    searchIntoFilters(userInput, selectedTags);
}

/* filterArray = filtersArray.filter (item => {
    item.textContent != filterSelected.textContent});
    return (!filterArray) ? (recipesPart.innerHTML = "", generateRecipesMainPart(recipes)) : searchIntoFilters(recipes, filtersArray);
*/

/*
	const index = filtersArray.indexOf(filterSelected);
	filtersArray.slice(index, 0);
	filterSelected.remove();
	filtersSelected.splice(0, filtersSelected.length)
	if (!filtersArray.length) {
		recipesPart.innerHTML = "";
		generateRecipesMainPart(recipes);
	} else {
		searchIntoFilters(recipes, filtersArray);
	}
*/