angular.module('aquaguard')
.controller('loginCtrl', function($scope, API, $location, $rootScope){
	if($rootScope.is_login)
	{
		$location.path('dashboard');
	}
	/*Page Scripts*/
	// Add class to body for change layout settings
	$('body').addClass('single-page');
	// Form Validation
	// $('#form-validation').validate({
		// submit: {
			// settings: {
				// inputContainer: '.form-group',
				// errorListClass: 'form-control-error',
				// errorClass: 'has-danger'
			// }
		// }	
	// });

	// Show/Hide Password
	// $('.password').password({
		// eyeClass: '',
		// eyeOpenClass: 'icmn-eye',
		// eyeCloseClass: 'icmn-eye-blocked'
	// });
	/*End Page Scripts*/
	
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
				console.log($scope.val.userData);
				API.login($scope.val.userData).then(function(ret){
					if(ret.data.status==ERROR)
					{
						$scope.val.loginError	=	ret.data.message;
						return false;
					}
					// $('body').removeClass('single-page');
					$rootScope.is_login	=	true;
					sessionStorage.setItem("userData", JSON.stringify(ret.data.data));
					sessionStorage.setItem('is_login',1);
					$rootScope.user_id	=	ret.data.data.id;
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
					if(ret.data.status==ERROR)
					{
						$scope.val.message	=	ret.data.message;
						$scope.val.msgClass	=	'error-message';
						return false;
					}
					$scope.val.userData.email	=	'';
					$scope.val.message	=	ret.data.message;
					$scope.val.msgClass		=	'success-message';
				});
			}
		}
	});
})
.controller('resetPasswordCtrl', function($scope, API, $routeParams){
	$('body').addClass('single-page');
	angular.extend($scope, {
		val: {
			userData: {
				userId: $routeParams.userId,
				password: "",
				confirmpassword: ""
			},
			message: '',
			msgClass: '',
			passwordError: '',
			confirmPasswordError: '',
		},
		exe: {
			resetPassword: function(){
				$scope.val.passwordError = '';
				$scope.val.confirmPasswordError = '';
				if($scope.val.userData.userId == '')				
				{
					$scope.val.message	=	'You have already reset password.';
					$scope.val.msgClass	=	'error-message';
					return false;
				}
				if($scope.val.userData.password == '')
				{
					$scope.val.passwordError = 'Enter Password';
				}
				if($scope.val.userData.confirmpassword == '')
				{
					$scope.val.confirmPasswordError = 'Enter Confirm Password';
				}
				if($scope.val.userData.password == '' || $scope.val.userData.confirmpassword == '')
				{
					return false;
				}
				if($scope.val.userData.password != $scope.val.userData.confirmpassword)
				{
					$scope.val.confirmPasswordError = 'Does not match Password';
					return false;
				}
				API.resetPassword($scope.val.userData).then(function(ret){				
					if(ret.data.status==ERROR)
					{
						$scope.val.message	=	ret.data.message;
						$scope.val.msgClass	=	'error-message';
						return false;
					}
					$scope.val.userData.userId	=	'';//so that user can't reset password again from same form
					$scope.val.userData.password	=	'';
					$scope.val.userData.confirmpassword	=	'';
					$scope.val.message		=	ret.data.message;
					$scope.val.msgClass		=	'success-message';
				});
			}
		}
	});
})
.controller('locationTypesCtrl', function($scope, API, $location, $rootScope, $routeParams, CONFIRM,$route){
	$('body').removeClass('single-page');
	
	if($location.url() == '/location-types')// List
	{
		$scope.records	=	[];		
		//Fetch List
		API.locationTypes().then(function(ret){
			$scope.records	=	ret.data.data;
			// $('#recordsTable').DataTable({
				// responsive: true,
				// "lengthMenu": [[5, 25, 50, -1], [5, 25, 50, "All"]]
			// });
		});
		$scope.changeStatus	=	function(index,title){
			if(CONFIRM.show(title+' record?'))
			{
				var obj	=	{
					id: $scope.records[index].id,
					userId: $rootScope.user_id
				}
				if($scope.records[index].status == ACTIVE)//Deactivate
				{
					obj.status	=	INACTIVE;
				}
				else//Activate
				{
					obj.status	=	ACTIVE;
				}
				API.changeStatusLocationType(obj).then(function(ret){
					if(ret.data.status==ERROR)
					{
						alert(ret.data.message);
						return false;
					}
					$scope.records[index].status	=	obj.status;
					$route.reload();
				});
			}
		};
		$scope.deleteRecord	=	function(index,title){
			if(CONFIRM.show(title+' record?'))
			{
				var obj	=	{
					id: $scope.records[index].id,
					userId: $rootScope.user_id,
					status: DELETED
				}
				console.log(obj);
				API.changeStatusLocationType(obj).then(function(ret){
					if(ret.data.status==ERROR)
					{
						alert(ret.data.message);
						return false;
					}
					$scope.records.splice(index,1);
				});
			}
		};
	}
	else if($location.url() == '/add-location-type')// Add
	{		
		angular.extend($scope, {
			val: {
				data: {
					type: '',
					userId: $rootScope.user_id
				},
				message: '',
				msgClass: '',
				typeError: ''
			},
			exe: {
				save: function(){
					$scope.val.typeError = '';
					if($scope.val.data.type == '')
					{
						$scope.val.typeError = 'Enter Location Type';				
						return false;
					}
					console.log($scope.val.data);
					API.addLocationType($scope.val.data).then(function(ret){
						if(ret.data.status==ERROR)
						{
							$scope.val.message	=	ret.data.message;
							$scope.val.msgClass	=	'error-message';
							return false;
						}
						$scope.val.data.type	=	'';
						$scope.val.message		=	ret.data.message;
						$scope.val.msgClass		=	'success-message';
					});
				}
			}
		});
	}
	else //edit
	{
		API.getLocationType($routeParams.itemId).then(function(ret){
			var result	=	ret.data.data;
			$scope.val.data	=	{
					id: result.id,
					type: result.type,
					status: result.status,
					userId: $rootScope.user_id
				}
		});
		angular.extend($scope, {
			val: {
				message: '',
				msgClass: '',
				typeError: ''
			},
			exe: {
				save: function(){
					$scope.val.typeError = '';
					if($scope.val.data.type == '')
					{
						$scope.val.typeError = 'Enter Location Type';				
						return false;
					}
					API.editLocationType($scope.val.data).then(function(ret){
						if(ret.data.status==ERROR)
						{
							$scope.val.message	=	ret.data.message;
							$scope.val.msgClass	=	'error-message';
							return false;
						}
						$scope.val.message		=	ret.data.message;
						$scope.val.msgClass		=	'success-message';
					});
				}
			}
		});
	}
})
.controller('organizationTypesCtrl', function($scope, API, $location, $rootScope, $routeParams, CONFIRM,$route){
	$('body').removeClass('single-page');
	if($location.url() == '/organization-types')// List
	{
		$scope.records	=	[];		
		//Fetch List
		API.organizationTypes().then(function(ret){
			$scope.records	=	ret.data.data;
		});
		$scope.changeStatus	=	function(index,title){
			if(CONFIRM.show(title+' record?'))
			{
				var obj	=	{
					id: $scope.records[index].id,
					userId: $rootScope.user_id
				}
				if($scope.records[index].status == ACTIVE)//Deactivate
				{
					obj.status	=	INACTIVE;
				}
				else//Activate
				{
					obj.status	=	ACTIVE;
				}
				API.changeStatusOrganizationType(obj).then(function(ret){
					if(ret.data.status==ERROR)
					{
						alert(ret.data.message);
						return false;
					}
					$scope.records[index].status	=	obj.status;
					$route.reload();
				});
			}
		};
		$scope.deleteRecord	=	function(index,title){
			if(CONFIRM.show(title+' record?'))
			{
				var obj	=	{
					id: $scope.records[index].id,
					userId: $rootScope.user_id,
					status: DELETED
				}
				API.changeStatusOrganizationType(obj).then(function(ret){
					if(ret.data.status==ERROR)
					{
						alert(ret.data.message);
						return false;
					}
					$scope.records.splice(index,1);
				});
			}
		};
	}
	else if($location.url() == '/add-organization-type')// Add
	{		
		angular.extend($scope, {
			val: {
				data: {
					type: '',
					userId: $rootScope.user_id
				},
				message: '',
				msgClass: '',
				typeError: ''
			},
			exe: {
				save: function(){
					$scope.val.typeError = '';
					if($scope.val.data.type == '')
					{
						$scope.val.typeError = 'Enter Organization Type';				
						return false;
					}
					API.addOrganizationType($scope.val.data).then(function(ret){
						if(ret.data.status==ERROR)
						{
							$scope.val.message	=	ret.data.message;
							$scope.val.msgClass	=	'error-message';
							return false;
						}
						$scope.val.data.type	=	'';
						$scope.val.message		=	ret.data.message;
						$scope.val.msgClass		=	'success-message';
					});
				}
			}
		});
	}
	else //edit
	{
		API.getOrganizationType($routeParams.itemId).then(function(ret){
			var result	=	ret.data.data;
			$scope.val.data	=	{
					id: result.id,
					type: result.type,
					status: result.status,
					userId: $rootScope.user_id
				}
		});
		angular.extend($scope, {
			val: {
				message: '',
				msgClass: '',
				typeError: ''
			},
			exe: {
				save: function(){
					$scope.val.typeError = '';
					if($scope.val.data.type == '')
					{
						$scope.val.typeError = 'Enter Organization Type';				
						return false;
					}
					API.editOrganizationType($scope.val.data).then(function(ret){
						if(ret.data.status==ERROR)
						{
							$scope.val.message	=	ret.data.message;
							$scope.val.msgClass	=	'error-message';
							return false;
						}
						$scope.val.message		=	ret.data.message;
						$scope.val.msgClass		=	'success-message';
					});
				}
			}
		});
	}
})
.controller('unitsCtrl', function($scope, API, $location, $rootScope, $routeParams, CONFIRM, $route){
	$('body').removeClass('single-page');
	if($location.url() == '/units') { // List 
		$scope.records	=	[];		
		//Fetch List
		API.units().then(function(ret){
			$scope.records	=	ret.data.data;
		});
		$scope.unitChangeStatus	=	function(index,title){
			if(CONFIRM.show(title+' record?')) {
				var obj	=	{
					id: $scope.records[index].id,
					userId: $rootScope.user_id
				}
				if($scope.records[index].status == ACTIVE)//Deactivate
				{
					obj.status	=	INACTIVE;
				}
				else//Activate
				{
					obj.status	=	ACTIVE;
				}
				API.changeStatusUnit(obj).then(function(ret){
					if(ret.data.status==ERROR)
					{
						alert(ret.data.message);
						return false;
					}
					$scope.records[index].status	=	obj.status;
					$route.reload();
				});
			}
		};
		$scope.deleteUnit	=	function(index,title){
			if(CONFIRM.show(title+' record?'))
			{
				var obj	=	{
					id: $scope.records[index].id,
					userId: $rootScope.user_id,
					status: DELETED
				}
				API.changeStatusUnit(obj).then(function(ret){
					if(ret.data.status==ERROR)
					{
						alert(ret.data.message);
						return false;
					}
					$scope.records.splice(index,1);
				});
			}
		};
	}
	else if($location.url() == '/add-unit') { // Add
		angular.extend($scope, {
			val: {
				data: {
					unit: '',
					userId: $rootScope.user_id
				},
				message: '',
				msgClass: '',
				typeError: ''
			},
			exe: {
				save: function(){
					$scope.val.typeError = '';
					if($scope.val.data.unit == '')
					{
						$scope.val.typeError = 'Please enter unit.';
						return false;
					}
					API.addUnit($scope.val.data).then(function(ret){
						if(ret.data.status==ERROR)
						{
							$scope.val.message	=	ret.data.message;
							$scope.val.msgClass	=	'error-message';
							return false;
						}
						$scope.val.data.unit	=	'';
						$scope.val.message		=	ret.data.message;
						$scope.val.msgClass		=	'success-message';
					});
				}
			}
		});
	}
	else //edit
	{
		API.getUnit($routeParams.itemId).then(function(ret){
			// console.log(ret);
			var result	=	ret.data.data;
			$scope.val.data	=	{
					id: result.id,
					unit: result.unit,
					status: result.status,
					userId: $rootScope.user_id
				}
		});
		angular.extend($scope, {
			val: {
				message: '',
				msgClass: '',
				typeError: ''
			},
			exe: {
				save: function(){
					$scope.val.typeError = '';
					if($scope.val.data.unit == '')
					{
						$scope.val.typeError = 'Please enter unit.';				
						return false;
					}
					API.editUnit($scope.val.data).then(function(ret){
						if(ret.data.status==ERROR)
						{
							$scope.val.message	=	ret.data.message;
							$scope.val.msgClass	=	'error-message';
							return false;
						}
						$scope.val.message		=	ret.data.message;
						$scope.val.msgClass		=	'success-message';
					});
				}
			}
		});
	}
})
.controller('createClientCtrl', function($scope, API, $rootScope, CONFIRM, $location){
	//Fetch List
	$scope.organizationTypes	=	[];
	$scope.provinces			=	[];
	$scope.systemTemplates		=	[];
	$scope.testTemplates		=	[];
	$scope.testValues			=	[];
	$scope.unitList				=	[];
	$scope.cities				=	[];
	$scope.locationTypes		=	[];
	API.organizationTypes(1).then(function(ret){
		$scope.organizationTypes=	ret.data.data;
	});
	API.locationTypes(1).then(function(ret){
		$scope.locationTypes	=	ret.data.data;
	});
	API.getAllProvinces().then(function(ret){
		$scope.provinces		=	ret.data.data;
	});
	API.allSystemTemplates(1).then(function(ret){
		$scope.systemTemplates	=	ret.data.data;
	});
	API.allTestTemplates(1).then(function(ret){
		$scope.testTemplates	=	ret.data.data;
	});
	API.allTestValues(1).then(function(ret){
		$scope.testValues		=	ret.data.data;
	});
	API.units(1).then(function(ret){
		$scope.unitList			=	ret.data.data;
	});
	
	$scope.companyLocations			=	[]; //All locations addded will be saved here
	$scope.companySystems			=	[]; //All Systems addded will be saved here
	$scope.companyTests				=	[]; //All Tests addded will be saved here
	$scope.companyUsers				=	[]; //All Tests addded will be saved here
	angular.extend($scope, {
		val: {
			step		:	1,
			message		:	'',
			msgClass	:	''
		},
		company	:	{
			id				:	'', //will be generated after step1
			company_name	:	'',
			organization_type_id	:	'',
			address			:	'',
			province_id		:	'',
			city_id			:	'',
			postal_code		:	'',
			contact_name	:	'',
			contact_title	:	'',
			email			:	'',
			phone_number	:	'',
			userId			:	$rootScope.user_id
		},
		loc		:	{
			company_id		:	'',//will be generated after step1
			id				:	'', //will be generated when location saved
			location_type_id:	'',
			location_name	:	'',
			address			:	'',
			province_id		:	'',
			city_id			:	'',
			postal_code		:	'',
			contact_name	:	'',
			contact_title	:	'',
			email			:	'',
			phone_number	:	'',
		},
		system	:	{
			company_location_id	:	'',	//will be generated after step2
			id					:	'',	//will be generated when system saved
			system_template_id	:	'',
			system_name			:	'',
			description			:	'',
		},
		test	:	{
			company_system_id	:	'',	//will be generated after step2
			id					:	'',	//will be generated when test saved
			test_template_id	:	'',
			unit_id				:	'',
			test_name			:	'',
			test_value_id		:	'',
			sample_control_1	:	'',
			sample_control_2	:	'',
		},
		user	:	{
			id					:	'',	//will be generated when user saved
			username			:	'',
			first_name			:	'',
			last_name			:	'',
			email				:	'',
			password			:	'',
			confirm_password	:	'',
			timezone			:	'',
			role				:	'',
			userId				:	$rootScope.user_id,
			company_id			:	'',
			company_location_id	:	''
		},
		exe: {
			prevStep: function(){
				$scope.$apply(function(){
					$scope.val.step--;
				});
			},
			getCurrentStep: function(){
				return $scope.val.step;
			},
			getCities: function(obj){
				API.citiesByProvinceId(obj.province_id).then(function(ret){
					$scope.cities	=	ret.data.data;
				});
			},
			saveCompany: function(){
				$scope.val.message	=	'';
				$scope.val.msgClass	=	'';
				API.saveCompanyDetails($scope.company).then(function(ret){
					if(ret.data.status==ERROR) {
						var msgVar	=	'<ul>';
						angular.forEach(ret.data.message, function(value, key) {
							msgVar	+=	'<li>'+value+'</li>';
						});
						msgVar	+=	'</ul>';
						$scope.val.message	=	msgVar;
						$scope.val.msgClass	=	'error-message';
						return false;
					}
					$scope.company.id		=	ret.data.data.id;
					$scope.loc.company_id	=	$scope.company.id;
					$scope.user.company_id	=	$scope.company.id;
					$scope.val.step++;
				});
			},
			saveLocation: function(param){
				$scope.val.message	=	'';
				$scope.val.msgClass	=	'';
				// console.log($scope.loc);
				API.saveCompanyLocation($scope.loc).then(function(ret){
					if(ret.data.status==ERROR) {
						$scope.val.message	=	ret.data.message;
						$scope.val.msgClass	=	'error-message';
						return false;
					}
					$scope.loc.id	=	ret.data.data.id;
					$scope.system.company_location_id	=	$scope.loc.id
					$scope.user.company_location_id		=	$scope.loc.id;
					if(param == 0) {
						$scope.loc.checked	=	true;
					} else {
						$scope.loc.checked	=	false;
					}
					//Add only new locations to companyLocations list
					var ifExists	=	false;
					for(var i in $scope.companyLocations) {
						if($scope.companyLocations[i].id == $scope.loc.id) {
							ifExists	=	true;
							break;
						}
					}
					if(!ifExists){
						$scope.companyLocations.push($scope.loc);
					}
					if(param==1) {
						$scope.exe.addMoreLocation();
					}else{
						$scope.val.step++;
					}			
				});
			},
			addMoreLocation: function(){
				//Reset object to add new location
				$scope.loc	=	{
					company_id		:	$scope.company.id,
					id				:	'',
					location_type_id:	'',
					location_name	:	'',
					address			:	'',
					province_id		:	'',
					city_id			:	'',
					postal_code		:	'',
					contact_name	:	'',
					contact_title	:	'',
					email			:	'',
					phone_number	:	'',
				}
			},
			setCurrentLocation: function(index){
				$scope.loc	=	$scope.companyLocations[index];
			},
			
			deleteCompanyLocation:	function(index,title){
				if(CONFIRM.show(title+' record?')) {
					$scope.loc	=	{
						id		:	$scope.companyLocations[index].id,
						status	:	DELETED
					};
					API.changeStatusCompanyLocation($scope.loc).then(function(ret){
						if(ret.data.status==ERROR) {
							alert(ret.data.message);
							return false;
						}
						$scope.companyLocations.splice(index,1);
					});
				}
			}, 
			
			saveSystem: function(param){
				$scope.val.message	=	'';
				$scope.val.msgClass	=	'';
				API.saveCompanySystem($scope.system).then(function(ret){
					if(ret.data.status==ERROR) {
						$scope.val.message	=	ret.data.message;
						$scope.val.msgClass	=	'error-message';
						return false;
					}
					$scope.system.id	=	ret.data.data.id;
					$scope.test.company_system_id	=	ret.data.data.id;
					if(param == 0) {
						$scope.system.checked	=	true;
					} else {
						$scope.system.checked	=	false;
					}
					//Add only new system to companySystems list
					var ifExists	=	false;
					for(var i in $scope.companySystems) {
						if($scope.companySystems[i].id == $scope.system.id) {
							ifExists	=	true;
							break;
						}
					}
					if(!ifExists){
						$scope.companySystems.push($scope.system);
					}
					
					if(param==1) {
						$scope.exe.addMoreSystem();
					}
					else{
						$scope.val.step++;
					}
				});
			},
			addMoreSystem: function(){
				//Reset object to add new Company System
				$scope.system	=	{
					company_location_id	:	$scope.loc.id,
					id					:	'',
					system_template_id	:	'',
					system_name			:	'',
					description			:	'',
				}
			},
			setCurrentSystem: function(index){
				$scope.system	=	$scope.companySystems[index];
			},
			deleteCompanySystem:	function(index,title){
				if(CONFIRM.show(title+' record?')) {
					$scope.system	=	{
						id		:	$scope.companySystems[index].id,
						status	:	DELETED
					};
					API.changeStatusCompanySystem($scope.system).then(function(ret){
						if(ret.data.status==ERROR) {
							alert(ret.data.message);
							return false;
						}
						$scope.companySystems.splice(index,1);
					});
				}
			},
			
			allTestData : function(obj) {
				angular.forEach($scope.testTemplates,function(value,index){
					if(obj.test_template_id == value.id) {
						$scope.test.unit_id				=	value.unit_id;
						$scope.test.test_name			=	value.test_name;
						$scope.test.test_value_id		=	value.test_value_id;
						$scope.test.sample_control_1	=	value.sample_control_1;
						$scope.test.sample_control_2	=	value.sample_control_2;
						return false;
					}
				});
			},
			saveTest: function(param){
				$scope.val.message	=	'';
				$scope.val.msgClass	=	'';
				API.saveCompanyTest($scope.test).then(function(ret){
					if(ret.data.status==ERROR) {
						$scope.val.message	=	ret.data.message;
						$scope.val.msgClass	=	'error-message';
						return false;
					}
					$scope.test.id	=	ret.data.data.id;
					if(param == 0) {
						$scope.test.checked	=	true;
					} else {
						$scope.test.checked	=	false;
					}
					//Add only new test to companyTest list
					var ifExists	=	false;
					for(var i in $scope.companyTests) {
						if($scope.companyTests[i].id == $scope.test.id) {
							ifExists	=	true;
							break;
						}
					}
					if(!ifExists){
						$scope.companyTests.push($scope.test);
					}
					
					if(param==1) {
						$scope.exe.addMoreTest();
					}
					else{
						$scope.val.step++;
					}
				});
			},
			addMoreTest: function(){
				// Reset object to add new Company test
				$scope.test	=	{
					company_system_id	:	$scope.system.id,
					id					:	'',
					test_template_id	:	'',
					unit_id				:	'',
					test_name			:	'',
					test_value_id		:	'',
					sample_control_1	:	'',
					sample_control_2	:	'',
				}
			},
			setCurrentTest: function(index){
				$scope.test	=	$scope.companyTests[index];
			},
			deleteCompanyTest:	function(index,title){
				if(CONFIRM.show(title+' record?')) {
					$scope.system	=	{
						id		:	$scope.companyTests[index].id,
						status	:	DELETED
					};
					API.changeStatusCompanyTest($scope.system).then(function(ret){
						if(ret.data.status==ERROR) {
							alert(ret.data.message);
							return false;
						}
						$scope.companyTests.splice(index,1);
					});
				}
			},
			
			saveUser: function(param){
				$scope.val.message	=	'';
				$scope.val.msgClass	=	'';
				API.saveCompanyUser($scope.user).then(function(ret){
					if(ret.data.status==ERROR) {
						var msgVar	=	'<ul>';
						angular.forEach(ret.data.message, function(value, key) {
							msgVar	+=	'<li>'+value+'</li>';
						});
						msgVar	+=	'</ul>';
						$scope.val.message	=	msgVar;
						// $scope.val.message	=	ret.data.message;
						$scope.val.msgClass	=	'error-message';
						$('html,body').animate({scrollTop:0},0);
						return false;
					}
					$scope.user.id	=	ret.data.data.id;
					if(param == 0) {
						$scope.user.checked	=	true;
					} else {
						$scope.user.checked	=	false;
					}
					//Add only new user to companyTest list
					var ifExists	=	false;
					for(var i in $scope.companyUsers) {
						if($scope.companyUsers[i].id == $scope.user.id) {
							ifExists	=	true;
							break;
						}
					}
					if(!ifExists){
						$scope.companyUsers.push($scope.user);
					}
					
					if(param==1) {
						$scope.exe.addMoreUser();
					} else if(param==2){
						$location.path('dashboard');
						// $route.location.href	=	'#!location-types';
					}
					// $scope.val.step++;
				});
			},
			addMoreUser: function(){
				// Reset object to add new Company test
				$scope.user	=	{
					id					:	'',
					username			:	'',
					first_name			:	'',
					last_name			:	'',
					email				:	'',
					password			:	'',
					confirm_password	:	'',
					timezone			:	'',
					role				:	'',
					userId				:	$rootScope.user_id,
					company_id			:	$scope.company.id,
					company_location_id	:	$scope.loc.id,
				}
			},
			setCurrentUser: function(index){
				$scope.user	=	$scope.companyUsers[index];
			},
			deleteCompanyUser:	function(index,title){
				if(CONFIRM.show(title+' record?')) {
					$scope.system	=	{
						id		:	$scope.companyUsers[index].id,
						status	:	DELETED
					};
					API.changeStatusCompanyUser($scope.system).then(function(ret){
						if(ret.data.status==ERROR) {
							alert(ret.data.message);
							return false;
						}
						$scope.companyUsers.splice(index,1);
					});
				}
			},
		}
	});
	// $('.next2').on('click',function(){
		// if($scope.val.step == 1)//save step 1
		// {
			// $('.form-control-error').remove();
			// if($scope.company.company_name == '')
			// {
				// var element = angular.element('[ng-model="company.company_name"]');
				// console.log(element);
				// $('<div class="form-control-error" data-error-list=""><ul><li>Required</li></ul></div>').insertAfter($(element));
				// event.preventDefault();//to prevent wizard from opening next tab
			// }
			// return false;
			// API.saveCompanyDetails($scope.company).then(function(ret){
				// if(ret.data.status==ERROR)
				// {
					// $scope.val.message	=	ret.data.message;
					// $scope.val.msgClass	=	'error-message';
					// return false;
				// }
				// $scope.company.id	=	ret.data.data.id;
				// $scope.val.step++;
			// });
		// }
	// });
	// $('.previous2').on('click',function(){
		// if($scope.val.step>1){
			// $scope.val.step--;
		// }		
	// });
})
.controller('systemTemplateCtrl', function($scope, API, $location, $rootScope, $routeParams, CONFIRM,$route){
	$('body').removeClass('single-page');
	if($location.url() == '/system-templates') { // List 
		$scope.records	=	[];		
		//Fetch List
		API.allSystemTemplates().then(function(ret){
			$scope.records	=	ret.data.data;
		});
		$scope.systemTemplateChangeStatus	=	function(index,title){
			if(CONFIRM.show(title+' record?')) {
				var obj	=	{
					id: $scope.records[index].id,
					userId: $rootScope.user_id
				}
				if($scope.records[index].status == ACTIVE) { //Deactivate
					obj.status	=	INACTIVE;
				} else { //Activate 
					obj.status	=	ACTIVE;
				}
				API.changeStatusSystemTemplate(obj).then(function(ret){
					if(ret.data.status==ERROR) {
						alert(ret.data.message);
						return false;
					}
					$scope.records[index].status	=	obj.status;
					$route.reload();
				});
			}
		};
		$scope.deleteSystemTemplates	=	function(index,title){
			if(CONFIRM.show(title+' record?')) {
				var obj	=	{
					id		:	$scope.records[index].id,
					userId	:	$rootScope.user_id,
					status	:	DELETED
				}
				API.changeStatusSystemTemplate(obj).then(function(ret){
					if(ret.data.status==ERROR) {
						alert(ret.data.message);
						return false;
					}
					$scope.records.splice(index,1);
				});
			}
		};
	}
	else if($location.url() == '/add-system-template') { // Add
		API.allSystemTemplates(1).then(function(ret){
			$scope.systemList	=	ret.data.data;
		});
		angular.extend($scope, {
			val:	{
				data:	{
					parent_id	:	'',
					system_name	:	'',
					description	:	'',
					userId		:	$rootScope.user_id
				},
				message		:	'',
				msgClass	:	'',
				typeError	:	''
			},
			exe: {
				save: function(){
					$scope.val.typeError	=	'';
					if($scope.val.data.system_name == '' ) {
						$scope.val.typeError	=	'Please enter report system name.';
						return false;
					}
					if($scope.val.data.description == '') {
						$scope.val.typeError	=	'Please enter description.';
						return false;
					}
					
					API.addSystemTemplate($scope.val.data).then(function(ret){
						if(ret.data.status==ERROR) {
							$scope.val.message	=	ret.data.message;
							$scope.val.msgClass	=	'error-message';
							return false;
						}
						$scope.val.data.system_name	=	'';
						$scope.val.data.description	=	'';
						$scope.val.data.parent_id	=	'';
						$scope.val.message			=	ret.data.message;
						$scope.val.msgClass			=	'success-message';
						// $location.path('system-templates');
					});
				}
			}
		});
	} else { //edit
		API.getSystemTemplate($routeParams.itemId).then(function(ret){
			// console.log(ret);
			var result	=	ret.data.data;
			$scope.val.data	=	{
					id			:	result.id,
					system_name	:	result.system_name,
					description	:	result.description,
					status		:	result.status,
					userId		:	$rootScope.user_id
				}
		});
		angular.extend($scope, {
			val	:	{
				message		:	'',
				msgClass	:	'',
				typeError	:	''
			},
			exe	:	{
				save	: function() {
					$scope.val.typeError	=	'';
					if($scope.val.data.system_name == '') {
						$scope.val.typeError=	'Please enter system name.';				
						return false;
					}
					if($scope.val.data.description == '') {
						$scope.val.typeError=	'Please enter description.';				
						return false;
					}
					API.editSystemTemplate($scope.val.data).then(function(ret){
						if(ret.data.status==ERROR) {
							$scope.val.message	=	ret.data.message;
							$scope.val.msgClass	=	'error-message';
							return false;
						}
						$scope.val.message		=	ret.data.message;
						$scope.val.msgClass		=	'success-message';
					});
				}
			}
		});
	}
})
.controller('testTemplateCtrl', function($scope, API, $location, $rootScope, $routeParams, CONFIRM,$route){
	$('body').removeClass('single-page');
	if($location.url() == '/test-templates') { // List 
		$scope.records	=	[];		
		//Fetch List
		API.allTestTemplates().then(function(ret){
			$scope.records	=	ret.data.data;
		});
		$scope.testTemplateChangeStatus	=	function(index,title){
			if(CONFIRM.show(title+' record?')) {
				var obj	=	{
					id: $scope.records[index].id,
					userId: $rootScope.user_id
				}
				if($scope.records[index].status == ACTIVE) { //Deactivate
					obj.status	=	INACTIVE;
				} else { //Activate 
					obj.status	=	ACTIVE;
				}
				API.changeStatusTestTemplate(obj).then(function(ret){
					if(ret.data.status==ERROR) {
						alert(ret.data.message);
						return false;
					}
					$scope.records[index].status	=	obj.status;
					$route.reload();
				});
			}
		};
		$scope.deleteTestTemplates	=	function(index,title){
			if(CONFIRM.show(title+' record?')) {
				var obj	=	{
					id		:	$scope.records[index].id,
					userId	:	$rootScope.user_id,
					status	:	DELETED
				}
				API.changeStatusTestTemplate(obj).then(function(ret){
					if(ret.data.status==ERROR) {
						alert(ret.data.message);
						return false;
					}
					$scope.records.splice(index,1);
				});
			}
		};
	}
	else if($location.url() == '/add-test-template') { // Add
		API.allSystemTemplates(1).then(function(ret){
			$scope.systemList	=	ret.data.data;
		});
		API.units(1).then(function(ret){
			$scope.unitList	=	ret.data.data;
		});
		API.allTestValues(1).then(function(ret){
			$scope.testValueList	=	ret.data.data;
		});
		angular.extend($scope, {
			val:	{
				data:	{
					system_template_id	:	'',
					unit_id				:	'',
					test_value_id		:	'',
					test_name			:	'',
					sample_control_1	:	'',
					sample_control_2	:	'',
					userId				:	$rootScope.user_id
				},
				message		:	'',
				msgClass	:	''
			},
			exe: {
				save: function(){
					if(validateForm()){
						API.addTestTemplate($scope.val.data).then(function(ret){
							if(ret.data.status==ERROR) {
								$scope.val.message	=	ret.data.message;
								$scope.val.msgClass	=	'error-message';
								return false;
							}
							$scope.val.data			=	'';
							$scope.val.message		=	ret.data.message;
							$scope.val.msgClass		=	'success-message';
							// $location.path('system-templates');
						});
					}
				}
			}
		});
	} else { //edit
		API.allSystemTemplates(1).then(function(ret){
			$scope.systemList	=	ret.data.data;
		});
		API.units(1).then(function(ret){
			$scope.unitList	=	ret.data.data;
		});
		API.allTestValues(1).then(function(ret){
			$scope.testValueList	=	ret.data.data;
		});
		API.getTestTemplate($routeParams.itemId).then(function(ret){
			var result	=	ret.data.data;
			$scope.val.data	=	{
					id					:	result.id,
					system_template_id	:	result.system_template_id,
					unit_id				:	result.unit_id,
					test_value_id		:	result.test_value_id,
					test_name			:	result.test_name,
					sample_control_1	:	result.sample_control_1,
					sample_control_2	:	result.sample_control_2,
					status				:	result.status,
					userId				:	$rootScope.user_id
				}
		});
		angular.extend($scope, {
			val	:	{
				message		:	'',
				msgClass	:	''
			},
			exe	:	{
				save	: function() {
					if(validateForm()){
						API.editTestTemplate($scope.val.data).then(function(ret){
							if(ret.data.status==ERROR) {
								$scope.val.message	=	ret.data.message;
								$scope.val.msgClass	=	'error-message';
								return false;
							}
							$scope.val.message		=	ret.data.message;
							$scope.val.msgClass		=	'success-message';
						});
					}
				}
			}
		});
	}
})

.controller('changePasswordCtrl',function($scope, API, $location, $rootScope, $routeParams, CONFIRM){
	angular.extend($scope, {
		val : {
			userData: {
				userId			:	$rootScope.user_id,
				oldpassword		:	"",
				newpassword		:	"",
				confirmpassword	:	""
			},
			message				:	'',
			msgClass			:	'',
			newpasswordError	:	'',
			oldpasswordError	:	'',
			confirmPasswordError:	'',
		},
		exe: {
			changePassword: function(){
				$scope.val.newpasswordError		=	'';
				$scope.val.confirmPasswordError	=	'';
				$scope.val.oldpasswordError		=	'';
				
				if($scope.val.userData.oldpassword == '') {
					$scope.val.oldpasswordError	=	'Enter Old Password';
					return false;
				}
				if($scope.val.userData.newpassword == '') {
					$scope.val.newpasswordError	=	'Enter New Password';
					return false;
				}
				if($scope.val.userData.confirmpassword == '') {
					$scope.val.confirmPasswordError	=	'Enter Confirm Password';
					return false;
				}
				
				if($scope.val.userData.newpassword != $scope.val.userData.confirmpassword) {
					$scope.val.confirmPasswordError	=	'Does not match New Password and Confirm Password';
					return false;
				}
				
				if($scope.val.userData.newpassword != ''){
					var newpassword	=	$scope.val.userData.newpassword ;
					if(newpassword.length < PASSLENGTH){
						$scope.val.newpasswordError	=	'Invalid New Password length must be require minimum length 6.';
						return false;
					}
				}
				
				API.changePassword($scope.val.userData).then(function(ret){
					if(ret.data.status==ERROR) {
						$scope.val.message	=	ret.data.message;
						$scope.val.msgClass	=	'error-message';
						return false;
					}
					$scope.val.userData.userId			=	'';
					$scope.val.userData.oldpassword		=	'';
					$scope.val.userData.newpassword		=	'';
					$scope.val.userData.confirmpassword	=	'';
					$scope.val.message		=	ret.data.message;
					$scope.val.msgClass		=	'success-message';
				});
			}
		}
	});
})

.controller('updateProfileCtrl',function($scope, API, $location, $rootScope, CONFIRM){
	//Update Profile 
	$scope.provinces	=	[];
	$scope.cities		=	[];
	$scope.theFile		=	null;
		
	API.getuserProfiles($rootScope.user_id).then(function(ret){
	var result	=	ret.data.data;
	$scope.val.data	=	{
		id				:	result.id,
		name			:	result.name,
		email			:	result.email,
		contact_no		:	result.contact_no,
		username		:	result.username,
		first_name		:	result.first_name,
		last_name		:	result.last_name,
		profile_pic		:	result.profile_pic,
		address1		:	result.	address1,
		address2		:	result.	address2,
		province_id		:	result.	province_id,
		city_id			:	result.	city_id,
		postal_code		:	result.	postal_code,
		userId			:	$rootScope.user_id
	}
			
	API.citiesByProvinceId(result.province_id).then(function(ret){
		$scope.cities	=	ret.data.data;
	});	

	var img	=	result.profile_pic;
	var img_up_path	=	siteurl + 'uploads/user/' + img;
		$scope.image_source  = img_up_path;
	});
	   
	API.getAllProvinces().then(function(ret){
		$scope.provinces	=	ret.data.data;
	});
	angular.extend($scope, {
		val	:	{
			message			:	'',
			msgClass		:	'',
			fnametypeError	:	'',
			lnametypeError	:	'',
			numbertypeError	:	'',
			pcodetypeError	:	'',
			add1typeError	:	'',
			fileError		:	''
			
		},
		exe	:	{
			getCities: function(){
				API.citiesByProvinceId($scope.val.data.province_id).then(function(ret){
					$scope.cities	=	ret.data.data;
				});
			},
			upFile: function(element){
				$scope.val.fileError	=	'';
				$scope.theFile			=	element.files[0];
				$scope.theFile.userId	=	$rootScope.user_id ;
				
				var filename	=	$scope.theFile.name;
				
				var reader		=	new FileReader();
				reader.onload	=	function(event) {
					$scope.image_source	=	event.target.result
					$scope.$apply(function($scope) {
						$scope.files	=	element.files;
					});
				}              
				reader.readAsDataURL(element.files[0]);
			},
			save	: function() {
				$scope.val.fnametypeError	=	'';
				$scope.val.lnametypeError	=	'';
				$scope.val.numbertypeError	=	'';
				$scope.val.pcodetypeError	=	'';
				$scope.val.add1typeError	=	'';
				$scope.val.fileError		=	'';
				
				if($scope.val.data.first_name == '') {
					$scope.val.fnametypeError	=	'Please enter  first name.';				
					return false;
				}
				
				if($scope.val.data.last_name == '') {
					$scope.val.lnametypeError	=	'Please enter  last name.';				
					return false;
				}
				
				if($scope.val.data.contact_no == '') {
					$scope.val.numbertypeError	=	'Please enter  contact number.';				
					return false;
				}
				
				if($scope.val.data.postal_code == '') {
					$scope.val.pcodetypeError	=	'Please enter  Postal code.';				
					return false;
				}
				
				if($scope.val.data.address1 == '') {
					$scope.val.add1typeError	=	'Please enter Address 1.';				
					return false;
				}
				
				var fullname		=	$scope.val.data.first_name +" "+ $scope.val.data.last_name;
				$scope.val.data.name=	fullname ;
				API.updateProfiles($scope.val.data).then(function(ret){
					if(ret.data.status==ERROR) {
						$scope.val.message	=	ret.data.message;
						$scope.val.msgClass	=	'error-message';
						return false;
					}
					if($scope.theFile != null){
						if(ret.data.status == 1 ){
							$scope.theFile.userId	=	$rootScope.user_id ;
							API.updateImagesProfiles($scope.theFile).then(function(ret){
								if(ret.data.status==ERROR) {
									alert(ret.data.message);
									$scope.val.message	=	ret.data.message;
									$scope.val.msgClass	=	'error-message';
									return false;
								}
								$scope.val.message		=	ret.data.message;
								$scope.val.msgClass		=	'success-message';
							});
						}
					} else {
						$scope.val.message		=	ret.data.message;
						$scope.val.msgClass		=	'success-message'; 
					}
				});
			}
		}
	});
})	