(function(){
  'use strict';

  angular.module('carsPortal')
    .config(function ($stateProvider) {
        $stateProvider
            .state('account.profile', {
                parent: 'account',
                url: '/profile',
                data: {
                	roles: [],
                    pageTitle: 'account.title.profile'
                },
                views: {
                    'content@': {
                        templateUrl: 'app/account/profile/profile.html',
                        controller: 'ProfileController'
                    }
                },
                resolve: {
                    translatePartialLoader: ['$translate', '$translatePartialLoader', function ($translate, $translatePartialLoader) {
                        $translatePartialLoader.addPart('register');
                        return $translate.refresh();
                    }]
                }
            });
    });

})();