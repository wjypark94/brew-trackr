'use strict';


//********NAV BUTTONS*******//

//when you click the sign up in the nav
//navigation will hide
//main content will hide
//sign up will hide
//sign up here button will hide
//log in will hide
//create account form will show up 
function navSignUp() {
    $('body').on('click', '.nav-sign-up', function(event) {
        $('navigation').hide();
        $('main').hide();
        $('.sign-up').hide();
        $('.sign-up-here-button').hide();
        $('.log-in').hide();
        $('.createAccount').show();
    });
}

//when you click on demo in the nav
//navigation will hide
//main content will hide
//sign up here btuton will hide
//log in will show with demo account info
function navDemo() {
    $('body').on('click', '.nav-demo', function(event) {
        $('navigation').hide();
        $('main').hide();
        $('.sign-up-here-button').hide();
        $('.log-in').show();
        $('.demo-account').show();
    });
}

//when you click log in on nav, it will hide navigation
//hides create account/sign up form
//will hide create account
//will hide main content
//will hide signup content
//will hide sign up here button 
//will hide demo account information
//will show log in form

function navLogIn() {
    $('.createAccount').hide();
    $('body').on('click', '.nav-log-in', function(event) {
        $('navigation').hide();
        $('.createAccount').hide();
        $('main').hide();
        $('.sign-up').hide();
        $('.sign-up-here-button').hide();
        $('.demo-account').hide();
        $('.log-in').show();
    });
}

//** TO GO BACK TO HOME PAGE CLICK ON H1 */

//when you're  on creating account/logging in account page
//if you click on the h1 tag, it will show navigation
//it will show main content
//sign up here button will show
//log in form will hide
//create account will hide

function backToHomepage() {
    $('.account').on('click', 'h1', function(event) {
        $('navigation').show();
        $('main').show();
        $('.sign-up-here-button').show();
        $('.log-in').hide();
        $('.createAccount').hide();
    });
}

//***** CLICK SIGN UP HERE BTUTON ON HOME PAGE*/

//in the body, when you click the sign up here button
//it will hide navigation
//it will hide main content
//it will hide sign up
//it will hide sign up button
//it will show create account form
function signUp() {
    $('body').on('click', '.sign-up-here-button', function(event) {
        $('navigation').hide();
        $('main').hide();
        $('.sign-up').hide();
        $('.sign-up-here-button').hide();
        $('.createAccount').show();
    });
}



//*** When CREATE ACC form shows, hide other things */

//log in form will be hidden
//create account will be hidden
//when you click log in here, it will hide create account and log in whill show
//demo account info will be hidden
function createAccount() {
    $('.log-in').hide();
    $('.createAccount').hide();
    $('.createAccount').on('click', '.login-here', function(event) {
        $('.createAccount').hide();
        $('.log-in').show(); 
        $('.demo-account').hide();
    });
 //on log in, if you click sign up here, log in info will hide 
 //create account will show
    $('.log-in').on('click', '.signup-here', function(event) {
        $('.log-in').hide();
        $('.createAccount').show();
    })
}


$(function() {
    backToHomepage();
    navDemo();
    navLogIn();
    navSignUp();
    signUp();
    createAccount();
});