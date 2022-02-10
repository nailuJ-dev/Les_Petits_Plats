import BuilderMainPart from '../Builder/builderMainPart.js'
import * as domElement from '../Utilities/frequentDomElement.js'
// function to create HTML elements with tag and anyone node

const createDomElements = (tag, ...childs) => {
	const element = document.createElement(tag)
	childs.forEach(child => {
		if (typeof child === 'string') {
			const nodeText = document.createTextNode(child);
			element.append(nodeText);
		} else if (child instanceof HTMLElement) {
			element.append(child);
		} else if (child instanceof Object) {
			Object.entries(child).forEach(([key, value]) => {
				element.setAttribute(key, value);
			});
		};
	});
	return element;
};

const generateRecipesMainPart = (recipes) => {
	recipes.forEach((recipe) => {
		recipesPart.append(new BuilderMainPart(recipe).createMainPart);
	});
};

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

const createFilterElement = (tagFilter) => {
    domElement.filterElements.innerHTML = "";
	tagFilter.forEach((filter) => {
		return domElement.filterElements.append(
			createDomElements(
				"div",
				`${filter.label}`,
				{ class: `filter__request__${filter.type}` },
				createDomElements("i", { class: "fas fa-times-circle filter__request__icon" })
			)
		);
	});
}

const tagIngredientDisplay = (results, domName) => {
	domName.innerHTML = "";
	results.forEach((item) => {
		return domName.append(createDomElements("li", `${item}`, { class: "ingredients__item" }));
	});
};

const tagDeviceDisplay = (results, domName) => {
	domName.innerHTML = "";
	results.forEach((item) => {
		return domName.append(createDomElements("li", `${item}`, { class: "devices__item" }));
	});
};

const tagUstensilDisplay = (results, domName) => {
	domName.innerHTML = "";
	results.forEach((item) => {
		return domName.append(createDomElements("li", `${item}`, { class: "ustensiles__item" }));
	});
};
