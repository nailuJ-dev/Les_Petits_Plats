import recipes from '../datas/recipesDatas.js'
import DataByDefault from '../utilities/datasList.js'

let currentSearch = [];
export function getCurrentSearch() {
    return currentSearch;
};

export function search (request, appliance, ustensil, ingredients) {
    console.time('search');
    let recipes = recipesApi;
    recipes = matchingAppliance(recipes, appliance.toLowerCase());
    recipes = matchingUstensils(recipes, ustensil.toLowerCase());
    recipes = matchingIngredients(recipes, ingredients);
    recipes = matchingName(recipes, request.toLowerCase());
    currentSearch = [appliance, ustensil, ingredients, recipes];
    console.timeEnd('search');
    return {
        'recipesMatch': recipes,
        'ingredients': DataByDefault.getDefaultIngredients(recipes),
        'appliances': DataByDefault.getDefaultAppliances(recipes),
        'ustensils': DataByDefault.getDefaultUstensils(recipes),
    };
};

function matchingAppliance (recipes, appliance) {
    let recipesMatch = [];
    for (let recipe of recipes) {
        if (recipe.appliance.toLowerCase().includes(appliance)) {
            recipesMatch.push(recipe);
        };
    };
    return recipesMatch;
};

function matchingUstensils (recipes, ustensil) {
    let recipesMatch = [];
    for (let recipe of recipes) {
        if (ustensil == '' || recipe.ustensils.filter(usten => usten.includes(ustensil)).length > 0) {
            recipesMatch.push(recipe);
        };
    };
    return recipesMatch;
};

function matchingIngredients(recipes, ingredients) {
    let recipesMatch = [];
    for (let recipe of recipes) {
        let ingredientsMatch = [];
        ingredients.forEach(element => {
            ingredientsMatch.push(recipe.ingredients.filter(el => el.ingredient.toLowerCase().includes(element.toLowerCase())).length > 0)
        });
        if (ingredientsMatch.every(el => el == true)) {
            recipesMatch.push(recipe);
        };
    };
    return recipesMatch;
};

function matchingName(recipe, request) {
    let recipesMatch = [];
    for (let recipe of recipes) {
        if (recipe.name.toLowerCase().includes(request) ||
            recipe.description.toLowerCase().includes(request) ||
            recipe.ingredients.filter(element => element.ingredient.toLowerCase().includes(request)).length > 0) {
                recipesMatch.push(recipe);
        };
    };
    return recipesMatch
};