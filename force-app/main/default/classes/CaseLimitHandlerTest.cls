@IsTest
public class CaseLimitHandlerTest {
    @IsTest
    public static  void testCasewithLimit()
    {
       
            User testUser = new User(
            Alias = 'sfdxdemo',
            Email = 'sfdxdemo@example.com',
            LastName = 'Test',
            ProfileId = [SELECT Id FROM Profile WHERE Name = 'Standard User'].Id,
            TimeZoneSidKey = 'America/Los_Angeles',
            UserName = 'sfdxdemo@example.com',
            EmailEncodingKey = 'UTF-8',
            LanguageLocaleKey = 'en_US',
            LocaleSidKey = 'en_US');  
            insert testUser;
          
            List<Case> testCases = new List<Case>();
            for (Integer i = 1; i <= 10; i++) 
            {
                Case newCase = new Case( Subject = 'Test Case ' + i,origin ='Web', OwnerId = testUser.Id );
                testCases.add(newCase);
            }
        
        insert testCases;
        
       	List<Case> casesWithLimit = [SELECT Id, Subject, OwnerId FROM Case];
        System.assertEquals(10, casesWithLimit.size());
       
        
    }


    @IsTest
    public static void testCaseLimitExceeded() {
        Profile standardUserProfile = [SELECT Id FROM Profile WHERE Name = 'Standard User' LIMIT 1];

        User testUser = new User(
            Alias = 'sfdxdemo',
            Email = 'sfdxdemo@example.com',
            LastName = 'Test',
            ProfileId = standardUserProfile.Id,
            TimeZoneSidKey = 'America/Los_Angeles',
            UserName = 'sfdxdemo@example.com',
            EmailEncodingKey = 'UTF-8',
            LanguageLocaleKey = 'en_US',
            LocaleSidKey = 'en_US'
        );
        insert testUser;

        List<Case> testCases = new List<Case>();
        for (Integer i = 1; i <= 122; i++) {
            Case newCase = new Case(Subject = 'Test Case ' + i, OwnerId = testUser.Id);
            testCases.add(newCase);
        }
	
        Boolean exceptionThrown = false;
        try {
            insert testCases;
        } catch (DmlException e) {
            exceptionThrown = true;
            System.assert(e.getDmlType(0) == StatusCode.LIMIT_EXCEEDED, 'Expected trigger to throw a limit exceeded exception');
            System.assert(e.getMessage().contains('has exceeded the maximum number of cases allowed this month'), 'Expected error message not found');
        }
		//Test.stopTest();
        //System.assert(exceptionThrown, 'Expected an exception to be thrown');
    }
}