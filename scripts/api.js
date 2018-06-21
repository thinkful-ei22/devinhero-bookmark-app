/* global cuid */

'use strict';

console.log('api.js');


const api = (function(){
  const BASE_URL = 'https://thinkful-list-api.herokuapp.com/devinhero/bookmarks';

  const getBookmarks = function(callback){
    $.getJSON(`${BASE_URL}`, callback);
  };

  const createBookmark = function(title, url, rating, desc, callback, error){
    const newBookmark = JSON.stringify({
      title, url, rating, desc
    });

    $.ajax({
      url: `${BASE_URL}`,
      method: 'POST',
      contentType: 'application/json',
      data: newBookmark,
      success: callback,
      error: error
    });
  };

  const deleteBookmark = function(id, callback, error){
    $.ajax({
      url: `${BASE_URL}/${id}`,
      method: 'DELETE',
      contentType: 'application/json',
      success: callback,
      error: error
    });
  };

  //updateItem() //Stretch goal
  return {
    getBookmarks,
    createBookmark,
    deleteBookmark,
  };


}() );