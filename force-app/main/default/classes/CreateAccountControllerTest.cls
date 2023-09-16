@isTest
private class CreateAccountControllerTest {
    @isTest
    static void testCreateAccount() {
        // Test data setup
        Account parentAccount = new Account(Name = 'Parent Account');
        insert parentAccount;

        
        //Test.startTest();
        createAccountController.createAccount(
            parentAccount.Id, 'High', 'Test Account', 'Customer', 1000000
        );
       // Test.stopTest();

     
        Account[] accounts = [SELECT Id, Name, ParentId, Rating, Type, AnnualRevenue
                              FROM Account WHERE Name = 'Test Account'];
        System.assertEquals(1, accounts.size(), 'Account should have been created');
        Account createdAccount = accounts[0];
        System.assertEquals('Test Account', createdAccount.Name);
        System.assertEquals(parentAccount.Id, createdAccount.ParentId);
        System.assertEquals('High', createdAccount.Rating);
        System.assertEquals('Customer', createdAccount.Type);
        System.assertEquals(1000000, createdAccount.AnnualRevenue);
    }

    @isTest
    static void testGetDefaultParentAccount() {
        // Test data setup
        Account parentAccount = new Account(Name = 'Parent Account');
        insert parentAccount;

        
        //Test.startTest();
        Account result = createAccountController.getDefaultParentAccount(parentAccount.Id);
        //Test.stopTest();

       
        System.assertEquals(parentAccount.Id, result.Id);
        System.assertEquals('Parent Account', result.Name);
    }

    @isTest
    static void testCreateContact() {
        // Test data setup
        Account account = new Account(Name = 'Test Account');
        insert account;

        
        //Test.startTest();
        createAccountController.createContact(
            account.Id, 'Doe', Date.newInstance(1990, 1, 1), '1234567890',
            'Web', 'test@example.com', 'John'
        );
        //Test.stopTest();

        
        Contact[] contacts = [SELECT Id, AccountId, LastName, Birthdate, Phone, LeadSource, Email, FirstName
                              FROM Contact WHERE LastName = 'Doe'];
        System.assertEquals(1, contacts.size(), 'Contact should have been created');
        Contact createdContact = contacts[0];
        System.assertEquals(account.Id, createdContact.AccountId);
        System.assertEquals('Doe', createdContact.LastName);
        System.assertEquals(Date.newInstance(1990, 1, 1), createdContact.Birthdate);
        System.assertEquals('1234567890', createdContact.Phone);
        System.assertEquals('Web', createdContact.LeadSource);
        System.assertEquals('test@example.com', createdContact.Email);
        System.assertEquals('John', createdContact.FirstName);
    }
}