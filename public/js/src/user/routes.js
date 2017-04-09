app.config(function ($stateProvider, $urlRouterProvider) {
    $urlRouterProvider.otherwise('/');

    $stateProvider
            .state('signIn', {
                url: '/',
                templateUrl: '/tpl/signin',
                controller: 'UserController',
                controllerAs: 'si'
            })
            .state('signUp', {
                url: '/signup',
                templateUrl: '/tpl/signup',
                controller: 'UserController',
                controllerAs: 'su'
            });
});