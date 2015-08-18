(function() { 
	'use strict';

	angular.module('carsPortal')
    .controller('ListBrandController', ['$scope', '$state', '$log', '$translate', 'BrandService', function ( $scope, $state, $log, $translate, BrandService) {
    	
    	/**
    	 * Update action
    	 */
    	$scope.delete = function( id ) {    		
    		bootbox.confirm({
    			message : $translate.instant('plan.messages.confirmation.deletion'),
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
    	 * Update action
    	 */
    	$scope.go = function( rt , p1 ) {
    		$state.go(rt , {id: p1});
        };
        
    	$scope.list = '';
    	$scope.gridScope = $scope;
    	$scope.gridOptions = {
    		enableFiltering: true,
	        enableSorting: true,
	        columnDefs: [
	          { displayName: 'id', field: 'id', maxWidth : 80 },
	          { displayName: 'name' , field: 'name'},
	        ],
	        data: 'list',
        };
    	
    	
    	
    	/**
    	 * Refresh grid action
    	 */
    	$scope.refresh = function () {        	
            $scope.updatingList = true;
            $scope.errorMessage = '';
            BrandService.get({} , function (response) {
                $scope.list = response.data;
                $scope.updatingList = false;
            }, function (response) {
            	if (response.status == 401){
            		alert(response.data);            		
            	} else {            		
            		$scope.list = response.data;
                    $scope.updatingList = false;
            	}                
            });
        };
        $scope.refresh();        
    }]);
})() ;