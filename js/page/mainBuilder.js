import AppliancesFilter from "../filters/appliancesFilter.js";
import DataByDefault from "../utilities/datasList.js";
import PageBuilder from "./pageBuilder.js";
import IngredientFilter from "../filters/ingredientsFilter.js";
import SearchingMessageBuilder from "./searchingMessage.js";
import UstensilsFilter from "../filters/ustensilsFilter.js";
export default class MainBuilder {
    static init() {
        // Build Section with all Recipes before Search
        PageBuilder.finalDisplayBuilder(recipesApi);
        SearchingMessageBuilder.hideMessageDisplay();
        // Ingredients logic
        IngredientFilter.init(DataByDefault.getDefaultIngredients(recipesApi), recipesApi);
        // Appliances logic
        AppliancesFilter.init(DataByDefault.getDefaultAppliances(recipesApi), recipesApi);
        // Ustensils logic
        UstensilsFilter.init(DataByDefault.getDefaultUstensils(recipesApi), recipesApi);
    };

    static initSearch(result) {
        // Build Section after Search
        PageBuilder.finalDisplayBuilder(result.recipesMatch);
        SearchingMessageBuilder.finalResultMessageBuilder(result.recipesMatch);
        // Ingredients logic
        IngredientFilter.init(result.ingredients, result.recipesMatch);
        // Appliances logic
        AppliancesFilter.init(result.appliances, result.recipesMatch);
        // Ustensils logic
        UstensilsFilter.init(result.ustensils, result.recipesMatch);
    };
};