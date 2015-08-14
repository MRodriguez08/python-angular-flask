(function() { 
	'use strict';

	angular.module('gymAdminApp')
    .controller('UpdateCustomerController', ['$scope', '$log', '$translate', '$state', '$stateParams', 'CustomerService', 'PlanService', 'PaymentPlanService', function ( $scope, $log, $translate, $state, $stateParams, CustomerService, PlanService, PaymentPlanService) {
    	
    	var i = $stateParams.id;    	
    	$scope.error = false;
    	$scope.succes = false;
    	$scope.processing = true;
    	$scope.planModel = {};
    	
    	$scope.update = function () {
    		
    		if ($scope.profilePicture != null){
    			$scope.uploadImage(function(){
    				$scope.sendUserData();
    			});
    		} else {
    			$scope.sendUserData();
    		}    		
        };
        
        $scope.getCurrentPlan = function () {
        	for (var i = 0; i < $scope.plansList.length; i++){
        		if ($scope.plansList[i].id == $scope.model.plan.id)	
        			return $scope.plansList[i];
        	}
        }
        
        $scope.getCurrentPaymentPlan = function () {
        	for (var i = 0; i < $scope.paymentPlansList.length; i++){
        		if ($scope.paymentPlansList[i].id == $scope.model.paymentPlan.id)	
        			return $scope.paymentPlansList[i];
        	}
        }
        
        $scope.uploadImage = function(callback){
        	
        	CustomerService.uploadImage($scope.profilePicture, 
				function (evt) {
		            var progressPercentage = parseInt(100.0 * evt.loaded / evt.total);
		            console.log('progress: ' + progressPercentage + '% ' + evt.config.file.name);
	    		},
	    		function (data, status, headers, config) {	    			 
	        		console.log('file ' + config.file.name + 'uploaded. Response: ' + data);
	        		callback();        		
	    		});	
        };
        
        $scope.sendUserData = function(){
			
			$scope.model.plan = $scope.currentPlan;
			$scope.model.paymentPlan = $scope.currentPaymentPlan;
    		CustomerService.update($scope.model).then(function (response) {
    			$scope.avatar = CustomerService.getImageSrc(response.image);
    			$scope.model = response;
    			bootbox.dialog({
    				  message: "Cliente modificado con exito",
    				  title: "Clientes",
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
	    		    	alert($translate.instant('global.messages.error.internalServerError'));
	    		        break;
	    		    case 400:
	    		    	$scope.error = true;
	    		    	$scope.errorMessage = response.data.message;
	    		        break;
	    		    default:
	    		        
	    		}
    			$scope.processing = false;
            }); 
        }
        
        try {
        	
        	PaymentPlanService.getAll({} , function (response) {
                $scope.paymentPlansList = response;
            }, function (response) {
            	throw $translate.instant('customer.messages.error.retrievePaymentPlans');
            }); 
        	
        	PlanService.getAll({} , function (response) {
                $scope.plansList = response;
                CustomerService.get({id : $stateParams.id}).then(function (response) {
                	$scope.avatar = CustomerService.getImageSrc(response.image);
        			$scope.model = response;
        			$scope.currentPlan = $scope.getCurrentPlan();
        			$scope.currentPaymentPlan = $scope.getCurrentPaymentPlan();
        		}).catch(function(response) {        			
        			$scope.processing = false;
        			throw $translate.instant('global.messages.error.internalServerError');
                });                
            }, function (response) {
            	throw alert($translate.instant('global.messages.error.internalServerError'));;
            });
        	
		} catch (e) {
			alert(e);
		}
        
    }]);
})() ;