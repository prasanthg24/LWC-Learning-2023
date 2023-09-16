@IsTest
private class AccountCloneWithRelatedControllerTest {
    @IsTest
    static void testCloneAccountWithRelated() {
        Account originalAccount = new Account(Name = 'Test Account', Type = 'Prospect');
        insert originalAccount;

        Contact originalContact = new Contact(AccountId = originalAccount.Id, LastName = 'Test Contact');
        insert originalContact;
 
        Opportunity originalOpportunity = new Opportunity(
            AccountId = originalAccount.Id,
            Name = 'Test Opportunity',
            StageName = 'Prospecting', 
            CloseDate = Date.today().addDays(30) 
            
           );
        insert originalOpportunity;

    
        //Test.startTest();
        Id clonedAccountId = AccountCloneWithRelatedController.cloneAccountWithRelated(originalAccount.Id, true, true);
       // Test.stopTest();

       
        Account clonedAccount = [SELECT Id, Name, Type, BillingStreet, BillingCity, BillingPostalCode, BillingLatitude, ShippingStreet, ShippingCity, Phone, Website, AccountNumber, Industry, AnnualRevenue, Description, Rating FROM Account WHERE Id = :clonedAccountId];
        List<Contact> clonedContacts = [SELECT Id, AccountId, LastName, FirstName, Salutation, OtherStreet, OtherCity, OtherState, Phone, Email FROM Contact WHERE AccountId = :clonedAccountId];
        List<Opportunity> clonedOpportunities = [SELECT Id, AccountId, Name, Description, StageName, Amount, Probability, TotalOpportunityQuantity, CloseDate FROM Opportunity WHERE AccountId = :clonedAccountId];

  
        System.assertEquals('Clone - Test Account', clonedAccount.Name);
        System.assertEquals(originalAccount.Type, clonedAccount.Type);
        System.assertEquals(originalAccount.BillingStreet, clonedAccount.BillingStreet);
        System.assertEquals(originalAccount.BillingCity, clonedAccount.BillingCity);
        System.assertEquals(originalAccount.BillingPostalCode, clonedAccount.BillingPostalCode);
        System.assertEquals(originalAccount.BillingLatitude, clonedAccount.BillingLatitude);
        System.assertEquals(originalAccount.ShippingStreet, clonedAccount.ShippingStreet);
        System.assertEquals(originalAccount.ShippingCity, clonedAccount.ShippingCity);
        System.assertEquals(originalAccount.Phone, clonedAccount.Phone);
        System.assertEquals(originalAccount.Website, clonedAccount.Website);
        System.assertEquals(originalAccount.AccountNumber, clonedAccount.AccountNumber);
        System.assertEquals(originalAccount.Industry, clonedAccount.Industry);
        System.assertEquals(originalAccount.AnnualRevenue, clonedAccount.AnnualRevenue);
        System.assertEquals(originalAccount.Description, clonedAccount.Description);
        System.assertEquals(originalAccount.Rating, clonedAccount.Rating);


        System.assertEquals(1, clonedContacts.size());
        Contact clonedContact = clonedContacts[0];
        System.assertEquals(clonedAccountId, clonedContact.AccountId);
        System.assertEquals(originalContact.LastName, clonedContact.LastName);
        System.assertEquals(originalContact.FirstName, clonedContact.FirstName);
        System.assertEquals(originalContact.Salutation, clonedContact.Salutation);
        System.assertEquals(originalContact.OtherStreet, clonedContact.OtherStreet);
        System.assertEquals(originalContact.OtherCity, clonedContact.OtherCity);
        System.assertEquals(originalContact.OtherState, clonedContact.OtherState);
        System.assertEquals(originalContact.Phone, clonedContact.Phone);
        System.assertEquals(originalContact.Email, clonedContact.Email);


        System.assertEquals(1, clonedOpportunities.size());
        Opportunity clonedOpportunity = clonedOpportunities[0];
        System.assertEquals(clonedAccountId, clonedOpportunity.AccountId);
        System.assertEquals(originalOpportunity.Name, clonedOpportunity.Name);
        System.assertEquals(originalOpportunity.Description, clonedOpportunity.Description);
        System.assertEquals(originalOpportunity.StageName, clonedOpportunity.StageName);
        System.assertEquals(originalOpportunity.Amount, clonedOpportunity.Amount);
        System.assertEquals(originalOpportunity.TotalOpportunityQuantity, clonedOpportunity.TotalOpportunityQuantity);
        System.assertEquals(originalOpportunity.CloseDate, clonedOpportunity.CloseDate);
    }
}