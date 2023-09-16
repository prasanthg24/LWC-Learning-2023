trigger contactAccountTrigger on Contact (after insert,after update,after delete,after undelete) 
{ 
   if (Trigger.isAfter) 
   {
                If(Trigger.isInsert) {
                    system.debug('Trigger.isInsert');
                  ContactTriggerHandler.countRelatedContact(Trigger.new);
                }
                else if (Trigger.isUpdate) {
                  ContactTriggerHandler.updateContact(Trigger.oldMap,trigger.old); 
                }
                else if (Trigger.isDelete) {
                  ContactTriggerHandler.countRelatedContact(Trigger.old); 
                }
                else if (Trigger.isUndelete) {
                  ContactTriggerHandler.countRelatedContact(Trigger.new); 
                }
    }
    
}