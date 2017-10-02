angular.module('aquaguard')
.directive('showstatus', function(){
    return {
        link: function(scope, element, attrs){
			if(attrs["status"] == ACTIVE) {
				element.html('Active');
			} else {
				element.html('Inactive');
			}
        }
    };
})
.directive('statusoptions', function(){
    return {
        template:'<option value="'+ACTIVE+'">Active</option><option value="'+INACTIVE+'">Inactive</option>'
    };
});

