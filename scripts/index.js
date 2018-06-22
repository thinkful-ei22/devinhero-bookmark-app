/* global store, api, bookmarks */

'use strict';

console.log('index.js');

$(document).ready(function() {
  bookmarks.bindEventListeners();
  
  api.getBookmarks(function(response){
    console.log('Get API items: ', response);
    response.forEach(bookmark => store.addBookmark(bookmark));
    console.log('Store bookmarks: ', store.bookmarks);
    bookmarks.render();
  });


  // api.createBookmark('SCOTT STERLING!', 'https://www.youtube.com/watch?v=8F9jXYOH2c0', 3, 'wow', function(response){
      

  //   }, function(response){
  //     console.log('Create failed: ', response.responseJSON.message);
  //   });


  
});
  
  // api.createBookmark('METAL, But Not', 'https://www.youtube.com/watch?v=dndsJunKgaY', 3, 'wow', function(response){
    

  // }, function(response){
  //   console.log('Create failed: ', response.responseJSON.message);
  // });

  // api.getItems((items) => {
  //   items.forEach((item) => store.addItem(item));
  //   shoppingList.render();
  // });
