import PageBuilder from "../page/pageBuilder.js";
import SearchingMessageBuilder from "../page/searchingMessage.js";
import Utils from "../utilities/utils.js";
import IngredientFilter from "../filters/ingredientsFilter.js";
import AppliancesFilter from "../filters/appliancesFilter.js";
import UstensilsFilter from "../filters/ustensilsFilter.js";
import DataByDefault from "../utilities/datasList.js";
import MainBuilder from "./mainBuilder.js";

export default class TagsElement {
    static IngredientsFilterHidden = document.querySelector('#IngredientsFilterHidden');
    static deviceFilterHidden = document.querySelector('#deviceFilterHidden');
    static ustensilsFilterHidden = document.querySelector('#ustensilsFilterHidden');

    static tagsBuilder(element, tag) {
        this.filterPushDownButton();
        this.displayingTag(element);
        this.fillingTag(element, tag);
        return this;
    };

    static displayingTag(element) {
        return element.style.display = 'flex';
    };

    static fillingTag(element, tag) {
        return element.innerHTML = tag + ` <i class='far fa-times-circle'></i>`;
    };

    static hidingTag(element) {
        this.filterPushUpButton();

        return element.style.display = 'none';
    };

    static filterPushDownButton() {
        this.IngredientsFilterHidden.style.top = '240px';
        this.deviceFilterHidden.style.top = '240px';
        this.ustensilsFilterHidden.style.top = '240px';
    }

    static filterPushUpButton() {
        this.IngredientsFilterHidden.style.top = '195px';
        this.deviceFilterHidden.style.top = '195px';
        this.ustensilsFilterHidden.style.top = '195px';
    }

    static removingTagClick(tag, event, tagElement, recipes) {
        tag.addEventListener('click', () => {
            this.clearingSection(event, tagElement, recipes);
        });
    };

    static clearingSection(event, tagElement, recipes) {
        event.target.classList.remove('selected');
        this.hidingTag(tagElement);
        SearchingMessageBuilder.finalResultMessageBuilder(recipes);
        Utils.recipeSectionCleared();
        PageBuilder.finalDisplayBuilder(recipes);
        Utils.filtersCleared(document.getElementById('exampleIngredient'));
        IngredientFilter.fillingIngredients(DataByDefault.getDefaultIngredients(recipes));
        Utils.filtersCleared(document.getElementById('exampleAppliance'));
        AppliancesFilter.fillingAppliances(DataByDefault.getDefaultAppliances(recipes));
        Utils.filtersCleared(document.getElementById('exampleUstensil'));
        UstensilsFilter.fillingUstensils(DataByDefault.getDefaultUstensils(recipes));
    };
};