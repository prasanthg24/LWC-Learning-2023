@isTest
private class caseLimitTestClass {
    @isTest
    static void caseLimitOverload() {
        User demoUser = new User(
            FirstName = 'Test',
            LastName = 'User',
            Email = 'balu@test.com',
            Username = 'balu123@dev.com',
            Alias = 'tuser',
            EmailEncodingKey = 'UTF-8',
            TimeZoneSidKey = 'America/Los_Angeles',
            LocaleSidKey = 'en_US',
            LanguageLocaleKey = 'en_US',
            ProfileId = UserInfo.getProfileId()
        );
        insert demoUser;
        
        System.runAs(demoUser) {
            List<Case> cases = new List<Case>();
            for (Integer i = 0; i < 2; i++) 
            {
                cases.add(new Case(Subject = 'Sample Case Test' + i));
            }
            insert cases;
            Case newCase = new Case(Subject = 'Extra Case');
           // Test.startTest();
            Database.SaveResult result = Database.insert(newCase, false);
           // Test.stopTest();  
            System.assertEquals(false, result.isSuccess());
            List<Database.Error> errors = result.getErrors();
            System.assertEquals(1, errors.size());
            System.assertEquals('Test User (' + demoUser.Id + ') has exceeded the maximum number of cases allowed this month. The current maximum is: 120',
                				errors[0].getMessage());  
        }
    }
    
    @isTest
    static void caseWithinLimit() 
    {
        User testUser = new User(
            FirstName = 'Test',
            LastName = 'User',
            Email = 'jee123@test.com',
            Username = '123jee@dev.com',
            Alias = 'tuser',
            EmailEncodingKey = 'UTF-8',
            TimeZoneSidKey = 'America/Los_Angeles',
            LocaleSidKey = 'en_US',
            LanguageLocaleKey = 'en_US',
            ProfileId = UserInfo.getProfileId()
        );
        insert testUser;
        
        
        System.runAs(testUser) {
            
            List<Case> cases = new List<Case>();
            for (Integer i = 0; i < 119; i++) {
                cases.add(new Case(Subject = 'Test Case ' + i));
            }
            insert cases;
            
            
            Case newCase = new Case(Subject = 'Extra Case');
           // Test.startTest();
            Database.SaveResult result = Database.insert(newCase, false);
            //Test.stopTest();

            System.assertEquals(true, result.isSuccess());
            List<Database.Error> errors = result.getErrors();
            System.assertEquals(0, errors.size());
        }
    }
}