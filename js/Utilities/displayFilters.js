const inputEventsOnClick = (recipes) => {
	const { ingredients, ustensiles, devices } = generateFilters(recipes);

	// Display ustensiles on click

	ustensilesForm.addEventListener("click", () => {
		if (ustensilesWrapper.classList.contains("ustensiles__hidden__results")) {
			devicesChevron.classList.replace("fa-chevron-up", "fa-chevron-down");
			devicesWrapper.classList.replace("devices__displayed__results", "devices__hidden__results")
			devicesWrapper.innerHTML = "";
			ingredientsChevron.classList.replace("fa-chevron-up", "fa-chevron-down");
			ingredientsWrapper.classList.replace("ingredients__displayed__results", "ingredients__hidden__results")
			ingredientsWrapper.innerHTML = "";
			ustensilesChevron.classList.replace("fa-chevron-down", "fa-chevron-up");
			ustensilesWrapper.classList.replace("ustensiles__hidden__results","ustensiles__displayed__results")
			ustensiles.forEach((ustensil) => {
				return ustensilesWrapper.append(createDomElements("li", `${ustensil}`, { class: "ustensiles__item" }));
			});
		} else {
			ustensilesChevron.classList.replace("fa-chevron-up", "fa-chevron-down");
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
				filtersSelected.push({ label: item.textContent, type: 'ustensil' });
				const selectedUnduplicatedFilters = [...new Set(filtersSelected)];
				createFilterElements(selectedUnduplicatedFilters, recipes);
			});
		});
	};

	// Display ingredients on click

	ingredientsForm.addEventListener("click", () => {
		if (ingredientsWrapper.classList.contains("ingredients__hidden__results")) {
			ingredientsChevron.classList.replace("fa-chevron-down", "fa-chevron-up");
			ingredientsWrapper.classList.replace("ingredients__hidden__results","ingredients__displayed__results")
			devicesChevron.classList.replace("fa-chevron-up", "fa-chevron-down");
			ustensilesChevron.classList.replace("fa-chevron-up", "fa-chevron-down");
			ustensilesWrapper.classList.replace("ustensiles__displayed__results", "ustensiles__hidden__results")
			devicesWrapper.classList.replace("devices__displayed__results", "devices__hidden__results")
			devicesWrapper.innerHTML = "";
			ingredients.forEach((ingredient) => {
				return ingredientsWrapper.append(
					createDomElements("li", `${ingredient}`, { class: "ingredients__item" })
				);
			});
		} else {
			ingredientsChevron.classList.replace("fa-chevron-up", "fa-chevron-down");
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
				filtersSelected.push({ label: item.textContent, type: 'ingredient' });
				const selectedUnduplicatedFilters = [...new Set(filtersSelected)];
				createFilterElements(selectedUnduplicatedFilters, recipes);
			});
		});
	};

	// Display devices on click

	devicesForm.addEventListener("click", () => {
		if (devicesWrapper.classList.contains("devices__hidden__results")) {
			devicesChevron.classList.replace("fa-chevron-down", "fa-chevron-up");
			ingredientsChevron.classList.replace("fa-chevron-up", "fa-chevron-down");
			ustensilesChevron.classList.replace("fa-chevron-up", "fa-chevron-down");
			devicesWrapper.classList.replace("devices__hidden__results", "devices__displayed__results")
			ingredientsWrapper.classList.replace("ingredients__displayed__results", "ingredients__hidden__results")
			ustensilesWrapper.classList.replace("ustensiles__displayed__results", "ustensiles__hidden__results")
			devices.forEach((device) => {
				devicesWrapper.innerHTML += `<li class="devices__item">${device}</li>`;
				ustensilesWrapper.innerHTML = "";
				ingredientsWrapper.innerHTML = "";
			});
		} else {
			devicesChevron.classList.replace("fa-chevron-up", "fa-chevron-down");
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
				filtersSelected.push({ label: item.textContent, type: 'device' });
				selectedUnduplicatedFilters = [...new Set(filtersSelected)];
				createFilterElements(selectedUnduplicatedFilters, recipes);
			});
		});
	};
};