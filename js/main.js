// Import modules
import MainBuilder from "./page/mainBuilder.js";
import SearchingMessageBuilder from "./page/searchingMessage.js";
import SearchAlgorithm from "./search/firstAlgo.js";
import Utils from "./utilities/utils.js";

// Default builder without searching
MainBuilder.init();

// Builder with searching
document.getElementById('searchInput').addEventListener('keyup', (key) => {
    let searchValue = key.target.value;
    if (Utils.characterValid(searchValue)) {
        let result = SearchAlgorithm.searchingInput(searchValue);
        if (result.recipesMatch.length === 0) {
            return SearchingMessageBuilder.noResultMessageBuilder();
        };
        Utils.recipeSectionCleared();
        MainBuilder.initSearch(result);
        return;
    };
    // Reset Builder
    Utils.recipeSectionCleared();
    MainBuilder.init();
});
