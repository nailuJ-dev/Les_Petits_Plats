import recipes from '../datas/recipesDatas.js'

const recipesAnalysis = preformData(recipesApi);
let currentSearch = [];
export function getCurrentSearch() {
    return currentSearch;
};

function preformData (recipesApi) {
    let data = [];
    recipesApi.forEach(recipe => {
        data.push({
            'name': recipe.name.toLowerCase(),
            'description': recipe.description.toLowerCase(),
            'appliance': recipe.appliance.toLowerCase(),
            'ingredients': [...recipe.ingredients.map(ingredient => { return ingredient.ingredient.toLowerCase() })],
            'ustensils': recipe.ustensils,
            'raw': recipe,
        });
    });
    return data;
}

export function search(request, appliance, ustensil, ingredients) {
    console.time('search');
    request = request.toLowerCase();
    appliance = appliance.toLowerCase();
    ustensil = ustensil.toLowerCase();
    ingredients = ingredients.map(ingredient => ingredient.toLowerCase());
    let firstResult = recipes.filter(recipe => matchingAppliance(recipe, appliance) && matchingUstensils(recipe, ustensil) && matchingIngredientsTag(recipe, ingredients) && ( matchingName(recipe, request) || matchingDescription(recipe, request) || matchingIngredients(recipe, request)));
    let finalResult = firstResult.map(x => x.raw);
    console.timeEnd('search');
    currentSearch = [appliance, ustensil, ingredients, finalResult];
    return finalResult;
};

function matchingAppliance (recipe, appliance) {
    return recipe.appliance.indexOf(appliance) !== -1;
};

function matchingUstensils (recipe, ustensil) {
    return ustensil == 0 ? true : recipe.ustensils.indexOf(ustensil) !== -1;
};

function matchingIngredientsTag (recipe, ingredients) {
    return ingredients.every(ingredient => recipe.ingredients.includes(ingredient));
};

function matchingName(recipe, request) {
    return recipe.name.includes(request);
};

function matchingDescription(recipe, request) {
    return recipe.description.includes(request);
};

function matchingIngredients(recipe, request) {
    return recipe.ingredients.filter(ingredient => ingredient.includes(request)).length > 0;
};