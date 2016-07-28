define(['jquery', 'bootstrap'], function ( $, bs ) {
  'use strict';

  var userEdit = function () {
    var $updateUserButton = $('#update_user');

    var init = function () {
      initEvents();
    };

    var initEvents = function () {
      $updateUserButton.on('click', updateUserCallback);
      $.ajax({
        type: 'GET',
        url: window.location.href.match(/\/\w+\/.+/),
        dataType: "json",
        success: ajaxRequest
      });
    };

    var updateUserCallback = function() {
      $updateUserButton.val("Updating...").addClass("disabled");
      setTimeout( function () {
        $updateUserButton.val("Update Information").removeClass("disabled");
      }, 1000);
    };

    var ajaxRequest = function (response) {
      $.each(response.user_phenotypes, function(key, value) {
        $(function () {
          $('[data-js="phenotype-' + value.phenotype_id + '"]').autocomplete({
            source: response.known_phenotypes[key].known_phenotypes
          });
        });
      });
    }

    return {
      init: init
    }
  };

  return userEdit();
});
