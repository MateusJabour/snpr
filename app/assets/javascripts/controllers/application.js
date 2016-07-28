define(['jquery', 'iubenda', 'bootstrap'], function ( $ , iubenda, bs ) {
  'use strict';

  var application = function () {
    var $searchButton = $('[data-js="search-button"]');
    var $searchForm = $('[data-js="search-form"]');

    var init = function () {
      initEvents();
      $('[data-toggle="tooltip"]').tooltip();
      $('#tab-container').easytabs();
    };

    var initEvents = function () {
      $searchButton.on('click', searchButtonCallback);
    };

    var searchButtonCallback = function (event) {
      event.preventDefault();
      if ($searchForm.hasClass('showed')) {
        $searchForm.animate({top: '0'});
      } else {
        $searchForm.animate({top: '50px'});
      }
      $searchForm.toggleClass('showed');
    };

    return {
      init: init
    };
  };

  return application();
});
