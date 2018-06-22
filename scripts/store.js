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
      url: bookmark.url,
      expanded: false
    };
    
    this.bookmarks.push(newBook);
  };

  const resetForm = function(){
    this.addFormVals.title = '';
    this.addFormVals.url = '';
    this.addFormVals.rating = 3;
    this.addFormVals.desc = '';
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
  const changeErrorMsg = function(error){
    this.errorMsg = error;
  };
  
  
  return {
    bookmarks: [],
    addFormVals:{
      title: '',
      url: '',
      rating: 3,
      desc: ''
    },
    addingNewBookmark: false,
    minRating: 1,
    errorMsg: undefined,

    addBookmark,
    resetForm,

    getBookmarkById,
    toggleBookmarkExpanded,
    deleteBookmark,
    
    toggleAddingNewBookmark,
    changeMinRating,
    changeErrorMsg
  };
}() );