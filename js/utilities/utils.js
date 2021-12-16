export default class Utils {
    // searching starts with 3 characters
    static characterValid (value) {
        return value.length > 2;
    };

    // transform text to lowercase
    static lowerText (text) {
        return text.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '');
    };

    // transform text to uppercase
    static upperText (text) {
        return text.charAt(0).toUpperCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '') + text.substring(1).toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '');
    };

    static recipeSectionCleared () {
        const clearRecipePart = document.getElementById('mainPart').innerHTML = '';
        return clearRecipePart;
    };

    static filtersCleared (element) {
        const clearFilterPart = element.innerHTML = '';
        return clearFilterPart;
    };

    // get all ingredients, ustensils & appliances then sort them with alphabetically method
    static sortedByTitle (arr) {
        let arrNoSorted = [...new Set(arr)];
        let arrSorted = arrNoSorted.sort((a, b) => {
            if (a.toLowerCase() < b.toLowerCase()) {
                return -1;
            } else if (a.toLowerCase() > b.toLowerCase()) {
                return 1;
            };
            return arrSorted;
        });
    };
};