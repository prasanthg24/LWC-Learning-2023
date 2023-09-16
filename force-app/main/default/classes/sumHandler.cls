public class sumHandler
{
    
    public static void SumUpdate(List<ObjectTwo__c>obj)
    {
        
        List<ObjectOne__c> ParentRecord=new List<ObjectOne__c>();
        //to store parent record id
        set<Id> Ids = new Set<Id>();
        
        for(ObjectTwo__c c : obj)
        {
            if(c.ObjectOne__c != null)
            {
                Ids.add(c.ObjectOne__c);
            }
        }
        
        List<ObjectOne__c> parentList = [SELECT Id, Name, NumberOne__c FROM ObjectOne__c where Id IN: Ids];
        List<ObjectTwo__c> childList = [SELECT ObjectOne__c, NumberTwo__c, Name, Id FROM ObjectTwo__c WHERE ObjectOne__c IN : Ids] ;
            Map<Id,ObjectTwo__c> nwmap  = new Map<Id,ObjectTwo__c>();
        for(ObjectOne__c p : parentList)
        {	
            integer val = 0;
            for( ObjectTwo__c c : childList) 
            {
                val = val+ integer.valueOf(c.NumberTwo__c);
                system.debug('====> ' +val);
            }
            system.debug(val);
            p.NumberOne__c = Val;
            ParentRecord.add(p);
            
        }
        system.debug('Parent Record Data - '+ ParentRecord );
        if(ParentRecord.size()>0)
        {
            update ParentRecord;     
        }
        
    }
    
}