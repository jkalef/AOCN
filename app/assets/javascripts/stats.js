$(document).ready(function() {

  var get_random_color = function() {
    var r = function() {
      return Math.floor(Math.random()*256)
    };
    return "rgb(" + r() + "," + r() + "," + r() + ")";
  }

  // -------------------------------------------------------------------------
  // -------------- INITIAL BAR GRAPH ----------------------------------------
  // -------------------------------------------------------------------------
  var barChart = document.getElementById('barChart').getContext('2d');

  $.ajax({
    method: "get",
    url: "http://localhost:3000/admin/stats/show",
    dataType: "json",
    error: function() {
      console.log("Sorry, something went wrong");
    },
    success: function(response) {
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
            fillColor: "rgba(220,220,220,0.5)",
            strokeColor: "rgba(220,220,220,0.8)",
            highlightFill: "rgba(220,220,220,0.75)",
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
    $('.bar-chart-container').append('<canvas id="barChart" width="800" height="300"></canvas>');
    var barChart = document.getElementById('barChart').getContext('2d');
    
    $.ajax({
      method: "get",
      url: "http://localhost:3000/admin/stats/show",
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
              fillColor: "rgba(220,220,220,0.5)",
              strokeColor: "rgba(220,220,220,0.8)",
              highlightFill: "rgba(220,220,220,0.75)",
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
    url: "http://localhost:3000/admin/stats/show",
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
    $('.pie-chart-container').append('<canvas id="pieChart" width="500" height="500"></canvas>');
    var pieChart = document.getElementById('pieChart').getContext('2d');
    $.ajax({
      method: "get",
      url: "http://localhost:3000/admin/stats/show",
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

});