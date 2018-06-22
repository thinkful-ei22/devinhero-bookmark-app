/* global store, api, bookmarks */

'use strict';

console.log('index.js');

$(document).ready(function() {
  bookmarks.bindEventListeners();
  
  api.getBookmarks(function(response){
    //console.log('Get API items: ', response);
    response.forEach(bookmark => store.addBookmark(bookmark));
    //console.log('Store bookmarks: ', store.bookmarks);
    bookmarks.render();
  });
});
  