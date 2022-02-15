const generateFilters = (input) => {
	let ingredients = [];
	let devices = [];
	let ustensiles = [];
	input.forEach((recipe) => {
		ingredients = [...new Set([...ingredients, ...recipe.ingredients.map((el) => el.ingredient)])].sort();
		ustensiles = [...new Set([...ustensiles, ...recipe.ustensils.map((ustensil) => ustensil)])].sort();
		devices = [...new Set([...devices, ...[recipe.appliance]])].sort();
	});
	return { ingredients, ustensiles, devices };
};

const generateRecipesMainPart = (recipes) => {
	console.log({recipes})
	recipes.forEach((recipe) => {
		recipesPart.append(new BuilderMainPart(recipe).createMainPart);
	});
};


const getFilteredRecipes = (recipes) => {
	const { value: mainInput } = mainSearchBarInput;
	const { value: ingredientInput } = ingredientsInput;
	const { value: applianceInput } = devicesInput;
	const { value: ustensileInput } = ustensilesInput;

	if (!mainInput && !ingredientInput && !applianceInput && !ustensileInput) {
		return recipes
	}

	const newBatch = recipes.filter(recipe => {
		const { name, ingredients, ustensils, description, appliance } = recipe;
		const mappedIngredients = ingredients.map(item => item.ingredient);
		let flag = false

		for (item in {name, ustensils, description, appliance, mappedIngredients}) {
			
			if (item === 'mappedIngredients') {
				if (mappedIngredients.includes(mainInput.toLowerCase())) {
					flag = true;
					break;
				}
				continue;
			} 

			if (recipe[item].includes(mainInput.toLowerCase())) {
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
			if ((mappedIngredients.includes(ingredientInput.toLowerCase()))) {
				flag = true;
			}
			return flag;
		})
	}

	let ustensilesTagsRecipes = ingredientTagsRecipes
	if (ustensileInput) {
		ustensilesTagsRecipes = ustensilesTagsRecipes.filter(recipe => {
			let flag = false;
			console.log(recipe)
			if ((recipe.ustensils.includes(ustensileInput.toLowerCase()))) {
				flag = true;
			}
			return flag;
		})
	}

	let applianceTagsRecipes = ustensilesTagsRecipes
	if (applianceInput) {
		applianceTagsRecipes = applianceTagsRecipes.filter(recipe => {
			let flag = false;
			if ((recipe.appliance.includes(applianceInput.toLowerCase()))) {
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
		if (e.target.value.length > 2) {
			const recipesToDisplay = getFilteredRecipes(recipes);
			recipesPart.innerHTML = "";
			generateRecipesMainPart(recipesToDisplay)
		} else {
            recipesPart.innerHTML = "";
			generateRecipesMainPart(recipes)
        }
    })
    // generateFilters(recipes);
    // inputEventsOnClick(recipes);
    // recipesFiltered(mainSearchBarInput, recipes);
};

init();