var app = angular.module('E/volve', []);

app.controller('loginController', ['$http', function($http)
{
	var form = this;
	this.login = function(){
		$('#loginForm').fadeOut(function()
		{
			$('#later').fadeIn();
		});
	};
}]);