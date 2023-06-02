// import { doc } from '@firebase/firestore';
import { initializeApp } from 'https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js';
import {
  getDatabase,
  ref,
  push,
  onValue,
  remove,
} from 'https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js';

const appSettings = {
  databaseURL: 'https://playground-9cfb5-default-rtdb.firebaseio.com/',
};
const app = initializeApp(appSettings);
const database = getDatabase(app);
const itemsInBasket = ref(database, 'items-in-basket');

const basketInputEl = document.getElementById('input-field');
const addToBasketEl = document.getElementById('add-button');
const shoppingList = document.getElementById('shopping-list');

onValue(itemsInBasket, function (snapshot) {
  if (snapshot.exists()) {
    let basketArray = Object.entries(snapshot.val());
    shoppingList.innerHTML = '';
    for (let i = 0; i < basketArray.length; i++) {
      let currentItem = basketArray[i];
      let currentItemId = currentItem[0];
      let currentItemValue = currentItem[1];
      appendItemToBasket(currentItem);
    }
  } else {
    shoppingList.innerHTML = '<p class="noItem">No items in your basket yet :(</p> ';
  }
});

const clearInput = function () {
  basketInputEl.value = '';
};
const appendItemToBasket = function (item) {
  let itemId = item[0];
  let itemValue = item[1];

  let newEl = document.createElement('li');
  newEl.textContent = `${itemValue}`;
  shoppingList.append(newEl);
  // for deleting an item in the basket
  newEl.addEventListener('dblclick', function () {
    let exactLocationOfItem = ref(database, `items-in-basket/${itemId}`);
    remove(exactLocationOfItem);
  });
};

addToBasketEl.addEventListener('click', () => {
  let inputValue = basketInputEl.value;
  shoppingList.innerHTML = '';
  push(itemsInBasket, inputValue);
  clearInput();
});
