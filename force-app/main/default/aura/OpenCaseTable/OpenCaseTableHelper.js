({
    getDataTable:function(component,parameters,searchString,numberofrecords) 
    {
        var action = component.get('c.getdatatable');
        action.setParams({});
        action.setCallback(this, function(response)
                           {
                               var state = response.getState();
                               console.log(state);
                               if (state === "SUCCESS") 
                               {
                                   var responseValue = response.getReturnValue();
                                   console.log('responseValue From server ', responseValue);
                                   component.set('v.data', responseValue);
                               }
                               else if (state === "INCOMPLETE") 
                               {
                                   console.log("From INCOMPLETE: " + response.getReturnValue());
                               }
                               else if (state === "ERROR") 
                               {
                                       var errors = response.getError();
                                       if (errors) {
                                           if (errors[0] && errors[0].message) 
                                           {
                                               console.log("Error message: " + errors[0].message);
                                           }
                                       } else {console.log("Unknown error"); }
                                }
                           })
        $A.enqueueAction(action);
    }                       
})