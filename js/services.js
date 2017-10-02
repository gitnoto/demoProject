angular.module('aquaguard')
.service('Progressbar', function(){
	this.show = function(){
		
	};

	this.hide = function(){
		
	};
})
.service('Alert' , function(){
	this.show = function(title,msg){
		alert(msg);
	};
})
.service('CONFIRM' , function(){
	this.show = function(msg){
		return confirm(msg);
	};
})
.service('fileUpload', ['$http', function ($http) {
	this.uploadFileToUrl = function(file, uploadUrl){
		var fd	=	new FormData();
		fd.append('file', file);
		$http.post(uploadUrl, fd, {
			transformRequest:	angular.identity,
			headers			:	{'Content-Type': undefined}
		})
            
	   .success(function(s){
		   console.log(s);
	   })
            
	   .error(function(e){
		   console.log(e);
	   });
    }
}])
.service('HttpSvc', function($http, $q){
	this.post = function(url , data){
		data = Object.keys(data).map(function(key){
            return encodeURIComponent(key) + '=' + encodeURIComponent(data[key]);
        }).join('&');
		var deferred = $q.defer();
		var header = {
			url		:	url,
			method	:	"POST",
			data	:	data,
			headers	:	{
				'Content-Type' : 'application/x-www-form-urlencoded;charset=utf-8'
			}
		};
		$http(header).then(function mySuccess(response) {
			deferred.resolve(response);
		}, function myError(response) {
			deferred.resolve(response);
		});
		return deferred.promise;
	};

	this.get = function(url){
		var deferred = $q.defer();
		var header = {
			url		:	url,
			method	:	"GET"
		};
		$http(header).then(function mySuccess(response) {
			deferred.resolve(response);
		}, function myError(response) {
			deferred.resolve(response);
		});

		return deferred.promise;
	};
	
	this.filewithpost = function(url ,file){
		var form	=	[];
		form.image	=	file;
		
		var deferred=	$q.defer();
		var header	=	{
			method			:	'POST',
			url				:	url,
			processData		:	false,
			transformRequest:	function (data) {
				var formData = new FormData();
				formData.append("image",form.image);
				formData.append("id",file.userId);				  
				return formData;  
			},  
			data	:	form,
			headers	:	{
				'Content-Type': undefined
			}
		};
		$http(header).then(function mySuccess(response) {
			deferred.resolve(response);
		},
		function myError(response) {
			deferred.resolve(response);
		});
		return deferred.promise;
	};
})
.service("API", function(HttpSvc, Alert, $q, $rootScope, Progressbar, $http){
	this.login = function(loginData){
        var deferred = $q.defer();	
		Progressbar.show();
        
        HttpSvc.post(urls.login, loginData).then(function(ret){
			Progressbar.hide();
            if(ret.status!=200){
				Alert.show("Login Failed", "Please try again.");
				deferred.reject();				
            }else{
                Progressbar.hide();
                deferred.resolve(ret);
			}
		}, function(ret){
			Progressbar.hide();
			Alert.show("Login Failed", "Please try again.");
			deferred.reject();
		});

		return deferred.promise;
	};	
	this.logout = function(id){
        var deferred = $q.defer();	
		Progressbar.show();
		
        HttpSvc.get(urls.logout+id).then(function(ret){
			Progressbar.hide();
            if(ret.status!=200){
				Alert.show("Logout Failed", "Please try again.");
				deferred.reject();				
            }else{
                Progressbar.hide();
                deferred.resolve(ret);
			}
		}, function(ret){
			Progressbar.hide();
			Alert.show("Logout Failed", "Please try again.");
			deferred.reject();
		});

		return deferred.promise;
	};
	this.recoverPassword = function(email){
        var deferred = $q.defer();	
		Progressbar.show();
		
        HttpSvc.get(urls.recoverPassword+email).then(function(ret){
			console.log(ret);
			Progressbar.hide();
            if(ret.status!=200){
				Alert.show("Failed", "Please try again.");
				deferred.reject();				
            }else{
                Progressbar.hide();
                deferred.resolve(ret);
			}
		}, function(ret){
			Progressbar.hide();
			Alert.show("Failed", "Please try again.");
			deferred.reject();
		});

		return deferred.promise;
	};
	this.resetPassword = function(data){
        var deferred = $q.defer();	
		Progressbar.show();
        
        HttpSvc.post(urls.resetPassword, data).then(function(ret){
			Progressbar.hide();
            if(ret.status!=200){
				Alert.show("Reset Password Failed", "Please try again.");
				deferred.reject();				
            }else{
                Progressbar.hide();
                deferred.resolve(ret);
			}
		}, function(ret){
			Progressbar.hide();
			Alert.show("Reset Password Failed", "Please try again.");
			deferred.reject();
		});

		return deferred.promise;
	};
	this.addLocationType = function(data){
        var deferred = $q.defer();	
		Progressbar.show();
        
        HttpSvc.post(urls.addLocationType, data).then(function(ret){
			Progressbar.hide();
            if(ret.status!=200){
				Alert.show("Failed", "Please try again.");
				deferred.reject();				
            }else{
                Progressbar.hide();
                deferred.resolve(ret);
			}
		}, function(ret){
			Progressbar.hide();
			Alert.show("Failed", "Please try again.");
			deferred.reject();
		});

		return deferred.promise;
	};
	this.editLocationType = function(data){
        var deferred = $q.defer();	
		Progressbar.show();
        
        HttpSvc.post(urls.editLocationType, data).then(function(ret){
			Progressbar.hide();
            if(ret.status!=200){
				Alert.show("Failed", "Please try again.");
				deferred.reject();				
            }else{
                Progressbar.hide();
                deferred.resolve(ret);
			}
		}, function(ret){
			Progressbar.hide();
			Alert.show("Failed", "Please try again.");
			deferred.reject();
		});

		return deferred.promise;
	};
	this.changeStatusLocationType = function(data){
        var deferred = $q.defer();	
		Progressbar.show();
        
        HttpSvc.post(urls.changeStatusLocationType, data).then(function(ret){
			Progressbar.hide();
            if(ret.status!=200){
				Alert.show("Failed", "Please try again.");
				deferred.reject();				
            }else{
                Progressbar.hide();
                deferred.resolve(ret);
			}
		}, function(ret){
			Progressbar.hide();
			Alert.show("Failed", "Please try again.");
			deferred.reject();
		});

		return deferred.promise;
	};
	this.locationTypes = function(list='0'){
        var deferred = $q.defer();	
		Progressbar.show();
		var getUrl	=	'';
		if(list != '0') {
			getUrl	=	'?list='+list;
		}
			
        HttpSvc.get(urls.locationTypes+getUrl).then(function(ret){
			Progressbar.hide();
            if(ret.status!=200){
				Alert.show("Failed", "Please try again.");
				deferred.reject();				
            }else{
                Progressbar.hide();
                deferred.resolve(ret);
			}
		}, function(ret){
			Progressbar.hide();
			Alert.show("Failed", "Please try again.");
			deferred.reject();
		});

		return deferred.promise;
	};
	this.getLocationType = function(itemId){
        var deferred = $q.defer();	
		Progressbar.show();
		
        HttpSvc.get(urls.getLocationType+itemId).then(function(ret){
			Progressbar.hide();
            if(ret.status!=200){
				Alert.show("Failed", "Please try again.");
				deferred.reject();				
            }else{
                Progressbar.hide();
                deferred.resolve(ret);
			}
		}, function(ret){
			Progressbar.hide();
			Alert.show("Failed", "Please try again.");
			deferred.reject();
		});

		return deferred.promise;
	};
	this.addOrganizationType = function(data){
        var deferred = $q.defer();	
		Progressbar.show();
        
        HttpSvc.post(urls.addOrganizationType, data).then(function(ret){
			Progressbar.hide();
            if(ret.status!=200){
				Alert.show("Failed", "Please try again.");
				deferred.reject();				
            }else{
                Progressbar.hide();
                deferred.resolve(ret);
			}
		}, function(ret){
			Progressbar.hide();
			Alert.show("Failed", "Please try again.");
			deferred.reject();
		});

		return deferred.promise;
	};
	this.editOrganizationType = function(data){
        var deferred = $q.defer();	
		Progressbar.show();
        
        HttpSvc.post(urls.editOrganizationType, data).then(function(ret){
			Progressbar.hide();
            if(ret.status!=200){
				Alert.show("Failed", "Please try again.");
				deferred.reject();				
            }else{
                Progressbar.hide();
                deferred.resolve(ret);
			}
		}, function(ret){
			Progressbar.hide();
			Alert.show("Failed", "Please try again.");
			deferred.reject();
		});

		return deferred.promise;
	};
	this.changeStatusOrganizationType = function(data){
        var deferred = $q.defer();	
		Progressbar.show();
        
        HttpSvc.post(urls.changeStatusOrganizationType, data).then(function(ret){
			Progressbar.hide();
            if(ret.status!=200){
				Alert.show("Failed", "Please try again.");
				deferred.reject();				
            }else{
                Progressbar.hide();
                deferred.resolve(ret);
			}
		}, function(ret){
			Progressbar.hide();
			Alert.show("Failed", "Please try again.");
			deferred.reject();
		});

		return deferred.promise;
	};
	this.organizationTypes = function(list = '0'){
        var deferred = $q.defer();	
		Progressbar.show();
		var getUrl	=	'';
		if(list != '0') {
			getUrl	=	'?list='+list;
		}
		
        HttpSvc.get(urls.organizationTypes+getUrl).then(function(ret){
			Progressbar.hide();
            if(ret.status!=200){
				Alert.show("Failed", "Please try again.");
				deferred.reject();				
            }else{
                Progressbar.hide();
                deferred.resolve(ret);
			}
		}, function(ret){
			Progressbar.hide();
			Alert.show("Failed", "Please try again.");
			deferred.reject();
		});

		return deferred.promise;
	};
	this.getOrganizationType = function(itemId){
        var deferred = $q.defer();	
		Progressbar.show();
		
        HttpSvc.get(urls.getOrganizationType+itemId).then(function(ret){
			Progressbar.hide();
            if(ret.status!=200){
				Alert.show("Failed", "Please try again.");
				deferred.reject();				
            }else{
                Progressbar.hide();
                deferred.resolve(ret);
			}
		}, function(ret){
			Progressbar.hide();
			Alert.show("Failed", "Please try again.");
			deferred.reject();
		});

		return deferred.promise;
	};
	this.units = function(list='0'){
        var deferred = $q.defer();	
		Progressbar.show();
		var getUrl	=	'';
		if(list != '0') {
			getUrl	=	'?list='+list;
		}
        HttpSvc.get(urls.units+getUrl).then(function(ret){
			Progressbar.hide();
            if(ret.status!=200){
				Alert.show("Failed", "Please try again.");
				deferred.reject();				
            }else{
                Progressbar.hide();
                deferred.resolve(ret);
			}
		}, function(ret){
			Progressbar.hide();
			Alert.show("Failed", "Please try again.");
			deferred.reject();
		});

		return deferred.promise;
	};
	this.addUnit = function(data){
        var deferred = $q.defer();	
		Progressbar.show();
        
        HttpSvc.post(urls.addUnit, data).then(function(ret){
			Progressbar.hide();
            if(ret.status!=200){
				Alert.show("Failed", "Please try again.");
				deferred.reject();
            } else {
				Progressbar.hide();
				deferred.resolve(ret);
			}
		}, function(ret){
			Progressbar.hide();
			Alert.show("Failed", "Please try again.");
			deferred.reject();
		});

		return deferred.promise;
	};
	this.editUnit = function(data){
        var deferred = $q.defer();	
		Progressbar.show();
        
        HttpSvc.post(urls.editUnit, data).then(function(ret){
			Progressbar.hide();
            if(ret.status!=200){
				Alert.show("Failed", "Please try again.");
				deferred.reject();				
            }else{
                Progressbar.hide();
                deferred.resolve(ret);
			}
		}, function(ret){
			Progressbar.hide();
			Alert.show("Failed", "Please try again.");
			deferred.reject();
		});

		return deferred.promise;
	};
	this.getUnit = function(itemId){
        var deferred = $q.defer();	
		Progressbar.show();
		
        HttpSvc.get(urls.getUnit+itemId).then(function(ret){
			Progressbar.hide();
            if(ret.status!=200){
				Alert.show("Failed", "Please try again.");
				deferred.reject();				
            }else{
                Progressbar.hide();
                deferred.resolve(ret);
			}
		}, function(ret){
			Progressbar.hide();
			Alert.show("Failed", "Please try again.");
			deferred.reject();
		});

		return deferred.promise;
	};	
	this.changeStatusUnit = function(data){
        var deferred = $q.defer();	
		Progressbar.show();
        
        HttpSvc.post(urls.changeStatusUnit, data).then(function(ret){
			Progressbar.hide();
            if(ret.status!=200){
				Alert.show("Failed", "Please try again.");
				deferred.reject();				
            }else{
                Progressbar.hide();
                deferred.resolve(ret);
			}
		}, function(ret){
			Progressbar.hide();
			Alert.show("Failed", "Please try again.");
			deferred.reject();
		});

		return deferred.promise;
	};	
	this.getAllProvinces = function(){
        var deferred = $q.defer();	
		Progressbar.show();
		
        HttpSvc.get(urls.getAllProvinces).then(function(ret){
			Progressbar.hide();
            if(ret.status!=200){
				Alert.show("Failed", "Please try again.");
				deferred.reject();				
            }else{
                Progressbar.hide();
                deferred.resolve(ret);
			}
		}, function(ret){
			Progressbar.hide();
			Alert.show("Failed", "Please try again.");
			deferred.reject();
		});

		return deferred.promise;
	};
	this.citiesByProvinceId = function(itemId){
        var deferred = $q.defer();	
		Progressbar.show();
		
        HttpSvc.get(urls.citiesByProvinceId+itemId).then(function(ret){
			Progressbar.hide();
            if(ret.status!=200){
				Alert.show("Failed", "Please try again.");
				deferred.reject();				
            }else{
                Progressbar.hide();
                deferred.resolve(ret);
			}
		}, function(ret){
			Progressbar.hide();
			Alert.show("Failed", "Please try again.");
			deferred.reject();
		});

		return deferred.promise;
	};
	this.saveCompanyDetails = function(data){
        var deferred = $q.defer();	
		Progressbar.show();
        
        HttpSvc.post(urls.saveCompanyDetails, data).then(function(ret){
			Progressbar.hide();
            if(ret.status!=200){
				Alert.show("Failed", "Please try again.");
				deferred.reject();				
            }else{
                Progressbar.hide();
                deferred.resolve(ret);
			}
		}, function(ret){
			Progressbar.hide();
			Alert.show("Failed", "Please try again.");
			deferred.reject();
		});

		return deferred.promise;
	};
	this.saveCompanyLocation = function(data){
        var deferred = $q.defer();	
		Progressbar.show();
        
        HttpSvc.post(urls.saveCompanyLocation, data).then(function(ret){
			Progressbar.hide();
            if(ret.status!=200){
				Alert.show("Failed", "Please try again.");
				deferred.reject();				
            }else{
                Progressbar.hide();
                deferred.resolve(ret);
			}
		}, function(ret){
			Progressbar.hide();
			Alert.show("Failed", "Please try again.");
			deferred.reject();
		});

		return deferred.promise;
	};
	this.allSystemTemplates = function(list='0'){
		var deferred = $q.defer();	
		Progressbar.show();
		var getUrl	=	'';
		if(list != '0') {
			getUrl	=	'?list='+list;
		}
		HttpSvc.get(urls.allSystemTemplates+getUrl).then(function(ret){
			Progressbar.hide();
			if(ret.status!=200){
				Alert.show("Failed", "Please try again.");
				deferred.reject();				
			}else{
				Progressbar.hide();
				deferred.resolve(ret);
			}
		}, function(ret){
			Progressbar.hide();
			Alert.show("Failed", "Please try again.");
			deferred.reject();
		});

		return deferred.promise;
	};
	this.addSystemTemplate = function(data){
		var deferred = $q.defer();	
		Progressbar.show();
		
		HttpSvc.post(urls.addSystemTemplate, data).then(function(ret){
			Progressbar.hide();
			if(ret.status!= 200){
				Alert.show("Failed", "Please try again.");
				deferred.reject();
			} else {
				Progressbar.hide();
				deferred.resolve(ret);
			}
		}, function(ret){
			Progressbar.hide();
			Alert.show("Failed", "Please try again.");
			deferred.reject();
		});

		return deferred.promise;
	};
	this.editSystemTemplate = function(data){
		var deferred = $q.defer();	
		Progressbar.show();
		
		HttpSvc.post(urls.editSystemTemplate, data).then(function(ret){
			Progressbar.hide();
			if(ret.status!=200){
				Alert.show("Failed", "Please try again.");
				deferred.reject();				
			}else{
				Progressbar.hide();
				deferred.resolve(ret);
			}
		}, function(ret){
			Progressbar.hide();
			Alert.show("Failed", "Please try again.");
			deferred.reject();
		});

		return deferred.promise;
	};
	this.getSystemTemplate = function(itemId){
		var deferred = $q.defer();	
		Progressbar.show();
		
		HttpSvc.get(urls.getSystemTemplate+itemId).then(function(ret){
			Progressbar.hide();
			if(ret.status!=200){
				Alert.show("Failed", "Please try again.");
				deferred.reject();				
			}else{
				Progressbar.hide();
				deferred.resolve(ret);
			}
		}, function(ret){
			Progressbar.hide();
			Alert.show("Failed", "Please try again.");
			deferred.reject();
		});

		return deferred.promise;
	};
	this.changeStatusSystemTemplate = function(data){
		var deferred = $q.defer();	
		Progressbar.show();
		
		HttpSvc.post(urls.changeStatusSystemTemplate, data).then(function(ret){
			Progressbar.hide();
			if(ret.status!=200){
				Alert.show("Failed", "Please try again.");
				deferred.reject();				
			}else{
				Progressbar.hide();
				deferred.resolve(ret);
			}
		}, function(ret){
			Progressbar.hide();
			Alert.show("Failed", "Please try again.");
			deferred.reject();
		});

		return deferred.promise;
	};
	this.allTestTemplates = function(list='0'){
		var deferred = $q.defer();	
		Progressbar.show();
		var getUrl	=	'';
		if(list != '0') {
			getUrl	=	'?list='+list;
		}
		HttpSvc.get(urls.allTestTemplates+getUrl).then(function(ret){
			Progressbar.hide();
			if(ret.status!=200){
				Alert.show("Failed", "Please try again.");
				deferred.reject();				
			}else{
				Progressbar.hide();
				deferred.resolve(ret);
			}
		}, function(ret){
			Progressbar.hide();
			Alert.show("Failed", "Please try again.");
			deferred.reject();
		});

		return deferred.promise;
	};
	this.addTestTemplate = function(data){
		var deferred = $q.defer();	
		Progressbar.show();
		
		HttpSvc.post(urls.addTestTemplate, data).then(function(ret){
			Progressbar.hide();
			if(ret.status!=200){
				Alert.show("Failed", "Please try again.");
				deferred.reject();
			} else {
				Progressbar.hide();
				deferred.resolve(ret);
			}
		}, function(ret){
			Progressbar.hide();
			Alert.show("Failed", "Please try again.");
			deferred.reject();
		});

		return deferred.promise;
	};
	this.editTestTemplate = function(data){
		var deferred = $q.defer();	
		Progressbar.show();
		
		HttpSvc.post(urls.editTestTemplate, data).then(function(ret){
			Progressbar.hide();
			if(ret.status!=200){
				Alert.show("Failed", "Please try again.");
				deferred.reject();				
			}else{
				Progressbar.hide();
				deferred.resolve(ret);
			}
		}, function(ret){
			Progressbar.hide();
			Alert.show("Failed", "Please try again.");
			deferred.reject();
		});

		return deferred.promise;
	};
	this.getTestTemplate = function(itemId){
		var deferred = $q.defer();	
		Progressbar.show();
		
		HttpSvc.get(urls.getTestTemplate+itemId).then(function(ret){
			Progressbar.hide();
			if(ret.status!=200){
				Alert.show("Failed", "Please try again.");
				deferred.reject();				
			}else{
				Progressbar.hide();
				deferred.resolve(ret);
			}
		}, function(ret){
			Progressbar.hide();
			Alert.show("Failed", "Please try again.");
			deferred.reject();
		});

		return deferred.promise;
	};
	this.changeStatusTestTemplate = function(data){
		var deferred = $q.defer();	
		Progressbar.show();
		
		HttpSvc.post(urls.changeStatusTestTemplate, data).then(function(ret){
			Progressbar.hide();
			if(ret.status!=200){
				Alert.show("Failed", "Please try again.");
				deferred.reject();				
			}else{
				Progressbar.hide();
				deferred.resolve(ret);
			}
		}, function(ret){
			Progressbar.hide();
			Alert.show("Failed", "Please try again.");
			deferred.reject();
		});

		return deferred.promise;
	};
	this.allTestValues = function(list='0'){
        var deferred = $q.defer();	
		Progressbar.show();
		var getUrl	=	'';
		if(list != '0') {
			getUrl	=	'?list='+list;
		}
        HttpSvc.get(urls.allTestValues+getUrl).then(function(ret){
			Progressbar.hide();
            if(ret.status!=200){
				Alert.show("Failed", "Please try again.");
				deferred.reject();				
            }else{
                Progressbar.hide();
                deferred.resolve(ret);
			}
		}, function(ret){
			Progressbar.hide();
			Alert.show("Failed", "Please try again.");
			deferred.reject();
		});

		return deferred.promise;
	};
	this.saveCompanySystem = function(data){
        var deferred = $q.defer();	
		Progressbar.show();
        
        HttpSvc.post(urls.saveCompanySystem, data).then(function(ret){
			Progressbar.hide();
            if(ret.status!=200){
				Alert.show("Failed", "Please try again.");
				deferred.reject();				
            }else{
                Progressbar.hide();
                deferred.resolve(ret);
			}
		}, function(ret){
			Progressbar.hide();
			Alert.show("Failed", "Please try again.");
			deferred.reject();
		});

		return deferred.promise;
	};
	this.saveCompanyTest = function(data){
        var deferred = $q.defer();	
		Progressbar.show();
        
        HttpSvc.post(urls.saveCompanyTest, data).then(function(ret){
			Progressbar.hide();
            if(ret.status!=200){
				Alert.show("Failed", "Please try again.");
				deferred.reject();				
            }else{
                Progressbar.hide();
                deferred.resolve(ret);
			}
		}, function(ret){
			Progressbar.hide();
			Alert.show("Failed", "Please try again.");
			deferred.reject();
		});

		return deferred.promise;
	};
	this.saveCompanyUser = function(data){
        var deferred = $q.defer();	
		Progressbar.show();
        
        HttpSvc.post(urls.saveCompanyUser, data).then(function(ret){
			Progressbar.hide();
            if(ret.status!=200){
				Alert.show("Failed", "Please try again.");
				deferred.reject();				
            }else{
                Progressbar.hide();
                deferred.resolve(ret);
			}
		}, function(ret){
			Progressbar.hide();
			Alert.show("Failed", "Please try again.");
			deferred.reject();
		});

		return deferred.promise;
	};
	this.changeStatusCompanyLocation = function(data){
		var deferred = $q.defer();	
		Progressbar.show();
		
		HttpSvc.post(urls.changeStatusCompanyLocation, data).then(function(ret){
			Progressbar.hide();
			if(ret.status!=200){
				Alert.show("Failed", "Please try again.");
				deferred.reject();				
			}else{
				Progressbar.hide();
				deferred.resolve(ret);
			}
		}, function(ret){
			Progressbar.hide();
			Alert.show("Failed", "Please try again.");
			deferred.reject();
		});

		return deferred.promise;
	};
	this.changeStatusCompanySystem = function(data){
		var deferred = $q.defer();	
		Progressbar.show();
		
		HttpSvc.post(urls.changeStatusCompanySystem, data).then(function(ret){
			Progressbar.hide();
			if(ret.status!=200){
				Alert.show("Failed", "Please try again.");
				deferred.reject();				
			}else{
				Progressbar.hide();
				deferred.resolve(ret);
			}
		}, function(ret){
			Progressbar.hide();
			Alert.show("Failed", "Please try again.");
			deferred.reject();
		});

		return deferred.promise;
	};
	this.changeStatusCompanyTest = function(data){
		var deferred = $q.defer();	
		Progressbar.show();
		
		HttpSvc.post(urls.changeStatusCompanyTest, data).then(function(ret){
			Progressbar.hide();
			if(ret.status!=200){
				Alert.show("Failed", "Please try again.");
				deferred.reject();				
			}else{
				Progressbar.hide();
				deferred.resolve(ret);
			}
		}, function(ret){
			Progressbar.hide();
			Alert.show("Failed", "Please try again.");
			deferred.reject();
		});

		return deferred.promise;
	};
	this.changeStatusCompanyUser = function(data){
		var deferred = $q.defer();	
		Progressbar.show();
		
		HttpSvc.post(urls.changeStatusCompanyUser, data).then(function(ret){
			Progressbar.hide();
			if(ret.status!=200){
				Alert.show("Failed", "Please try again.");
				deferred.reject();				
			}else{
				Progressbar.hide();
				deferred.resolve(ret);
			}
		}, function(ret){
			Progressbar.hide();
			Alert.show("Failed", "Please try again.");
			deferred.reject();
		});

		return deferred.promise;
	};
	
	this.changePassword = function(data){
		var deferred = $q.defer();	
		Progressbar.show();
        HttpSvc.post(urls.changePasswords, data).then(function(ret){
			Progressbar.hide();
            if(ret.status!=200){
				Alert.show("Change Password Failed", "Please try again.");
				deferred.reject();				
            }else{
                Progressbar.hide();
                deferred.resolve(ret);
			}
		}, function(ret){
			Progressbar.hide();
			Alert.show("Change Password Failed", "Please try again.");
			deferred.reject();
		});

		return deferred.promise;
	};
	
	this.getuserProfiles = function(itemId){
		var deferred = $q.defer();	
		Progressbar.show();
		HttpSvc.get(urls.getuserProfiles+itemId).then(function(ret){
			Progressbar.hide();
			if(ret.status!=200){
				Alert.show("Failed", "Please try again.");
				deferred.reject();				
			}else{
				Progressbar.hide();
				deferred.resolve(ret);
			}
		}, function(ret){
			Progressbar.hide();
			Alert.show("Failed", "Please try again.");
			deferred.reject();
		});
		return deferred.promise;
	};
	
	this.updateProfiles = function(data){
		var deferred = $q.defer();	
		Progressbar.show();
		HttpSvc.post(urls.updateProfiles,data).then(function(ret){
			Progressbar.hide();
			if(ret.status!=200){
				Alert.show("Failed", "Please try again.");
				deferred.reject();				
			}else{
				Progressbar.hide();
				deferred.resolve(ret);
			}
		}, function(ret){
			Progressbar.hide();
			Alert.show("Failed", "Please try again.");
			deferred.reject();
		});
		return deferred.promise;
	};
	
	this.updateImagesProfiles = function(file){
		var deferred = $q.defer();	
		Progressbar.show();
		HttpSvc.filewithpost(urls.updateImagesProfiles,file).then(function(ret){
			Progressbar.hide();
			if(ret.status!=200){
				Alert.show("Failed", "Please try again.");
				deferred.reject();				
			}else{
				Progressbar.hide();
				deferred.resolve(ret);
			}
		}, function(ret){
			Progressbar.hide();
			Alert.show("Failed", "Please try again.");
			deferred.reject();
		});
		return deferred.promise;
	};
});