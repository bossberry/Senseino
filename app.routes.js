'use strict';

angular
    .module('myApp.routes', ['ngRoute'])
    .config(config);

function config ($locationProvider, $routeProvider) {
    $locationProvider.hashPrefix('');
    $routeProvider.
        when('/', {
            templateUrl: '/modules/homes/views/home.html',
            controller: 'HomeController'
        })
        .when('/experts', {
            templateUrl: '/modules/experts/views/experts.html',
            controller: 'ExpertsController'
        })
        .when('/jobs', {
            templateUrl: '/modules/jobs/views/jobs.html',
            controller: 'JobsController'
        })
        .when('/customers', {
            templateUrl: '/modules/customers/views/customer.html',
            controller: 'CustomerController'
        })
        .when('/helps', {
            templateUrl: '/modules/helps/views/help.html',
            controller: 'HelpController'
        })
        .otherwise({
            redirectTo: '/'
        });
        // $locationProvider.html5Mode(true);
}