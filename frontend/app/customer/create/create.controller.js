(function() { 
	'use strict';

	angular.module('gymAdminApp')
    .controller('CreateCustomerController', ['$scope', '$log', '$translate', '$state', 'CustomerService', 'PlanService', 'PaymentPlanService', function ( $scope, $log, $translate, $state, CustomerService, PlanService, PaymentPlanService) {
    	
    	$scope.error = false;
    	$scope.succes = false;
    	$scope.processing = true;
    	$scope.model = {};
    	
    	$scope.sendUserData = function () {
            
    		CustomerService.create($scope.model).then(function (response) {
    			bootbox.dialog({
				  message: $translate.instant('customer.messages.success.create'),
				  title: $translate.instant('customer.title.create'),
				  buttons: {
				    success: {
				      label: $translate.instant('global.buttons.accept'),
				      className: "btn-success",
				      callback: function() {		
				    	  //$state.reload();
				    	  //$scope.model = {};
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
    		
        };
        
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
        
        $scope.create = function () {
    		
    		if ($scope.profilePicture != null){
    			$scope.uploadImage(function(){    				
    				$scope.sendUserData();
    			});
    		} else {
    			$scope.sendUserData();
    		}
    		
        };
        
        try {
        	
        	PlanService.getAll({} , function (response) {
                $scope.plansList = response;
            }, function (response) {
            	throw $translate.instant('customer.messages.error.retrievePlans');             
            });
        	
        	PaymentPlanService.getAll({} , function (response) {
                $scope.paymentPlansList = response;
            }, function (response) {
            	throw $translate.instant('customer.messages.error.retrievePaymentPlans');
            });   
        	
        	$scope.avatar = CustomerService.getImageSrc(null);
        	
		} catch (e) {
			alert(e);
		}
        
        
    }]);
})() ;