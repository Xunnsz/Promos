promosControllers.controller('SupervisorDashboardCtrl', ['$scope', '$http', '$location',
	function($scope, $http, $location) {
		$http.get('/api/students')
			.success(function(data) {
					$scope.students = data;
			})
			.error(function(data) {
					console.log('Error: ' + data);
					return false;
			});

		$scope.showTimeline = function(index){
			$location.path('/Supervisor/Timeline/'+index+'/false');
		}

		$scope.scrollTimeline = function(index){
			$location.path('/Supervisor/Timeline/'+index+'/true');
		}

		$scope.showStudent = function(index){
			$location.path('/Supervisor/Student/'+index);
		}
}]);

promosControllers.controller('SupervisorTimelineCtrl', ['$scope',  '$routeParams', '$http', '$location',
	function($scope, $routeParams, $http, $location) {
		$http.get('/api/getStudent?studentID='+ $routeParams.studentID)
			.success(function(data) {
					$scope.studentname = data.surname + ' ' +data.lastname;
					if($routeParams.scroll == 'true'){
						$(document).ready(function () {
							$('html, body').animate({ scrollTop: $('#'+data.progress+'').offset().top - 90}, 1000);
						});
					}
			})
			.error(function(data) {
					console.log('Error: ' + data);
					return false;
		});
}]);

promosControllers.controller('SupervisorStudentsCtrl', ['$scope', '$routeParams', '$http', '$location',
	function($scope, $routeParams, $http, $location) {
		$http.get('/api/getStudent?studentID='+ $routeParams.studentID)
			.success(function(data) {
					$scope.surname = data.surname
					$scope.lastname = data.lastname
					$scope.gender = data.gender
					$scope.birth = data.birth
					$scope.birthcity = data.birthcity
					$scope.country = data.country
					$scope.nationality = data.nationality
					$scope.address = data.address
					$scope.addressnumber = data.addressnumber
					$scope.zipcode = data.zipcode
					$scope.city = data.city
					$scope.email = data.email
					$scope.phonenumber = data.phonenumber
			})
			.error(function(data) {
					console.log('Error: ' + data);
					return false;
		});
	}]);

promosControllers.controller('SupervisorMessagesCtrl', ['$scope', '$http', '$location',
	function($scope, $http, $location) {
	}]);

promosControllers.controller('SupervisorAppendixCtrl', ['$scope', '$http', '$location',
	function($scope, $http, $location) {
		$('.textarea').wysihtml5();
	}]);

promosControllers.controller('SupervisorAgendaCtrl', ['$scope', '$http', '$location',
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
								title: 'Sunny Khoenkhoen\'s Defense',
								start: new Date(y, m, 1)
							},
							{
								title: 'Tom Rutten\'s Dissertation deadline',
								start: new Date(y, m, d-5),
								end: new Date(y, m, d-2)
							},
							{
								id: 999,
								title: 'Yunpeng Zhang\'s Defense',
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