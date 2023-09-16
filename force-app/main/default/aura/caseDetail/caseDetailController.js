({
	closeCase : function(component, event, helper) 
    {
		//alert('Case Closed')
      
        var id = component.get('v.caseId');
          // alert(id)
        var action = component.get('c.CaseClose');
        action.setParams({
            "CaseId" :id
        });
       // alert('Case action')
        action.setCallback(this, function(response){
            var state = response.getState();
           // alert(state);
            if(state === 'SUCCESS'){
                 component.find("overlayLib").notifyClose();
                   var showToast = $A.get('e.force:showToast');
                    showToast.setParams({
                        "title" : "Case Closed Successfully",
                        "type" : "Success",
                        "message" : "Closed Case RecordId - #"+id
                    });
                    showToast.fire();
               
              $A.get('e.force:refreshView').fire();
            }else{
                
            }
        });
        $A.enqueueAction(action);
	}
})