$(document).ready(function() {

  var loadModal = function() {
    $('.loading-modal').fadeIn();
  }
  var removeModal = function() {
    $('.loading-modal').fadeOut();
  }

  var get_random_color = function() {
    var r = function() {
      return Math.floor(Math.random()*256)
    };
    return "rgb(" + r() + "," + r() + "," + r() + ")";
  }

  var urlToUse = "/admin/category_compare"
  

   //------------------------------------------------
    //----------LOAD FILTERED BAR GRAPH-------------------------
    //------------------------------------------------

    $('.fourth-filter-button').on('click', function(e) {
      e.preventDefault();
      loadModal();
      var cat_1 = $('#_cat_1 option:selected').html();
      var cat_2 = $('#_cat_2 option:selected').html();
      $.ajax({
        method: "post",
        data: { cat_1: cat_1, 
                cat_2: cat_2 },
        url: urlToUse,
        dataType: "json",
        error: function() {
          console.log("sorry...something went wrong");
        },
        success: function(response) {
          $('#barChart').remove();
          $('.bar-chart-container').append('<canvas id="barChart" width="800" height="600"></canvas>');
          var barChart = document.getElementById('barChart').getContext('2d');
          var objectToUse = response.query;
          var data = {};
          data = {
          labels: [objectToUse.category_1_name, objectToUse.category_2_name],
          datasets: [
              {
                label: "Another Label",
                fillColor: "rgba(220,220,220,0.5)",
                strokeColor: "rgba(220,220,220,0.8)",
                highlightFill: "rgba(220,220,220,0.75)",
                highlightStroke: "rgba(220,220,220,1)",
                data: [objectToUse.category_1_win_percentage, objectToUse.category_2_win_percentage]
              }
            ]
          };

          var options = {
            //Boolean - Whether the scale should start at zero, or an order of magnitude down from the lowest value
            scaleBeginAtZero : true,

            //Boolean - Whether grid lines are shown across the chart
            scaleShowGridLines : true,

            //String - Colour of the grid lines
            scaleGridLineColor : "rgba(0,0,0,.05)",

            //Number - Width of the grid lines
            scaleGridLineWidth : 1,

            //Boolean - Whether to show horizontal lines (except X axis)
            scaleShowHorizontalLines: true,

            //Boolean - Whether to show vertical lines (except Y axis)
            scaleShowVerticalLines: true,

            //Boolean - If there is a stroke on each bar
            barShowStroke : true,

            //Number - Pixel width of the bar stroke
            barStrokeWidth : 2,

            //Number - Spacing between each of the X value sets
            barValueSpacing : 5,

            //Number - Spacing between data sets within X values
            barDatasetSpacing : 2,
          };
        
          barChart = new Chart(barChart).Bar(data, options);

        }

      });
    });



  //---------------------------------------------------------
  //---LOAD NEW PIE CHART ------------------------------------
  //----------------------------------------------------------

  $('.fourth-filter-button').on('click', function(e) {
      e.preventDefault();
      var cat_1 = $('#_cat_1 option:selected').html();
      var cat_2 = $('#_cat_2 option:selected').html();
      $.ajax({
        method: "post",
        data: { cat_1: cat_1, 
                cat_2: cat_2 },
        url: urlToUse,
        dataType: "json",
        error: function() {
          console.log("sorry...something went wrong");
        },
        success: function(response) {
          console.log(response);
          $('#pieChart').remove();
          $('.pie-chart-container').append('<canvas id="pieChart" width="700" height="700"></canvas>');
          var pieChart = document.getElementById('pieChart').getContext('2d');
          var objectToUse = response.query;
          var updatedDataSet = [
            { color: get_random_color(),
              highlight: get_random_color(),
              label: objectToUse.category_1_name,
              value: objectToUse.category_1_win_percentage
            },
            { color: get_random_color(),
              highlight: get_random_color(),
              label: objectToUse.category_2_name,
              value: objectToUse.category_2_win_percentage
            }
          ]
          // }
          var data = updatedDataSet

          var options = {
            //Boolean - Whether we should show a stroke on each segment
            segmentShowStroke : true,

            //String - The colour of each segment stroke
            segmentStrokeColor : "#fff",

            //Number - The width of each segment stroke
            segmentStrokeWidth : 1,

            //Number - The percentage of the chart that we cut out of the middle
            percentageInnerCutout : 0, // This is 0 for Pie charts

            //Number - Amount of animation steps
            animationSteps : 100,

            //String - Animation easing effect
            animationEasing : "easeOutBounce",

            //Boolean - Whether we animate the rotation of the Doughnut
            animateRotate : true,

            //Boolean - Whether we animate scaling the Doughnut from the centre
            animateScale : false,
          }

          loadAnotherChart = new Chart(pieChart).Pie(data, options);
        },
        complete: function() {
          removeModal();
        }
      });
    });
});
