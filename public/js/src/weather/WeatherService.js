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

    this.getCurrentWeatherByID = function (cityID, callback) {
        getCurrentWeather(cityID, 'id', callback);
    }

    this.getCurrentWeatherByName = function (city, callback) {
        getCurrentWeather(city, 'q', callback);
    }

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

    this.addToFavorites = function (item) {
        if (!item)
            return;

        var fav = {
            id: item.id,
            name: item.name
        };

        if (_this.favorites.indexOf(fav) !== -1) {
            return;
        }
        _this.favorites.push(fav);
        localStorage.setItem('_weatherFavorites_', JSON.stringify(_this.favorites));
    }

    this.deleteFromFavorites = function (item) {
        if (!item)
            return;

        _this.favorites.splice(_this.favorites.indexOf(item), 1);
        localStorage.setItem('_weatherFavorites_', JSON.stringify(_this.favorites));
    }

    var exampleLoc = {
        "macAddress": "00:25:9c:cf:1c:ac",
        "signalStrength": -43,
        "age": 0,
        "channel": 11,
        "signalToNoiseRatio": 0
    };

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