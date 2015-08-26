(function(){
	'use strict';
	
	angular.module('carsPortal')
	    .factory('UiUtils', function() {
	    	return {
	            initState: function() {
	                return {
	                	error : false,
	                	success : false,
	                }
	            },
                stateOk: function(msg) {
	                return {
	                	error : false,
	                	success : true,
	                	message : msg
	                }
	            },
                stateError: function(msg) {
	                return {
	                	error : true,
	                	success : false,
	                	message: msg
	                }
	            },
	            clearForm: function(scope){
	            	scope.form.$setPristine();
	            	scope.model = {};
	            }
	            
	        };
	    });

})();