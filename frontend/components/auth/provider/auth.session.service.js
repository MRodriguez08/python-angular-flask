'use strict';

angular.module('carsPortal')
    .factory('AuthServerProvider', function loginService($http, localStorageService, $window) {
        return {
            login: function(credentials) {
                return $http.post('api/authentication', credentials, {
                    headers: {
                        'Content-Type': 'application/json'
                    }
                }).success(function (response) {
                    localStorageService.set('token', $window.btoa(credentials.username + ':' + credentials.password));
                    return response;
                });
            },
            logout: function() {
                // logout from the server
                $http.post('api/logout').success(function (response) {
                    localStorageService.clearAll();
                    // to get a new csrf token call the api
                    $http.get('api/account');
                    return response;
                });
            },
            getToken: function () {
                var token = localStorageService.get('token');
                return token;
            },
            hasValidToken: function () {
                var token = this.getToken();
                return !!token;
            }
        };
    });
