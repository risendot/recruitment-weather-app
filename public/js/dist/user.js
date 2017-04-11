app.controller('UserController', ['$state', 'UserService', function ($state, UserService) {
    var _this = this;

    this.model = {
        login: '',
        password: '',
        email: ''
    };

    /**
     * Sign user in
     * @returns {undefined}
     */
    this.signIn = function () {
        UserService.signIn(_this.model);
    }

    /**
     * Sign user up
     * @returns {undefined}
     */
    this.signUp = function () {
        UserService.signUp(_this.model);
    }

    /**
     * Changes route to sign up page
     * @returns {undefined}
     */
    this.goToSignUp = function () {
        $state.go('signUp');
    }

    /**
     * Changes route to sign in page
     * @returns {undefined}
     */
    this.goToSignIn = function () {
        $state.go('signIn');
    }

    /**
     * Initialization function
     * @returns {undefined}
     */
    function init() {
        console.log('UserController');
    }
    init();
}]);



app.service('UserService', ['$http', function ($http) {
    var _this = this;

    /**
     * Request for signing user in
     * @param {object} post
     * @param {function} callback
     * @returns {undefined}
     */
    this.signIn = function (post, callback) {
        $http.post('http://localhost:3000/signin', post).then(function (res) {
            window.location.href = 'http://localhost:3000' + res.data.redirect;
        });
    };

    /**
     * Request for signing user up
     * @param {object} post
     * @param {function} callback
     * @returns {undefined}
     */
    this.signUp = function (post, callback) {
        $http.post('http://localhost:3000/signup', post).then(function (res) {
            window.location.href = 'http://localhost:3000' + res.data.redirect;
        });
    };
}]);
app.config(['$stateProvider', '$urlRouterProvider', function ($stateProvider, $urlRouterProvider) {
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
}]);