'use strict';
// angular.module('myApp', ['ngRoute', 'app.routes', 'app.core', 'app.services', 'app.config']);
angular.module('myApp', [
    'ui.bootstrap', 'ngRoute', 'ngMaterial', 'jkAngularCarousel', 'angucomplete-alt', 'ngFileUpload',
    'myApp.auth', 'myApp.routes', 'myApp.core', 'myApp.services', 'myApp.config'])
    .constant('URL_API', 'http://54.255.237.25:3000');


window.fbAsyncInit = function() {
    FB.init({ 
        appId: '1668838553138058',
        status: true, 
        cookie: true, 
        xfbml: true,
        version: 'v2.4'
    });
};
