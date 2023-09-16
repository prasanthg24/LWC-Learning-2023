public class ContactTriggerHandler 
{
    public static void countRelatedContact(List<Contact> con)
    {
       set<Id> accIds = new set<Id>();
        for(Contact c : con)
        {
            accIds.add(c.AccountId);
        }
        if(accIds != null){
        List<Account> accsRelatedContacts = [SELECT Id,No_of_Contacts__c,(SELECT Id FROM Contacts) FROM Account WHERE Id IN :accIds];
    	
        for(Account ac : accsRelatedContacts)
        {
            ac.No_of_Contacts__c = ac.contacts.size();
            system.debug('ac.contacts.size---'+ac.contacts.size());
        }
        system.debug('accsRelatedContacts --'+accsRelatedContacts);
        Update accsRelatedContacts;
        }
    }
    public static void updateContact(Map<Id,Contact> oldCon,List<Contact> newCon)
    {
        set<Id> accIds = new set<Id>();
        for(Contact c : newCon)
        {
            accIds.add(c.AccountId);
            contact OldValue = oldCon.get(c.Id);
            accIds.add(OldValue.AccountId);
        }
        system.debug('accIds== '+accIds);
          if(accIds != null){
         List<Account> accsRelatedContacts = [SELECT Id,No_of_Contacts__c,(SELECT Id FROM Contacts) FROM Account WHERE Id IN :accIds];
    	 system.debug('accsRelatedContacts== '+accsRelatedContacts);
        for(Account ac : accsRelatedContacts)
        {
            ac.No_of_Contacts__c = ac.contacts.size();
            system.debug('ac.contacts.size---'+ac.contacts.size());
        }
        system.debug('accsRelatedContacts --'+accsRelatedContacts);
        Update accsRelatedContacts;
        }
    }
   
}




























































/*
public static void createAccountRecord(List<Contact> con)
    {    
        Map<Id,Account> accounts = new Map<Id,Account>();
        List<Contact> contacts = new List<Contact>();
        
        for(Contact c: con)
        {
            Account a = new Account( Name =c.FirstName + ' '+ c.LastName );
            accounts.put(c.Id, a);
        }
        if(accounts.size()>0)
        {  
            insert accounts.values();
        }
        
        system.debug('Map Values = '+accounts);
        
        for(Id contactId : accounts.keySet())
        {
            contact c = new Contact();
            c.Id = contactId;
            c.AccountId = accounts.get(contactId).Id;
            contacts.add(c);
            //contacts.add(new Contact(Id = contactId, AccountId = accounts.get(contactId).Id ));
            system.debug(' Accid = '+ accounts.get(contactId).Id );
        }
        if(contacts.size()>0)
        {  
            update contacts;
        }
    }
*/