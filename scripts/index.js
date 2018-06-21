/* global bookmarks,  api */

'use strict';

console.log('index.js');

$(document).ready(function() {
  bookmarks.bindEventListeners();
  
  api.getBookmarks(function(response){
    console.log('Get Items initial: ', response);
  });

  bookmarks.render();
});
  
  // api.createBookmark('METAL, But Not', 'https://www.youtube.com/watch?v=dndsJunKgaY', 3, 'wow', function(response){

  // }, function(response){
  //   console.log('Create failed: ', response.responseJSON.message);
  // });

  // api.getItems((items) => {
  //   items.forEach((item) => store.addItem(item));
  //   shoppingList.render();
  // });
