trigger SumTrigger on ObjectTwo__c (After Insert,After Update,After Delete,After Undelete)
{
    
    if(Trigger.isAfter)
        
    {
        if( trigger.isInsert || trigger.isUpdate||trigger.isUndelete) 
        {
            
            SumTriggerHandler.SumUpdate (trigger.new);
            
        }
        
        else if(Trigger.isDelete)
            
        {
            
            SumTriggerHandler.SumUpdate (trigger.old);
            
        }
        
    }
    
}