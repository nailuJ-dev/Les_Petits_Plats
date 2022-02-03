const inputEventsOnClick = (selectedTags) => {
	const { ingredients, ustensiles, devices } = generateFilters(selectedTags);

    const addTag = (tag) => {
        selectedTags = [...selectedTags, tag];
        searchIntoFilters(userInput, selectedTags);
    }

    // Functions to  change CSS style

    function basicIngredientCssStyle () {
        ingredientsForm.style.width = null;
        ingredientsInput.style.borderRadius = null;
        ingredientsButton.style.borderRadius = null;
        ingredientsDiv.style.display = null;
        ingredientsInput.style.display = null;
    };

    function basicDeviceCssStyle () {
        devicesForm.style.width = null;
        devicesInput.style.borderRadius = null;
        devicesButton.style.borderRadius = null;
        devicesDiv.style.display = null;
        devicesInput.style.display = null;
    };

    function basicUstensilCssStyle () {
        ustensilesForm.style.width = null;
        ustensilesInput.style.borderRadius = null;
        ustensilesInput.style.display = null;
        ustensilesDiv.style.display = null;
        ustensilesButton.style.borderRadius = null;
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
        ustensilesButton.style.borderRadius = "0 5px 0 0";
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
        devicesButton.style.borderRadius = "0 5px 0 0";

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
        ingredientsButton.style.borderRadius = "0 5px 0 0";
    };

	// Display ustensiles on click

	ustensilesForm.addEventListener("click", () => {
		if (ustensilesWrapper.classList.contains("ustensiles__hidden__results")) {
			devicesChevron.classList.replace("fa-chevron-up", "fa-chevron-down");
			devicesWrapper.classList.replace("devices__displayed__results", "devices__hidden__results")
            basicDeviceCssStyle();
			devicesWrapper.innerHTML = "";
			ingredientsChevron.classList.replace("fa-chevron-up", "fa-chevron-down");
			ingredientsWrapper.classList.replace("ingredients__displayed__results", "ingredients__hidden__results")
			ingredientsWrapper.innerHTML = "";
            basicIngredientCssStyle();
			ustensilesChevron.classList.replace("fa-chevron-down", "fa-chevron-up");
			ustensilesWrapper.classList.replace("ustensiles__hidden__results","ustensiles__displayed__results")
            resultsUstensilCssStyle();
			ustensiles.forEach((ustensil) => {
				return ustensilesWrapper.append(createDomElements("li", `${ustensil}`, { class: "ustensiles__item" }));
			});
		} else {
			ustensilesChevron.classList.replace("fa-chevron-up", "fa-chevron-down");
            basicUstensilCssStyle();
			ustensilesWrapper.classList.replace("ustensiles__displayed__results","ustensiles__hidden__results")
			ustensilesWrapper.innerHTML = "";
		}
		ustensilesInputEventOnClick();
	});

	ustensilesInput.addEventListener("keyup", (el) => {
		ustensilesWrapper.innerHTML = "";
		if (el.target.value.length > 1) {
			const request = el.target.value.toLowerCase();
			const results = ustensiles.filter((ustensil) => {
				return ustensil.toLowerCase().includes(request);
			});
			results.forEach((result) => {
				return ustensilesWrapper.append(createDomElements("li", `${result}`, { class: "ustensiles__item" }));
			});
		}
		ustensilesInputEventOnClick();
	});

	const ustensilesInputEventOnClick = () => {
		const ustensilesItems = document.querySelectorAll(".ustensiles__item");
		ustensilesItems.forEach((item) => {
			item.addEventListener("click", () => {
                addTag({ label: item.textContent, type: 'ustensil' }, selectedTags);
				createFilterElements(selectedTags);
			});
		});
	};

	// Display ingredients on click

	ingredientsForm.addEventListener("click", () => {
		if (ingredientsWrapper.classList.contains("ingredients__hidden__results")) {
			ingredientsChevron.classList.replace("fa-chevron-down", "fa-chevron-up");
            resultsIngredientCssStyle();
			ingredientsWrapper.classList.replace("ingredients__hidden__results","ingredients__displayed__results")
			devicesChevron.classList.replace("fa-chevron-up", "fa-chevron-down");
			ustensilesChevron.classList.replace("fa-chevron-up", "fa-chevron-down");
			ustensilesWrapper.classList.replace("ustensiles__displayed__results", "ustensiles__hidden__results")
            basicUstensilCssStyle();
			devicesWrapper.classList.replace("devices__displayed__results", "devices__hidden__results")
            basicDeviceCssStyle();
			devicesWrapper.innerHTML = "";
            ustensilesWrapper.innerHTML = ""
			ingredients.forEach((ingredient) => {
				return ingredientsWrapper.append(
					createDomElements("li", `${ingredient}`, { class: "ingredients__item" })
				);
			});
		} else {
			ingredientsChevron.classList.replace("fa-chevron-up", "fa-chevron-down");
            basicIngredientCssStyle();
			ingredientsWrapper.classList.replace("ingredients__displayed__results", "ingredients__hidden__results")
			ingredientsWrapper.innerHTML = "";
		}
		ingredientsInputEventOnClick();
	});

	ingredientsInput.addEventListener("keyup", (el) => {
		ingredientsWrapper.innerHTML = "";
		if (el.target.value.length >= 1) {
			const request = el.target.value.toLowerCase();
			const results = ingredients.filter((ingredient) => {
				return ingredient.toLowerCase().includes(request);
			});
			results.forEach((result) => {
				return ingredientsWrapper.append(createDomElements("li", `${result}`, { class: "ingredients__item" }));
			});
		}
		ingredientsInputEventOnClick();
	});

	const ingredientsInputEventOnClick = () => {
		const ingredientsItems = document.querySelectorAll(".ingredients__item");
		ingredientsItems.forEach((item) => {
			item.addEventListener("click", () => {
				addTag({ label: item.textContent, type: 'ingredient' }, selectedTags);
				createFilterElements(selectedTags);
			});
		});
	};

	// Display devices on click

	devicesForm.addEventListener("click", () => {
		if (devicesWrapper.classList.contains("devices__hidden__results")) {
			devicesChevron.classList.replace("fa-chevron-down", "fa-chevron-up");
            resultsDeviceCssStyle();
			ingredientsChevron.classList.replace("fa-chevron-up", "fa-chevron-down");
			ustensilesChevron.classList.replace("fa-chevron-up", "fa-chevron-down");
			devicesWrapper.classList.replace("devices__hidden__results", "devices__displayed__results")
			ingredientsWrapper.classList.replace("ingredients__displayed__results", "ingredients__hidden__results")
            basicIngredientCssStyle();
			ustensilesWrapper.classList.replace("ustensiles__displayed__results", "ustensiles__hidden__results")
            basicUstensilCssStyle();
			devices.forEach((device) => {
				devicesWrapper.innerHTML += `<li class="devices__item">${device}</li>`;
				ustensilesWrapper.innerHTML = "";
				ingredientsWrapper.innerHTML = "";
			});
		} else {
			devicesChevron.classList.replace("fa-chevron-up", "fa-chevron-down");
            basicDeviceCssStyle();
			devicesWrapper.classList.replace("devices__displayed__results", "devices__hidden__results")
			devicesWrapper.innerHTML = "";
		}
		devicesInputEventOnClick();
	});

	devicesInput.addEventListener("keyup", (el) => {
		devicesWrapper.innerHTML = "";
		if (el.target.value.length > 1) {
			const request = el.target.value.toLowerCase();
			const results = devices.filter((item) => {
				return item.toLowerCase().includes(request);
			});
			results.forEach((result) => {
				return devicesWrapper.append(createDomElements("li", `${result}`, { class: "devices__item" }));
			});
		}
		devicesInputEventOnClick();
	});

	const devicesInputEventOnClick = () => {
		const devicesItems = document.querySelectorAll(".devices__item");
		devicesItems.forEach((item) => {
			item.addEventListener("click", () => {
				addTag({ label: item.textContent, type: 'device' }, selectedTags);
				createFilterElements(selectedTags);
			});
		});
	};
};

export default inputEventsOnClick;