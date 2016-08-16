define(['jquery', 'bootstrap'], function ( $, bs ) {
  'use strict';

  var userIsUser = function () {
    var $helpOne = $('[data-js="help_one"]');
    var $helpTwo = $('[data-js="help_two"]');
    var $helpThree = $('[data-js="help_three"]');
    var $helpBlock = $('[data-js="help_block"]');

    var init = function () {
      $('[data-toggle="tooltip"]').tooltip();
      initEvents();
    };

    var initEvents = function () {
      $('#remove_help_one').on('click', removeHelpOne);
      $('#remove_help_two').on('click', removeHelpTwo);
      $('#remove_help_three').on('click', removeHelpThree);
    };

    var removeHelpOne = function() {
      if($helpThree.is(":hidden") && $helpTwo.is(":hidden")) {
        $helpBlock.hide("slow");
      } else {
        $helpOne.hide('slow');
      }
    };

    var removeHelpTwo = function() {
      if( $helpOne.is(":hidden") && $helpThree.is(":hidden") ){
        $helpBlock.hide("slow");
      } else {
        $helpTwo.hide('slow');
      }
    };

    var removeHelpThree = function() {
      if( $helpOne.is(":hidden") && $helpTwo.is(":hidden") ){
        $helpBlock.hide("slow");
      } else {
        $helpThree.hide('slow');
      };
    };

    return {
      init: init
    };
  };

  return userIsUser();
});
