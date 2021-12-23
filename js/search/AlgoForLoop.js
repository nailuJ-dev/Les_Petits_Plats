import DataByDefault from "../utilities/datasList.js";
import Utils from "../utilities/utils.js"
import recipesApi from "../datas/recipesDatas.js"

export default class SearchAlgorithm {
    static searchingInput (value) {
        const recipesMatch = [];

        for (const recipe of recipesApi) {
            if (Utils.lowerText(recipe.name).includes(Utils.lowerText(value)) ||
            Utils.lowerText(recipe.description).includes(Utils.lowerText(value)) ||
            recipe.ingredients.some(element => Utils.lowerText(element.ingredient).includes(value))) {
            recipesMatch.push(recipe);
            };
        };

        // call API datas or transform Datas in an array stocked at const ?
/*        recipesApi.forEach(recipe => {
            if (Utils.lowerText(recipe.name).includes(Utils.lowerText(value))
                || Utils.lowerText(recipe.description).includes(Utils.lowerText(value))
                || recipe.ingredients.some(element => Utils.lowerText(element.ingredient).includes(value))) {
                recipesMatch.push(recipe);
            };
        });
*/
        return {
            'recipesMatch': recipesMatch,
            'ingredients': DataByDefault.getDefaultIngredients(recipesMatch),
            'appliances': DataByDefault.getDefaultAppliances(recipesMatch),
            'ustensils': DataByDefault.getDefaultUstensils(recipesMatch),
        };
    };

    // Searching by input
    static searchingByInput (collection, value) {
        const inputResult = [];
        for (const element of collection) {
            if (Utils.lowerText(element).includes(Utils.lowerText(value))) {
                inputResult.push(element);
            };
        };
/*        collection.forEach(element => {
            if (Utils.lowerText(element).includes(Utils.lowerText(value))) {
                inputResult.push(element);
            };
        }); */
        return inputResult;
    };

    // Searching by ingredients tags
    static searchingByIngredient (recipes, ingredientTag) {
        const ingredientResult = [];
        for (const recipe of recipes) {
            if (recipe.ingredients.some(element => Utils.lowerText(element.ingredient).includes(ingredientTag))) {
                ingredientResult.push(recipe);
            };
        };
/*        recipes.forEach(recipe => {
            if (recipe.ingredients.some(element => Utils.lowerText(element.ingredient).includes(ingredientTag))) {
                ingredientResult.push(recipe);
            };
        }); */
        return ingredientResult;
    };

    // Searching by appliances tags
    static searchingByAppliance (recipes, applianceTag) {
        const applianceResult = [];
        for (const recipe of recipes) {
            if (Utils.lowerText(recipe.appliance).includes(applianceTag)) {
                applianceResult.push(recipe);
            };
        };
        /* recipes.forEach(recipe => {
            if (Utils.lowerText(recipe.appliance).includes(applianceTag)) {
                applianceResult.push(recipe);
            };
        }); */
        return applianceResult;
    };

    // Searching by ustensils tags
    static searchingByUstensils (recipes, ustentilTag) {
        const ustensilsResult = [];
        for (const recipe of recipes) {
            for (let i = 0; Utils.lowerText(i).includes(ustentilTag); i++) {
                ustensilsResult.push(recipe);
            };
        };
/*        recipes.forEach(recipe => {
            recipe.ustensils.forEach(ustensil => {
                if (Utils.lowerText(ustensil).includes(ustentilTag)) {
                    ustensilsResult.push(recipe);
                };
            });
        }); */
        return ustensilsResult;
    };
};