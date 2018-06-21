'use strict';

console.log('store.js');

const store = (function(){
  
  //Add bookmark
  const addBookmark = function(bookmark){
    this.bookmarks.push(bookmark);
  };

  //Delete bookmark

  //Toggle addingNewBookmark
  const toggleAddingNewBookmark = function(){
    this.errorMsg = '';
    this.addingNewBookmark = !this.addingNewBookmark;
  };

  //Change minRating
  const changeMinRating = function(rating){
    this.minRating = rating;
  };

  //Change errorMsg
  
  
  return {
    bookmarks: [],
    addingNewBookmark: false,
    minRating: 1,
    errorMsg: undefined,

    addBookmark,
    //delete
    toggleAddingNewBookmark,
    changeMinRating,
    //change errorMsg
  };
}() );