(function() { 
	'use strict';

	angular.module('gymAdminApp')
    .controller('ViewCustomerController', ['$scope', '$log', '$translate', '$state', '$stateParams', 'CustomerService', 'PlanService', 'PaymentPlanService', function ( $scope, $log, $translate, $state, $stateParams, CustomerService, PlanService, PaymentPlanService) {
    	
    	var i = $stateParams.id;    	
    	$scope.error = false;
    	$scope.succes = false;
    	$scope.processing = true;
    	$scope.model = {};
        
        try {
            CustomerService.get({id : $stateParams.id}).then(function (response) {
            	$scope.avatar = CustomerService.getImageSrc(response.image);
    			$scope.model = response;
    		}).catch(function(response) {        			
    			$scope.processing = false;
    			throw $translate.instant('global.messages.error.internalServerError');
            });                
        	
		} catch (e) {
			alert(e);
		}
        
    }]);
})() ;