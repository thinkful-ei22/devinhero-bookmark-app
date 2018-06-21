/* global api, store */

'use strict';

console.log('bookmarks.js');


const bookmarks = (function(){

  //// Display functionality ////

  const render = function(){
    console.log('Rendering DOM');
    
    if(store.addingNewBookmark){
      $('.js-new-bookmark-window').html(generateAddingBookmarkWindowHTML());
    }else{
      $('.js-new-bookmark-window').html('');
    }

    const bookmarksHTML = store.bookmarks.map(bookmark => 
      generateBookmarkItemHTML(bookmark)).join('');

    $('.js-bookmarks-list').html(bookmarksHTML);

  };
  
  const generateAddingBookmarkWindowHTML = function(){
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

  const generateBookmarkItemHTML = function (bookmark){
    return `
          <li class="bookmark-item" data-bookmark-id="${bookmark.id}">
            <div class="bookmark-item-head">
              <button class="bookmark-item-title">${bookmark.title}</button>
              <span class="bookmark-item-rating">Rating: ${generateBookmarkStarsHTML(bookmark.rating)}</span>
            </div>
            <div class="bookmark-item-content">
              <div class="bookmark-item-description">
                ${bookmark.desc}
              </div>
              <div class="bookmark-item-buttons">
                <a href="${bookmark.url}">Visit Page</a>
                <input type="button" value="Remove 'Mark" class="js-bookmark-remove">
              </div>
            </div>
          </li>`;
  };

  const generateBookmarkStarsHTML = function(rating){
    let stars = '';
    for(let i = 0; i < 5; i++){
      if(rating > i){
        stars += ' /STAR\\';
      }else{
        stars += ' /star\\';
      }
    }

    return stars;
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
