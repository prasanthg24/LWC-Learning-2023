public with sharing class AccountCloneWithRelatedController {
    @AuraEnabled
    public static Id cloneAccountWithRelated(String accountId, Boolean shouldCloneContact, Boolean shouldCloneOpportunity) {
      
        Account originalAccount = [SELECT Id, Name, Type, BillingStreet, BillingCity, BillingPostalCode, BillingLatitude, ShippingStreet, ShippingCity, BillingAddress, Phone, Website, AccountNumber, Industry, AnnualRevenue, Description, Rating FROM Account WHERE Id = :accountId];
        Account clonedAccount = new Account();
        clonedAccount.Name = 'Clone - ' + originalAccount.Name;
        clonedAccount.Type = originalAccount.Type;
        clonedAccount.BillingStreet = originalAccount.BillingStreet;
        clonedAccount.BillingCity = originalAccount.BillingCity;
        clonedAccount.BillingPostalCode = originalAccount.BillingPostalCode;
        clonedAccount.BillingLatitude = originalAccount.BillingLatitude;
        clonedAccount.ShippingStreet = originalAccount.ShippingStreet;
        clonedAccount.ShippingCity = originalAccount.ShippingCity;
        clonedAccount.Phone = originalAccount.Phone;
        clonedAccount.Website = originalAccount.Website;
        clonedAccount.AccountNumber = originalAccount.AccountNumber;
        clonedAccount.Industry = originalAccount.Industry;
        clonedAccount.AnnualRevenue = originalAccount.AnnualRevenue;
        clonedAccount.Description = originalAccount.Description;
        clonedAccount.Rating = originalAccount.Rating;

        insert clonedAccount;
        System.debug(clonedAccount);

        
        if (shouldCloneContact) {
            List<Contact> originalContacts = [SELECT Id, AccountId, LastName, FirstName, Salutation, Name, OtherStreet, OtherCity, OtherState, Phone, Email FROM Contact WHERE AccountId = :originalAccount.Id];
            List<Contact> clonedContacts = new List<Contact>();

            for (Contact originalContact : originalContacts) {
                Contact clonedContact = new Contact();
                clonedContact.AccountId = clonedAccount.Id;
                clonedContact.LastName = originalContact.LastName;
                clonedContact.FirstName = originalContact.FirstName;
                clonedContact.Salutation = originalContact.Salutation;
                clonedContact.OtherStreet = originalContact.OtherStreet;
                clonedContact.OtherCity = originalContact.OtherCity;
                clonedContact.OtherState = originalContact.OtherState;
                clonedContact.Phone = originalContact.Phone;
                clonedContact.Email = originalContact.Email;

                clonedContacts.add(clonedContact);
            }

            insert clonedContacts;
            System.debug(clonedContacts);
        }


        if (shouldCloneOpportunity) {
            List<Opportunity> originalOpportunities = [SELECT Id, Name, Description, StageName, Amount, Probability, ExpectedRevenue, TotalOpportunityQuantity, CloseDate FROM Opportunity WHERE AccountId = :originalAccount.Id];
            List<Opportunity> clonedOpportunities = new List<Opportunity>();

            for (Opportunity originalOpportunity : originalOpportunities) {
                Opportunity clonedOpportunity = new Opportunity();
                clonedOpportunity.AccountId = clonedAccount.Id;
                clonedOpportunity.Name = originalOpportunity.Name;
                clonedOpportunity.Description = originalOpportunity.Description;
                clonedOpportunity.StageName = originalOpportunity.StageName;
                clonedOpportunity.Amount = originalOpportunity.Amount;
                clonedOpportunity.Probability = originalOpportunity.Probability;
                clonedOpportunity.TotalOpportunityQuantity = originalOpportunity.TotalOpportunityQuantity;
                clonedOpportunity.CloseDate = originalOpportunity.CloseDate;

                clonedOpportunities.add(clonedOpportunity);
            }

            insert clonedOpportunities;
            System.debug(clonedOpportunities);
        }

        return clonedAccount.Id;
    }
}