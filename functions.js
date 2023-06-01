export function add(a, b) {
  return a + b;
}

export const clearInput = function () {
  inputValue = '';
};
export const addToBasket = function () {
  shoppingList.innerHTML += `<li>${inputValue}</li>`;
};

