import { recipes as _recipes } from '../Data/recipes.json';

let recipes = _recipes;

const userInput = ''; //le mainbar
let userTags = [] // selected tags

const _searchAlgo = (input) => {
  input.addEventListener('keyup', (el) => {
    if (el.target.value.length >= 3) {
      recipesPart.innerHTML = "";
      const request = el.target.value.toLowerCase();
      recipes = _recipes.filter(item => {
        return (item.name.toLowerCase().includes(request) ||
          item.description.toLowerCase().includes(request) ||
          item.ingredients.map(i => i.ingredient.toLowerCase().includes(request))
          );
        });
        generateRecipesMainPart(recipes);
    if (!recipes.length) {
        recipesPart.append(
          createDomElements (
            'div', `Aucune recette ne correspond à votre critère… vous pouvez
     chercher « tarte aux pommes », « poisson », etc.`, { class: 'no__matching' }
          )
        );
      } else if (el.target.value.length <= 3){
        recipesPart.innerHTML = "";
        generateRecipesMainPart(recipes);
      };
    };
  });
};


const tagFilter = (input, tags = [], domInput) => {
    _searchAlgo(input);
    if (tags.value.length >= 1) {
        recipes = recipes.filter(item => {
            if (item.ingredients.includes(tags)) {
                const res = tags.filter(tag => item.ingredients.map(i => i.ingredient.toLowerCase()).includes(tag));
                tagIngredientDisplay(res, domInput);
                return res.length;
            } else if (item.devices.includes(tags)) {
                const res = tags.filter(tag => item.appliance.map(i => i.appli.toLowerCase()).includes(tag));
                tagDeviceDisplay(res, domInput);
                return res.length;
            } else if (item.ustensils.includes(tags)) {
                const res = tags.filter(tag => item.ustensils.map(i => i.ustensil.toLowerCase()).includes(tag));
                tagUstensilDisplay(res, domInput);
                return res.length;
            };
        });
    }
}

const addTag = (tag) => {
  userTags = [...userTags, tag];
  tagFilter(userInput, userTags)
}
const removeTags = (tag) => {
  userTags = userTags.filter(item => item !== tag);
  tagFilter(userInput, userTags)
};