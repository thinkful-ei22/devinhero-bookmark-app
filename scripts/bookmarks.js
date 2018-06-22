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

    $('.error-msg').html(generateError);
      
    $('.js-bookmarks-list').html(bookmarksHTML);
  };
  
  const generateAddingBookmarkWindowHTML = function(){
    return `
        <content class="new-bookmark">
          <div class="new-bookmark-window">
            <h2 class="new-bookmark-form-title">Add Bookmark</h2>
            <form class="js-new-bookmark-form new-bookmark-form">
                <label>Title</label>
                <div class="new-bookmark-input-box">
                  <input type="text" name="title" required>
                </div>

                <label>URL</label>
                <div class="new-bookmark-input-box">
                  <input type="url" name="url" required>
                </div>

                <label>Rating</label>
                <div class="new-bookmark-input-box">
                  <select name="rating">
                    <option value="1">1 Star</option>
                    <option value="2">2 Stars</option>
                    <option value="3" selected="selected">3 Stars</option>
                    <option value="4">4 Stars</option>
                    <option value="5">5 Stars</option>
                  </select>
                </div
              
                <label for="description">Description</label>
                <textarea name="description"></textarea>
                <div class="new-bookmark-submit-box">
                  <input type="submit" value="Add 'Mark" class="button-style">
                </div>
            </form>
          </div>
        </content>`;
  };

  const generateBookmarkItemHTML = function (bookmark){
    let itemString = `
          <li class="bookmark-item js-bookmark-item" data-bookmark-id="${bookmark.id}">
            <div class="bookmark-item-head">
              <button class="bookmark-item-expand js-bookmark-item-expand">
                <div class="bookmark-item-title-label">${bookmark.title}</div>
                <div class="bookmark-item-rating">${generateBookmarkStarsHTML(bookmark.rating)}</div>
              </button>
            </div>`;
    
    if(bookmark.expanded){
      itemString += `
            <div class="bookmark-item-content">
              <div class="bookmark-item-description">
                <h2>${bookmark.title}</h2>
                <p>Rating: ${bookmark.rating}</p>
                <p>${bookmark.desc}</p>
              </div>
              <div class="bookmark-item-buttons">
                <div class="bookmark-item-link-box"><a href="${bookmark.url}" class="button-style bookmark-item-link">Visit Page</a></div>
                <div class="bookmark-item-remove-box"><input type="button" value="Remove 'Mark" class="bookmark-item-remove js-bookmark-item-remove button-style"></div>
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
        stars += generateOneStarHTML(true);
      }else{
        stars += generateOneStarHTML(false);
      }
    }

    return stars;
  };

  const generateOneStarHTML = function(isOn){
    if(isOn){
      return '<img src="images/star-on.png" class="star star-on" alt="star-on"> ';
    }else{
      return '<img src="images/star-off.png" class="star star-off" alt="star-off"> ';
    }
  };

  const generateError = function(){
    if(store.errorMsg){
      const err = store.errorMsg;
      store.errorMsg = '';
      return err;
    }else{
      return '';
    }
  };

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
      store.setMinRating(this.value);
      render();
    });
  };

  //Toggle New Bookmark Window
  const handleNewBookmarkBtn = function(){
    
    $('.new-bookmark-button').click(() => {
      store.toggleAddingNewBookmark();
      render();
    });
  };

  //Submit New Bookmark 
  const handleSubmitNewBookmark = function(){
    $('.js-new-bookmark-container').on('submit', '.js-new-bookmark-form',event =>{
      event.preventDefault();
      //Grab all the data
      const title = $('.js-new-bookmark-form [name=title]').val();
      const url = $('.js-new-bookmark-form [name=url]').val();
      const rating = $('.js-new-bookmark-form [name=rating]').val();
      const desc = $('.js-new-bookmark-form [name=description]').val();
      console.log(title);
      console.log(url);
      console.log(rating);
      console.log(desc);

      api.createBookmark(title, url, rating, desc, function(response){
        store.addBookmark(response);
        store.toggleAddingNewBookmark();
        render();
      }, function(response){
        //something went wrong
        store.setErrorMsg(`Error adding bookmark: ${response.responseJSON.message}`);
        render();
      });
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
        //Something went wrong
        store.setErrorMsg(`Error deleting bookmark: ${response.responseJSON.message}`);
        render();
      });
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
