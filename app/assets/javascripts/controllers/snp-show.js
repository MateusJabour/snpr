define(['jquery', 'jqueryJqplot', 'jqplotBarRenderer', 'jqplotCursor',
 'jqplotDateAxisRenderer', 'jqplotHighlighter',
 'jqplotPieRenderer', 'jqueryEasytabs', 'dalliance'], function ( $, jj, jbr, jc, jdar, jh, jpr, jet, dalliance) {

  'use strict';

  var snpShow = function () {
    var $snpReplyButton = $('[data-js="snp-reply-button"]');

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
      $snpReplyButton.on('click', snpReplyButtonCallback);
    };

    var sendCommentId = function (e, text) {
      e.value = text + e.value;
    };

    var snpReplyButtonCallback = function (event) {
      event.preventDefault();
      sendCommentId(document.new_comment.snp_comment_comment_text, '@#' + this.id);
      return false;
    };

    var ajaxRequest = function (response) {
      console.log(response);
      $.ajax({
        url: "/user_snps",
        data: { snp_name: response.snp.name, local_genotype: response.local_genotype },
        success: userSnpAjaxRequest
      });

      new Browser({
        chr:          response.snp.chromosome,
        viewStart:    +response.snp.position - 10000,
        viewEnd:      +response.snp.position + 10000,
        cookieKey:    response.snp.name,
        pageName:     response.snp.name,

        coordSystem: {
          speciesName: 'Human',
          taxon: 9606,
          auth: 'GrCh',
          version: '38',
          ucscName: 'hg38'
        },

        sources: [
          {
          name:    'Genome',
          twoBitURI: 'https://www.biodalliance.org/datasets/hg38.2bit',
          tier_type: 'sequence'
          },
          {
          name: 'Genes',
          desc: 'Gene structures from GENCODE 21',
          bwgURI: 'https://www.biodalliance.org/datasets/GRCh38/gencode.v21.annotation.bb',
          stylesheet_uri: 'https://www.biodalliance.org/stylesheets/gencode2.xml',
          collapseSuperGroups: true,
          trixURI: 'https://www.biodalliance.org/datasets/GRCh38/gencode.v21.annotation.ix'
          },
          //ifsaqui
          {
          name: 'Your SNPs',
          desc: 'SNPs @ openSNP',
          uri: response.requestBaseUrl + '/das/' + response.current_user.id + '/'
          }
        ],

      searchEndpoint: new DASSource('https://www.biodalliance.org/das/hsa_59_37d'),
      browserLinks: {
        Ensembl: 'http://www.ensembl.org/Homo_sapiens/Location/View?r=' + (response.snp.chromosome).toString() + ':' + (+response.snp.position - 10000).toString() + '-' + (+response.snp.position + 10000).toString(),
        UCSC: 'http://genome.ucsc.edu/cgi-bin/hgTracks?db=hg19&position=chr' + (response.snp.chromosome).toString() + ':' + (+response.snp.position - 10000).toString() + '-' + (+response.snp.position + 10000).toString()
      },

      forceWidth: 900,
      noPersist: true,
      disablePoweredBy: true
      });

      if($('#freq_chart').length){
          var freq_data = [];
          $.each(response.snp.genotype_frequency, function (key, val) {
            console.log(response.total_genotypes);
            console.log(((val/response.total_genotypes) * 100).toString());
            freq_data.push([key, ((val/response.total_genotypes) * 100)]);
          });

        var plot1 = jQuery.jqplot ('freq_chart', [freq_data],
        {
          /*seriesColors: ["#B0EDFF","#8EB5E8","#6E7CDB","#5F4DD6","#4823AD"],*/
          seriesDefaults: {
            renderer: jQuery.jqplot.PieRenderer,
            rendererOptions: {
              showDataLabels: true,
              fill: false
            }
          },
          legend: { show:true, location: 'e' },
          grid: { shadow:false,
            borderWidth: 0,
            background: '#ffffff'}
          }
          );
        }
        if($('#allele_chart').length){
          var allele_data = [];
          $.each(response.snp.allele_frequency, function (key, val) {
            console.log(response.total_alleles);
            console.log(((val/response.total_alleles) * 100).toString());
            console.log(key);
            allele_data.push([key, ((val/response.total_alleles) * 100)]);
          });
          console.log(allele_data);
          var plot2 = jQuery.jqplot ('allele_chart', [allele_data],
          {
            /*seriesColors: ["#B0EDFF","#8EB5E8","#6E7CDB","#5F4DD6","#4823AD"],*/
            seriesDefaults: {
              dataLabelPositionFactor: 3,
              renderer: jQuery.jqplot.PieRenderer,
              rendererOptions: {
                showDataLabels: true,
                fill: false
              }
            },
            legend: { show:true, location: 'e' },
            grid: { shadow:false,
              borderWidth: 0,
              background: '#ffffff'}
          });
        }
      };

    var userSnpAjaxRequest = function (response) {
      // console.log(response);
      $('#user-list').append(response);
    };

    return {
      init: init
    };
  };

  return snpShow();

});
