({
	myAction : function(component, event, helper) {
		console.log('myaction');
        component.find('childLwc').callMe();
	}
})