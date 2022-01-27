const createFilterElements = (selectedUnduplicatedFilters, filterTag) => {
	filterElements.innerHTML = "";
	selectedUnduplicatedFilters.forEach((filter) => {
		return filterElements.append(
			createDomElements(
				"div",
				`${filter.label}`,
				{ class: `filter__request__${filter.type}` },
				createDomElements("i", { class: "fas fa-times-circle filter__request__icon" })
			)
		);
	});
    console.log(selectedUnduplicatedFilters)
    console.log()
	searchIntoFilters(filterTag, selectedUnduplicatedFilters);
};

const searchIntoFilters = (recipes) => {
	const filterRequest = document.querySelectorAll(".filter__request__ingredient, .filter__request__ustensil, .filter__request__device");
	const filters = Array.from(filterRequest);
	const result = recipes.filter((recipe) => {
		return filters.every((item) => {
			const formatedElement = item.textContent.toLowerCase();
			return (
				recipe.ingredients.some((el) => {
					return el.ingredient.toLowerCase().includes(formatedElement);
				}) ||
				recipe.appliance.toLowerCase().includes(formatedElement) ||
				recipe.ustensils.some((ustensil) => {
					return ustensil.toLowerCase() === formatedElement;
				})
			);
		});
	});
	if (result.length) {
		recipesPart.innerHTML = "";
		generateRecipesMainPart(result);
		searchFilterOnClick(filters, recipes);
	} else if (!result.length) {
		searchFilterOnClick(filters, recipes);
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

const searchFilterOnClick = (filters, filterTag) => {
	filters.forEach((filter) => {
		filter.addEventListener("click", () => {
			removeFilter(filter, filters, filterTag);
		});
	});
};

const removeFilter = (filterSelected, filtersArray, filterTag) => { // replace recipes by filterTag
	const index = filtersArray.indexOf(filterSelected);
	filtersArray.slice(index, 0);
	filterSelected.remove();
	filtersSelected.splice(0, filtersSelected.length)
	if (!filtersArray.length) {
		recipesPart.innerHTML = "";
		generateRecipesMainPart(filterTag);
	} else {
		searchIntoFilters(filterTag, filtersArray);
	}
};

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