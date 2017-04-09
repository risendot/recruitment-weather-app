var app = angular.module('weatherApp', ['ngMaterial', 'ngMessages', 'ngSanitize', 'ui.router'])
        .constant('API_KEY', {'OW': '89fca26d983d89c66f9a3a922bbdfc96', 'GEO': 'AIzaSyA6E7__NzkI4BXeUDQSU2VC3YOMYqX80OQ'})
        .config(function ($mdIconProvider, $mdThemingProvider, $sceDelegateProvider) {
            $mdIconProvider
                    .iconSet('action', 'node_modules/material-design-icons/sprites/svg-sprite/svg-sprite-action.svg', 24)
                    .iconSet('content', 'node_modules/material-design-icons/sprites/svg-sprite/svg-sprite-content.svg', 24)
                    .iconSet('social', 'node_modules/material-design-icons/sprites/svg-sprite/svg-sprite-social.svg', 24)
                    .iconSet('nav', 'node_modules/material-design-icons/sprites/svg-sprite/svg-sprite-navigation.svg', 24)
                    .iconSet('maps', 'node_modules/material-design-icons/sprites/svg-sprite/svg-sprite-maps.svg', 24)
                    .iconSet('av', 'node_modules/material-design-icons/sprites/svg-sprite/svg-sprite-av.svg', 24)
                    .iconSet('image', 'node_modules/material-design-icons/sprites/svg-sprite/svg-sprite-image.svg', 24)
                    .iconSet('device', 'node_modules/material-design-icons/sprites/svg-sprite/svg-sprite-device.svg', 24)
                    .iconSet('editor', 'node_modules/material-design-icons/sprites/svg-sprite/svg-sprite-editor.svg', 24)
                    .iconSet('file', 'node_modules/material-design-icons/sprites/svg-sprite/svg-sprite-file.svg', 24)
                    .iconSet('notification', 'node_modules/material-design-icons/sprites/svg-sprite/svg-sprite-notification.svg', 24)
                    .iconSet('alert', 'node_modules/material-design-icons/sprites/svg-sprite/svg-sprite-alert.svg', 24)
                    .iconSet('places', 'node_modules/material-design-icons/sprites/svg-sprite/svg-sprite-places.svg', 24);
            $mdThemingProvider.theme('default')
                    .primaryPalette('blue-grey')
                    .accentPalette('light-blue')
                    .warnPalette('red');
            $mdThemingProvider.theme('good-weather')
                    .primaryPalette('orange')
                    .accentPalette('amber')
                    .warnPalette('red');
            $mdThemingProvider.theme('bad-weather')
                    .primaryPalette('blue-grey')
                    .accentPalette('light-blue')
                    .warnPalette('red');

            $sceDelegateProvider.resourceUrlWhitelist([
                'self',
                'http://openweathermap.org/img/w/**'
            ]);
        });

//Disable aria label warnings
console.realWarn = console.warn;
console.warn = function (message) {
    if (message.indexOf("ARIA") != -1)
        return;
    console.realWarn.apply(console, arguments);
};


