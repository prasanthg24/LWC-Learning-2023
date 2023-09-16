@isTest
public class ContactTriggerTest 
{
    public static testMethod void TestContact()
    {
        
        contact c = new contact();
        c.FirstName ='Prasanth Gopinathan';
        c.LastName = 'Salesforce';
        //test.startTest();
        insert c;
        //test.stopTest();
        contact k = [select id, accountid, firstname, lastname from Contact where id =:c.Id][0];
        system.debug('contact--->'+k);
        Account a = [select id, name from Account where id = :k.accountId][0];
        system.debug('Account--->'+a);
        system.assertEquals(c.firstname + ' ' + c.lastname, a.Name);
        
        
    }
}