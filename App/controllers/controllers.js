doctorsNow.controller('Doctorslist', function ($scope, $http) {
    $http.get('doctor.json')
        .then(function (res) {
            $scope.doctor = res.data;
        });
})

.controller('Doctorsdetails', function ($scope, $http, $routeParams, uiGmapGoogleMapApi, $filter) {
    $scope.doctorId = $routeParams.id;
    $http.get('doctor.json')
        .then(function (res) {
            var doctors = res.data;
            for (i in doctors) {
                if (doctors[i].id == $scope.doctorId) {
                    $scope.doctor = doctors[i];
                    break;
                }
            }

            var geocoder = new google.maps.Geocoder();
            var address = $scope.doctor.location;

            geocoder.geocode({
                'address': address
            }, function (results, status) {

                if (status == google.maps.GeocoderStatus.OK) {
                    var lati = results[0].geometry.location.lat();
                    var long = results[0].geometry.location.lng();


                    uiGmapGoogleMapApi.then(function (maps) {
                        $scope.map = {
                            center: {
                                latitude: lati,
                                longitude: long
                            },
                            zoom: 13
                        };
                        $scope.options = {
                            scrollwheel: false
                        };


                        $scope.marker = {
                            id: 0,
                            coords: {
                                latitude: lati,
                                longitude: long
                            },
                            options: {
                                draggable: true
                            },
                            events: {
                                dragend: function (marker, eventName, args) {
                                    $log.log('marker dragend');
                                    var lat = marker.getPosition().lat();
                                    var lon = marker.getPosition().lng();
                                    $log.log(lat);
                                    $log.log(lon);

                                    $scope.marker.options = {
                                        draggable: true,
                                        labelContent: "lat: " + $scope.marker.coords.latitude + ' ' + 'lon: ' + $scope.marker.coords.longitude,
                                        labelAnchor: "100 0",
                                        labelClass: "marker-labels"
                                    };
                                }
                            }
                        };
                    });
                }
            });
        });

});