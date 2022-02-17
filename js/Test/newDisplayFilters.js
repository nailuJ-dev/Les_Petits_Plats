const inputEventsOnClick = (elements) => {
    const { ingredients, ustensils, appliance } = generateFilters(elements);

    // Functions to  change CSS style

    function basicIngredientCssStyle () {
        ingredientsForm.style.width = null;
        ingredientsInput.style.borderRadius = null;
        ingredientsButtonDown.style.display = "block";
        ingredientsButtonUp.style.display = "none";
        ingredientsDiv.style.display = null;
        ingredientsInput.style.display = null;
    };
    
    function basicDeviceCssStyle () {
        devicesForm.style.width = null;
        devicesInput.style.borderRadius = null;
        devicesButtonDown.style.display = "block";
        devicesButtonUp.style.display = "none";
        devicesDiv.style.display = null;
        devicesInput.style.display = null;
    };
    
    function basicUstensilCssStyle () {
        ustensilesForm.style.width = null;
        ustensilesInput.style.borderRadius = null;
        ustensilesInput.style.display = null;
        ustensilesDiv.style.display = null;
        ustensilesButtonDown.style.display = "block";
        ustensilesButtonUp.style.display = "none";
    };
    
    function resultsUstensilCssStyle () {
        if (window.matchMedia('(min-width : 992px)').matches) {
    ustensilesForm.style.width = "31rem";
        } else {
    ustensilesForm.style.width = "auto";
        };
        ustensilesInput.style.borderRadius = "5px 0 0 0";
        ustensilesInput.style.display = "flex";
        ustensilesInput.focus();
        ustensilesDiv.style.display = "none";
        ustensilesButtonDown.style.display = "none";
        ustensilesButtonUp.style.display = "block";
    };
    
    function resultsDeviceCssStyle () {
        if (window.matchMedia('(min-width : 992px)').matches) {
    devicesForm.style.width = "31rem";
        } else {
    devicesForm.style.width = "auto";
        };
        devicesInput.style.borderRadius = "5px 0 0 0";
        devicesInput.style.display = "flex";
        devicesInput.focus();
        devicesDiv.style.display = "none";
        devicesButtonDown.style.display = "none";
        devicesButtonUp.style.display = "block";
    };
    
    function resultsIngredientCssStyle () {
        if (window.matchMedia('(min-width : 992px)').matches) {
    ingredientsForm.style.width = "31rem";
        } else {
    ingredientsForm.style.width = "auto";
        };
        ingredientsInput.style.borderRadius = "5px 0 0 0";
        ingredientsInput.style.display = "flex";
        ingredientsInput.focus();
        ingredientsDiv.style.display = "none";
        ingredientsButtonDown.style.display = "none";
        ingredientsButtonUp.style.display = "block";
    };
    

    ingredientsForm.addEventListener('click', () => {
        if (ingredientsWrapper.classList.contains("ingredients__hidden__results")) {
            resultsIngredientCssStyle();
			ingredientsWrapper.classList.replace("ingredients__hidden__results","ingredients__displayed__results")
			ustensilesWrapper.classList.replace("ustensiles__displayed__results", "ustensiles__hidden__results")
            basicUstensilCssStyle();
			devicesWrapper.classList.replace("devices__displayed__results", "devices__hidden__results")
            basicDeviceCssStyle();
			devicesWrapper.innerHTML = "";
            ustensilesWrapper.innerHTML = ""
			ingredients.forEach((ingredient) => {
                ingredientsWrapper.innerHTML += `<li class="ingredients__item" type="ingredient">${ingredient}</li>`;
				ustensilesWrapper.innerHTML = "";
				devicesWrapper.innerHTML = "";
			});
        } else {
            basicIngredientCssStyle();
			ingredientsWrapper.classList.replace("ingredients__displayed__results", "ingredients__hidden__results")
			ingredientsWrapper.innerHTML = "";
        };

        ingredientsInput.addEventListener('keyup', e => {
            let recipesToDisplay = getFilteredRecipes(element);
            if (e.target.value.length >= 1) {
                recipesToDisplay = recipesToDisplay.filter(item => {
                    if (e.includes(item.ingredients)) {
                        const res = e.filter(tag => item.ingredients.map(i => i.ingredient.toLowerCase()).includes(tag));
                        tagIngredientDisplay(res);
                        return res.length;
                    };
                });
            } else {
                recipesPart.innerHTML = "";
                generateRecipesMainPart(element)
                generateFilters(element);
                inputEventsOnClick(element);
            }
        });
        //ingredientsInputEventOnClick();
    });

    devicesForm.addEventListener("click", () => {
		if (devicesWrapper.classList.contains("devices__hidden__results")) {
            resultsDeviceCssStyle();
			devicesWrapper.classList.replace("devices__hidden__results", "devices__displayed__results")
			ingredientsWrapper.classList.replace("ingredients__displayed__results", "ingredients__hidden__results")
            basicIngredientCssStyle();
			ustensilesWrapper.classList.replace("ustensiles__displayed__results", "ustensiles__hidden__results")
            basicUstensilCssStyle();
			appliance.forEach((device) => {
                console.log(appliance)
				devicesWrapper.innerHTML += `<li class="devices__item" type="device">${device}</li>`;
				ustensilesWrapper.innerHTML = "";
				ingredientsWrapper.innerHTML = "";
			});
		} else {
            basicDeviceCssStyle();
			devicesWrapper.classList.replace("devices__displayed__results", "devices__hidden__results")
			devicesWrapper.innerHTML = "";
		}

        devicesInput.addEventListener('keyup', e => {
            let recipesToDisplay = getFilteredRecipes(element);
            if (e.target.value.length >= 1) {
                recipesToDisplay = recipesToDisplay.filter(item => {
                    if (e.includes(item.ingredients)) {
                        const res = e.filter(tag => item.ingredients.map(i => i.ingredient.toLowerCase()).includes(tag));
                        tagIngredientDisplay(res);
                        return res.length;
                    };
                });
            } else {
                recipesPart.innerHTML = "";
                generateRecipesMainPart(element)
                generateFilters(element);
                inputEventsOnClick(element);
            }
        });
		// devicesInputEventOnClick();
	});

    ustensilesForm.addEventListener("click", () => {
		if (ustensilesWrapper.classList.contains("ustensiles__hidden__results")) {
			devicesWrapper.classList.replace("devices__displayed__results", "devices__hidden__results")
            basicDeviceCssStyle();
			devicesWrapper.innerHTML = "";
			ingredientsWrapper.classList.replace("ingredients__displayed__results", "ingredients__hidden__results")
			ingredientsWrapper.innerHTML = "";
            basicIngredientCssStyle();
			ustensilesWrapper.classList.replace("ustensiles__hidden__results","ustensiles__displayed__results")
            resultsUstensilCssStyle();
			ustensils.forEach((ustensil) => {
                console.log(ustensils)
                ustensilesWrapper.innerHTML += `<li class="ustensiles__item" type="ustensil">${ustensil}</li>`;
                ingredientsWrapper.innerHTML = "";
                devicesWrapper.innerHTML = "";
			});
		} else {
            basicUstensilCssStyle();
			ustensilesWrapper.classList.replace("ustensiles__displayed__results","ustensiles__hidden__results")
			ustensilesWrapper.innerHTML = "";
		}

        ustensilesInput.addEventListener('keyup', e => {
            let recipesToDisplay = getFilteredRecipes(element);
            if (e.target.value.length >= 1) {
                recipesToDisplay = recipesToDisplay.filter(item => {
                    if (e.includes(item.ingredients)) {
                        const res = e.filter(tag => item.ingredients.map(i => i.ingredient.toLowerCase()).includes(tag));
                        tagIngredientDisplay(res);
                        return res.length;
                    };
                });
            } else {
                recipesPart.innerHTML = "";
                generateRecipesMainPart(element)
                generateFilters(element);
                inputEventsOnClick(element);
            }
        });

		// ustensilesInputEventOnClick();
	});
};

const tagIngredientDisplay = (results) => {
    const { ingredients } = generateFilters(results)
	ingredientsWrapper.innerHTML = "";
	ingredients.forEach((ingredient) => {
		ingredientsWrapper.innerHTML += `<li class="ingredients__item" type="ingredient">${ingredient}</li>`;
	});
};

const tagDeviceDisplay = (results) => {
    const { appliance } = generateFilters(results)
	ustensilesWrapper.innerHTML = "";
	appliance.forEach((device) => {
		ustensilesWrapper.innerHTML += `<li class="ustensiles__item" type="ustensil">${device}</li>`;
	});
};

const tagUstensilDisplay = (results) => {
    const { ustensiles } = generateFilters(results)
	devicesWrapper.innerHTML = "";
	ustensiles.forEach((ustensil) => {
		devicesWrapper.innerHTML += `<li class="devices__item" type="device">${ustensil}</li>`;
	});
};

const createFilterElement = (tagFilter) => {
    domElement.filterElements.innerHTML = "";
	tagFilter.forEach((filter) => {
		return domElement.filterElements.append(
			createDomElements(
				"div",
				`${filter.label}`,
				{ class: `filter__request__${filter.type}` },
				createDomElements("i", { class: "fas fa-times-circle filter__request__icon" })
			)
		);
	});
}

const addTag = (tag) => {
    userTags = [...userTags, tag];
    createFilterElement(userTags);
}

const removeTags = (tag) => {
    userTags = userTags.filter(item => item !== tag);
    createFilterElement(userTags);
};