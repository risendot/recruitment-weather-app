app.controller('WeatherController', function ($scope, $interval, $mdToast, WeatherService) {
    var _this = this;

    this.weather = WeatherService.weather;
    this.forecast = WeatherService.forecast;
    this.loading = WeatherService.loading;

    this.model = {
        search: '',
    }

    this.config = WeatherService.config;

    this.popular = [
        {name: "Warsaw", id: 756135},
        {name: "Washington", id: 5815135},
        {name: "San Francisco", id: 5391959},
        {name: "London", id: 2643743},
        {name: "Paris", id: 2988507}
    ];

    /**
     * Choose location from predefined popular ones
     * @param {object} item
     * @returns {undefined}
     */
    this.choosePopular = function (item) {
        if (!item)
            return;

        _this.loading.weather = true;
        getWeatherData(item.id)
    }

    /**
     * Search city by name
     * @returns {undefined}
     */
    this.searchCity = function () {
        _this.loading.weather = true;
        WeatherService.getCurrentWeatherByName(_this.model.search);
    }

    /**
     * Return weather icon url
     * @param {object} item
     * @returns {string}
     */
    this.getWeatherIcon = function (item) {
        if (!item)
            return;

        if (item.weather instanceof Array)
            var iconCode = item.weather[0].icon;

        if (iconCode) {
            return 'http://openweathermap.org/img/w/' + iconCode + '.png';
        } else {
            return '';
        }
    }

    /**
     * Toggle expanded view for forecast
     * @returns {undefined}
     */
    this.toggleForecast = function () {
        _this.config.forecast = _this.config.forecast === 9 ? _this.forecast.list.length : 9;
    }

    /**
     * Disable "add to favorites" button if location already is favorite
     * @param {object} item
     * @returns {boolean}
     */
    this.disableAddButton = function (item) {
        if (!item)
            return;
        return WeatherService.compareToFavorites(item);
    }

    /**
     * Add current location to favorites
     * @param {object} item
     * @returns {undefined}
     */
    this.addToFavorites = function (item) {
        if (!item)
            return;

        var msg = '';

        if (WeatherService.addToFavorites(item)) {
            msg = 'Added to favorites!';
        } else {
            msg = 'Location already in favorites';
        }

        $mdToast.show(
                $mdToast.simple()
                .textContent(msg)
                .hideDelay(3000)
                );
    }

    /**
     * Set current location as default
     * @param {object} item
     * @returns {undefined}
     */
    this.setAsDefault = function (item) {
        if (!item)
            return;

        var def = {
            id: item.id,
            name: item.name
        };

        localStorage.setItem('_weatherDefault_', JSON.stringify(def));
        $mdToast.show(
                $mdToast.simple()
                .textContent('New default location!')
                .hideDelay(3000)
                );
    }

    /**
     * Wrapper for getCurrentWeather WeatherService function
     * @param {numeric} city
     * @returns {undefined}
     */
    function getWeatherData(city) {
        WeatherService.getCurrentWeatherByID(city);
    }

    /**
     * Set interval for updating weather every 10mins
     * @returns {undefined}
     */
    $interval(function () {
        getWeatherData(_this.config.id)
    }, 60000);

    /**
     * Initialization function
     * @returns {undefined}
     */
    function init() {
        console.log('WeatherController');
        _this.loading.weather = true;
        var def = JSON.parse(localStorage.getItem('_weatherDefault_'));
        if (def !== null && def.id && def.name) {
            getWeatherData(def.id);
        } else {
            WeatherService.getGeoLocation();
        }
    }
    init();
});


