define([ 'jquery', 'bootstrap', 'jqueryui' ], function( $, bs, jqueryui ) {
  'use strict';

  var phenotypeNew = function () {
    var init = function () {
      initEvents();
    };

    var initEvents = function () {
      $.ajax({
        type: 'GET',
        url: window.location.href.match(/\/\w+\/.+/),
        dataType: "json",
        success: ajaxRequest
      });
    };

    var ajaxRequest = function (response) {
      console.log(response);
      $(function () {
        $('[data-js="phenotype_characteristic"]').autocomplete({
          source: response.phenotype_array
        });
      });
    };

    return {
      init: init
    };
    
  };
  return phenotypeNew();
});
