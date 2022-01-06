import DataByDefault from "../utilities/datasList.js";
import Utils from "../utilities/utils.js"

export default class SearchAlgorithm {

    static searchingInput (value) {
        console.time('searchingInput');
        const recipesMatch = recipesApi.filter(recipe => Utils.lowerText(recipe.name).includes(Utils.lowerText(value)) ||
        Utils.lowerText(recipe.description).includes(Utils.lowerText(value)) ||
        recipe.ingredients.some(element => Utils.lowerText(element.ingredient).includes(value)));
        console.timeEnd('searchingInput');
        return {
            'recipesMatch': recipesMatch,
            'ingredients': DataByDefault.getDefaultIngredients(recipesMatch),
            'appliances': DataByDefault.getDefaultAppliances(recipesMatch),
            'ustensils': DataByDefault.getDefaultUstensils(recipesMatch),
        };
    };

    // Searching by input
    static searchingByInput (collection, value) {
        const inputResult = collection.filter(element => Utils.lowerText(element).includes(Utils.lowerText(value)));
        return inputResult;
    };

    // Searching by ingredients tags
    static searchingByIngredient (recipes, ingredientTag) {
        const ingredientResult = recipes.filter(recipe => recipe.ingredients.some(element => Utils.lowerText(element.ingredient).includes(ingredientTag)));
        return ingredientResult;
    };

    // Searching by appliances tags
    static searchingByAppliance (recipes, applianceTag) {
        const applianceResult = recipes.filter(recipe => Utils.lowerText(recipe.appliance).includes(applianceTag));
        return applianceResult;
    };

    // Searching by ustensils tags
    static searchingByUstensils (recipes, ustentilTag) {
        const ustensilsResult = recipes.filter(recipe => recipe.ustensils.filter(ustensil => Utils.lowerText(ustensil).includes(ustentilTag)));
        return ustensilsResult;
    };
};