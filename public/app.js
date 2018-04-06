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
            //window.location = 'places.html' 
        },

        error: error => console.log(error),
    });
});


//Authenticatipn

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

        success: response => {
            localStorage.setItem('token', response.authToken)
            localStorage.setItem('userId', response.userId)
            window.location = "places.html";

        }
    });
});
