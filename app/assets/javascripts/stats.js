$(document).ready(function() {

  var get_random_color = function() {
    var r = function() {
      return Math.floor(Math.random()*256)
    };
    return "rgb(" + r() + "," + r() + "," + r() + ")";
  }

  $('.stats-title').on('click', function() {
    $(this).children('.filter-form').slideToggle();
  });

  $('.filter-form').on('click', function(event) {
    event.stopPropagation();
  })

  // -------------------------------------------------------------------------
  // -------------- INITIAL BAR GRAPH ----------------------------------------
  // -------------------------------------------------------------------------
  var barChart = document.getElementById('barChart').getContext('2d');

  $.ajax({
    method: "get",
    url: "/admin/stats/show",
    dataType: "json",
    error: function() {
      console.log("Sorry, something went wrong");
    },
    success: function(response) {
      console.log(response)
      var objectToUse = response.top_dogs
      var updateLabels = [];
      var updateData = [];
      for (var i = 0; i < objectToUse.length; i+=1) {
        updateData.push(objectToUse[i].win_percentage * 100);
        updateLabels.push(objectToUse[i].title);
      }
      var data = {
        labels: updateLabels,
        datasets: [
          {
            label: "Top Winners Overall",
            fillColor: get_random_color(),
            strokeColor: "rgba(220,220,220,0.8)",
            highlightFill: get_random_color(),
            highlightStroke: "rgba(220,220,220,1)",
            data: updateData
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

      var loadNewChart = new Chart(barChart).Bar(data, options);
      }    
  });

  
  // -------------------------------------------------------------------------
  // -------------- UPDATE THE BAR GRAPH -------------------------------------
  // -------------------------------------------------------------------------
  $('#filter-button').on('click', function() {
    $('#barChart').remove();
    $('.bar-chart-container').append('<canvas id="barChart" width="800" height="600"></canvas>');
    var barChart = document.getElementById('barChart').getContext('2d');
    
    $.ajax({
      method: "get",
      url: "/admin/stats/show",
      dataType: "json",
      error: function() {
        console.log("Sorry, something went wrong");
      },
      success: function(response) {
        //use this variable and function to grab only the objects the match
        //the search query we are displaying from the response
        var items = [];
        $.each(response, function(key, value) {
          if (key == $('#filter-button').data('id')) {
            items.push(value);
          }
        });
        var objectToUse = items[0];
        var updateLabels = [];
        var updateData = [];
        for (var i = 0; i < objectToUse.length; i+=1) {
          updateData.push(objectToUse[i].win_percentage * 100);
          updateLabels.push(objectToUse[i].title);
        }
        var data = {};
        data = {
          labels: updateLabels,
          datasets: [
            {
              label: "Top Winners Overall",
              fillColor: get_random_color(),
              strokeColor: "rgba(220,220,220,0.8)",
              highlightFill: get_random_color(),
              highlightStroke: "rgba(220,220,220,1)",
              data: updateData
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


  // -------------------------------------------------------------------------
  // -------------- INITIAL PIE CHART ----------------------------------------
  // -------------------------------------------------------------------------

  var pieChart = document.getElementById('pieChart').getContext('2d');

  $.ajax({
    method: "get",
    url: "/admin/stats/show",
    dataType: "json",
    error: function() {
      console.log("Sorry, something went wrong");
    },
    success: function(response) {
      var updatedDataSet = [];
      updatedDataSet.length = response.top_dogs.length;
      for (var i = 0; i < response.top_dogs.length; i+=1) {
        updatedDataSet[i] = {};
        updatedDataSet[i].value = response.top_dogs[i].win_percentage * 100;
        updatedDataSet[i].color = get_random_color();
        updatedDataSet[i].highlight = get_random_color();
        updatedDataSet[i].label = response.top_dogs[i].title;
      }

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

      var loadAnotherChart = new Chart(pieChart).Pie(data, options);
    }
  });


   // -------------------------------------------------------------------------
  // -------------- UPDATED PIE CHART ----------------------------------------
  // -------------------------------------------------------------------------

  $('#filter-button').on('click', function() {
    $('#pieChart').remove();
    $('.pie-chart-container').append('<canvas id="pieChart" width="700" height="700"></canvas>');
    var pieChart = document.getElementById('pieChart').getContext('2d');
    $.ajax({
      method: "get",
      url: "/admin/stats/show",
      dataType: "json",
      error: function() {
        console.log("Sorry, something went wrong");
      },
      success: function(response) {
        var updatedDataSet = [];
        //use this variable and function to grab only the objects the match
        //the search query we are displaying from the response
        var items = [];
        $.each(response, function(key, value) {
          if (key == $('#filter-button').data('id')) {
            items.push(value);
          }
        });
        var objectToUse = items[0];
        updatedDataSet.length = objectToUse.length;
        for (var i = 0; i < objectToUse.length; i+=1) {
          updatedDataSet[i] = {};
          updatedDataSet[i].value = objectToUse[i].win_percentage * 100;
          updatedDataSet[i].color = get_random_color();
          updatedDataSet[i].highlight = get_random_color();
          updatedDataSet[i].label = objectToUse[i].title;
        }

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
      }
    });
  });

var url = "/admin/stats";
    var get_random_color = function() {
      var r = function() {
        return Math.floor(Math.random()*256)
      };
      return "rgb(" + r() + "," + r() + "," + r() + ")";
    }

    var loadModal = function() {
      $('.loading-modal').fadeIn();
    }
    var removeModal = function() {
      $('.loading-modal').fadeOut();
    }
       
    //------------------------------------------------
    //----------LOAD FILTERED BAR GRAPH-------------------------
    //------------------------------------------------

    $('.third-filter-button').on('click', function(e) {
      e.preventDefault();
      loadModal();
      var gender = $('#_gender option:selected').html();
      var age_1 = $('#_age_1 option:selected').html();
      var age_2 = $('#_age_2 option:selected').html();
      var location = $('#_location option:selected').html();
      var win_or_lose = $('#_win_or_lose option:selected').html();
      var record_count = $('#_record_count option:selected').html();
      $.ajax({
        method: "post",
        data: { gender: gender, 
                age_1: age_1, 
                age_2: age_2, 
                location: location,
                win_or_lose: win_or_lose,
                record_count: record_count },
        url: url,
        dataType: "json",
        error: function() {
          console.log("sorry...something went wrong");
        },
        success: function(response) {
          $('#barChart').remove();
          $('.bar-chart-container').append('<canvas id="barChart" width="800" height="600"></canvas>');
          var barChart = document.getElementById('barChart').getContext('2d');
          var objectToUse = response.filtered_query;
          var updateLabels = [];
          var updateData = [];
          for (var i = 0; i < objectToUse.length; i+=1) {
            if (win_or_lose == "win") {
              updateData.push(objectToUse[i].win_percentage * 100);
            } else if (win_or_lose == "lose") {
              updateData.push(objectToUse[i].lose_percentage * 100);
            }
            updateLabels.push(objectToUse[i].title);
          }
          var data = {};
          data = {
          labels: updateLabels,
          datasets: [
              {
                label: "Top Winners Overall",
                fillColor: get_random_color(),
                strokeColor: "rgba(220,220,220,0.8)",
                highlightFill: get_random_color(),
                highlightStroke: "rgba(220,220,220,1)",
                data: updateData
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


    //-----------------------------------------------------------
    //---------LOAD FILTERED PIE CHART -------------------------------
    //------------------------------------------------------------

    $('.third-filter-button').on('click', function(e) {
      e.preventDefault();
      var gender = $('#_gender option:selected').html();
      var age_1 = $('#_age_1 option:selected').html();
      var age_2 = $('#_age_2 option:selected').html();
      var location = $('#_location option:selected').html();
      var win_or_lose = $('#_win_or_lose option:selected').html();
      var record_count = $('#_record_count option:selected').html();
      $.ajax({
        method: "post",
        data: { gender: gender, 
                age_1: age_1, 
                age_2: age_2, 
                location: location,
                win_or_lose: win_or_lose,
                record_count: record_count },
        url: url,
        dataType: "json",
        error: function() {
          console.log("sorry...something went wrong");
        },
        success: function(response) {
          var updatedDataSet = [];
          //use this variable and function to grab only the objects the match
          //the search query we are displaying from the response
          $('#pieChart').remove();
          $('.pie-chart-container').append('<canvas id="pieChart" width="700" height="700"></canvas>');
          var pieChart = document.getElementById('pieChart').getContext('2d');
          var objectToUse = response.filtered_query;
          updatedDataSet.length = objectToUse.length;
          for (var i = 0; i < objectToUse.length; i+=1) {
            updatedDataSet[i] = {};
            if (win_or_lose == "win") {
               updatedDataSet[i].value = objectToUse[i].win_percentage * 100;
            } else if (win_or_lose == "lose") {
              updatedDataSet[i].value = objectToUse[i].lose_percentage * 100;
            }
            updatedDataSet[i].color = get_random_color();
            updatedDataSet[i].highlight = get_random_color();
            updatedDataSet[i].label = objectToUse[i].title;
          }
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