app.controller('MasterController', function ($mdSidenav, WeatherService) {
    var _this = this;

    this.config = WeatherService.config;
    this.loading = WeatherService.loading;
    this.favorites = WeatherService.favorites;

    /**
     * Toggle favorites menu on the right side
     * @returns {undefined}
     */
    this.toggleMenu = function () {
        $mdSidenav('right').toggle();
    };

    /**
     * Log out of app
     * @returns {undefined}
     */
    this.logout = function () {
        window.location.href = '/'
    }

    /**
     * Delete item from favorites
     * @param {object} item
     * @returns {undefined}
     */
    this.deleteFromFavorites = function (item) {
        if (!item)
            return;

        WeatherService.deleteFromFavorites(item);
    }

    /**
     * Select favorite location as current
     * @param {object} item
     * @returns {undefined}
     */
    this.selectFavorite = function (item) {
        if (!item)
            return;
        _this.loading.weather = true;
        WeatherService.getCurrentWeatherByID(item.id);
    }

    /**
     * Initialization function
     * @returns {undefined}
     */
    function init() {
        console.log('MasterController');
    }
    init();
});


