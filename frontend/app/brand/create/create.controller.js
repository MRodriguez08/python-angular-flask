(function() { 
	'use strict';

	angular.module('gymAdminApp')
    .controller('CreatePlanController', ['$scope', '$log', '$state', 'PlanService', function ( $scope, $log, $state, PlanService) {
    	
    	$scope.error = false;
    	$scope.succes = false;
    	$scope.processing = true;
    	$scope.planModel = {};
    	$scope.create = function () {
            
    		PlanService.create($scope.planModel).then(function (response) {
    			bootbox.dialog({
    				  message: "Plan ingresado con exito",
    				  title: "Registro de planes",
    				  buttons: {
    				    success: {
    				      label: "Aceptar",
    				      className: "btn-success",
    				      callback: function() {		
    				    	  $state.reload();
    				    	  $scope.planModel = {};
    				      }
    				    }
    				  }
    			});		    	
    		}).catch(function(response) {
    			switch(response.status) {
	    		    case 500:
	    		    	alert('Error interno de la aplicacion');
	    		        break;
	    		    case 400:
	    		    	$scope.error = true;
	    		    	$scope.errorMessage = response.data.message;
	    		        break;
	    		    default:
	    		        
	    		}
    			$scope.processing = false;
            });
    		
    		
    		
        };
        
    }]);
})() ;