(function() { 
	'use strict';

	angular.module('gymAdminApp')
    .controller('ViewPlanController', ['$scope', '$log', '$state', 'PlanService', '$stateParams', function ( $scope, $log, $state, PlanService, $stateParams) {
    	
    	var i = $stateParams.id;    	
    	$scope.error = false;
    	$scope.succes = false;
    	$scope.processing = true;
    	$scope.planModel = {};
    	
    	try {
    		PlanService.get({id : $stateParams.id}).then(function (response) {
    			$scope.model = response;
    		}).catch(function(response) {
    			throw $translate.instant('global.messages.error.internalServerError');
    			$scope.processing = false;
            });
		} catch (e) {
			alert(e);
		}
    	
        
    }]);
})() ;