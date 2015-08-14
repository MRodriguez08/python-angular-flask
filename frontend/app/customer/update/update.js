(function(){
  'use strict';

  angular.module('gymAdminApp')
    .config(function ($stateProvider) {
        $stateProvider
            .state('customer.update', {
                parent: 'customer',
                url: '/updateCustomer/:id',
                data: {
                	roles: [ 'ROLE_ADMIN' , 'ROLE_USER'],
                    pageTitle: 'customer.title.update'
                },
                views: {
                    'content@': {
                        templateUrl: 'app/customer/update/update.html',
                        controller: 'UpdateCustomerController'
                    }
                },
                resolve: {
                    translatePartialLoader: ['$translate', '$translatePartialLoader', function ($translate, $translatePartialLoader) {
                        $translatePartialLoader.addPart('customer');
                        return $translate.refresh();
                    }]
                }
            });
    });

})();