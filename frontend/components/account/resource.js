(function(){
  'use strict';

  angular.module('carsPortal')
  	.factory('AccountResource', function ($resource) {
  	    return $resource('api/account/:id', {id:'@_id'}, {
  	    	update: {
  	          method: 'PUT' // this method issues a PUT request
  	        }
  	    });
  	});
  
  angular.module('carsPortal')
	.factory('PasswordResource', function ($resource) {
	    return $resource('api/password/:id', {id:'@_id'}, {
	    	update: {
	          method: 'PUT' // this method issues a PUT request
	        }
	    });
	});
  
})();