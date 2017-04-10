app.service('UserService', function ($http) {
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
});