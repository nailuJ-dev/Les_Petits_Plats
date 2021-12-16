export default class SearchingMessageBuilder {
    static messageSearchingResult = document.getElementById('messageSearchingResult');
    static spanPartMessage = document.querySelector('#messageSearchingResult > span');

    static finalResultMessageBuilder (recipes) {
        
        this.messageDisplay();
        this.messageSearchingResult.style.backgroundColor = '#c4dcff'
        this.spanPartMessage.innerHTML = recipes.length + ' recette(s) correspon(ent) à votre recherche';
        this.hideMessageClick();
        return this;
    };

    static noResultMessageBuilder () {
        this.messageDisplay();
        this.messageSearchingResult.style.backgroundColor = '#FFE9A5';
        this.spanPartMessage.innerHTML = 'Aucune recette ne correspond à votre recherche... Vous pouvez chercher "tarte aux pommes", "poisson", etc.';
        return this;
    };

    static messageDisplay () {
        this.messageSearchingResult.style.display = 'flex';
    };

    static hideMessageDisplay () {
        this.messageSearchingResult.style.display = 'none';
    };

    static hideMessageClick () {
        document.querySelector('#messageSearchingResult > i').addEventListener('click', () => {
            return this.hideMessageDisplay();
        });
    };
};