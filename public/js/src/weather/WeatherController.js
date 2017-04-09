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

    this.choosePopular = function (item) {
        if (!item)
            return;

        _this.loading.weather = true;
        getWeatherData(item.id)
    }

    this.searchCity = function () {
        _this.loading.weather = true;
        WeatherService.getCurrentWeatherByName(_this.model.search);
    }

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

    this.toggleForecast = function () {
        _this.config.forecast = _this.config.forecast === 9 ? _this.forecast.list.length : 9;
        console.log(_this.config);
    }

    this.addToFavorites = function (item) {
        if (!item)
            return;

        WeatherService.addToFavorites(item);
        $mdToast.show(
                $mdToast.simple()
                .textContent('Added to favorites!')
                .hideDelay(3000)
                );
    }

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
                .textContent('Set as default!')
                .hideDelay(3000)
                );
    }

    function getWeatherData(city) {
        WeatherService.getCurrentWeatherByID(city);
    }

    $interval(function () {
        getWeatherData(_this.config.id)
    }, 60000);


    function init() {

        _this.loading.weather = true;
        var def = JSON.parse(localStorage.getItem('_weatherDefault_'));
        if (def !== null && def.id && def.name) {
            getWeatherData(def.id);
        } else {
            WeatherService.getGeoLocation();
        }

        console.log('WeatherController', _this.weather, _this.forecast);
    }
    init();
});


