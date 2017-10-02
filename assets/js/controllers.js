angular.module('angular')
.controller('loginCtrl', function($scope, API, $location, $rootScope){
	if($rootScope.is_login)
	{
		$location.path('dashboard');
	}
	$('body').addClass('single-page');	
	
	angular.extend($scope, {
		val: {
			userData: {
				email: "",
				password: "",
				remember_me: true
			},
			loginError: '',
			emailInvalid: false,
			passwordInvalid: false,
		},
		exe: {
			doLogin : function(){
				$scope.val.emailInvalid = false;
				$scope.val.passwordInvalid = false;
				if($scope.val.userData.email == '')
				{
					$scope.val.emailInvalid = true;
				}
				if($scope.val.userData.password == '')
				{
					$scope.val.passwordInvalid = true;
				}
				if($scope.val.emailInvalid || $scope.val.passwordInvalid)
				{
					return false;
				}
				//else call login api
				API.login($scope.val.userData).then(function(ret){
					if(ret.status==ERROR)
					{
						$scope.val.loginError	=	ret.message;
						return false;
					}
					// $('body').removeClass('single-page');
					$rootScope.is_login	=	true;
					$location.path('dashboard');
				});
			}
		}
	});
	
})
.controller('dashboardCtrl', function($scope){
	$('body').removeClass('single-page');
})
.controller('forgotPasswordCtrl', function($scope, API){
	$('body').addClass('single-page');
	angular.extend($scope, {
		val: {
			userData: {
				email: ""
			},
			message: '',
			msgClass: '',
			emailInvalid: false,
		},
		exe: {
			recoverPassword: function(){
				$scope.val.emailInvalid = false;
				if($scope.val.userData.email == '')
				{
					$scope.val.emailInvalid = true;
					return false;
				}
				API.recoverPassword($scope.val.userData.email).then(function(ret){					
					if(ret.status==ERROR)
					{
						$scope.val.message	=	ret.message;
						$scope.val.msgClass	=	'error-message';
						return false;
					}
					$scope.val.userData.email	=	'';
					$scope.val.message		=	ret.message;
					$scope.val.msgClass		=	'success-message';
				});
			}
		}
	});
})