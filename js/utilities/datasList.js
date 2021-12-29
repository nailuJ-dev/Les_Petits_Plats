export default class DataByDefault {
    // By default, all ingredients appeared before searching
    static getDefaultIngredients (ingred) {
        const ingredients = [];
        ingred.forEach((recipe) => {
            recipe.ingredients.forEach((ingred) => {
                if (!ingredients.includes(ingred.ingredient.toLowerCase())) {
                    ingredients.push(ingred.ingredient.toLowerCase());
                };
            });
        });
        return ingredients;
    };

    // By default, all devices appeared before searching
    static getDefaultAppliances (app) {
        const appliances = [];
        app.forEach((recipe) => {
            if (!appliances.includes(recipe.appliance.toLowerCase())) {
                appliances.push(recipe.appliance.toLowerCase());
            };
        });
        return appliances;
    };

    // By default, all devices appeared before searching
    static getDefaultUstensils (usten) {
        const ustensil = [];
        usten.forEach((recipe) => {
            recipe.ustensils.forEach((usten) => {
                if (!ustensil.includes(usten.toLowerCase())) {
                    ustensil.push(usten.toLowerCase());
                };
            });
        });
        return ustensil;
    };
};