app.service('UserService', function ($http) {
    var _this = this;

    this.signIn = function (post, callback) {
        $http.post('http://localhost:3000/signin', post).then(function (res) {
            window.location.href = 'http://localhost:3000' + res.data.redirect;
        });
    };
    
    this.signUp = function (post, callback) {
        $http.post('http://localhost:3000/signup', post).then(function (res) {
            window.location.href = 'http://localhost:3000' + res.data.redirect;
        });
    };
});