var app	=	angular.module('aquaguard', ["ngRoute","ngSanitize"]);

app.run(function($rootScope, $location, API, $window) {
	/* Used on index.html to hide header on login screen */
	$rootScope.is_login	=	false;
	/* -- */
	$rootScope.logout	=	function(){
		API.logout($rootScope.user_id).then(function(ret){
			$rootScope.is_login	=	false;	
			$location.path('/');
		});
	};
	/* Some common functions and variables */	
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