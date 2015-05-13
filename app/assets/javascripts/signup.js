$(document).ready(function() {

  var loadModal = function() {
    console.log("ACTIVATED!!");
    $('.loading-modal').fadeIn();
  }
  var removeModal = function() {
    $('.loading-modal').fadeOut();
  }

  var email = $('#user_email').val();
  var username = $('#user_username').val();
  var password = $('#user_password').val();
  var password_confirmation = $('#user_password_confirmation').val();

  $('container').on('click', '.create-account-button', function(event){
    event.preventDefault();
    $('.new-user-form').remove();
    loadModal();
    $.ajax({
      method: 'post',
      url: 'localhost:3000/users',
      dataType: 'json',
      data: { email: email,
              username: username,
              password: password,
              password_confirmation: password_confirmation },
      error: function() {
        console.log("Sorry...something went wrong");
      },
      success: function(response) {
        console.log(response);
      },
      complete: function() {
        removeModal();
      }
    });

  });
});