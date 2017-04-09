app.config(function ($stateProvider, $urlRouterProvider) {
    $urlRouterProvider.otherwise('/');

    $stateProvider
            .state('weatherMain', {
                url: '/',
                templateUrl: '/weather/tpl/main',
                controller: 'WeatherController',
                controllerAs: 'wc'
            });
});