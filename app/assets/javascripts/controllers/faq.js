define(['jquery'], function ($) {
  var faq = function () {
    var $panelHeader = $('[data-js="panel-header"]');
    var $extendButton = $('[data-js="extend-button"]');

    var init = function () {
      initEvents();
    };

    var initEvents = function () {
      $panelHeader.on('click', panelHeaderCallback);
      $extendButton.on('click', extendButtonCallback);
    };

    var panelHeaderCallback = function (event) {
      event.preventDefault();
      var $extendButton = $(this).siblings('.test-faq__title-extend');
      if ($extendButton.text() === '+') {
        $extendButton.text('-');
      } else if ($extendButton.text() === '-') {
        $extendButton.text('+');
      }
    };

    var extendButtonCallback = function (event) {
      event.preventDefault();
      if ($(this).text() === '+') {
        $(this).text('-');
      } else if ($(this).text() === '-') {
        $(this).text('+');
      }
    };

    return {
      init: init
    };
  };
  return faq();
});
