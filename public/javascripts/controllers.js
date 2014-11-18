var promos = angular.module('promos', []);

promos.controller('mainController', function($scope, $http) {
	$scope.templateUrl = createUrl('login');
	$scope.formData = {};
	$scope.message = '';
	$scope.title = 'Promos';
    // when submitting the add form, send the text to the node API
    $scope.login = function() {
        $http.post('/login', $scope.formData)
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
    };*/
});

function createUrl(name){
	return 'templates/' + name + '.html';
}
