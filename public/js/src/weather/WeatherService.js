app.service('WeatherService', function ($http, API_KEY) {
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

});