(function(){
  'use strict';
  
  angular.module('carsPortal')
	.factory('PendingImageResource', function ($resource) {
	    return $resource('pendingimagename', {});
	});
  
})();