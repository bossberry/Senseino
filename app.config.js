'use strict';
angular
    .module('myApp.config', [])
    .config(configs);

function configs($httpProvider) {
    var interceptor = function($location, $log, $q) {
        function error(response) {
            if (response.status === 401) {
                $log.error('You are unauthorised to access the requested resource (401)');
            } else if (response.status === 404) {
                $log.error('The requested resource could not be found (404)');
            } else if (response.status === 500) {
                $log.error('Internal server error (500)');
            }
            return $q.reject(response);
        }
        function success(response) {
            //Request completed successfully
            return response;
        }
        return function(promise) {
            return promise.then(success, error);
        }
    };
    $httpProvider.interceptors.push(interceptor);
}

