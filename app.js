// import { doc } from '@firebase/firestore';
import { initializeApp } from 'https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js';
import {
  getDatabase,
  ref,
  onValue,
  push,
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
let inputValue = basketInputEl.value;

onValue(itemsInBasket, function (snapshot) {
  let basketArray = Object.values(snapshot.val());
  for (let i = 0; i < basketArray.length; i++) {
    let currentItem = basketArray[i];
    console.log(currentItem);
  }
});

const clearInput = function () {
  inputValue = '';
};
const appendItemToBasket = function () {
  shoppingList.innerHTML += `<li>${inputValue}</li>`;
};

addToBasketEl.addEventListener('click', () => {
  push(itemsInBasket, inputValue);

  clearInput();
  appendItemToBasket();
});
