'use strict';

console.log('store.js');

const store = (function(){
  
  //Add bookmark
  const addBookmark = function(bookmark){
    let newBook = {
      id: bookmark.id,
      title: bookmark.title,
      rating: bookmark.rating,
      desc: bookmark.desc,
      expanded: false
    };
    
    this.bookmarks.push(newBook);
  };

  //TODO: This won't work for some reason??
  const getBookmarkById = function(id){
    return this.bookmarks.find(bookmark => bookmark.id === id);
  };

  const toggleBookmarkExpanded = function(id){
    const bookmark = this.bookmarks.find(bookmark => bookmark.id === id); //This works, but getBookmarkById doesn't??
    
    Object.assign(bookmark, {expanded: !bookmark.expanded});
  };

  //Delete bookmark
  const deleteBookmark = function(id){
    this.bookmarks = this.bookmarks.filter(bookmark => bookmark.id !== id);
  };

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
    getBookmarkById,
    toggleBookmarkExpanded,
    deleteBookmark,
    toggleAddingNewBookmark,
    changeMinRating,
    //change errorMsg
  };
}() );