const createFilterElements = (selectedUnduplicatedFilters, recipes) => {
	filterElements.innerHTML = "";
	selectedUnduplicatedFilters.forEach((filter) => {
		return filterElements.append(
			createDomElements(
				"div",
				`${filter}`,
				{ class: "filter__request" },
				createDomElements("i", { class: "fas fa-times-circle filter__request__icon" })
			)
		);
	});
	searchIntoFilters(recipes, selectedUnduplicatedFilters);
};

const searchIntoFilters = (recipes, selectedUnduplicatedFilters) => {
	const filterRequest = document.querySelectorAll(".filter__request");
	const filters = Array.from(filterRequest);
	const result = recipes.filter((recipe) => {
		return filters.every((item) => {
			const formatedElement = item.textContent.toLowerCase();
			return (
				recipe.ingredients.some((el) => {
					return el.ingredient.toLowerCase().includes(formatedElement);
				})
				|| recipe.appliance.toLowerCase().includes(formatedElement)
				|| recipe.ustensils.some((ustensil) => {
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
	}
};

const searchFilterOnClick = (filters, recipes) => {
	filters.forEach((filter) => {
		filter.addEventListener("click", () => {
			removeFilter(filter, filters, recipes);
		});
	});
};

const removeFilter = (filterSelected, filtersArray, recipes) => {
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
};