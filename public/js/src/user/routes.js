app.config(function ($stateProvider, $urlRouterProvider) {
    $urlRouterProvider.otherwise('/');

    $stateProvider
            .state('signIn', {
                url: '/',
                templateUrl: '/tpl/signin',
                controller: 'UserController',
                controllerAs: 'uc'
            })
            .state('signUp', {
                url: '/signup',
                templateUrl: '/tpl/signup',
                controller: 'UserController',
                controllerAs: 'uc'
            });
});