public with sharing class createAccountController {
    @AuraEnabled
    public static void createAccount(Id parentAccount, String rating, String accountName, String type, Decimal annualRevenue) {
        Account newAccount = new Account();
        newAccount.Name = accountName;
        newAccount.ParentId = parentAccount;
        newAccount.Rating = rating;
        newAccount.Type = type;
        newAccount.AnnualRevenue = annualRevenue;
        System.debug(newAccount);
        insert newAccount;
    }
     @AuraEnabled
    
    public static Account getDefaultParentAccount(Id parentAccount) {
   List<Account> a=  [SELECT Id, Name FROM Account WHERE Id = :parentAccount LIMIT 1];
   System.debug('Parent ---'+a);
    return [SELECT Id, Name FROM Account WHERE Id = :parentAccount];


        }


           @AuraEnabled
    public static void createContact(Id AccountId, String lastName, Date birthDate, String phone, String leadSource, String email, String firstName) {
        Contact newContact = new Contact();
        newContact.AccountId = AccountId;
        newContact.LastName = lastName;
        newContact.Birthdate = birthDate;
        newContact.Phone = phone;
        newContact.LeadSource = leadSource;
        newContact.Email = email;
        newContact.FirstName = firstName;
        
        
            insert newContact;
            System.debug(newContact);
            
    }

}