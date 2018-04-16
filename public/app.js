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
            $('.feedback').show();
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
                 $('.login-feedback').show();
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

$(function() {
    $('body').vegas({
        slides: [
            {src: 'images/background3.jpg'},
            {src: 'images/background4.jpg'},

        ],
        delay: 5000,
        transition: 'fade',
        timer: false,
        cover:	true
    });
});
