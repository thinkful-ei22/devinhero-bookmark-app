/* global api, store */

'use strict';

console.log('bookmarks.js');


const bookmarks = (function(){

  //// Display functionality ////

  const render = function(){
    console.log('Rendering DOM');
    
    if(store.addingNewBookmark){
      $('.new-bookmark-window').html(generateAddingBookmarkWindow());
    }else{
      $('.new-bookmark-window').html('');
    }


    //Populate bookmarks list

  };

  
  const generateAddingBookmarkWindow = function(){
    return `
        <form class="js-new-bookmark-form new-bookmark-form">
          <p>
            <label>Name</label>
            <input type="text" name="name">
          </p>
          <p>
            <label>URL</label>
            <input type="url" name="url">
          </p>
          <p>
            <label>Rating</label>
            <select name="rating">
              <option value="1">1 Star</option>
              <option value="2">2 Stars</option>
              <option value="3">3 Stars</option>
              <option value="4">4 Stars</option>
              <option value="5">5 Stars</option>
            </select>
          </p>
          <p>
            <label for="description">Description</label>
            <textarea name="description">Bookmark description</textarea>
          </p>
          <input type="submit">
          ${generateError()}
        </form>`;
  };

  const generateError = function(){
    if(store.errorMsg){
      const err = store.errorMsg;
      return `Cannot add bookmark: ${err}`;
    }else{
      return '';
    }
  };

  //// New Bookmark functionality ////




  //// Bookmark list functionality ////



  //// Event handlers ////

  //Star rating filter change

  //Toggle New Bookmark Window
  const handleNewBookmarkBtn = function(){
    
    $('.new-bookmark-button').click(() => {
      console.log('Toggling New Bookmark window');
      store.toggleAddingNewBookmark();
      render();
      console.log('Window rendered. state: ', store.addingNewBookmark);
    });
  };

  //Submit New Bookmark 

  //Expand Bookmark

  //Remove Bookmark

  //// Etc ////
  
  
  const bindEventListeners = function(){
    handleNewBookmarkBtn();
  };
  
  return {
    bindEventListeners,
    render
  };

}() );
