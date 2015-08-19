'use strict';

angular.module('carsPortal')
    .config(function ($stateProvider) {
        $stateProvider
            .state('logout', {
                parent: 'account',
                url: '/logout',
                data: {
                    roles: []
                },
                views: {
                    'content@': {
                        templateUrl: 'app/account/login/login.html',
                        controller: 'LogoutController'
                    }
                }
            });
    });
