;(function(doc) {
  'use strict';

  var $scriptDefault = doc.querySelector( '[data-js="script-tag"]' );
  var BASE_URL = $scriptDefault.getAttribute( 'data-base-url' );

  require.config({
    baseUrl: '/assets',
    paths: {
      jquery: ['https://code.jquery.com/jquery-2.2.4'],
      bootstrap: ['vendor/bootstrap.min'],
      jqueryui: ['vendor/jquery-ui.min'],
      dalliance: ['vendor/dalliance-compiled'],
      jqplotBarRenderer: ['vendor/jqplot.barRenderer.min'],
      jqplotCursor: ['vendor/jqplot.cursor.min'],
      jqplotDateAxisRenderer: ['vendor/jqplot.dateAxisRenderer.min'],
      jqplotHighlighter: ['vendor/jqplot.highlighter.min'],
      jqplotPieRenderer: ['vendor/jqplot.pieRenderer.min'],
      jqueryEasytabs: ['vendor/jquery.easytabs'],
      jqueryJqplot: ['vendor/jquery.jqplot.min'],
      iubenda: ["https://cdn.iubenda.com/iubenda"]
    }
  });

 require(['jquery', 'bootstrap', 'jqueryui', 'jqueryJqplot', 'jqplotBarRenderer', 'jqplotCursor',
  'jqplotDateAxisRenderer', 'jqplotHighlighter','jqplotPieRenderer', 'jqueryEasytabs', 'dalliance', 'iubenda'],
  function ($, bs, jui, jbr, jc, jdar, jh, jpr, jet, jj, dalliance, iubenda) {
    require([ BASE_URL + '/assets/app'], function (app) {
      app.setPath('BASE_URL', BASE_URL).init();
    });
  });
})(document);
