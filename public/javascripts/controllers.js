var promos = angular.module('promos', [
	'ngRoute',
	'promosControllers']);

var promosControllers = angular.module('promosControllers', []);

promosControllers.controller('mainController', ['$scope', '$http', '$location',
  function($scope, $http, $location) {
  	$scope.title = "Promos";
    $http.get('/getUser')
    .success(function(data) {
        if(data.username)
            $scope.username = data.username;
    })
    .error(function(data) {
        console.log('Error: ' + data);
        return false;
    });
  }]);

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

promosControllers.controller('AgendaCtrl', ['$scope', '$http', '$location',
  function($scope, $http, $location) {
        console.log('show agenda!');
        $.getScript('http://arshaw.com/js/fullcalendar-1.6.4/fullcalendar/fullcalendar.min.js',function(){
          var date = new Date();
          var d = date.getDate();
          var m = date.getMonth();
          var y = date.getFullYear();
          
          $('#calendar').fullCalendar({
            header: {
              left: 'prev,next today',
              center: 'title',
              right: 'month,agendaWeek,agendaDay'
            },
            editable: true,
            events: [
              {
                title: 'All Day Event',
                start: new Date(y, m, 1)
              },
              {
                title: 'Long Event',
                start: new Date(y, m, d-5),
                end: new Date(y, m, d-2)
              },
              {
                id: 999,
                title: 'Repeating Event',
                start: new Date(y, m, d-3, 16, 0),
                allDay: false
              },
              {
                id: 999,
                title: 'Repeating Event',
                start: new Date(y, m, d+4, 16, 0),
                allDay: false
              },
              {
                title: 'Meeting',
                start: new Date(y, m, d, 10, 30),
                allDay: false
              },
              {
                title: 'Lunch',
                start: new Date(y, m, d, 12, 0),
                end: new Date(y, m, d, 14, 0),
                allDay: false
              },
              {
                title: 'Birthday Party',
                start: new Date(y, m, d+1, 19, 0),
                end: new Date(y, m, d+1, 22, 30),
                allDay: false
              },
              {
                title: 'Click for Google',
                start: new Date(y, m, 28),
                end: new Date(y, m, 29),
                url: 'http://google.com/'
              }
            ]
          });
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
