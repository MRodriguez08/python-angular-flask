(function() { 
	'use strict';

	angular.module('carsPortal')
    .controller('RegisterController', ['$scope', '$log', '$translate', '$state', 
                                       function ( $scope, $log, $translate, $state) {
    	
    	$scope.error = false;
    	$scope.succes = false;
    	$scope.processing = true;
    	$scope.model = {};
    	
    	
        
        
    }]);
})() ;