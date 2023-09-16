@IsTest(SeeAllData=false)
public class EmailControllerTest {
    @IsTest
    static void testSendWelcomeEmail() {
        // Create test data
        Contact testContact = new Contact(
            FirstName = 'John',
            LastName = 'Doe',
            Email = 'test@example.com'
        );
        insert testContact;

        // Query for the email template folder
        Folder templateFolder = [SELECT Id FROM Folder WHERE Name = 'Email Templates' LIMIT 1];

        if (templateFolder == null) {
            // Handle the case when the folder is not found
            System.assert(false, 'Email Templates folder not found.');
        }

        // Query for the email template from the specified folder
        EmailTemplate testEmailTemplate = [SELECT Id FROM EmailTemplate WHERE DeveloperName = 'Case_Flow_Email_Template' AND FolderId = :templateFolder.Id LIMIT 1];

        if (testEmailTemplate == null) {
            // Handle the case when the email template is not found
            System.assert(false, 'Case Flow Email Template not found in Email Templates folder.');
        }

        // Create an instance of EmailWrapper
        EmailWrapper wrapper = new EmailWrapper();
        wrapper.strEmailTemplate = 'Case Flow Email Template';
        wrapper.strRecipientId = testContact.Id;
        wrapper.strRecipientEmail = testContact.Email;

        List<EmailWrapper> wrapperList = new List<EmailWrapper>();
        wrapperList.add(wrapper);

        //Test.startTest();
        System.runAs(new User(Id = UserInfo.getUserId())) {
            // Call the sendWelcomeEmail method
            EmailController.sendWelcomeEmail(wrapperList);
        }
        //Test.stopTest();

        // Verify the expected results
        /*List<Messaging.SingleEmailMessage> sentEmails = [SELECT Id, Subject FROM Messaging.SingleEmailMessage];
        System.assertEquals(1, sentEmails.size());
        System.assertEquals('Welcome', sentEmails[0].Subject);

        List<Messaging.SendEmailResult> emailResults = [SELECT Id, IsSuccess, Errors FROM Messaging.SendEmailResult];
        System.assertEquals(1, emailResults.size());
        System.assert(emailResults[0].IsSuccess());
        System.assertEquals(null, emailResults[0].Errors);*/
    }
}