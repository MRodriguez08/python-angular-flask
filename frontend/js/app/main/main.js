
(function(){
	'use strict';

	angular.module('carsPortal')
	    .config(function ($stateProvider) {
	        $stateProvider
	            .state('home', {
	                parent: 'site',
	                url: '/main',
	                data: {
	                    
	                },
	                views: {
	                    'content@': {
	                        templateUrl: 'app/main/main.html',
	                        controller: 'MainController'
	                    }
	                },
	                resolve: {
	                    mainTranslatePartialLoader: ['$translate', '$translatePartialLoader', function ($translate,$translatePartialLoader) {
	                        $translatePartialLoader.addPart('main');
	                        return $translate.refresh();
	                    }]
	                }
	            });
    });
})();