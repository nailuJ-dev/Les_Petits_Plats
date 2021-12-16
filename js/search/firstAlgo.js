import DataByDefault from "../utilities/datasList.js";
import Utils from "../utilities/utils.js"
import recipes from "../datas/recipesDatas.js"

export default class SearchAlgorithm {
    static searchingInput (value) {
        let recipesMatch = [];

        // call API datas or transform Datas in an array stocked at const ?

        recipes.forEach(recipe => {
            if (Utils.lowerText(recipe.name).includes(Utils.lowerText(value)) || Utils.lowerText(recipe.description).includes(Utils.lowerText(value)) || recipe.ingredients.some(element => Utils.lowerText(element.ingredient).includes(value))) {
                recipesMatch.push(recipe);
            };
        });
        return {
            'recipesMatch': recipesMatch,
            'ingredients': DataByDefault.getDefaultIngredients(recipesMatch),
            'appliances': DataByDefault.getDefaultAppliances(recipesMatch),
            'ustensils': DataByDefault.getDefaultUstensils(recipesMatch),
        };
    };

    // Searching by input
    static searchingByInput(collection, value) {
        let inputResult = [];
        collection.forEach(element => {
            if (Utils.lowerText(element).includes(Utils.lowerText(value))) {
                inputResult.push(element);
            };
        });
        return inputResult;
    };

    // Searching by ingredients tags
    static searchingByIngredient (recipes, ingredientTag) {
        let ingredientResult = [];
        recipes.forEach(recipe => {
            if (recipe.ingredients.some(element => Utils.lowerText(element.ingredient).includes(ingredientTag))) {
                ingredientResult.push(recipe);
            };
        });
        return ingredientResult;
    };

    // Searching by appliances tags
    static searchingByAppliance (recipes, applianceTag) {
        let applianceResult = [];
        recipes.forEach(recipe => {
            if (Utils.lowerText(recipe.appliance).includes(applianceTag)) {
                applianceResult.push(recipe);
            };
        });
        return applianceResult;
    };

    // Searching by ustensils tags
    static searchingByUstensils (recipes, ustentilTag) {
        let ustensilsResult = [];
        recipes.forEach(recipe => {
            recipe.ustensils.forEach(ustensil => {
                if (Utils.lowerText(ustensil).includes(ustentilTag)) {
                    ustensilsResult.push(recipe);
                };
            });
        });
        return ustensilsResult;
    };
};