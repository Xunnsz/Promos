promos.config(['$routeProvider',
	function($routeProvider) {
		$routeProvider.
			when('/Login', {
				templateUrl: 'templates/Login.html',
				controller: 'LoginCtrl'
			}).
			when('/Student/Dashboard', {
				templateUrl: 'templates/Student/Dashboard.html',
				controller: 'StudentDashboardCtrl'
			}).
			when('/Student/Students', {
				templateUrl: 'templates/Student/Students.html',
				controller: 'StudentStudentsCtrl'
			}).
			when('/Student/Agenda', {
				templateUrl: 'templates/Student/Agenda.html',
				controller: 'StudentAgendaCtrl'
			}).
			when('/Student/Messages', {
				templateUrl: 'templates/Student/Messages.html',
				controller: 'StudentMessagesCtrl'
			}).
			when('/Student/Dissertations', {
				templateUrl: 'templates/Student/Dissertations.html',
				controller: 'StudentDissertationsCtrl'
			}).
			when('/Supervisor/Dashboard', {
				templateUrl: 'templates/Supervisor/Dashboard.html',
				controller: 'SupervisorDashboardCtrl'
			}).
			when('/Supervisor/Student/:studentID', {
				templateUrl: 'templates/Supervisor/Students.html',
				controller: 'SupervisorStudentsCtrl'
			}).
			when('/Supervisor/Agenda', {
				templateUrl: 'templates/Supervisor/Agenda.html',
				controller: 'SupervisorAgendaCtrl'
			}).
			when('/Supervisor/Timeline/:studentID/:scroll', {
				templateUrl: 'templates/Supervisor/Timeline.html',
				controller: 'SupervisorTimelineCtrl'
			}).
			when('/Supervisor/Messages', {
				templateUrl: 'templates/Supervisor/Messages.html',
				controller: 'SupervisorMessagesCtrl'
			}).
			when('/Supervisor/Appendix', {
				templateUrl: 'templates/Supervisor/Appendix.html',
				controller: 'SupervisorAppendixCtrl'
			}).
			when('/Logout', {
				templateUrl: 'templates/Login.html',
				controller: 'LogoutCtrl'
			}).
			otherwise({
				redirectTo: '/Login',
			});
	}]);