(function(){	
	'use strict';
	
	angular.module('carsPortal')
	    .config(function ($stateProvider) {
	        $stateProvider
	            .state('brand', {
	                abstract: true,
	                parent: 'site'
	            });
	    });

})();