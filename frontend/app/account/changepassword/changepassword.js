(function(){
  'use strict';

  angular.module('carsPortal')
    .config(function ($stateProvider) {
        $stateProvider
            .state('account.changepassword', {
                parent: 'account',
                url: '/changePassword',
                data: {
                	roles: [],
                    pageTitle: 'account.title.profile'
                },
                views: {
                    'content@': {
                        templateUrl: 'app/account/changepassword/changepassword.html',
                        controller: 'ChangePasswordController'
                    }
                },
                resolve: {
                    translatePartialLoader: ['$translate', '$translatePartialLoader', function ($translate, $translatePartialLoader) {
                        $translatePartialLoader.addPart('account');
                        return $translate.refresh();
                    }]
                }
            });
    });

})();