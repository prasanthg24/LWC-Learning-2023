@isTest
public class CSH_AsyncConatactDeletion_Test {

    @isTest
    static void testAsyncContactDeletion() {
        // Create test data
        List<Contact> contactsToDelete = new List<Contact>();
        for(Integer i = 0; i < 5; i++) {
            contactsToDelete.add(new Contact(FirstName = 'Test' + i, LastName = 'Contact' + i));
        }
        insert contactsToDelete;
        
        List<String> contactIdsToDelete = new List<String>();
        for(Contact con : contactsToDelete) {
            contactIdsToDelete.add(con.Id);
        }
        
        // Enqueue the queueable job
        //Test.startTest();
        System.enqueueJob(new CSH_AsyncConatactDeletion(contactIdsToDelete));
        //Test.stopTest();
        
        // Verify that the contacts are deleted successfully
        List<Contact> remainingContacts = [SELECT Id FROM Contact WHERE Id IN :contactIdsToDelete];
        System.assertEquals(0, remainingContacts.size(), 'Contacts should have been deleted.');
        
        // Verify that an email was sent
        List<EmailMessage> sentEmails = [SELECT Id, Subject, TextBody FROM EmailMessage];
        System.assertEquals(1, sentEmails.size(), 'An email should have been sent.');
        System.assertEquals('Contacts deleted successfully.', sentEmails[0].Subject, 'Email subject should match.');
        System.assertEquals('Contacts deleted successfully.', sentEmails[0].TextBody, 'Email body should match.');
    }
}