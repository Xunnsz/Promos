promos.config(['$routeProvider',
  function($routeProvider) {
    $routeProvider.
      when('/Login', {
        templateUrl: 'templates/Login.html',
        controller: 'LoginCtrl'
      }).
      when('/Dashboard', {
        templateUrl: 'templates/Dashboard.html',
        controller: 'DashboardCtrl'
      }).
      when('/Students', {
        templateUrl: 'templates/Students.html',
        controller: 'StudentsCtrl'
      }).
      when('/Agenda', {
        templateUrl: 'templates/Agenda.html',
        controller: 'AgendaCtrl'
      }).
      when('/Logout', {
        templateUrl: 'templates/Login.html',
        controller: 'LogoutCtrl'
      }).
      otherwise({
        redirectTo: '/Login',
      });
  }]);