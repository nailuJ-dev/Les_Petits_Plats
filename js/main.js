const generateFilters = (input) => {
	let ingredients = [];
	let appliance = [];
	let ustensils = [];
	input.forEach((recipe) => {
		ingredients = [...new Set([...ingredients, ...recipe.ingredients.map((el) => el.ingredient)])].sort();
		ustensils = [...new Set([...ustensils, ...recipe.ustensils.map((ustensil) => ustensil)])].sort();
		appliance = [...new Set([...appliance, ...[recipe.appliance]])].sort();
	});
	return { ingredients, ustensils, appliance };
};

const generateRecipesMainPart = (recipes) => {
	console.log({recipes})
	recipes.forEach((recipe) => {
		recipesPart.append(new BuilderMainPart(recipe).createMainPart);
	});
};


let lastSearching = [];

export function getLastSearching() {
    return lastSearching;
};

export function searching(request, appliance, ustensil, ingredients) {
    console.time("searching");
    let recipes = data.recipes;
    recipes = applianceMatching(recipes, appliance.toLowerCase());
    recipes = ustensilsMatching(recipes, ustensil.toLowerCase());
    recipes = ingredientsMatching(recipes, ingredients.toLowerCase());
    recipes = descriptionMatching(recipes, request.toLowerCase());
    lastSearching = [appliance, ustensil, ingredients, recipes];
    console.timeEnd("searching");
    return recipes;
};

function applianceMatching(recipes, appliance) {
    let recipesMatched = [];
    for (let recipe of recipes) {
        if (recipe.appliance.toLowerCase().includes(appliance)) {
            recipesMatched.push(recipe)
        }
    }
    return recipesMatched;
}

function ustensilsMatching(recipes, ustensil) {
    let recipesMatched = [];
    for (let recipe of recipes) {
        if (ustensil == "" || recipe.ustensils.filter(usten => usten.includes(ustensil)).length > 0) {
            recipesMatched.push(recipe)
        }
    }
    return recipesMatched;
}

function ingredientsMatching(recipes, ingredients) {
    let recipesMatched = [];
    for (let recipe of recipes) {
        let ingredientsMatched = []
        ingredients.forEach(ingredient => {
            ingredientsMatched.push(
                recipe.ingredients.filter(recIngredient =>
                    recIngredient.ingredient.toLowerCase().includes(ingredient.toLowerCase())
                ).length > 0 
        )})
        if (ingredientsMatched.every(match => match == true)) {
            recipesMatched.push(recipe)
        }
    }
    return recipesMatched;
}

function descriptionMatching(recipes, request) {
    let recipesMatched = [];
    for (let recipe of recipes) {
        if (recipe.name.toLowerCase().includes(request) ||
            recipe.description.toLowerCase().includes(request) ||
            recipe.ingredients.filter(ingredient => ingredient.ingredient.toLowerCase().includes(request)).length > 0) {
                recipesMatched.push(recipe)
        }
    }
    return recipesMatched;
}

const init = async () => {
	const res = await getData();
	const data = await res.json();
		//
    let recipes = data.recipes

    let lastSearching = [];

};

init();