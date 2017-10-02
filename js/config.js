// var siteurl		=	'http://192.168.100.3/aquaguard/';
var siteurl		=	'http://localhost/aquaguard/';
var apiurl		=	siteurl+"web-services/";

var SUCCESS		=	1;
var ERROR		=	0;
var DELETED		=	0;
var ACTIVE		=	1;
var INACTIVE	=	2;
var PASSLENGTH	=	6; // Default Password length.

var urls		=	{};

urls.login							=	apiurl + "login";
urls.resetPassword					=	apiurl + "resetPassword";
urls.logout							=	apiurl + "logout?id=";
urls.recoverPassword				=	apiurl + "recoverPassword?email=";
//Location Types
urls.addLocationType				=	apiurl + "addLocationType";
urls.editLocationType				=	apiurl + "editLocationType";
urls.changeStatusLocationType		=	apiurl + "changeStatusLocationType";
urls.locationTypes					=	apiurl + "locationTypes";
urls.getLocationType				=	apiurl + "getLocationType?itemId=";
//Organization Types
urls.addOrganizationType			=	apiurl + "addOrganizationType";
urls.editOrganizationType			=	apiurl + "editOrganizationType";
urls.changeStatusOrganizationType	=	apiurl + "changeStatusOrganizationType";
urls.organizationTypes				=	apiurl + "organizationTypes";
urls.getOrganizationType			=	apiurl + "getOrganizationType?itemId=";
//Units
urls.units       					=	apiurl + "units";
urls.addUnit     					=	apiurl + "addUnit";
urls.editUnit     					=	apiurl + "editUnit";
urls.getUnit      					=	apiurl + "getUnit?itemId=";
urls.changeStatusUnit    			=	apiurl + "changeStatusUnit";
// System Templates
urls.allSystemTemplates				=	apiurl + "allSystemTemplates";
urls.addSystemTemplate				=	apiurl + "addSystemTemplate";
urls.editSystemTemplate				=	apiurl + "editSystemTemplate";
urls.getSystemTemplate				=	apiurl + "getSystemTemplate?itemId=";
urls.changeStatusSystemTemplate		=	apiurl + "changeStatusSystemTemplate";
// Test Templates
urls.allTestTemplates				=	apiurl + "allTestTemplates";
urls.addTestTemplate				=	apiurl + "addTestTemplate";
urls.editTestTemplate				=	apiurl + "editTestTemplate";
urls.getTestTemplate				=	apiurl + "getTestTemplate?itemId=";
urls.changeStatusTestTemplate		=	apiurl + "changeStatusTestTemplate";
// Test Values
urls.allTestValues					=	apiurl + "allTestValues";
urls.addTestValue					=	apiurl + "addTestValue";
urls.editTestValue					=	apiurl + "editTestValue";
urls.getTestValue					=	apiurl + "getTestValue?itemId=";
urls.changeStatusTestValues			=	apiurl + "changeStatusTestValue";
// Provinces
urls.getAllProvinces    			=	apiurl + "getAllProvinces";
// Cities
urls.citiesByProvinceId    			=	apiurl + "citiesByProvinceId?itemId=";
// Create Client
urls.saveCompanyDetails    			=	apiurl + "saveCompanyDetails";
urls.saveCompanyLocation   			=	apiurl + "saveCompanyLocation";
urls.changeStatusCompanyLocation   	=	apiurl + "changeStatusCompanyLocation";
/* Create Company Templpates */
urls.saveCompanySystem   			=	apiurl + "saveCompanySystem";
urls.changeStatusCompanySystem   	=	apiurl + "changeStatusCompanySystem";
/* create Company Test */
urls.saveCompanyTest   				=	apiurl + "saveCompanyTest";
urls.changeStatusCompanyTest   		=	apiurl + "changeStatusCompanyTest";
/* create company User */
urls.saveCompanyUser   				=	apiurl + "saveCompanyUser";
urls.changeStatusCompanyUser   		=	apiurl + "changeStatusCompanyUser";
/* update user profile and password */
urls.changePasswords    	   		=	apiurl + "changePasswords";
urls.getuserProfiles    	   		=	apiurl + "getuserProfiles?itemId=";
urls.updateProfiles	    	   		=	apiurl + "updateProfiles";
urls.updateImagesProfiles  	   		=	apiurl + "updateImagesProfiles";

/* Common Functions */
function validateForm(){
	var isValid	=	true;
	$('#data-form *').filter(':input').not(':input[type=button], :input[type=submit], :input[type=reset]').each(function(){
		if(this.value == ''){
			isValid	=	false;
			$('<div class="form-control-error" data-error-list=""><ul><li>Required</li></ul></div>').insertAfter(this);
		} else{
			if(this.type == 'email') {
				var regex_email=/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
				if(regex_email.test(this.value)===false) {
					isValid	=	false;
					$('<div class="form-control-error" data-error-list=""><ul><li>Invalid Email Id</li></ul></div>').insertAfter(this);
				}
			}
		}
	});
	return isValid;
}
function checkValid(ele){
	if(ele.value != '') {
		$(ele).next('.form-control-error').remove();
	}
}
/* Create Client Page Script */
$(document).on('click', '.close2', function() {
	if(confirm('Are you sure, you want to close this without saving?')) {
		window.location.href	=	'#!dashboard';
	}
});