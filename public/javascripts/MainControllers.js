var promos = angular.module('promos', [
	'ngRoute',
	'promosControllers']);

var promosControllers = angular.module('promosControllers', []);
var pageTitle = "Promos";

promosControllers.controller('MainController', ['$scope', '$http', '$location',
	function($scope, $http, $location) {
		$scope.title = pageTitle;
		$http.get('/getUser')
		.success(function(data) {
				$scope.username = data.username + " (" + data.type + ")";
		})
		.error(function(data) {
				console.log('Error: ' + data);
				return false;
		});
	}]);

promosControllers.controller('LoginCtrl', ['$scope', '$http', '$location',
	function ($scope, $http, $location) {
	$scope.formData = {};
	$scope.$parent.message = '';
		// when submitting the add form, send the text to the node API
		$scope.login = function() {
				if(!$scope.formData.username || !$scope.formData.password){
					$scope.$parent.message = 'Wrong password or username, please try again.';
				}else{
					$http.post('/Login', $scope.formData)
					.success(function(data) {
							if(data.login){
								//Logged in!
								$scope.$parent.title = pageTitle;
								$scope.$parent.username = data.user.username + " (" + data.user.type + ")";
								if(data.user.type == 'Student')
									$location.path('/Student/Dashboard');
								if(data.user.type == 'Supervisor')
									$location.path('/Supervisor/Dashboard');
							}else{
								$scope.$parent.message = 'Wrong password or username';
							}
					})
					.error(function(data) {
							console.log('Error: ' + data);
					});
				}
		};
}]);

promosControllers.controller('LogoutCtrl', ['$scope', '$http', '$location',
	function($scope, $http, $location) {
		$http.get('/Logout')
			.success(function() {
							$location.path('/Login');
						})
						.error(function(data) {
								console.log('Error: ' + data);
						});
	}]);

function isAuthorized($http, $location){
		$http.get('/check')
		.success(function(data) {
			if(data.login == true){
				console.log('is authorized');
				return true;	
			}
			else{
				console.log('Not authorized');
				$location.path('/Login');
			}
		})
		.error(function(data) {
				console.log('Error: ' + data);
				return false;
		});

}

promosControllers.directive('ngEnter', function () {
    return function (scope, element, attrs) {
        element.bind("keydown keypress", function (event) {
            if(event.which === 13) {
                scope.$apply(function (){
                    scope.$eval(attrs.ngEnter);
                });

                event.preventDefault();
            }
        });
    };
});