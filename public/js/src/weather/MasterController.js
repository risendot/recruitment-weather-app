app.controller('MasterController', function ($mdSidenav, WeatherService) {
    var _this = this;

    this.config = WeatherService.config;
    this.loading = WeatherService.loading;
    this.favorites = WeatherService.favorites;

    this.toggleMenu = function () {
        $mdSidenav('right').toggle();
    };

    this.logout = function () {
        window.location.href = '/'
    }

    this.deleteFromFavorites = function (item) {
        if (!item)
            return;

        WeatherService.deleteFromFavorites(item);
    }

    this.selectFavorite = function (item) {
        if (!item)
            return;
        _this.loading.weather = true;
        WeatherService.getCurrentWeatherByID(item.id);
    }

    function init() {
        console.log('MasterController');
    }
    init();
});


