import Buttons from "../page/button.js";
import PageBuilder from "../page/pageBuilder.js";
import SearchingMessageBuilder from "../page/searchingMessage.js";
import Utils from "../utilities/utils.js";
import DataByDefault from "../utilities/datasList.js";
import SearchAlgorithm from "../search/firstAlgo.js";
import TagsElement from "../page/tags.js";

export default class AppliancesFilter {
    static exampleAppliances = document.getElementById('exampleAppliance');

    static init(appliances, recipes) {
        Utils.filtersCleared(this.exampleAppliances);
        Buttons.buttonsLaunching(document.querySelector("#devices > button"),
            document.querySelector("#deviceFilterOpen"),
            document.querySelector("#deviceFilterClose"),
            document.querySelector("#deviceFilterHidden"));
        this.fillingAppliances(Utils.sortedByTitle(appliances));
        this.searchingInput(appliances);
        this.filteringTags(recipes);
        return this;
    }

    // Display devices in devices filter area
    static fillingAppliances(appliances) {
        let ul = document.createElement('ul');
        ul.classList.add('deviceUlList');
        this.exampleAppliances.appendChild(ul);

        appliances.forEach((appliances) => {
            let listAppliances = document.createElement('li');

            listAppliances.innerHTML = `${Utils.upperText(appliances)}`
            ul.appendChild(listAppliances);
            listAppliances.classList.add('list-devices');
            listAppliances.setAttribute('data-filter', `${appliances}`);
        });
    };

    // Searching for devices input from devices in the recipes displayed
    static searchingInput(appliances) {
        document.getElementById('inputAppliance').addEventListener('keyup', (key) => {
            let searchingValue = key.target.value;
            Utils.filtersCleared(this.exampleAppliances);
            this.fillingAppliances(
                Utils.characterValid(searchingValue) ?
                SearchAlgorithm.searchInputFilters(appliances, searchingValue) :
                Utils.sortedByTitle(appliances));
        });
    };

    static filteringTags(recipes) {
        let selected = [];
        let deviceTag = document.getElementById('tagsDevice');

        document.querySelector('#exampleAppliance').addEventListener('click', (event) => {
            let valueClass = event.target.classList.value;

            if (-1 === valueClass.indexOf('selected')) {
                event.target.classList.add('selected');
                selected.push(event.target.getAttribute('data-filter'));
                Buttons.buttonshideClick(document.querySelector("#devices > button"),
                    document.querySelector("#deviceFilterOpen"),
                    document.querySelector("#deviceFilterHidden"))
                TagsElement.tagsBuilder(deviceTag, Utils.upperText(event.target.getAttribute('data-filter')))
                    .removingTagClick(document.querySelector("#tagsDevice > i"), event, deviceTag, recipes);
                SearchingMessageBuilder.finalResultMessageBuilder(SearchAlgorithm.searchingByAppliance(recipes, selected));
                Utils.recipeSectionCleared();
                PageBuilder.finalDisplayBuilder(SearchAlgorithm.searchingByAppliance(recipes, selected));
                Utils.filtersCleared(this.exampleAppliances);
                this.fillingAppliances(Utils.sortedByTitle(DataByDefault.getDefaultAppliances(SearchAlgorithm.searchingByAppliance(recipes, selected))));
            } else {
                selected.splice(event.target.getAttribute('data-filter'));
                TagsElement.clearingSection(event, deviceTag, recipes);
            };
        });
        return selected;
    };
};