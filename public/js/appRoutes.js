angular.module('appRoutes', []).config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider) {

    $routeProvider

        // home page
        .when('/', {
            templateUrl: '/views/home.html',
            controller: 'MainController'
        })

        // nerds page that will use the NerdController
        .when('/listings', {
            templateUrl: '/views/listings.html',
            controller: 'EstateController'
        });

    $locationProvider.html5Mode(true);

}]);
