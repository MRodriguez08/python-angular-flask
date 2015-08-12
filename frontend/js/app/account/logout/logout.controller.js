'use strict';

angular.module('carsPortal')
    .controller('LogoutController', function (Auth) {
        Auth.logout();
    });
