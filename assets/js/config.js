var siteurl		=	'<Website URL here>';
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