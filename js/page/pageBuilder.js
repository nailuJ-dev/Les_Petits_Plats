import Utils from "../utilities/utils.js";

export default class PageBuilder {
    // Build the container for the recipes
    static finalDisplayBuilder (collections) {
        return collections.forEach(collection => {
            this.recipeBuilder(collection);
        });
    };

    // Build the container for each recipe
    static recipeBuilder (collection) {
        const recipePart = document.getElementById('mainPart')
        return recipePart.appendChild(this.createArticlePart(collection));
    };

    static createArticlePart (collection) {
        const article = document.createElement('article');
        const dataIngredients = collection.ingredients.map(elt => Utils.lowerText(elt.ingredient));
        const dataAppliances = Utils.lowerText(collection.appliance);
        const dataUstensils = collection.ustensils;
        const dataFilters = collection.ingredients.map(element => Utils.lowerText(element.ingredient)) + collection.ustensils + Utils.lowerText(collection.appliance);

        article.classList.add('articleForRecipes');
        article.setAttribute('data-filter', dataFilters);
        article.setAttribute('data-filter-ingredient', dataIngredients);
        article.setAttribute('data-filter-appliance', dataAppliances);
        article.setAttribute('data-filter-ustensil', dataUstensils);
        article.innerHTML = this.getArticleBuilderHTML(collection);
    };

    static getArticleBuilderHTML (collection) {
        return `
            <img src='./assets/img-recipe.png' alt='image for recipe' />
            <div class='titleForRecipe'>
                <h2 class='nameForRecipe'>${collection.name}</h2>
                <span class='durationForRecipe'><i class='far fa-clock'></i>${collection.time} minutes</span>
            </div>
            <div class='infoForRecipe'>
                <div class='ingredientsForRecipe'>${collection.ingredients.map(elt => `
                    <p><b>${elt.ingredient} </b>:
                    ${'quantity' in elt ? elt.quantity : ''}
                    ${'unit' in elt ? elt.unit : ''}</p>`).join(' ')}
                </div>
                <div class='instructionsForRecipe'>
                    <span>${collection.description}</span>
                </div>
            </div>
        `;
    };
};