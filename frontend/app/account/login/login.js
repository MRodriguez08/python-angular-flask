(function(){
	'use strict';

	angular.module('carsPortal')
	    .config(function ($stateProvider) {
	        $stateProvider
	            .state('account.login', {
	                parent: 'account',
	                url: '/login',
	                data: {
	                    roles: [], 
	                    pageTitle: 'login.title'
	                },
	                views: {
	                    'content@': {
	                        templateUrl: 'app/account/login/login.html',
	                        controller: 'LoginController'
	                    }
	                },
	                resolve: {
	                    translatePartialLoader: ['$translate', '$translatePartialLoader', function ($translate, $translatePartialLoader) {
	                        $translatePartialLoader.addPart('login');
	                        return $translate.refresh();
	                    }]
	                }
	            });
	    });
})()