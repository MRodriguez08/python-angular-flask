(function(){
	'use strict';

	angular.module('carsPortal')
	    .controller('NavbarController', function ($scope, $location, $state, Auth, Principal) {
	        $scope.isAuthenticated = Principal.isAuthenticated;
	        $scope.isInRole = Principal.isInRole;
	        $scope.$state = $state;
	        
	        Principal.identity(false).then(function(data) {
	        	if (data != null){
	        		$scope.userNick = data.nick;
	        	}	        	
	        });
	        
	        $scope.logout = function () {
	            Auth.logout();
	            $state.go('home');
	        };
	   
	    });
	
})()