var doctorsNow = angular.module('doctorsnow', ['ngRoute', 'uiGmapgoogle-maps']);

doctorsNow.config(function ($routeProvider) {
    $routeProvider
        .when('/doctor', {
            controller: 'Doctorslist',
            templateUrl: 'app/partials/doctorslist.html'
        })
.when('/doctor/:id', {
        controller: 'Doctorsdetails',
        templateUrl: 'app/partials/doctordetails.html'
    })
    .otherwise({
        redirectTo: '/doctor'
    });
})

.config(function(uiGmapGoogleMapApiProvider) {
 uiGmapGoogleMapApiProvider.configure({
  key: 'AIzaSyB1H7YzfhtPeHsK1TkyRmDB7nxr0O747D8',
  v: '3.17',
  libraries: 'weather,geometry,visualization'
 });
});