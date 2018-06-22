/* global api, store */

'use strict';

console.log('bookmarks.js');


const bookmarks = (function(){

  //// Display functionality ////

  const render = function(){
    console.log('Rendering DOM');
    
    if(store.addingNewBookmark){
      $('.js-new-bookmark-container').html(generateAddingBookmarkWindowHTML());
    }else{
      $('.js-new-bookmark-container').html('');
    }

    const bookmarksHTML = store.bookmarks.map(bookmark =>{
      if(bookmark.rating >= store.minRating){
        return generateBookmarkItemHTML(bookmark);
      }else{
        return '';
      }
    }).join('');
      
    $('.js-bookmarks-list').html(bookmarksHTML);
  };
  
  const generateAddingBookmarkWindowHTML = function(){
    return `
        <content class="new-bookmark">
          <div class="new-bookmark-window">
            <div class="new-bookmark-form-title">Add Bookmark</div>
            <form class="js-new-bookmark-form new-bookmark-form">
                <label>Name</label>
                <input type="text" name="name">
              
                <label>URL</label>
                <input type="url" name="url">
              
                <label>Rating</label>
                <select name="rating">
                  <option value="1">1 Star</option>
                  <option value="2">2 Stars</option>
                  <option value="3">3 Stars</option>
                  <option value="4">4 Stars</option>
                  <option value="5">5 Stars</option>
                </select>
              
                <label for="description">Description</label>
                <textarea name="description">Bookmark description</textarea>
              
              <input type="submit">
            </form>
          </div>
          <div class="add-error-msg">${generateError()}</p>
        </content>`;
  };

  const generateBookmarkItemHTML = function (bookmark){
    let itemString = `
          <li class="bookmark-item js-bookmark-item" data-bookmark-id="${bookmark.id}">
            <div class="bookmark-item-head">
              <button class="js-bookmark-item-expand"><span class="bookmark-item-title-label">${bookmark.title}</span></button>
              <span class="bookmark-item-rating">Rating: ${generateBookmarkStarsHTML(bookmark.rating)}</span>
            </div>`;
    
    if(bookmark.expanded){
      itemString += `
            <div class="bookmark-item-content">
              <div class="bookmark-item-description">
                ${bookmark.desc}
              </div>
              <div class="bookmark-item-buttons">
                <a href="${bookmark.url}">Visit Page</a>
                <input type="button" value="Remove 'Mark" class="js-bookmark-item-remove">
              </div>
            </div>
          </li>`;
    }
    return itemString;
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
      store.errorMsg = '';
      return `Cannot add bookmark: ${err}`;
    }else{
      return '';
    }
  };

  //// New Bookmark functionality ////




  //// Bookmark item functionality ////


  function getBookmarkIdFromElement(bookmark) {
    const newTarget = $(bookmark)
      .closest('.js-bookmark-item')
      .data('bookmark-id');
    
    return newTarget;
  }

  //// Event handlers ////

  //Star rating filter change
  const handleStarFilterChange = function(){
    $('.js-star-filter').change(function(){
      console.log('Changing min filter: ', this.value);
      store.changeMinRating(this.value);
      render();
    });
  };

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
  const handleSubmitNewBookmark = function(){
    $('.js-new-bookmark-container').on('submit', '.js-new-bookmark-form',event =>{
      event.preventDefault();
      // //Grab all the data
      // const title = $('.js-new-bookmark-form input[name=title]').val();
      // console.log(title);

      //Verify required fields
        //set errorMsg if something fails

      //If verified, add item and toggle addBookmarkWindow closed

      // render();
    });
  };

  //Expand Bookmark
  const handleExpandBookmarkToggle = function(){
    $('.js-bookmarks-list').on('click', '.js-bookmark-item-expand', event =>{
      const id = getBookmarkIdFromElement(event.currentTarget);
      store.toggleBookmarkExpanded(id);
      render();
    });
  };

  //Remove Bookmark
  const handleBookmarkDelete = function(){
    $('.js-bookmarks-list').on('click', '.js-bookmark-item-remove', event =>{
      const id = getBookmarkIdFromElement(event.currentTarget);
      console.log('delete ', id);
      api.deleteBookmark(id, function(response){
        store.deleteBookmark(id);
        render();
      },function(response){
        //TODO: Feed to DOM instead
        console.log('Error deleting item: ', response.responseJSON.message);
      });
      render();
    });
  };

  //// Etc ////
  
  
  const bindEventListeners = function(){
    handleNewBookmarkBtn();
    handleStarFilterChange();
    handleSubmitNewBookmark();
    handleExpandBookmarkToggle();
    handleBookmarkDelete();
    
  };
  
  return {
    bindEventListeners,
    render
  };

}() );
