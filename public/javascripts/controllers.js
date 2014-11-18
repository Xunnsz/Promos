var promos = angular.module('promos', [
	'ngRoute',
	'promosControllers']);

var promosControllers = angular.module('promosControllers', []);

promosControllers.controller('LoginCtrl', ['$scope', '$http', '$location',
	function ($scope, $http, $location) {
	$scope.formData = {};
	$scope.message = '';
	$scope.title = 'Promos';
    // when submitting the add form, send the text to the node API
    $scope.login = function() {
        $http.post('/Login', $scope.formData)
            .success(function(data) {
                if(data.login){
                	//Logged in!
                	$location.path('/Dashboard');
                }else{
                	$scope.message = 'Wrong pass or username';
                }
            })
            .error(function(data) {
                console.log('Error: ' + data);
            });
    };
}]);

promosControllers.controller('DashboardCtrl', ['$scope', '$http', '$location',
  function($scope, $http, $location) {
  		if(isAuthorized($http, $location)){
  			console.log('isAuthorized');
  		}
  }]);

promosControllers.controller('StudentsCtrl', ['$scope', '$http', '$location',
  function($scope, $http, $location) {
  		if(isAuthorized($http, $location)){
  			console.log('isAuthorized');
  		}
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
    	if(data.login == true)
    		return true;
    	else{
    		console.log('Not authorized')
    		$location.path('/Login');
    	}
    })
    .error(function(data) {
        console.log('Error: ' + data);
        return false;
    });
}
/*
promos.controller('mainController', function($scope, $http) {
	$scope.templateUrl = createUrl('login');
	$scope.formData = {};
	$scope.message = '';
	$scope.title = 'Promos';
    // when submitting the add form, send the text to the node API
    $scope.login = function() {
        $http.post('/Login', $scope.formData)
            .success(function(data) {
                //$scope.formData = {}; // clear the form so our user is ready to enter another
                if(data.message){
                	//$scope.message = 'Logged in..';
                	$scope.templateUrl = createUrl('dashboard');
                }else{
                	$scope.message = 'Wrong pass or username';
                }
            })
            .error(function(data) {
                console.log('Error: ' + data);
            });
    };
});

promos.controller('StudentsCtrl', function($scope, $http) {
	console.log('dsfsdfsdfsdf');
	/*$scope.templateUrl = createUrl('students');
	// when submitting the add form, send the text to the node API
	$scope.login = function() {
	    $http.post('/Login', $scope.formData)
	        .success(function(data) {
	            //$scope.formData = {}; // clear the form so our user is ready to enter another
	            if(data.message){
	            	//$scope.message = 'Logged in..';
	            	$scope.templateUrl = createUrl('dashboard');
	            }else{
	            	$scope.message = 'Wrong pass or username';
	            }
	        })
	        .error(function(data) {
	            console.log('Error: ' + data);
	        });
	};

    // when landing on the page, get all todos and show them
    /*
    	$scope.formData = {};
    	
    	$http.get('/api/todos').success(function(data) {
            $scope.todos = data;
            console.log(data);
        })
        .error(function(data) {
            console.log('Error: ' + data);
        });

    // when submitting the add form, send the text to the node API
    $scope.createTodo = function() {
        $http.post('/api/todos', $scope.formData)
            .success(function(data) {
                $scope.formData = {}; // clear the form so our user is ready to enter another
                $scope.todos = data;
                console.log(data);
            })
            .error(function(data) {
                console.log('Error: ' + data);
            });
    };

    // delete a todo after checking it
    $scope.deleteTodo = function(id) {
        $http.delete('/api/todos/' + id)
            .success(function(data) {
                $scope.todos = data;
                console.log(data);
            })
            .error(function(data) {
                console.log('Error: ' + data);
            });
    };
});
*/
