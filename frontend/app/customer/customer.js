
(function(){
	'use strict';
	
	angular.module('gymAdminApp')
	    .config(function ($stateProvider) {
	        $stateProvider
	            .state('customer', {
	                abstract: true,
	                parent: 'site'
	            });
	    });

})();