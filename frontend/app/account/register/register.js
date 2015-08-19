(function(){
  'use strict';

  angular.module('carsPortal')
    .config(function ($stateProvider) {
        $stateProvider
            .state('account.register', {
                parent: 'account',
                url: '/register',
                data: {
                	roles: [],
                    pageTitle: 'account.title.create'
                },
                views: {
                    'content@': {
                        templateUrl: 'app/account/register/register.html',
                        controller: 'RegisterController'
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