(function() { 
	'use strict';

	angular.module('carsPortal')
    .controller('ChangePasswordController', ['$scope', '$log', '$translate', '$state', 'AccountService', 'UiUtils', 'Principal',
                                       function ( $scope, $log, $translate, $state, AccountService, UiUtils, Principal) {
    	
    	$scope.state = UiUtils.initState('');
    	$scope.processing = true;
    	$scope.model = {}; 	
    	
    	$scope.create = function () {
    		Principal.identity(false).then(function(data) {
    			$scope.model._id = data.id;
        		AccountService.changePassword($scope.model).then(function (response) {
        			$scope.state = UiUtils.stateOk($translate.instant('account.changepassword.messages.success'));
        			UiUtils.clearForm($scope);
        		}).catch(function(response) {
        			$scope.error = true;
        			switch(response.status) {    				
    	    		    case 500:
    	    		    	$scope.state = UiUtils.stateError($translate.instant('global.messages.error.internalServerError'));
    	    		        break;
    	    		    default:
    	    		    	$scope.state = UiUtils.stateError($translate.instant(response.data.message));	    		        
    	    		}
        			$scope.processing = false;
                });  		 
            })
    		  		    		
        };
        
    }]);
})() ;