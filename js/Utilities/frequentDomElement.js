// Frequent DOM elements
let userTags = [];


const filterElements = document.querySelector(".search__filter");
const filterRequests = document.querySelectorAll("filter__request");

const mainSearchBarInput = document.querySelector(".search__bar__input");
const recipesPart = document.querySelector(".main__part");
const displayedIngredientsResults = document.querySelector(".search__area__ingredient");
const displayedUstensilesResults = document.querySelector(".search__area__ustensil");
const displayedDevicesResults = document.querySelector(".search__area__device");

const ingredientsChevronUp = document.querySelector(".ingredients__chevron__up");
const ingredientsChevronDown = document.querySelector(".ingredients__chevron__down");
const ingredientsForm = document.querySelector(".ingredients__form");
const ingredientsInput = document.querySelector(".ingredients__input");
const ingredientsItem = document.querySelector(".ingredients__item");
const ingredientsButtonUp = document.querySelector(".ingredients__button__up");
const ingredientsButtonDown = document.querySelector(".ingredients__button__down");
const ingredientsWrapper = document.querySelector(".ingredients__results");
const ingredientsDiv = document.querySelector(".ingredients__div");

const devicesChevronUp = document.querySelector(".devices__chevron__up");
const devicesChevronDown = document.querySelector(".devices__chevron__down");
const devicesForm = document.querySelector(".devices__form");
const devicesInput = document.querySelector(".devices__input");
const devicesItem = document.querySelector(".devices__item");
const devicesButtonUp = document.querySelector(".devices__button__up");
const devicesButtonDown = document.querySelector(".devices__button__down");
const devicesWrapper = document.querySelector(".devices__results");
const devicesDiv = document.querySelector(".devices__div");

const ustensilesChevronUp = document.querySelector(".ustensiles__chevron__up");
const ustensilesChevronDown = document.querySelector(".ustensiles__chevron__down");
const ustensilesForm = document.querySelector(".ustensiles__form");
const ustensilesInput = document.querySelector(".ustensiles__input");
const ustensilesItem = document.querySelector(".ustensiles__item");
const ustensilesButtonUp = document.querySelector(".ustensiles__button__up");
const ustensilesButtonDown = document.querySelector(".ustensiles__button__down");
const ustensilesWrapper = document.querySelector(".ustensiles__results");
const ustensilesDiv = document.querySelector(".ustensiles__div");

const filterRequestElement = document.querySelectorAll(".filter__request");
