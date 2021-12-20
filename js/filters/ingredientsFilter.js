import Buttons from "../page/button.js";
import PageBuilder from "../page/pageBuilder.js";
import SearchingMessageBuilder from "../page/searchingMessage.js";
import Utils from "../utilities/utils.js";
import DataByDefault from "../utilities/datasList.js";
import SearchAlgorithm from "../search/firstAlgo.js";
import TagsElement from "../page/tags.js";

export default class IngredientFilter {
    static exampleIngredients = document.getElementById('exampleIngredient');

    static init(ingredients, recipes) {
        Utils.filtersCleared(this.exampleIngredients);
        Buttons.buttonsLaunching(document.querySelector("#ingredients > button"),
            document.querySelector("#ingredientsFilterOpen"),
            document.querySelector("#IngredientsFilterClose"),
            document.querySelector("#IngredientsFilterHidden"));
        this.fillingIngredients(Utils.sortedByTitle(ingredients));
        this.searchingInput(ingredients);
        this.filteringTags(recipes);
    }    
    // Display ingredients in ingredients filter area
    static fillingIngredients(ingredients) {
        let ul = document.createElement('ul');
        ul.classList.add('ingredientsUlList');
        this.exampleIngredients.appendChild(ul);

        ingredients.forEach((ingredient) => {
            let listIngredients = document.createElement('li');
            
            ul.appendChild(listIngredients);
            listIngredients.innerHTML = `${Utils.upperText(ingredient)}`
            listIngredients.classList.add('list-ingredients');
            listIngredients.setAttribute('data-filter', `${ingredient}`);
        });
    };

    // Searching for ingredients input from ingredients in the recipes displayed
    static searchingInput(ingredients) {
        document.getElementById('inputIngredients').addEventListener('keyup', (key) => {
            let searchingValue = key.target.value;
            Utils.filtersCleared(this.exampleIngredients);
            this.fillingIngredients(
                Utils.characterValid(searchingValue) ?
                SearchAlgorithm.searchInputFilters(ingredients, searchingValue) :
                Utils.sortedByTitle(ingredients));
        });
    };

    static filteringTags(recipes) {
        let selected = [];
        let ingredientTag = document.getElementById('tagsIngredient');

        document.querySelector('#exampleIngredient').addEventListener('click', (event) => {
            let valueClass = event.target.classList.value;

            if (-1 === valueClass.indexOf('selected')) {
                event.target.classList.add('selected');
                selected.push(event.target.getAttribute('data-filter'));
                Buttons.buttonshideClick(document.querySelector("#ingredients > button"),
                    document.querySelector("#ingredientsFilterOpen"),
                    document.querySelector("#IngredientsFilterHidden"))
                TagsElement.tagsBuilder(ingredientTag, Utils.upperText(event.target.getAttribute('data-filter')))
                    .removingTagClick(document.querySelector("#tagsIngredient > i"), event, ingredientTag, recipes);
                SearchingMessageBuilder.finalResultMessageBuilder(SearchAlgorithm.searchingByIngredient(recipes, selected));
                Utils.recipeSectionCleared();
                let result = SearchAlgorithm.searchingByIngredient(recipes, selected);
                PageBuilder.finalDisplayBuilder(result);
                Utils.filtersCleared(this.exampleIngredients);
                this.fillingIngredients(Utils.sortedByTitle(DataByDefault.getDefaultIngredients(result)));
            } else {
                selected.splice(event.target.getAttribute('data-filter'));
                TagsElement.clearingSection(event, ingredientTag, recipes);
            };
        });
        return selected;
    };
}