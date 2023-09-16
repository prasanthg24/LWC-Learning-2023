({
    doInit : function(component, event, helper) 
    { 
           helper.getDataTable(component,event);
    },
    recordDetail: function(component, event, helper) 
    {
      //  alert('Clicked')
        var selectedItem = event.currentTarget;
        var recordId = selectedItem.dataset.id;
      
        console.log("recordid =",recordId );
        $A.createComponent(
            "c:caseDetail",
            {
                caseId:recordId
            },
            function(caseDetails, status, errorMessage)
            { if (status === "SUCCESS")   
                {       component.find("overlayLib").showCustomModal({
                        header: "Case Detail ",
                        body: caseDetails,
                        footer:"",  }); 
                }
            })
    }
})