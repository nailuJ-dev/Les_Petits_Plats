import Buttons from "../page/button.js";
import DataByDefault from "../utilities/datasList.js";
import PageBuilder from "../page/pageBuilder.js";
import SearchingMessageBuilder from "../page/searchingMessage.js";
import SearchAlgorithm from "../search/firstAlgo.js";
import TagsElement from "../page/tags.js";
import Utils from "../utilities/utils.js";
export default class UstensilsFilter {
    static exampleUstensils = document.getElementById('exampleUstensil');

    static init(ustensils, recipes) {
        Utils.filtersCleared(this.exampleUstensils);
        Buttons.buttonsLaunching(document.querySelector("#ustensils > button"),
            document.querySelector("#ustensilsFilterOpen"),
            document.querySelector("#ustensilsFilterClose"),
            document.querySelector("#ustensilsFilterHidden"));
        this.fillingUstensils(Utils.sortedByTitle(ustensils));
        this.searchingInput(ustensils);
        this.filteringTags(recipes);
        return this;
    }
    // Display ustensils in ustensil filter area
    static fillingUstensils(ustensils) {
        let ul = document.createElement('ul');
        ul.classList.add('ustensilsUlList');
        this.exampleUstensils.appendChild(ul);

        ustensils.forEach((ustensils) => {
            let listUstensils = document.createElement('li');

            listUstensils.innerHTML = `${Utils.upperText(ustensils)}`
            ul.appendChild(listUstensils);
            listUstensils.classList.add('list-ustensils');
            listUstensils.setAttribute('data-filter', `${ustensils}`);
        });
    };
    // Searching for ustensils input from ustensils in the recipes displayed
    static searchingInput(ustensils) {
        document.getElementById('inputUstensil').addEventListener('keyup', (key) => {
            let searchingValue = key.target.value;
            Utils.filtersCleared(this.exampleUstensils);
            this.fillingUstensils(
                Utils.characterValid(searchingValue) ?
                SearchAlgorithm.searchingByInput(ustensils, searchingValue) :
                Utils.sortedByTitle(ustensils));
        });
    };

    static filteringTags(recipes) {
        let selected = [];
        let ustensilTag = document.getElementById('tagsUtensil');

        document.querySelector('#exampleUstensil').addEventListener('click', (event) => {
            let valueClass = event.target.classList.value;

            if (-1 === valueClass.indexOf('selected')) {
                event.target.classList.add('selected');
                selected.push(event.target.getAttribute('data-filter'));
                Buttons.buttonshideClick(document.querySelector("#ustensils > button"),
                    document.querySelector("#ustensilsFilterOpen"),
                    document.querySelector("#ustensilsFilterHidden"))
                TagsElement.tagsBuilder(ustensilTag, Utils.upperText(event.target.getAttribute('data-filter')))
                    .removingTagClick(document.querySelector("#tagsUtensil > i"), event, ustensilTag, recipes);
                SearchingMessageBuilder.finalResultMessageBuilder(SearchAlgorithm.searchingByUstensils(recipes, selected));
                Utils.recipeSectionCleared();
                PageBuilder.finalDisplayBuilder(SearchAlgorithm.searchingByUstensils(recipes, selected));
                Utils.filtersCleared(this.exampleUstensils);
                this.fillingUstensils(Utils.sortedByTitle(DataByDefault.getDefaultUstensils(SearchAlgorithm.searchingByUstensils(recipes, selected))));
            } else {
                selected.splice(event.target.getAttribute('data-filter'));
                TagsElement.clearingSection(event, ustensilTag, recipes);
            };
        });
        return selected;
    };
};