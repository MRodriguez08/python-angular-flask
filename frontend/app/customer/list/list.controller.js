(function() { 
	'use strict';

	angular.module('gymAdminApp')
    .controller('ListCustomerController', ['$scope', '$state', '$log', '$translate', 'CustomerService', function ( $scope, $state, $log, $translate, CustomerService) {
    	
    	/**
    	 * Update action
    	 */
    	$scope.delete = function( id ) {
    		bootbox.confirm({
    			message : $translate.instant('customer.messages.confirmation.delete'),
    			buttons: {
    				confirm: {
    					label: $translate.instant('global.buttons.confirm'),
    				},
    				cancel: {
    					label: $translate.instant('global.buttons.cancel'),
    				}
    			},
    			callback: function(result){
    				if (result){
    					$scope.deleteCallback(id);
    				}
    			}
    		});
        };
        
        /**
         * Deletion callback
         */
        $scope.deleteCallback = function(id){
        	CustomerService.delete({id : id}).then(function (response) {
    			bootbox.dialog({
    				  message: $translate.instant('customer.messages.success.delete'),
    				  title: $translate.instant('global.menu.customers.main'),
    				  buttons: {
    				    success: {
    				      label: $translate.instant('global.buttons.accept'),
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
		};
        
    	/**
    	 * Update action
    	 */
    	$scope.go = function( rt , p1 ) {
    		$state.go(rt , {id: p1});
        };
        
    	$scope.plansList = '';
    	$scope.gridScope = $scope;
    	$scope.gridOptions = {
    		enableFiltering: true,
	        enableSorting: true,
	        columnDefs: [
	          { displayName: $translate.instant('customer.grid.id'), field: 'id', maxWidth : 20 },
	          { displayName: $translate.instant('customer.grid.name'), field: 'name', minWidth : 80},
	          { displayName: $translate.instant('customer.grid.surname'), field: 'surname', minWidth : 80 },
	          { displayName: $translate.instant('customer.grid.currentPlan.name'), field: 'currentPlan.name', minWidth : 160},
	          { name: ' ', enableFiltering: false, enableSorting: false,enableHiding: false, cellTemplate:'<span title=' + $translate.instant('global.tooltip.view') + ' class="grid-action-glyphicon glyphicon glyphicon-search" aria-hidden="true" ng-click="grid.appScope.go(\'customer.view\',row.entity.id)"></span>', maxWidth : 5 },
	          { name: '  ', enableFiltering: false, enableSorting: false,enableHiding: false, cellTemplate:'<span title=' + $translate.instant('global.tooltip.update') + ' class="grid-action-glyphicon glyphicon glyphicon-pencil" aria-hidden="true" ng-click="grid.appScope.go(\'customer.update\',row.entity.id)"></span>', maxWidth : 5 },  
	          { name: '   ', enableFiltering: false, enableSorting: false,enableHiding: false, cellTemplate:'<span title=' + $translate.instant('global.tooltip.delete') + ' class="grid-action-glyphicon glyphicon glyphicon-remove" aria-hidden="true" ng-click="grid.appScope.delete(row.entity.id)"></span>', maxWidth : 5  }
	        ],
	        data: 'plansList',
        };
    	
    	
    	
    	/**
    	 * Refresh grid action
    	 */
    	$scope.refresh = function () {        	
            $scope.updatingPlans = true;
            $scope.errorMessage = '';
            CustomerService.getAll({} , function (response) {
                $scope.plansList = response;
                $scope.updatingPlans = false;
            }, function (response) {
            	if (response.status == 401){
            		alert(response.data);            		
            	} else {            		
            		$scope.plansList = response.data;
                    $scope.updatingPlans = false;
            	}                
            });
        };
        
        
        //Main block
        try {
        	
        	
        	$scope.refresh();
		} catch (e) {
			alert()
		}        
                
    }]);
})() ;