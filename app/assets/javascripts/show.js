$(document).ready(function() {

    $(".play-button").on("click", function(e){
      var extension = $(this).data("extension");
      $('.chuck-norris').css('background-image', 'none');
      $('body').css('background-color', '#f1f1f1');
      $('#images-to-compare').data("url-extension", extension);
      $.ajax({
        method: "get",
        url: "/play/show?" + extension,
        dataType: "json",
        error: function() {
          console.log("Sorry...something went wrong...");
        },
        success: function(data) {
          //set the data attribute equal to the extension so
          //I can access it outside of this method
          $(".main-wrapper").hide();
          var template_1 = $("#images-display-one").html();
          var template_2 = $("#images-display-two").html();
          var html_item_1 = Mustache.render(template_1, data.item_1);
          var html_item_2 = Mustache.render(template_2, data.item_2);
          $("#images-to-compare").append(html_item_1); 
          $("#images-to-compare").append(html_item_2);
        },
      });
      e.preventDefault();
    });

      $('.container').on('click', '.compare-image.image-one', function() {
        console.log(this);
        var item_1 = $(this).data("id");
        var item_2 = $(".compare-image.image-two").data("id");
        var extension = $('#images-to-compare').data("url-extension");

        if ($(this).data("category") != 8 && ($(".compare-image.image-two").data("category")) == 8) {
          $('#myModal').modal('show');
        } else {
          $('.loading-modal').fadeIn();

          $.ajax({
            method: "post",
            url: "/play/show/" + extension + "/" + item_1 + "/" + item_2,
            dataType: "json",
            error: function() {
              console.log("Sorry....something went wrong...");
            },
            success: function() {
              $.ajax({
                method: "get",
                //how do I reset this get request to get the same extension from before?
                url: "/play/show?" + extension,
                dataType: "json",
                error: function() {
                  console.log("Sorry...something went wrong...");
                },
                success: function(data) {
                  $(".main-wrapper").hide();
                  $("#images-to-compare").html("");
                  var template_1 = $("#images-display-one").html();
                  var template_2 = $("#images-display-two").html();
                  var html_item_1 = Mustache.render(template_1, data.item_1);
                  var html_item_2 = Mustache.render(template_2, data.item_2);
                  $("#images-to-compare").append(html_item_1); 
                  $("#images-to-compare").append(html_item_2);
                },
                complete: function() {
                  $('.loading-modal').fadeOut();
                }
              });
            }
          });
        }
        return false;
      });

      $('.container').on('click', '.compare-image.image-two', function() {
        
        var item_1 = $(this).data("id");
        var item_2 = $(".compare-image.image-one").data("id");
        var extension = $('#images-to-compare').data("url-extension");

        console.log($(this).data("category"))
        console.log($(".compare-image.image-one").data("category"))

        if ($(this).data("category") != 8 && ($(".compare-image.image-one").data("category")) == 8) {
          $('#myModal').modal('show');
        } else {
          $('.loading-modal').fadeIn();

          $.ajax({
            method: "post",
            url: "/play/show/" + extension + "/" + item_1 + "/" + item_2,
            dataType: "json",
            error: function() {
              console.log("Sorry....something went wrong...");
            },
            success: function() {
              $.ajax({
                method: "get",
                url: "/play/show?" + extension,
                dataType: "json",
                error: function() {
                  console.log("Sorry...something went wrong...");
                },
                success: function(data) {
                  $(".main-wrapper").hide();
                  $("#images-to-compare").html("");
                  var template_1 = $("#images-display-one").html();
                  var template_2 = $("#images-display-two").html();
                  var html_item_1 = Mustache.render(template_1, data.item_1);
                  var html_item_2 = Mustache.render(template_2, data.item_2);
                  $("#images-to-compare").append(html_item_1); 
                  $("#images-to-compare").append(html_item_2);
                },
                complete: function() {
                  $('.loading-modal').fadeOut();
                }
              });
            }
          });
        }
        return false;
      });
    

});