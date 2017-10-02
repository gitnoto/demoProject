angular.module('angular')
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
})
.service("API", function(HttpSvc, Alert, $q, $rootScope, Progressbar, $http){
	this.login = function(loginData){
        var deferred = $q.defer();	
		Progressbar.show();
        
        /*
		API call ---
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
		});*/
		 deferred.resolve({status:1,message:'Login Successful'});

		return deferred.promise;
	};	
	this.logout = function(id){
        var deferred = $q.defer();	
		Progressbar.show();
		
        /*
		API call --
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
		});*/
		
		deferred.resolve({status:1,message:'Logout Successful'});

		return deferred.promise;
	};
	this.recoverPassword = function(email){
        var deferred = $q.defer();	
		Progressbar.show();
		
        /*
		API call --
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
		});*/
		
		deferred.resolve({status:1,message:'Please check email'});

		return deferred.promise;
	};
});