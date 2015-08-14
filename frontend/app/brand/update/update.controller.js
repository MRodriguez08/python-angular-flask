(function() { 
	'use strict';

	angular.module('gymAdminApp')
    .controller('UpdatePlanController', ['$scope', '$log', '$state', 'PlanService', '$stateParams', function ( $scope, $log, $state, PlanService, $stateParams) {
    	
    	var i = $stateParams.id;    	
    	$scope.error = false;
    	$scope.succes = false;
    	$scope.processing = true;
    	$scope.planModel = {};
    	
    	PlanService.get({id : $stateParams.id}).then(function (response) {
			$scope.planModel = response;
		}).catch(function(response) {
			alert('Error interno de la aplicacion');
			$scope.processing = false;
        });
    	
    	
    	$scope.create = function () {
            
    		PlanService.update($scope.planModel).then(function (response) {
    			bootbox.dialog({
    				  message: "Plan modificado con exito",
    				  title: "Gestion de planes",
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