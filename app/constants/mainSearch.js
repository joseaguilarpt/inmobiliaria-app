const inputs = [
  {
    id: "operation",
    type: "radio",
    size: { xs: 12, lg: 3 }, 
    options: [
      { id: "rent", label: "getInTouch_form.radio.option1.label" },
      { id: "buy", label: "getInTouch_form.radio.option2.label" },
      { id: "share", label: "getInTouch_form.radio.option3.label" },
    ],
    defaultSelectedOption: "rent",
    isLabelVisible: false,
    label: "getInTouch_form.radio.title",
  },
  {
    id: "location",
    size: { xs: 12, lg: 5 },
    type: "searchLocation",
    options: [
      { id: "rent", label: "getInTouch_form.radio.option1.label" },
      { id: "buy", label: "getInTouch_form.radio.option2.label" },
    ],
    isLabelVisible: false,
    leftIcon: 'FaSearch',
    showSuggestionsOnFocus: true,
    clearButton: true,
    placeholder: "getInTouch_form.locationInput.placeholder",
    label: "getInTouch_form.radio.title",
  },
  {
    id: "category",
    size: { xs: 12, lg: 4},
    type: "autosuggest",
    options: [
      { id: "department", label: "Department" },
      { id: "house", label: "House" },
      { id: "garage", label: "Garage" },
      { id: "office", label: "Office" },
      { id: "yard", label: "Yard" },
    ],
    isLabelVisible: false,
    showSuggestionsOnFocus: true,
    placeholder: "getInTouch_form.categoryInput.placeholder",
    rightIcon: 'FaChevronDown',
    label: "getInTouch_form.radio.title",
  },
  {
    id: "price_from",
    label: "getInTouch_form.nameInput",
    size: { xs: 0, lg: 3 },
    isLabelVisible: false,
    placeholder: "getInTouch_form.priceFromInput.placeholder",
    type: "autosuggest",
    clearButton: true,
    showSuggestionsOnFocus: true,
    options: [      
      { id: "0", label: "0" },
      { id: "20000", label: "20.000,00 $" },
      { id: "50000", label: "50.000,00 $" },
      { id: "100000", label: "100.000,00 $" },
      { id: "120000", label: "120.000,00 $" },
      { id: "150000", label: "150.000,00 $" },
      { id: "170000", label: "170.000,00 $" },
      { id: "190000", label: "190.000,00 $" },
      { id: "220000", label: "220.000,00 $" },
    ],
  },
  {
    id: "price_to",
    label: "getInTouch_form.nameInput",
    size: { xs: 0, lg: 3 },
    isLabelVisible: false,
    placeholder: "getInTouch_form.priceToInput.placeholder",
    showSuggestionsOnFocus: true,
    clearButton: true,
    type: "autosuggest",
    options: [      
      { id: "0", label: "0" },
      { id: "20000", label: "20.000,00 $" },
      { id: "50000", label: "50.000,00 $" },
      { id: "100000", label: "100.000,00 $" },
      { id: "120000", label: "120.000,00 $" },
      { id: "150000", label: "150.000,00 $" },
      { id: "170000", label: "170.000,00 $" },
      { id: "190000", label: "190.000,00 $" },
      { id: "220000", label: "220.000,00 $" },
    ],
  },
  {
    id: "area_from",
    label: "getInTouch_form.nameInput",
    type: "text",
    size: { xs: 0, lg: 3 },
    isLabelVisible: false,
    placeholder: "getInTouch_form.areaFromInput.placeholder",
  },
  {
    id: "area_to",
    label: "getInTouch_form.nameInput",
    type: "text",
    size: { xs: 0, lg: 3 },
    isLabelVisible: false,
    placeholder: "getInTouch_form.areaToInput.placeholder",
  },
];

export const MAIN_SEARCH = {
  type: "post",
  inputs,
  hasSubmit: true,
  buttonLabel: "getInTouch_form.buttonLabel",
};
