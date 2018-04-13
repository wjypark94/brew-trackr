'use strict';

//when you click the button with id demo buttom
//window location to login.html

$('#demo-button').on('click', event => {
    window.location = "login.html";
});

$('.register-button').on('click', event => {
    window.location = "index.html#register";
});



// Register form

$('.register-form').on('submit', event => {
    event.preventDefault();

    let username = $('.username').val();
    let password = $('.password').val();

    $.ajax({
        method: 'POST',
        url: '/api/users',
        data: JSON.stringify({username, password}),
        contentType: 'application/json',
        dataType: 'json',
        
        success: response => {
            console.log(response);
           window.location = 'login.html' 
        },

        error: function(object, message) {
            console.log(object);
            $('.feedback').append(`<p>Username already taken!</p>`
            );
        }
    });
});


//Authentication

$('.login-form').on('submit', event => {
    event.preventDefault();

    let username = $('.username').val();
    let password = $('.password').val();

    $.ajax({
        method: 'POST',
        url: '/api/auth/login',
        data: JSON.stringify({username, password}),
        contentType: 'application/json',
        dataType: 'json',
        error: function(object, message, string){
            console.log(object);
            if(object.status === 401){
                 $('.login-feedback').append(`<p>Incorrect username or password</p>`);
            }
        },

        success: response => {
            console.log(response.authToken, response.userId)
            console.log("success!")
            localStorage.setItem('token', response.authToken)
            localStorage.setItem('userId', response.userId)
            window.location = "coffee.html";
        }
    })
});
