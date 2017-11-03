'use strict';
angular.module('myApp.services', [])
        .service('authService', authService)
      authService.$inject = ['$http', 'URL_API'];
     


function authService($http, URL_API) {
    /*jshint validthis: true */

    this.test = function() {
        return 'working';
    };

    const baseURL = 'http://localhost:3000/auth/';
    this.LoginByEmail = function(username, password) {
        return $http({
        method: 'POST',
        url: URL_API + '/api/v1/users/login',
        data: {username:username, credential:password, type:'email'},
        headers: {'Content-Type': 'application/json'}
        });
    };
    this.RegisByEmail = function(firstname, lastname, tel, email, password) {
        return $http({
        method: 'POST',
        url: URL_API + '/api/v1/users/register',
        data: {
            firstname: firstname,
            lastname: lastname,
            email: email,
            type:'email',
            password: password
        },
        headers: {'Content-Type': 'application/json'}
        });
    };
    this.ensureAuthenticated = function(userID, email) {
        return $http({
            method: 'GET',
            url: URL_API + '/api/v1/users/' + userID,
            headers: {
                'x-user' : email
            }
        });
    };
};
