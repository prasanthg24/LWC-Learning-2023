({
    doInit : function(component, event, helper) 
    { var actions = [
            { label: 'Edit', name: 'edit' },
            { label: 'View', name: 'view' } ];

        component.set('v.columns', [
            {label: 'Case Number', fieldName: 'CaseNumber',  type: 'text', },
        //	label: 'Case Number', fieldName: 'link',  type: 'url',
        //	 typeAttributes:  { label: {fieldName: 'CaseNumber'},   target: '_blank' }
            {label: 'Case Type',    fieldName: 'Type',        type: 'text' },
            {label: 'Subject',      fieldName: 'Subject',     type: 'text'},
            {label: 'Contact Name', fieldName: 'Name',   type: 'List'},
            {label: 'Case Origin',  fieldName: 'Origin',      type: 'text'}
       ]);
        var action = component.get('c.getdatatable');
        action.setCallback(this, function(response)
                           {
                               var state = response.getState();
                               //alert(state);
                               if(state === 'SUCCESS' || state==='DRAFT' )
                               {
                                   var responseValue = response.getReturnValue();
                                  
                                   
                                   console.log('responseValue ', responseValue);
                                   component.set('v.data', responseValue);
                                   
                               }});
        $A.enqueueAction(action);
    },
   handleRowAction: function(component, event, helper) 
    {
        alert('selected ');
         var action = event.getParam( 'action');
        var row = event.getParam( 'row' );
        var recId = row.Id;
        
    }
})