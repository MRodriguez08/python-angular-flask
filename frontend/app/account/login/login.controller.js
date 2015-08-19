(function(){
	'use strict';
	
	angular.module('carsPortal')
	    .controller('LoginController', ['$scope', '$state', '$timeout', 'Auth', function ($scope, $state, $timeout, Auth) {
	        $scope.user = {};
	        $scope.errors = {};
	
	        $scope.rememberMe = true;
	        $timeout(function (){angular.element('[ng-model="username"]').focus();});
	        $scope.login = function () {
	            Auth.login({
	                user: $scope.username,
	                password: $scope.password,
	                rememberMe: $scope.rememberMe
	            }).then(function (data) {
	                $scope.authenticationError = false;
	                $state.go('brand.list');
	            }).catch(function (err) {
	                $scope.authenticationError = true;
	            });
	        };
	        
	        $scope.username = 'mrodriguez';
            $scope.password = 'mrodriguez';
	        
	    }]);
})()