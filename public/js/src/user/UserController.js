app.controller('UserController', function ($state, UserService) {
    var _this = this;

    this.model = {
        login: '',
        password: '',
        email: ''
    };

    this.signIn = function () {
        UserService.signIn(_this.model);
    }

    this.signUp = function () {
        UserService.signUp(_this.model);
    }

    this.goToSignUp = function () {
        $state.go('signUp');
    }

    function init() {
        console.log('UserController');
    }
    init();
});


