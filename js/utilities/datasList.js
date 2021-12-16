export default class DataByDefault {
    // By default, all ingredients appeared before searching
    static getDefaultIngredients (ingred) {
        let ingredients = [];
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
        let appliances = [];
        app.forEach((recipe) => {
            if (!appliances.includes(app.appliance.toLowerCase())) {
                appliances.push(app.appliance.toLowerCase());
            };
        });
        return appliances;
    };

    // By default, all devices appeared before searching
    static getDefaultUstensils (usten) {
        let ustensil = [];
        usten.forEach((recipe) => {
            recipe.ustensils.forEach((usten) => {
                if (!ustensil.includes(usten.ustensils.toLowerCase())) {
                    ustensil.push(usten.ustensils.toLowerCase());
                };
            });
        });
        return ustensil;
    };
};