app.controller('UserController', function ($state, UserService) {
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
});


