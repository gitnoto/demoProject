var app	=	angular.module('angular', ["ngRoute","ngSanitize"]);

app.run(function($rootScope, $location, API, $window) {
	$rootScope.is_login	=	false;
	/* -- */
	$rootScope.logout	=	function(){
		$rootScope.is_login	=	false;
		$location.path('/');
	};
	/* Some common functions and variables */
	$rootScope.timezones	=	[{name:'America/Toronto'}, {name:'America/Los_Angeles', }, {name:'America/New_York', }, {name:'America/Phoenix'}];
	$rootScope.format	=	'yyyy-MM-dd HH:mm';
	$rootScope.goBack	=	function(){
		$window.history.back();
	};
});
app.config(function($routeProvider, $locationProvider) {
    $routeProvider
    .when("/", {
        templateUrl : "templates/login.html",
		controller : "loginCtrl"
    })
    .when("/dashboard", {
        templateUrl : "templates/dashboard.html",
		controller : "dashboardCtrl"
    })
    .when("/forgot-password", {
        templateUrl : "templates/forgot-password.html",
		controller : "forgotPasswordCtrl"
    });
});