(function(){
  'use strict';

  angular.module('carsPortal')
  	.factory('BrandResource', function ($resource) {
  	    return $resource('api/brand/:id', {id:'@_id'}, {
  	    	update: {
  	          method: 'PUT' // this method issues a PUT request
  	        }
  	    });
  	});
  
})();