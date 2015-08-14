(function(){
  'use strict';

  angular.module('gymAdminApp')
    .config(function ($stateProvider) {
        $stateProvider
            .state('plan.create', {
                parent: 'plan',
                url: '/createPlan',
                data: {
                	roles: ['ROLE_ADMIN'], 
                    pageTitle: 'plan.title'
                },
                views: {
                    'content@': {
                        templateUrl: 'app/plan/create/create.html',
                        controller: 'CreatePlanController'
                    }
                },
                resolve: {
                    translatePartialLoader: ['$translate', '$translatePartialLoader', function ($translate, $translatePartialLoader) {
                        $translatePartialLoader.addPart('plan');
                        return $translate.refresh();
                    }]
                }
            });
    });

})();