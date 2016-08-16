define(['jquery', 'jqueryJqplot', 'jqplotBarRenderer', 'jqplotCursor',
 'jqplotDateAxisRenderer', 'jqplotHighlighter',
 'jqplotPieRenderer', 'jqueryEasytabs'], function ( $, jj, jbr, jc, jdar, jh, jpr, jet) {

  'use strict';

  var fitbitShow = function () {
    var init = function () {
      initEvents();
    }

    var initEvents = function () {
      $.ajax({
        type: 'GET',
        url: window.location.href.match(/\/\w+\/.+/),
        dataType: "json",
        success: ajaxRequest
      });
    }

    var ajaxRequest = function (response) {
      //Activity Graph
      var steps = response.steps;
      var floors = response.floors;
      var plot1 = $.jqplot('chart1', [floors, steps], {
        title:'Activity per Day (Mean steps/day: ' + response.mean_steps+ ')',
        series:[{label:'Floors' ,yaxis:'y2axis',fill: true,fillAlpha: 0.8,highlightMouseOver: false}, {label:'Steps'}],
        axes:{
          xaxis:{
            renderer:$.jqplot.DateAxisRenderer,
            tickOptions:{
              formatString:'%b&nbsp;%#d'
            }
          },
          yaxis:{
            tickOptions:{
              formatString:'%i steps'
            }
          },
          y2axis:{
            tickOptions:{
              formatString:'%i floors'
            },
          },
        },
        axesDefaults: {
          pad: 0
        },
        legend: {
          show: true,
          placement: 'outsideGrid'
        },
        highlighter: {
          show: true,
          sizeAdjust: 7.5
        },
        cursor: {
          show: false
        }
      });
      // Sum Activity Graph
      var total_steps= response.total_steps;
      var total_floors= response.total_floors;
      var plot2 = $.jqplot('chart2', [total_floors,total_steps], {
        title:'Sum of Activity',
        series:[{label:"Floors",yaxis:'y2axis',fill:true,fillAlpha:0.5},{label:'Steps',fill:true,fillAlpha:0.5}],
        axes:{
          xaxis:{
            renderer:$.jqplot.DateAxisRenderer,
            tickOptions:{
              formatString:'%b&nbsp;%#d'
            }
          },
          yaxis:{
            tickOptions:{
              formatString:'%i steps'
            }
          },
          y2axis:{
            tickOptions:{
              formatString:'%i floors'
            },
          },
        },
        axesDefaults: {
          pad: 0
        },
        legend: {
          show: true,
          placement: 'outsideGrid'
        },
        highlighter: {
          show: true,
          sizeAdjust: 7.5
        },
        cursor: {
          show: false
        }
      });

      // BMI Graph
      var bmi= response.bmi;
      var plot3 = $.jqplot('chart3', [bmi], {
        title:'BMI per Day',
        series:[{label:'Body Mass Index',fill:true}],
        axes:{
          xaxis:{
            renderer:$.jqplot.DateAxisRenderer,
            tickOptions:{
              formatString:'%b&nbsp;%#d'
            }
          },
          yaxis:{
            tickOptions:{
              formatString:'%.2f BMI'
            }
          },
        },
        axesDefaults: {
        },
        legend: {
          show: true,
          placement: 'outsideGrid'
        },
        highlighter: {
          show: true,
          sizeAdjust: 7.5
        },
        cursor: {
          show: false
        }
      });
      // Activity Graph
      var minutes_asleep= response.minutes_asleep;
      var minutes_to_sleep= response.minutes_to_sleep;
      var awakenings= response.awakenings;
      var plot4 = $.jqplot('chart4', [awakenings,minutes_asleep,minutes_to_sleep], {
        title:'Sleep per Day (Mean sleep/day: <%=@mean_sleep%> minutes)',
        series:[{label:'# awaken' ,yaxis:'y2axis',fill: true,highlightMouseOver: false}, {label:'Minutes asleep'},{label: 'Minutes awake',fill:true}],
        axes:{
          xaxis:{
            renderer:$.jqplot.DateAxisRenderer,
            tickOptions:{
              formatString:'%b&nbsp;%#d'
            }
          },
          yaxis:{
            tickOptions:{
              formatString:'%i minutes'
            }
          },
          y2axis:{
            tickOptions:{
              formatString:'%i times awoken'
            },
          },
        },
        axesDefaults: {
          pad: 0
        },
        legend: {
          show: true,
          placement: 'outsideGrid'
        },
        highlighter: {
          show: true,
          sizeAdjust: 7.5
        },
        cursor: {
          show: false
        }
      });

      // Sum Activity Graph
      var total_minutes_asleep= response.total_minutes_asleep;
      var total_minutes_to_sleep= response.total_minutes_to_sleep;
      var plot5 = $.jqplot('chart5', [total_minutes_asleep,total_minutes_to_sleep], {
        title:'Sum of Sleep',
        series:[{label:'minutes asleep',fill:true,fillAlpha:0.5},{label:"minutes falling asleep",yaxis:'y2axis',fill:true,fillAlpha:0.6}],
        axes:{
          xaxis:{
            renderer:$.jqplot.DateAxisRenderer,
            tickOptions:{
              formatString:'%b&nbsp;%#d'
            }
          },
          yaxis:{
            tickOptions:{
              formatString:'%i min (asleep)'
            }
          },
          y2axis:{
            tickOptions:{
              formatString:'%i min (falling asleep)'
            },
          },
        },
        axesDefaults: {
          pad: 0
        },
        legend: {
          show: true,
          placement: 'outsideGrid'
        },
        highlighter: {
          show: true,
          sizeAdjust: 7.5
        },
        cursor: {
          show: false
        }
      });
    };

    return { init: init };
  };

  return fitbitShow();
});
