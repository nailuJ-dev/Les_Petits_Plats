
const generateTagFilters = (recipes) => {
	let ingredients = [];
	let appliance = [];
	let ustensils = []
	recipes.forEach(item => {
        ingredients = [...new Set([...ingredients, ...item.ingredients.map((el) => el.ingredient)])].sort();
		ustensils = [...new Set([...ustensils, ...item.ustensils.map((ustensil) => ustensil)])].sort();
		appliance = [...new Set([...appliance, ...[item.appliance]])].sort();
	})
	return { ingredients, appliance, ustensils }
};

const tagGenetationIng = ({ ingredients }, recipes) => {
	const ingredientsWrapper = document.querySelector(".ingredients__results");
	const ingredientsForm = document.querySelector(".ingredients__form");
	ingredientsForm.addEventListener('click', () => {
        if (ingredientsWrapper.classList.contains("ingredients__displayed__results")) {
			ingredientsWrapper.classList.replace("ingredients__displayed__results","ingredients__hidden__results")
			ingredientsWrapper.innerHTML = "";
        } else {
		ingredientsWrapper.classList.replace("ingredients__hidden__results","ingredients__displayed__results");
        devicesWrapper.classList.replace("devices__displayed__results","devices__hidden__results");
        ustensilesWrapper.classList.replace("ustensiles__displayed__results","ustensiles__hidden__results");
		console.log({ingredients})
		ingredientsWrapper.innerHTML = "";

		ingredients.forEach((ingredient) => {
			const el = createDomElements("li",` ${ingredient}`, { class: "ingredients__item" })
			el.addEventListener('click', e => {
				const tag = createDomElements(
					"div",
					`${el.innerText}`,
					{ class: `filter__request__ingredient` },
					createDomElements("i", { class: "fas fa-times-circle filter__request__icon" })
				)
				filterElements.append(tag);
				const recipesToDisplay = getFilteredRecipes(recipes);
				recipesPart.innerHTML = "";
				generateRecipesMainPart(recipesToDisplay)
			})
			return ingredientsWrapper.append(el);
		})};
	})
}

const tagGenetationApp = ({ appliance }, recipes) => {
	const devicesWrapper = document.querySelector(".devices__results");
	const devicesForm = document.querySelector(".devices__form");
	devicesForm.addEventListener('click', () => {
        if (devicesWrapper.classList.contains("devices__displayed__results")) {
			devicesWrapper.classList.replace("devices__displayed__results","devices__hidden__results")
			devicesWrapper.innerHTML = "";
        } else {
		devicesWrapper.classList.replace("devices__hidden__results","devices__displayed__results");
        ustensilesWrapper.classList.replace("ustensiles__displayed__results","ustensiles__hidden__results");
        ingredientsWrapper.classList.replace("ingredients__displayed__results","ingredients__hidden__results");
		console.log({appliance})
		devicesWrapper.innerHTML = "";

		appliance.forEach((applia) => {
			const el = createDomElements("li",` ${applia}`, { class: "devices__item" })
			el.addEventListener('click', e => {
				const tag = createDomElements(
					"div",
					`${el.innerText}`,
					{ class: `filter__request__device` },
					createDomElements("i", { class: "fas fa-times-circle filter__request__icon" })
				)
				filterElements.append(tag);
				const recipesToDisplay = getFilteredRecipes(recipes);
				recipesPart.innerHTML = "";
				generateRecipesMainPart(recipesToDisplay)
			})
			return devicesWrapper.append(el);
		})};
	})
}

const tagGenetationUst = ({ ustensils }, recipes) => {
	const ustensilesWrapper = document.querySelector(".ustensiles__results");
	const ustensilesForm = document.querySelector(".ustensiles__form");
	ustensilesForm.addEventListener('click', () => {
        if (ustensilesWrapper.classList.contains("ustensiles__displayed__results")) {
			ustensilesWrapper.classList.replace("ustensiles__displayed__results","ustensiles__hidden__results")
			ustensilesWrapper.innerHTML = "";
        } else {
		ustensilesWrapper.classList.replace("ustensiles__hidden__results","ustensiles__displayed__results");
        devicesWrapper.classList.replace("devices__displayed__results","devices__hidden__results");
        ingredientsWrapper.classList.replace("ingredients__displayed__results","ingredients__hidden__results");
		console.log({ ustensils })
		ustensilesWrapper.innerHTML = "";

		ustensils.forEach((ustensil) => {
			const el = createDomElements("li",` ${ustensil}`, { class: "ustensiles__item" })
			el.addEventListener('click', e => {
				const tag = createDomElements(
					"div",
					`${el.innerText}`,
					{ class: `filter__request__ustensil` },
					createDomElements("i", { class: "fas fa-times-circle filter__request__icon" })
				)
				filterElements.append(tag);
				const recipesToDisplay = getFilteredRecipes(recipes);
				recipesPart.innerHTML = "";
				generateRecipesMainPart(recipesToDisplay)
			})
			return ustensilesWrapper.append(el);
		})};
	});
};

const tagRemove = () => {
    const filterRequest = document.querySelectorAll(".filter__request__ingredient, .filter__request__ustensil, .filter__request__device");
    filterRequest.addEventListener('click', () => {
        
    })
}

const removeTags = (tag) => {
    userTags = userTags.filter(item => item !== tag);
    getFilteredRecipes(userTags);
};

const generateRecipesMainPart = (recipes) => {
	recipes.forEach((recipe) => {
		recipesPart.append(new BuilderMainPart(recipe).createMainPart);
	});
	const tags = generateTagFilters(recipes);
	tagGenetationIng(tags, recipes)
    tagGenetationApp(tags, recipes)
    tagGenetationUst(tags, recipes)
};


const getFilteredRecipes = (recipes) => {
	const { value: mainInput } = mainSearchBarInput;
	const { value: ingredientInput } = ingredientsInput; // ingredientInput, applianceInput & ustensileInput are the chart of selectionned tags
	const { value: applianceInput } = devicesInput;
	const { value: ustensileInput } = ustensilesInput;
	console.log(ingredientInput)
	if (!mainInput && !ingredientInput && !applianceInput && !ustensileInput) {
		return recipes
	}

	const newBatch = recipes.filter(recipe => {
		const {name, ingredients, ustensils, description, appliance} = recipe;
		const mappedIngredients = ingredients.map(item => item.ingredient);
		let flag = false

		for (item in  {name, ustensils, description, appliance, mappedIngredients}) {
			
			if (item === 'mappedIngredients' ) {
				if (mappedIngredients.includes(mainInput)) {
					flag = true;
					break;
				}
				continue;
			} 

			if (recipe[item].includes(mainInput)) {
				flag = true;
				break;
			}
		}
		return flag;
	});

	let ingredientTagsRecipes = newBatch
	if (ingredientInput) {
		ingredientTagsRecipes = ingredientTagsRecipes.filter(recipe => {
			const mappedIngredients = recipe.ingredients.map(item => item.ingredient);
			let flag = false;
			if ((mappedIngredients.includes(ingredientInput))) {
				flag = true;
			}
			return flag;
		})
	}

	let ustensilesTagsRecipes = ingredientTagsRecipes
	if (ustensileInput) {
		ustensilesTagsRecipes = ustensilesTagsRecipes.filter(recipe => {
			let flag = false;
			if ((recipe.ustensils.includes(ustensileInput))) {
				flag = true;
			}
			return flag;
		})
	}

	let applianceTagsRecipes = ustensilesTagsRecipes
	if (applianceInput) {
		applianceTagsRecipes = applianceTagsRecipes.filter(recipe => {
			let flag = false;
			if ((recipe.appliance.includes(applianceInput))) {
				flag = true;
			}
			return flag;
		})
	}
	return applianceTagsRecipes;
}

const init = async () => {
		const res = await getData();
		const data = await res.json();
		//
    let recipes = data.recipes

		const recipesToDisplay = getFilteredRecipes(recipes);
    generateRecipesMainPart(recipesToDisplay)

		mainSearchBarInput.addEventListener('keyup', e => {
			if (!e.target.value) {
				const recipesToDisplay = getFilteredRecipes(recipes);
				recipesPart.innerHTML = "";
				generateRecipesMainPart(recipesToDisplay)
			}
			if (e.target.value.length > 2) {
				const recipesToDisplay = getFilteredRecipes(recipes);
				recipesPart.innerHTML = "";
				generateRecipesMainPart(recipesToDisplay)
			}
		})
    // generateFilters(recipes);
    // inputEventsOnClick(recipes);
    // recipesFiltered(mainSearchBarInput, recipes);
};

init();