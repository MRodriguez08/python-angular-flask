(function(){
	'use strict';

	angular.module('carsPortal')
	    .config(function ($stateProvider) {
	        $stateProvider
	            .state('brand.list', {
	                parent: 'brand',
	                url: '/listBrand',
	                data: {
	                    roles: [ 'admin' ], 
	                    pageTitle: 'brand.title.list'
	                },
	                views: {
	                    'content@': {
	                        templateUrl: 'app/brand/list/list.html',
	                        controller: 'ListBrandController'
	                    }
	                },
	                resolve: {
	                    translatePartialLoader: ['$translate', '$translatePartialLoader', function ($translate, $translatePartialLoader) {
	                        $translatePartialLoader.addPart('brand');
	                        $translatePartialLoader.addPart('global');
	                        return $translate.refresh();
	                    }]
	                }
	            });
	    });

})();