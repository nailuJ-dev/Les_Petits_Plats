class builderMainPart {
	constructor (data) {
		this._id = data.id;
		this._name = data.name;
		this._description = data.description;
		this._time = data.time;
		this._servings = data.servings;
		this._ustensils = data.ustensils;
		this._ingredients = data.ingredients;
		this._appliance = data.appliance;
	}

	// Create recipe cards

	get createMainPart () {
		const recipeCard = createDomElements(
			"article",
			{ class: "recipe__card" },
			createDomElements("div", { class: "recipe__card__image" }),
			createDomElements(
				"section",
				{ class: "recipe__card__section" },
				createDomElements(
					"header",
					{ class: "recipe__card__header" },
					createDomElements("h2", `${this._name}`, { class: "recipe__card__header__title" }),
					createDomElements(
						"h2",
						`${this._time}min `, { class: "recipe__card__header__time" },
						createDomElements("i", { class: "fas fa-clock recipe__card__header__icon" })
					)
				),
				createDomElements(
					"aside",
					{ class: "recipe__card__aside" },
					createDomElements(
						"ul",
						{ class: "recipe__card__list" },
						...this._ingredients.map((ingredient) => {
							return createDomElements(
								"li",
								createDomElements("strong", `${ingredient.ingredient} `),
								ingredient.quantity ? `: ${ingredient.quantity} ` : "",
								ingredient.unit ? `${ingredient.unit} ` : "",
								{
									class: "recipe__card__list__item",
								}
							);
						})
					),
					createDomElements("p", `${this._description}`, { class: "recipe__card__description" })
				)
			)
		);
		return recipeCard;
	};
};
