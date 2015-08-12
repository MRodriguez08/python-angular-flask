'use strict';

angular.module('carsPortal')
	.factory('Register', function ($resource) {
	    return $resource('api/register', {}, {
	    });
	});


