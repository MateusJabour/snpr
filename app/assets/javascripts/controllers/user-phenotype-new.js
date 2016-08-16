define(['jquery', 'jqueryui', 'bootstrap'], function ($, jqueryui, bs) {
  'use strict';

  var userPhenotypeNew = function () {
    var init = function () {
      initEvents();
    };

    var initEvents = function () {
      $('[data-js="enter-variation-button"]').click(handleVariationClick)
      $('input[type=radio]').click(handleRadioClick);
    };

    var handleVariationClick = function () {
      $.ajax({
        type: 'POST',
        url: window.location.href.match(/\/\w+\/.+/),
        data: { pheno_id: $(this).data('id') },
        dataType: 'json',
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

    var handleRadioClick = function() {
      $('<%="#phenotype_field"+phenotype.id.to_s%>').hide();
      $("label[for=user_phenotype_variation]").hide();
    };

    return {
      init: init
    };
  };
  return userPhenotypeNew();
});
