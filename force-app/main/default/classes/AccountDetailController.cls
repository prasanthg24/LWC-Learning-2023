public with sharing class AccountDetailController {
    @AuraEnabled(cacheable=true)
    public static AccountWrapper getRelatedData(Id accountId) {
        AccountWrapper wrapper = new AccountWrapper();
        
        // Retrieve related child Account records
        //SELECT Id, Name, Type, ParentId, AnnualRevenue, Rating FROM Account
        List<Account> childAccounts = [SELECT   Id, Name, Parent.Name,Type,AnnualRevenue, Rating
                                       FROM Account
                                       WHERE ParentId = :accountId];
        List<Account> ParentName =[select Name FROM Account WHERE Id = :accountId ] ;
        
        wrapper.childAccounts = childAccounts;
       // wrapper.childAccounts = ParentName;

               
            
            
      
         System.debug('childAccounts--->'+childAccounts);
        // Retrieve related contacts
        List<Contact> contacts = [SELECT Id, AccountId, Account.Name, LastName, FirstName, Birthdate, Phone, 
                                  LeadSource, Email, Account.Parent.Name
                                  FROM Contact
                                  WHERE AccountId = :accountId];
        wrapper.contacts = contacts;
      
        return wrapper;
    }
    
    public class AccountWrapper {
        @AuraEnabled public List<Account> childAccounts { get; set; }
        @AuraEnabled public List<Contact> contacts { get; set; }
    }
}



/*public with sharing class AccountDetailController {
    public class AccountWrapper {
        @AuraEnabled public String accountId;
        @AuraEnabled public String accountName;
        @AuraEnabled public List<ChildAccountWrapper> childAccounts;
        @AuraEnabled public List<ContactWrapper> contacts;
    }

    public class ChildAccountWrapper {
        @AuraEnabled public String accountId;
        @AuraEnabled public String accountName;
        @AuraEnabled public Decimal annualRevenue;
        @AuraEnabled public Date createdDate;
    }

    public class ContactWrapper {
        @AuraEnabled public String contactId;
        @AuraEnabled public String firstName;
        @AuraEnabled public String lastName;
        @AuraEnabled public Boolean doNotCall;
        @AuraEnabled public String email;
        @AuraEnabled public Date createdDate;
    }

    @AuraEnabled(cacheable=true)
    public static AccountWrapper getRelatedData(String accountId) {
        AccountWrapper result = new AccountWrapper();
        
        Account account = [SELECT Id, Name FROM Account WHERE Id = :accountId];
        result.accountId = account.Id;
        result.accountName = account.Name;
        
        result.childAccounts = new List<ChildAccountWrapper>();
        List<Account> childAccounts = [SELECT Id, Name, AnnualRevenue, CreatedDate FROM Account WHERE ParentId = :accountId];
        for (Account childAccount : childAccounts) {
            ChildAccountWrapper childAccountWrapper = new ChildAccountWrapper();
            childAccountWrapper.accountId = childAccount.Id;
            childAccountWrapper.accountName = childAccount.Name;
            childAccountWrapper.annualRevenue = childAccount.AnnualRevenue;
            childAccountWrapper.createdDate = childAccount.CreatedDate.date();
            result.childAccounts.add(childAccountWrapper);
        }

        result.contacts = new List<ContactWrapper>();
        List<Contact> contacts = [SELECT Id, FirstName, LastName, DoNotCall, Email, CreatedDate FROM Contact WHERE AccountId = :accountId];
        for (Contact contact : contacts) {
            ContactWrapper contactWrapper = new ContactWrapper();
            contactWrapper.contactId = contact.Id;
            contactWrapper.firstName = contact.FirstName;
            contactWrapper.lastName = contact.LastName;
            contactWrapper.doNotCall = contact.DoNotCall;
            contactWrapper.email = contact.Email;
            contactWrapper.createdDate = contact.CreatedDate.date();
            result.contacts.add(contactWrapper);
        }

        return result;
    }
}*/