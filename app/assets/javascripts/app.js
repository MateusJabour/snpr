define([ 'jquery' ], function( $ ) {
  'use strict';

  var app = function() {
    var $public = {};
    var $private = {};

    $private.projectPaths = {};

    $public.init = function init() {
      console.log( 'carregou app.js' );
      $private.loadPageScripts();
    };

    $public.setPath = function setPath( pathName, pathUrl ) {
      $private.projectPaths[ pathName ] = pathUrl;
      return $public;
    };

    $public.getPath = function getPath( pathName ) {
      return $private.projectPaths[ pathName ];
    };

    $private.loadPageScripts = function loadPageScripts() {
      console.log($('body').data('namespace'));

      $private.initModule( 'controllers/application' );

      if( $('body').data('namespace') === 'users/edit' ) {
        $private.initModule( 'controllers/user-edit' );
      }

      if( $('body').data('namespace') === 'users/show' ) {
        $private.initModule( 'controllers/user-show' );
        $private.initModule( 'controllers/user-phenotype-new' );
      }

      if( $('body').data('namespace') === 'picture_phenotypes/new' ) {
        $private.initModule( 'controllers/picture-phenotype-new' );
      }

      if( $('body').data('namespace') === 'picture_phenotypes/show' ) {
        $private.initModule( 'controllers/picture-phenotype-show' );
      }

      if( $('body').data('namespace') === 'phenotypes/show' ) {
        $private.initModule( 'controllers/user-phenotype-form' );
      }

      if( $('body').data('namespace') === 'phenotypes/new' ) {
        $private.initModule( 'controllers/phenotype-new' );
      }

      if( $('body').data('namespace') === 'snps/show' ) {
        $private.initModule( 'controllers/snp-show' );
      }

      if( $('body').data('namespace') === 'static/faq' ) {
        $private.initModule( 'controllers/faq' );
      }

      if( $('body').data('namespace') === 'fitbit_profiles/show' ) {
          $private.initModule( 'controllers/fitbit-show' );
      }
    };

    $private.initModule = function initModule( module ) {
      require([ module ], function( module ) {
        module.init();
      });
    };

    return $public;
  };

  return app();
});
