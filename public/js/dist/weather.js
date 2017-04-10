app.controller('MasterController', ['$mdSidenav', 'WeatherService', function ($mdSidenav, WeatherService) {
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
}]);



app.controller('WeatherController', ['$scope', '$interval', '$mdToast', 'WeatherService', function ($scope, $interval, $mdToast, WeatherService) {
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
}]);



app.service('WeatherService', ['$http', 'API_KEY', function ($http, API_KEY) {
    var _this = this;

    this.loading = {
        weather: false
    }

    this.weather = {};
    this.forecast = {};
    this.config = {
        theme: 'good-weather',
        name: '',
        id: null,
        forecast: 9,
        updateTime: ''
    }
    this.favorites = [];

    var goodWeatherId = [
        500, 501, 502, 503, 504, 800, 801, 802, 951, 952, 953, 954
    ];

    /**
     * Wrapper for getCurrentWeather function
     * @param {numeric} cityID
     * @param {function} callback
     * @returns {undefined}
     */
    this.getCurrentWeatherByID = function (cityID, callback) {
        getCurrentWeather(cityID, 'id', callback);
    }

    /**
     * Wrapper for getCurrentWeather function
     * @param {string} city
     * @param {function} callback
     * @returns {undefined}
     */
    this.getCurrentWeatherByName = function (city, callback) {
        getCurrentWeather(city, 'q', callback);
    }

    /**
     * Request to OpenWeatherMap API for weather data
     * @param {any} city
     * @param {string} method
     * @param {function} callback
     * @returns {undefined}
     */
    function getCurrentWeather(city, method, callback) {
        $http.get('http://api.openweathermap.org/data/2.5/weather?' + method + '=' + city + '&APPID=' + API_KEY.OW).then(function (res) {
            updateConfig(res.data);
            angular.copy(res.data, _this.weather);
            if (typeof callback === 'function')
                callback(res.data);
        });

        $http.get('http://api.openweathermap.org/data/2.5/forecast?' + method + '=' + city + '&APPID=' + API_KEY.OW).then(function (res) {
            angular.copy(res.data, _this.forecast);
            _this.loading.weather = false;
        });
    }

    /**
     * Compare selected item to favorites
     * @param {type} item
     * @returns {Boolean}
     */
    this.compareToFavorites = function (item) {
        if (!item)
            return;

//        WHY YOU'RE NOT WORKING!?!?!
//        var index = _this.favorites.indexOf(fav);
//        console.log(index);
//        if (index !== -1) {
//            return;
//        }

        var push = false;
        for (var i in _this.favorites) {
            var tmp = _this.favorites[i];
            if (tmp.name === item.name && tmp.id === item.id) {
                push = true;
            }
        }
        return push;
    }

    /**
     * Add location to favorites
     * @param {object} item
     * @returns {undefined}
     */
    this.addToFavorites = function (item) {
        if (!item)
            return;

        var fav = {
            id: item.id,
            name: item.name
        };

        if (_this.compareToFavorites(fav)) {
            return false;
        } else {
            _this.favorites.push(fav);
            localStorage.setItem('_weatherFavorites_', JSON.stringify(_this.favorites));
            return true;
        }
    }

    /**
     * Delete location from favorites
     * @param {object} item
     * @returns {undefined}
     */
    this.deleteFromFavorites = function (item) {
        if (!item)
            return;

        _this.favorites.splice(_this.favorites.indexOf(item), 1);
        localStorage.setItem('_weatherFavorites_', JSON.stringify(_this.favorites));
    }

    //Example post object for geolocation request. 
    var exampleLoc = {
        "macAddress": "00:25:9c:cf:1c:ac",
        "signalStrength": -43,
        "age": 0,
        "channel": 11,
        "signalToNoiseRatio": 0
    };

    /**
     * Request to google API for location, then request for OpenWeatherMap API for weather data
     * @param {function} callback
     * @returns {undefined}
     */
    this.getGeoLocation = function (callback) {
        $http.post('https://www.googleapis.com/geolocation/v1/geolocate?key=' + API_KEY.GEO, exampleLoc).then(function (geo) {
            $http.get('http://api.openweathermap.org/data/2.5/weather?lat=' + geo.data.location.lat + '&lon=' + geo.data.location.lat + '&APPID=' + API_KEY.OW).then(function (res) {
                updateConfig(res.data);
                angular.copy(res.data, _this.weather);
                if (typeof callback === 'function')
                    callback(res.data);
            });
            $http.get('http://api.openweathermap.org/data/2.5/forecast?lat=' + geo.data.location.lat + '&lon=' + geo.data.location.lat + '&APPID=' + API_KEY.OW).then(function (res) {
                angular.copy(res.data, _this.forecast);
                _this.loading.weather = false;
            });
        });
    }

    /**
     * Update dashboard config, theme, current location info etc.
     * @param {object} data
     * @returns {undefined}
     */
    function updateConfig(data) {
        if (!data)
            return;

        var good = false;
        for (var i in goodWeatherId) {
            if (goodWeatherId[i] === data.weather[0].id)
                good = true;
        }
        _this.config.theme = good ? 'good-weather' : 'bad-weather';
        _this.config.updateTime = moment().format('YYYY-MM-DD HH:mm:ss');
        _this.config.id = data.id;
        _this.config.name = data.name;
    }

    /**
     * Initialization function
     * @returns {undefined}
     */
    function init() {
        console.log('WeatherService');
        var favorites = JSON.parse(localStorage.getItem('_weatherFavorites_'));
        if (favorites !== null) {
            if (favorites instanceof Array) {
                angular.copy(favorites, _this.favorites);
            }
        }
    }
    init();

}]);
app.config(['$stateProvider', '$urlRouterProvider', function ($stateProvider, $urlRouterProvider) {
    $urlRouterProvider.otherwise('/');

    $stateProvider
            .state('weatherMain', {
                url: '/',
                templateUrl: '/weather/tpl/main',
                controller: 'WeatherController',
                controllerAs: 'wc'
            });
}]);