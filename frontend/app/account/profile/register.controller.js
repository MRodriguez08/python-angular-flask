(function() { 
	'use strict';

	angular.module('carsPortal')
    .controller('ProfileController', ['$scope', '$log', '$translate', '$state', 'AccountService', 'UiUtils',
                                       function ( $scope, $log, $translate, $state, AccountService, UiUtils) {
    	
    	$scope.state = UiUtils.initState('');
    	$scope.processing = true;
    	$scope.model = {};
    	
    	$scope.sendUserData = function () {
            
    		AccountService.create($scope.model).then(function (response) {
    			$scope.state = UiUtils.stateOk($translate.instant('account.messages.success'));
    			UiUtils.clearForm($scope);
    		}).catch(function(response) {
    			$scope.error = true;
    			switch(response.status) {    				
	    		    case 500:
	    		    	$scope.state = UiUtils.stateError($translate.instant('global.messages.error.internalServerError'));
	    		        break;
	    		    default:
	    		    	$scope.state = UiUtils.stateError(response.data.message);	    		        
	    		}
    			$scope.processing = false;
            });  		
    		
        };    	
    	
    	$scope.create = function () {
    		if ($scope.model.surname == undefined)
    			$scope.model.surname = '';
    		$scope.sendUserData();    		    		
        };
        
    }]);
})() ;