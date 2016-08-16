define(['jquery', 'jqueryui', 'bootstrap'], function ($, jqueryui, bs) {
  'use strict';

  var userPhenotypeForm = function () {
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
      $(function () {
        $('[data-js="autocomplete-phenotype-field"]').autocomplete({
          source: response.known_phenotypes
        });
      });
    };

    return {
      init: init
    };
  };
  return userPhenotypeForm();
});
