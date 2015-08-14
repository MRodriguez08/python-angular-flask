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
	          { displayName: $translate.instant('plan.grid.id'), field: 'id', maxWidth : 80 },
	          { displayName: $translate.instant('plan.grid.name') , field: 'name'},
	          { displayName: $translate.instant('plan.grid.description'), field: 'description' },
	          { displayName: $translate.instant('plan.grid.cost'), field: 'cost', maxWidth : 80},
	          { name: ' ', enableFiltering: false, enableSorting: false,enableHiding: false, cellTemplate:'<span title=' + $translate.instant('global.tooltip.view') + ' class="grid-action-glyphicon glyphicon glyphicon-search" aria-hidden="true" ng-click="grid.appScope.go(\'plan.view\',row.entity.id)"></span>', maxWidth : 20 },
	          { name: '  ', enableFiltering: false, enableSorting: false,enableHiding: false, cellTemplate:'<span title=' + $translate.instant('global.tooltip.update') + ' class="grid-action-glyphicon glyphicon glyphicon-pencil" aria-hidden="true" ng-click="grid.appScope.go(\'plan.update\',row.entity.id)"></span>', maxWidth : 20 },  
	          { name: '   ', enableFiltering: false, enableSorting: false,enableHiding: false, cellTemplate:'<span title=' + $translate.instant('global.tooltip.delete') + ' class=" grid-action-glyphicon glyphicon glyphicon-remove" aria-hidden="true" ng-click="grid.appScope.delete(row.entity.id)"></span>', maxWidth : 20  }
	        ],
	        data: 'list',
        };
    	
    	
    	
    	/**
    	 * Refresh grid action
    	 */
    	$scope.refresh = function () {        	
            $scope.updatingList = true;
            $scope.errorMessage = '';
            BrandService.getAll({} , function (response) {
                $scope.list = response;
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