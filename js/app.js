var app = angular.module('E/volve', []);

app.controller('loginController', ['$http', function($http)
{
	var form = this;
	this.login = function(){
		console.log(form);
	};
}]);