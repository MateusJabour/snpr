define(['jquery', 'bootstrap'], function ( $, bs ) {
  'use strict';

  var picturePhenotypeShow = function () {
    var $pictureReplyButton = $('[data-js="picture-reply-button"]');

    var init = function () {
      initEvents();
    };

    var initEvents = function () {
      $pictureReplyButton.on('click', pictureReplyButtonCallback);
    };

    var sendCommentId = function (e, text) {
      e.value = text + e.value
    };

    var pictureReplyButtonCallback = function (event) {
      event.preventDefault();
      sendCommentId(document.new_comment.picture_phenotype_comment_comment_text, '@#' + this.id);
      return false;
    };

    return {
      init: init
    };
  };
  return picturePhenotypeShow();
});
