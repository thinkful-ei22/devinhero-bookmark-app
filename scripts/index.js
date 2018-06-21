/* global bookmarks,  api */

'use strict';

console.log('index.js');

$(document).ready(function() {
  bookmarks.bindEventListeners();
  
  // api.getItems((items) => {
  //   items.forEach((item) => store.addItem(item));
  //   shoppingList.render();
  // });
});