

const generateTagFilters = (recipes) => {
	let ingredients = [];
	let appliance = [];
	let ustensils = []
	recipes.forEach(item => {
		ingredients = [...new Set([...ingredients, ...item.ingredients.map(ing => ing.ingredient)])];
		appliance = [...appliance, item.appliance];
		ustensils = [...ustensils, ...item.ustensils];
	})

	return {ingredients, appliance, ustensils}
};


const tagGenetation = ({ingredients}, recipes) => {
	const ingredientsWrapper = document.querySelector(".ingredients__results");
	const ingredientsForm = document.querySelector(".ingredients__form");
	ingredientsForm.addEventListener('click', () => {
		ingredientsWrapper.classList.replace("ingredients__hidden__results","ingredients__displayed__results");
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
		}); 
	})

}

const generateRecipesMainPart = (recipes) => {
	recipes.forEach((recipe) => {
		recipesPart.append(new BuilderMainPart(recipe).createMainPart);
	});
	const tags = generateTagFilters(recipes);
	tagGenetation(tags, recipes)
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